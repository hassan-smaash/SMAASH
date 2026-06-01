/**
 * SMAASH Rating Recalculation Script v2
 * HOW TO RUN:  node recalculate_ratings.js
 */

const SUPABASE_URL = "https://yqqezxyayndzmqahguac.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxcWV6eHlheW5kem1xYWhndWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NTk3OTEsImV4cCI6MjA5MDMzNTc5MX0.kOZUQr1dG_EInbBWrnJsiV062WTz4XAL5KI70Zzr7I8";

const DEFAULT_RATING     = 533;
const DEFAULT_RD         = 200;
const DEFAULT_VOLATILITY = 0.06;

// ── Glicko-2 math ──────────────────────────────────────────────────────────
const G2_SCALE = 173.7178, G2_DEFAULT_RD = 350, G2_TAU = 0.5, G2_TOL = 1e-6;
const toMu   = r  => (r - 1500) / G2_SCALE;
const fromMu = mu => Math.round(mu * G2_SCALE + 1500);
const toPhi  = rd => rd / G2_SCALE;
const fromPhi = p => Math.round(p * G2_SCALE);
const gPhi   = phi => 1 / Math.sqrt(1 + 3 * phi * phi / (Math.PI * Math.PI));
const Eexp   = (mu, muj, phij) => 1 / (1 + Math.exp(-gPhi(phij) * (mu - muj)));

function glicko2Update(r, rd, sigma, games) {
  const mu = toMu(r), phi = toPhi(rd);
  if (!games || !games.length) {
    const ps2 = Math.sqrt(phi*phi + sigma*sigma);
    return { newRating: r, newRD: Math.min(fromPhi(ps2), G2_DEFAULT_RD), newVolatility: sigma };
  }
  let v_inv = 0, dsum = 0;
  for (const gm of games) {
    const muj = toMu(gm.oppRating), phij = toPhi(gm.oppRD);
    const g_ = gPhi(phij), E_ = Eexp(mu, muj, phij);
    v_inv += g_*g_*E_*(1-E_);
    dsum  += g_*(gm.score - E_);
  }
  const v = 1/v_inv, delta = v*dsum, a = Math.log(sigma*sigma);
  const d2 = delta*delta, p2 = phi*phi;
  let A = a, B = d2 > p2+v ? Math.log(d2-p2-v) : a-G2_TAU, k = 1;
  const f = x => { const ex = Math.exp(x), d = p2+v+ex; return ex*(d2-d)/(2*d*d)-(x-a)/(G2_TAU*G2_TAU); };
  while (f(a - k*G2_TAU) < 0) k++;
  if (d2 <= p2+v) B = a - k*G2_TAU;
  let fA = f(A), fB = f(B), iter = 0;
  while (Math.abs(B-A) > G2_TOL && iter < 100) {
    const C = A+(A-B)*fA/(fB-fA), fC = f(C);
    if (fC*fB <= 0) { A = B; fA = fB; } else { fA /= 2; }
    B = C; fB = fC; iter++;
  }
  const ns = Math.exp(A/2), ps = Math.sqrt(phi*phi+ns*ns);
  const np = 1/Math.sqrt(1/(ps*ps)+1/v), nm = mu+np*np*dsum;
  return { newRating: fromMu(nm), newRD: Math.min(fromPhi(np), G2_DEFAULT_RD), newVolatility: Math.round(ns*1e4)/1e4 };
}

function scoreFromMargin(sets, playerOnSideA) {
  if (!sets || !sets.length) return playerOnSideA ? 0.65 : 0.35;
  let tA = 0, tB = 0;
  sets.forEach(s => { tA += Number(s.a)||0; tB += Number(s.b)||0; });
  const total = tA + tB;
  if (total === 0) return playerOnSideA ? 0.65 : 0.35;
  const score = 0.5 + (tA/total - 0.5) * 1.6;
  return Math.min(0.90, Math.max(0.10, Math.round(score*1000)/1000));
}

function doublesUpdate(player, partner, opp1, opp2, playerWon, sets) {
  const oppAvg   = (opp1.doublesRating + opp2.doublesRating) / 2;
  const oppAvgRD = Math.sqrt((opp1.doublesRD**2 + opp2.doublesRD**2) / 2);
  const gap = partner.doublesRating - player.doublesRating;
  const shift = (gap / 2) * 0.5;
  const movScore = playerWon ? scoreFromMargin(sets, true) : 1 - scoreFromMargin(sets, true);
  return {
    playerResult:  glicko2Update(player.doublesRating,  player.doublesRD,  player.doublesVolatility,  [{ oppRating: oppAvg-shift, oppRD: oppAvgRD, score: movScore }]),
    partnerResult: glicko2Update(partner.doublesRating, partner.doublesRD, partner.doublesVolatility, [{ oppRating: oppAvg+shift, oppRD: oppAvgRD, score: movScore }]),
  };
}

const toDisplay = g => (2 + (Math.max(100, Math.min(2500, g)) - 100) / 2400 * 6).toFixed(3);

const HEADERS = { "apikey": SUPABASE_KEY, "Authorization": "Bearer " + SUPABASE_KEY, "Content-Type": "application/json" };

async function fetchAll(path) {
  const res = await fetch(SUPABASE_URL + path, { headers: HEADERS });
  if (!res.ok) throw new Error(`Fetch failed ${res.status}: ${await res.text()}`);
  return res.json();
}

async function patchRow(id, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${id}`, {
    method: "PATCH", headers: { ...HEADERS, "Prefer": "return=minimal" }, body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`PATCH failed ${res.status}: ${await res.text()}`);
}

async function main() {
  console.log("\n═══════════════════════════════════════════");
  console.log("  SMAASH Rating Recalculation v2");
  console.log("═══════════════════════════════════════════\n");

  // 1. Fetch profiles
  console.log("📥 Fetching profiles...");
  const rawProfiles = await fetchAll("/rest/v1/profiles?select=id,full_name,doubles_rating,doubles_rd,doubles_volatility,placement_completed&limit=500");
  console.log(`   Found ${rawProfiles.length} players`);

  const state = {};
  for (const p of rawProfiles) {
    const startRating = (p.placement_completed && p.doubles_rating && p.doubles_rating !== 533)
      ? p.doubles_rating : DEFAULT_RATING;
    state[p.id] = {
      id: p.id, name: p.full_name || p.id.slice(0,8),
      doublesRating: startRating, doublesRD: DEFAULT_RD, doublesVolatility: DEFAULT_VOLATILITY,
      originalRating: p.doubles_rating || DEFAULT_RATING,
    };
  }

  // 2. Fetch all matches (no filter — inspect everything)
  console.log("📥 Fetching all matches...");
  const allMatches = await fetchAll("/rest/v1/matches?select=id,player_a_id,partner_a_id,player_b_id,partner_b_id,winner_side,sets,played_at,match_type,status&order=played_at.asc&limit=2000");
  console.log(`   Total matches in DB: ${allMatches.length}`);

  // Show status breakdown
  const statusCount = {};
  const typeCount = {};
  allMatches.forEach(m => {
    statusCount[m.status] = (statusCount[m.status]||0) + 1;
    typeCount[m.match_type||"null"] = (typeCount[m.match_type||"null"]||0) + 1;
  });
  console.log("   Status breakdown:", JSON.stringify(statusCount));
  console.log("   Type breakdown:  ", JSON.stringify(typeCount));

  if (allMatches.length > 0) {
    const s = allMatches[0];
    console.log("\n🔍 First match sample:");
    console.log(`   id: ${s.id}`);
    console.log(`   status: ${s.status}`);
    console.log(`   match_type: ${s.match_type}`);
    console.log(`   player_a_id:  ${s.player_a_id}`);
    console.log(`   partner_a_id: ${s.partner_a_id}`);
    console.log(`   player_b_id:  ${s.player_b_id}`);
    console.log(`   partner_b_id: ${s.partner_b_id}`);
    console.log(`   winner_side: ${s.winner_side}`);
    console.log(`   sets: ${JSON.stringify(s.sets)}`);
    console.log(`   Player in state? ${!!state[s.player_a_id]}`);
  }

  // Filter: confirmed doubles
  const CONFIRMED = ["confirmed", "auto_confirmed", "admin_override"];
  const matches = allMatches.filter(m =>
    CONFIRMED.includes(m.status) && m.partner_a_id && m.partner_b_id
  );
  console.log(`\n   Confirmed doubles matches to replay: ${matches.length}\n`);

  if (matches.length === 0) {
    console.log("⚠️  Nothing to replay. Check the status/type breakdown above.");
    console.log("    If all your matches show a different status, let the developer know.\n");
    return;
  }

  // 3. Replay
  console.log("⚙️  Replaying...\n");
  let replayed = 0, skipped = 0;

  for (const m of allMatches) {
    if (!CONFIRMED.includes(m.status)) continue;
    const { player_a_id, partner_a_id, player_b_id, partner_b_id, winner_side } = m;
    // Auto-create state for anyone missing from profiles
    for (const pid of [player_a_id, partner_a_id, player_b_id, partner_b_id]) {
      if (pid && !state[pid]) {
        state[pid] = { id: pid, name: pid.slice(0,8), doublesRating: DEFAULT_RATING, doublesRD: DEFAULT_RD, doublesVolatility: DEFAULT_VOLATILITY, originalRating: DEFAULT_RATING, autoCreated: true };
      }
    }
    if (!player_a_id || !player_b_id || !partner_a_id || !partner_b_id) { skipped++; continue; }
    let sets = [];
    try { sets = Array.isArray(m.sets) ? m.sets : JSON.parse(m.sets || "[]"); } catch(e) { sets = []; }
    const aWon = (winner_side||"").toUpperCase() === "A";
    const resA = doublesUpdate(state[player_a_id], state[partner_a_id], state[player_b_id], state[partner_b_id], aWon, sets);
    const resB = doublesUpdate(state[player_b_id], state[partner_b_id], state[player_a_id], state[partner_a_id], !aWon, sets);
    state[player_a_id].doublesRating    = resA.playerResult.newRating;
    state[player_a_id].doublesRD        = resA.playerResult.newRD;
    state[player_a_id].doublesVolatility = resA.playerResult.newVolatility;
    state[partner_a_id].doublesRating    = resA.partnerResult.newRating;
    state[partner_a_id].doublesRD        = resA.partnerResult.newRD;
    state[partner_a_id].doublesVolatility = resA.partnerResult.newVolatility;
    state[player_b_id].doublesRating    = resB.playerResult.newRating;
    state[player_b_id].doublesRD        = resB.playerResult.newRD;
    state[player_b_id].doublesVolatility = resB.playerResult.newVolatility;
    state[partner_b_id].doublesRating    = resB.partnerResult.newRating;
    state[partner_b_id].doublesRD        = resB.partnerResult.newRD;
    state[partner_b_id].doublesVolatility = resB.partnerResult.newVolatility;
    replayed++;
  }

  console.log(`   ✅ Replayed: ${replayed}  |  ⚠️  Skipped: ${skipped}\n`);

  // 4. Print summary (only players in rawProfiles)
  const players = rawProfiles.map(p => state[p.id]).filter(Boolean);
  players.sort((a,b) => b.doublesRating - a.doublesRating);

  console.log("─────────────────────────────────────────────────────");
  console.log("  Player                  Before     After      Change");
  console.log("─────────────────────────────────────────────────────");
  for (const p of players) {
    const before = toDisplay(p.originalRating);
    const after  = toDisplay(p.doublesRating);
    const change = (parseFloat(after) - parseFloat(before)).toFixed(3);
    console.log(`  ${p.name.slice(0,23).padEnd(24)}${before.padEnd(11)}${after.padEnd(11)}${(change>=0?"+":"")+change}`);
  }
  console.log("─────────────────────────────────────────────────────\n");

  // 5. Confirm
  const readline = require("readline");
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question(`Write corrected ratings for ${players.length} players to Supabase? Type YES to confirm: `, async answer => {
    rl.close();
    if (answer.trim().toUpperCase() !== "YES") { console.log("\n❌ Cancelled. No data changed.\n"); return; }
    console.log("\n✍️  Writing...\n");
    let written = 0, errors = 0;
    for (const p of players) {
      try {
        await patchRow(p.id, { doubles_rating: p.doublesRating, doubles_rd: p.doublesRD, doubles_volatility: p.doublesVolatility });
        written++;
        console.log(`   ✅ ${p.name}`);
      } catch(e) {
        errors++;
        console.log(`   ❌ ${p.name}: ${e.message}`);
      }
    }
    console.log(`\n✅ Done. Written: ${written}  Errors: ${errors}`);
    console.log("   Reload the SMAASH app to see corrected rankings.\n");
  });
}

main().catch(e => { console.error("\n❌ Fatal:", e.message); process.exit(1); });
