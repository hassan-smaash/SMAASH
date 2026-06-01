/**
 * SMAASH Rating Audit Script
 * ===========================
 * Pulls all matches for target players, shows per-match deltas,
 * and verifies cumulative rating matches the live DB value.
 *
 * HOW TO RUN:
 *   1. Paste your service_role key below
 *   2. node audit_ratings.js
 */

const SUPABASE_URL = "https://yqqezxyayndzmqahguac.supabase.co";
const SERVICE_KEY  = "PASTE_SERVICE_KEY_HERE";

// ── Players to audit ──────────────────────────────────────────────────────────
const AUDIT_NAMES = ["Ajeet", "Hashaam", "Imran", "Saad"];

const H = {
  "apikey": SERVICE_KEY,
  "Authorization": "Bearer " + SERVICE_KEY,
  "Content-Type": "application/json"
};

async function get(path) {
  const r = await fetch(SUPABASE_URL + path, { headers: H });
  if (!r.ok) throw new Error(path + " → " + r.status + " " + await r.text());
  return r.json();
}

const toDisplay = g => (2 + (Math.max(100, Math.min(2500, g)) - 100) / 2400 * 6).toFixed(3);
const fmtD = g => {
  const d = g / 2400 * 6;
  return (d >= 0 ? "+" : "") + d.toFixed(3);
};

async function main() {
  if (SERVICE_KEY === "PASTE_SERVICE_KEY_HERE") {
    console.error("❌ Paste your service_role key first");
    process.exit(1);
  }

  // 1. Fetch all profiles
  const profiles = await get("/rest/v1/profiles?limit=500");
  const byId = {};
  profiles.forEach(p => { byId[p.id] = p; });

  const targets = profiles.filter(p =>
    AUDIT_NAMES.some(n => (p.full_name||"").toLowerCase().includes(n.toLowerCase()))
  );

  if (targets.length === 0) {
    console.error("No matching players found. Check AUDIT_NAMES.");
    process.exit(1);
  }

  // 2. Fetch all confirmed matches
  const matches = await get(
    "/rest/v1/matches?select=id,player_a_id,partner_a_id,player_b_id,partner_b_id," +
    "winner_side,sets,played_at,status,rating_change_a,rating_change_b," +
    "rating_change_parta,rating_change_partb" +
    "&status=in.(confirmed,auto_confirmed,admin_override)" +
    "&order=played_at.asc&limit=2000"
  );

  console.log("\n═══════════════════════════════════════════════════════════════════");
  console.log("  SMAASH RATING AUDIT — " + new Date().toLocaleDateString());
  console.log("═══════════════════════════════════════════════════════════════════\n");

  for (const target of targets) {
    const tid = target.id;
    const liveRating = target.doubles_rating || 533;
    const liveDisplay = toDisplay(liveRating);

    // Find all matches involving this player
    const myMatches = matches.filter(m =>
      m.player_a_id === tid || m.partner_a_id === tid ||
      m.player_b_id === tid || m.partner_b_id === tid
    );

    console.log("─────────────────────────────────────────────────────────────────");
    console.log("  " + (target.full_name || target.id));
    console.log("  Live DB rating: " + liveDisplay + " (Glicko: " + liveRating + ")");
    console.log("  Matches found: " + myMatches.length);
    console.log("─────────────────────────────────────────────────────────────────");

    if (myMatches.length === 0) {
      console.log("  No confirmed matches.\n");
      continue;
    }

    // Table header
    console.log(
      "  " +
      "Date".padEnd(12) +
      "Partner".padEnd(12) +
      "Opponents".padEnd(24) +
      "Score".padEnd(8) +
      "W/L".padEnd(5) +
      "StoredΔ".padEnd(10) +
      "Display"
    );
    console.log("  " + "─".repeat(85));

    let cumulative = 533; // start from default
    let issues = 0;

    for (const m of myMatches) {
      const isA  = m.player_a_id  === tid;
      const isPa = m.partner_a_id === tid;
      const isB  = m.player_b_id  === tid;
      const isPb = m.partner_b_id === tid;

      const onSideA = isA || isPa;
      const sideWon = onSideA
        ? (m.winner_side === "A")
        : (m.winner_side === "B");

      // Get stored delta for this player
      let storedDelta = 0;
      if (isA)  storedDelta = m.rating_change_a  || 0;
      if (isPa) storedDelta = m.rating_change_parta || m.rating_change_a || 0;
      if (isB)  storedDelta = m.rating_change_b  || 0;
      if (isPb) storedDelta = m.rating_change_partb || m.rating_change_b || 0;

      // Partner name
      let partnerId = null;
      if (isA)  partnerId = m.partner_a_id;
      if (isPa) partnerId = m.player_a_id;
      if (isB)  partnerId = m.partner_b_id;
      if (isPb) partnerId = m.player_b_id;
      const partner = partnerId ? (byId[partnerId]?.full_name||"?").split(" ")[0] : "—";

      // Opponent names
      const opp1Id = onSideA ? m.player_b_id  : m.player_a_id;
      const opp2Id = onSideA ? m.partner_b_id : m.partner_a_id;
      const opp1 = opp1Id ? (byId[opp1Id]?.full_name||"?").split(" ")[0] : "?";
      const opp2 = opp2Id ? (byId[opp2Id]?.full_name||"?").split(" ")[0] : "?";
      const opps = (opp1 + "/" + opp2).slice(0, 22);

      // Score from sets
      let sets = [];
      try { sets = Array.isArray(m.sets) ? m.sets : JSON.parse(m.sets || "[]"); } catch(e) {}
      const scoreStr = sets.map(s => onSideA ? s.a+"-"+s.b : s.b+"-"+s.a).join(" ").slice(0,7) || "?";

      const wl = sideWon ? "WIN" : "LOSS";

      // Sanity check: winner should have positive delta, loser negative
      let flag = "";
      if (storedDelta !== 0) {
        if (sideWon && storedDelta < 0) { flag = " ⚠️ WON but NEGATIVE"; issues++; }
        if (!sideWon && storedDelta > 0) { flag = " ⚠️ LOST but POSITIVE"; issues++; }
      } else {
        flag = " (no delta stored)";
      }

      cumulative += storedDelta;
      const dispDelta = storedDelta !== 0 ? fmtD(storedDelta) : "—";
      const date = (m.played_at||"").split("T")[0].slice(5); // MM-DD

      console.log(
        "  " +
        date.padEnd(12) +
        partner.padEnd(12) +
        opps.padEnd(24) +
        scoreStr.padEnd(8) +
        wl.padEnd(5) +
        dispDelta.padEnd(10) +
        flag
      );
    }

    console.log("  " + "─".repeat(85));
    const cumulativeDisplay = toDisplay(cumulative);
    const match = Math.abs(cumulative - liveRating) <= 2; // allow ±2 Glicko rounding
    console.log(
      "  Cumulative (from 533): " + cumulativeDisplay +
      " (Glicko: " + cumulative + ")"
    );
    console.log(
      "  Live DB:               " + liveDisplay +
      " (Glicko: " + liveRating + ")"
    );
    console.log(
      "  Match: " + (match ? "✅ Within tolerance" : "❌ MISMATCH by " + (cumulative - liveRating) + " Glicko pts")
    );
    if (issues > 0) console.log("  ⚠️  " + issues + " sign error(s) detected");
    console.log();
  }

  console.log("═══════════════════════════════════════════════════════════════════\n");
}

main().catch(e => { console.error("Fatal:", e.message); process.exit(1); });
