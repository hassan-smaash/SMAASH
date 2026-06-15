const G2_SCALE = 173.7178;
const G2_DEFAULT_RD = 350;
const G2_TAU = 0.5;
const G2_TOL = 1e-6;
function toMu(r) {
  return (r - 1500) / G2_SCALE;
}
function fromMu(mu) {
  return Math.round(mu * G2_SCALE + 1500);
}
function toPhi(rd) {
  return rd / G2_SCALE;
}
function fromPhi(p) {
  return Math.round(p * G2_SCALE);
}
function gPhi(phi) {
  return 1 / Math.sqrt(1 + 3 * phi * phi / (Math.PI * Math.PI));
}
function Eexp(mu, muj, phij) {
  return 1 / (1 + Math.exp(-gPhi(phij) * (mu - muj)));
}
function glicko2Update(r, rd, sigma, games) {
  const mu = toMu(r), phi = toPhi(rd);
  if (!games || games.length === 0) {
    const ps2 = Math.sqrt(phi * phi + sigma * sigma);
    return { newRating: r, newRD: Math.min(fromPhi(ps2), G2_DEFAULT_RD), newVolatility: sigma, ratingChange: 0, rdChange: fromPhi(ps2) - rd, expectedScores: [] };
  }
  let v_inv = 0, dsum = 0;
  const expectedScores = [];
  for (const gm of games) {
    const muj = toMu(gm.oppRating), phij = toPhi(gm.oppRD), g_ = gPhi(phij), E_ = Eexp(mu, muj, phij);
    expectedScores.push(Math.round(E_ * 100) / 100);
    v_inv += g_ * g_ * E_ * (1 - E_);
    dsum += g_ * (gm.score - E_);
  }
  const v = 1 / v_inv, delta = v * dsum, a = Math.log(sigma * sigma), d2 = delta * delta, p2 = phi * phi;
  let A = a, B = d2 > p2 + v ? Math.log(d2 - p2 - v) : a - G2_TAU, k = 1;
  const f = (x) => {
    const ex = Math.exp(x), d = p2 + v + ex;
    return ex * (d2 - d) / (2 * d * d) - (x - a) / (G2_TAU * G2_TAU);
  };
  while (f(a - k * G2_TAU) < 0) k++;
  if (d2 <= p2 + v) B = a - k * G2_TAU;
  let fA = f(A), fB = f(B), iter = 0;
  while (Math.abs(B - A) > G2_TOL && iter < 100) {
    const C = A + (A - B) * fA / (fB - fA), fC = f(C);
    if (fC * fB <= 0) {
      A = B;
      fA = fB;
    } else {
      fA /= 2;
    }
    B = C;
    fB = fC;
    iter++;
  }
  const ns = Math.exp(A / 2), ps = Math.sqrt(phi * phi + ns * ns), np = 1 / Math.sqrt(1 / (ps * ps) + 1 / v), nm = mu + np * np * dsum;
  const nr = fromMu(nm), nrd = Math.min(fromPhi(np), G2_DEFAULT_RD);
  return { newRating: nr, newRD: nrd, newVolatility: Math.round(ns * 1e4) / 1e4, ratingChange: nr - r, rdChange: nrd - rd, expectedScores };
}
// glicko2DoublesUpdate — kept for demo calculator screen only.
// Live rating writes go through the SQL trigger; this is used for
// the in-app Glicko-2 calculator UI preview only.
function glicko2DoublesUpdate(player, partner, opp1, opp2, playerWon, sets) {
  const oppAvg   = (opp1.doublesRating + opp2.doublesRating) / 2;
  const oppAvgRD = Math.sqrt((opp1.doublesRD ** 2 + opp2.doublesRD ** 2) / 2);
  const isInterClub = !!(player.clubId && opp1.clubId && player.clubId !== opp1.clubId);
  const movMult = movMultiplier(sets);
  const tier = 1;
  const { delta: playerDelta }  = calculateRatingImpact(player.doublesRating,  player.doublesRD,  partner.doublesRating, oppAvg, oppAvgRD, playerWon, tier, movMult, isInterClub);
  const { delta: partnerDelta } = calculateRatingImpact(partner.doublesRating, partner.doublesRD, player.doublesRating,  oppAvg, oppAvgRD, playerWon, tier, movMult, isInterClub);
  return {
    playerResult:  { newRating: player.doublesRating  + playerDelta,  ratingChange: playerDelta,  newRD: Math.max(50, player.doublesRD  * 0.95) },
    partnerResult: { newRating: partner.doublesRating + partnerDelta, ratingChange: partnerDelta, newRD: Math.max(50, partner.doublesRD * 0.95) },
    oppAvgRating: Math.round(oppAvg)
  };
}
function glicko2DoublesUpdateOpponents(opp1, opp2, player, partner, opp1Won, sets) {
  return glicko2DoublesUpdate(opp1, opp2, player, partner, opp1Won, sets);
}
function checkAntifraud({ tier, oppAccuracy, isProvisional, weeklyTier1Gains = 0 }) {
  const CAP = 200;
  let affectsVerified = tier >= 2, cappedGain = null;
  const rules = [];
  if (tier === 1) {
    affectsVerified = false;
    rules.push({ rule: "Tier 1 match", status: "info", msg: "Affects Provisional rating only \u2014 not Verified." });
  }
  if (oppAccuracy < 10 && tier >= 2) {
    affectsVerified = false;
    rules.push({ rule: "Low opponent accuracy", status: "warn", msg: `Opponent accuracy ${oppAccuracy}% < 10%. No Verified rating awarded.` });
  }
  if (tier === 1) {
    if (weeklyTier1Gains >= CAP) {
      cappedGain = 0;
      rules.push({ rule: "Weekly Tier 1 cap reached", status: "block", msg: `${weeklyTier1Gains}/${CAP}pts used this week. No further Tier 1 gains.` });
    } else if (weeklyTier1Gains > 0) {
      cappedGain = CAP - weeklyTier1Gains;
      rules.push({ rule: "Weekly Tier 1 cap partial", status: "warn", msg: `${CAP - weeklyTier1Gains}pts remaining of ${CAP}pt weekly cap.` });
    }
  }
  if (isProvisional) rules.push({ rule: "Provisional account", status: "info", msg: "Need 5 confirmed matches vs 5 different opponents for Verified." });
  return { affectsVerified, cappedGain, rules };
}
function calcAccuracy(uniqueOpps) {
  return Math.min(100, Math.round(uniqueOpps / 50 * 100));
}
// ═══════════════════════════════════════════════════════════════════════════
// SMAASH CANONICAL RATING ENGINE — single source of truth
// ═══════════════════════════════════════════════════════════════════════════
//
// calculateRatingImpact(playerR, playerRD, partnerR, oppAvgR, oppAvgRD, S, isInterClub)
//
// STEP 1 — Partner-weighted effective opponent
//   The stronger partner "shields" the weaker one by pulling the effective
//   opponent slightly toward them. shift = (partnerR - playerR) / 2 * 0.5
//   effOpp = oppAvgR - shift
//
// STEP 2 — g(φ): Glicko-2 RD dampening
//   Opponent uncertainty reduces the weight of the result.
//   g = 1 / sqrt(1 + 3 * (oppAvgRD / 173.7178)² / π²)
//
// STEP 3 — Expected score E (Elo on 100–2500 scale)
//   E = 1 / (1 + 10^(−g × (playerR − effOpp) / 400))
//   A 3.500 player vs 2.900 player → E ≈ 0.87 (87% win probability)
//
// STEP 4 — Actual score S: Margin of Victory [0.10, 0.90]
//   S = clamp(0.5 + (ptsA / ptsTotal − 0.5) × 1.6, 0.10, 0.90)
//   21-19 win → S ≈ 0.57 (barely above 0.5)
//   21-5  win → S ≈ 0.84 (dominant)
//
// STEP 5 — RD-scaled effective K
//   Verified player (RD=70):    rdFactor = 70/200 = 0.35 → K_eff = 11.2
//   Developing player (RD=150): rdFactor = 150/200 = 0.75 → K_eff = 24
//   New player (RD=200):        rdFactor = 1.0 → K_eff = 32
//   rdFactor clamped [0.25, 2.0]. Inter-club: K_base = 38.4 (1.2×)
//
// STEP 6 — Delta = round(K_eff × (S − E))
//
// KEY EXAMPLE — 3.500 beats 2.900, score 21-19:
//   E=0.87, S=0.57 → (S−E)=−0.30
// ═══════════════════════════════════════════════════════════════════════════
// SMAASH CANONICAL RATING ALGORITHM — Frontend + Backend in sync
// Last updated: 2026-04-19
// ═══════════════════════════════════════════════════════════════════════════
//
// GUARANTEES:
//  • Winners ALWAYS gain (≥ +1 Glicko). Losers ALWAYS lose (≤ -1 Glicko).
//  • Stronger team beating weaker team = small movement (expected result).
//  • Upset = large movement for both sides.
//  • New/uncertain players move more. Established players move less.
//  • Mis-assessed newcomers impact verified players minimally.
//
// FORMULA (per player):
//
//  Step 1 — Team averages
//    teamAvgA = (r_playerA + r_partnerA) / 2
//    teamAvgB = (r_playerB + r_partnerB) / 2
//    oppAvgRD = sqrt((rd_opp1² + rd_opp2²) / 2)
//
//  Step 2 — g(φ): Glicko-2 dampening from opponent RD uncertainty
//    g = 1 / sqrt(1 + 3 × (oppAvgRD / 173.7178)² / π²)
//
//  Step 3 — Team-level expected score (base magnitude, same for all 4 players)
//    E_team = 1 / (1 + 10^(−g × (myTeamAvg − oppTeamAvg) / 400))
//    E_team > 0.5 → my team is favoured
//
//  Step 4 — Per-player RD factor (individual scaling)
//    rdFactor = clamp(playerRD / 200, 0.25, 2.0)
//    RD=200 (new):      rdFactor=1.00 → full movement
//    RD=100 (settling): rdFactor=0.50 → half movement
//    RD=50  (verified): rdFactor=0.25 → quarter movement
//
//  Step 5 — Effective K
//    K_tier: T1=12 (rec/club), T2=18 (tournament). T3/T4 TBD.
//    K_eff = K_tier × movMult × rdFactor × (1.2 if inter-club)
//
//  Step 6 — MOV multiplier from point totals
//    winnerPct = max(ptsA, ptsB) / (ptsA + ptsB)
//    movMult = clamp(0.5 + winnerPct, 0.5, 1.5)
//    21-19 → ~0.70  |  21-13 → ~1.12  |  21-5 → ~1.38
//
//  Step 7 — Delta
//    Winner: +max(1, round(K_eff × (1 − E_team)))
//    Loser:  −max(1, round(K_eff × E_team))
//
// EXAMPLE — Hashaam(3.30)/Imran(3.17) beat Syed(3.21)/Mohammed(3.10) 21-13:
//   E_team = 0.545 (slight favourites), movMult = 1.12
//   Imran (RD=75, rdFactor=0.375):    +max(1, round(12×1.12×0.375×0.455)) = +2
//   Hashaam (RD=65, rdFactor=0.325):  +max(1, round(12×1.12×0.325×0.455)) = +2
//   Mohammed (RD=110, rdFactor=0.55): −max(1, round(12×1.12×0.55×0.545)) = −4
//   Syed (RD=90, rdFactor=0.45):      −max(1, round(12×1.12×0.45×0.545)) = −3
// ═══════════════════════════════════════════════════════════════════════════
const SMAASH_K = { 1: 24, 2: 36 };  // T1=club/rec (K=24), T2=tournament (K=36=1.5x). T3/T4 TBD.
const SMAASH_K_INTERCLUB_MULT = 1.25;  // Inter-club bonus: 1.25x
const SMAASH_RD_BASELINE = 200;
const SMAASH_RD_FLOOR = 120;          // Min RD — keeps movements meaningful long-term

function movMultiplier(sets) {
  if (!sets || sets.length === 0) return 1.0;
  let tA = 0, tB = 0;
  sets.forEach(function(s) { tA += Number(s.a)||0; tB += Number(s.b)||0; });
  const total = tA + tB;
  if (total === 0) return 1.0;
  const winPct = Math.max(tA, tB) / total;
  // 21-19 → ~0.70, 21-13 → ~1.12, 21-5 → ~1.38
  return Math.min(1.5, Math.max(0.5, Math.round((0.5 + winPct) * 100) / 100));
}

function calcTeamE(teamAvgR, oppAvgR, oppAvgRD) {
  // Expected win probability for a team based on team-level ratings
  const g = 1 / Math.sqrt(1 + 3 * Math.pow(oppAvgRD / 173.7178, 2) / (Math.PI * Math.PI));
  return 1 / (1 + Math.pow(10, -g * (teamAvgR - oppAvgR) / 400));
}

function calculateRatingImpact(playerR, playerRD, partnerR, oppAvgR, oppAvgRD, playerWon, tier, movMult, isInterClub) {
  // Per-player E: gives differentiation within team
  // Lower-rated winner gains MORE. Lower-rated loser loses LESS.
  const shift  = (partnerR - playerR) / 2 * 0.5;
  const effOpp = oppAvgR - shift;
  const g = 1 / Math.sqrt(1 + 3 * Math.pow(oppAvgRD / 173.7178, 2) / (Math.PI * Math.PI));
  const E = 1 / (1 + Math.pow(10, -g * (playerR - effOpp) / 400));
  // rdFactor capped at 1.0: new players move at full speed but never 2x teammates
  const rdFactor = Math.min(1.0, Math.max(0.25, playerRD / SMAASH_RD_BASELINE));
  const K_base = SMAASH_K[tier] || SMAASH_K[1];
  const K_eff = K_base * movMult * rdFactor * (isInterClub ? SMAASH_K_INTERCLUB_MULT : 1.0);
  const delta = playerWon
    ? Math.max(1, Math.round(K_eff * (1 - E)))
    : Math.min(-1, -Math.round(K_eff * E));
  return { delta, E: Math.round(E * 1000) / 1000, rdFactor: Math.round(rdFactor * 100) / 100 };
}

function isDirectorSubmittedMatch(match) {
  return match && match.submittedByDirector === true;
}
const SMAASH_MIN_GLICKO = 100;
const SMAASH_MAX_GLICKO = 2500;
const SMAASH_GLICKO_START = 533;
const SMAASH_DISPLAY_MIN = 2;
const SMAASH_DISPLAY_MAX = 8;
function toDisplayRating(glickoRating) {
  const clamped = Math.max(SMAASH_MIN_GLICKO, Math.min(SMAASH_MAX_GLICKO, glickoRating));
  const ratio = (clamped - SMAASH_MIN_GLICKO) / (SMAASH_MAX_GLICKO - SMAASH_MIN_GLICKO);
  const display = SMAASH_DISPLAY_MIN + ratio * (SMAASH_DISPLAY_MAX - SMAASH_DISPLAY_MIN);
  return Math.round(display * 1e3) / 1e3;
}
function fmt(glickoRating) {
  const n = toDisplayRating(glickoRating);
  return n.toFixed(3).replace(",", ".");
}
function fmtChange(glickoChange) {
  const displayChange = glickoChange / (SMAASH_MAX_GLICKO - SMAASH_MIN_GLICKO) * (SMAASH_DISPLAY_MAX - SMAASH_DISPLAY_MIN);
  const rounded = Math.round(displayChange * 1e3) / 1e3;
  return (rounded >= 0 ? "+" : "") + rounded.toFixed(3);
}
function calcMatchImpact(match, playerId) {
  var _a, _b, _c, _d;
  if (!match || !playerId) return null;
  const confirmedStatuses = ["confirmed", "admin_override", "auto_confirmed"];
  if (!confirmedStatuses.includes(match.status)) return null;
  const isA  = ((_a = match.playerA)  == null ? void 0 : _a.id)  === playerId;
  const isB  = ((_b = match.playerB)  == null ? void 0 : _b.id)  === playerId;
  const isPa = ((_c = match.partnerA) == null ? void 0 : _c.id) === playerId;
  const isPb = ((_d = match.partnerB) == null ? void 0 : _d.id) === playerId;
  if (!isA && !isB && !isPa && !isPb) return null;

  const playerOnSideA = isA || isPa;

  // If the trigger already stored the delta, read it directly — it's the authoritative value
  const storedKey = playerOnSideA ? "ratingImpactA" : "ratingImpactB";
  if (match[storedKey] !== undefined && match[storedKey] !== null) {
    const delta = match[storedKey];
    const display2 = (delta >= 0 ? "+" : "") + delta.toFixed(3);
    return { delta, display: display2, interClub: match.interClub || false };
  }

  // For unconfirmed / pre-trigger matches: recalculate using canonical algorithm
  const player  = isA ? match.playerA : isB ? match.playerB : isPa ? match.partnerA : match.partnerB;
  const partner = isA ? match.partnerA : isB ? match.partnerB : isPa ? match.playerA : match.playerB;
  const opp1    = playerOnSideA ? match.playerB  : match.playerA;
  const opp2    = playerOnSideA ? match.partnerB : match.partnerA;
  if (!player || !opp1 || !opp2) return null;

  const pR   = player.doublesRating  || player.rating  || SMAASH_GLICKO_START;
  const paR  = partner ? (partner.doublesRating || partner.rating || SMAASH_GLICKO_START) : pR;
  const o1R  = opp1.doublesRating    || opp1.rating    || SMAASH_GLICKO_START;
  const o2R  = opp2.doublesRating    || opp2.rating    || SMAASH_GLICKO_START;
  const o1RD = opp1.doublesRD        || opp1.rd        || 200;
  const o2RD = opp2.doublesRD        || opp2.rd        || 200;

  const oppAvgR  = (o1R + o2R) / 2;
  const oppAvgRD = Math.sqrt((o1RD * o1RD + o2RD * o2RD) / 2);

  const isInterClub = !!(player.clubId && opp1.clubId && player.clubId !== opp1.clubId);
  const pRD = player.doublesRD || player.rd || 200;
  const sWA = match.sets.filter(function(s){return s.a > s.b;}).length;
  const sWB = match.sets.filter(function(s){return s.b > s.a;}).length;
  const playerWon = playerOnSideA ? sWA > sWB : sWB > sWA;
  const movMult = movMultiplier(match.sets);
  // Always compute E from side A perspective so all 4 players share the same base magnitude
  // Side A players use (1 - E_teamA) as winner base or E_teamA as loser base
  // Side B players use E_teamA as winner base or (1 - E_teamA) as loser base
  const pA  = isA ? match.playerA  : match.partnerA;
  const pPA = isA ? match.partnerA : match.playerA;
  const rA  = (pA  ? (pA.doublesRating  || pA.rating  || SMAASH_GLICKO_START) : SMAASH_GLICKO_START);
  const rPA = (pPA ? (pPA.doublesRating || pPA.rating || SMAASH_GLICKO_START) : SMAASH_GLICKO_START);
  const pB  = isB ? match.playerB  : match.partnerB;
  const pPB = isB ? match.partnerB : match.playerB;
  const rB  = (pB  ? (pB.doublesRating  || pB.rating  || SMAASH_GLICKO_START) : SMAASH_GLICKO_START);
  const rPB = (pPB ? (pPB.doublesRating || pPB.rating || SMAASH_GLICKO_START) : SMAASH_GLICKO_START);
  const teamAvgA = (rA + rPA) / 2;
  const teamAvgB = (rB + rPB) / 2;
  const oppAvgRD_a = Math.sqrt(((match.playerB  ? (match.playerB.doublesRD  || 200) : 200)**2 + (match.partnerB ? (match.partnerB.doublesRD || 200) : 200)**2) / 2);
  const tier = match.tier || 1;
  const { delta: glickoDelta } = calculateRatingImpact(pR, pRD, paR, oppAvgR, oppAvgRD, playerWon, tier, movMult, isInterClub);

  const displayBefore = toDisplayRating(pR);
  const displayAfter  = toDisplayRating(pR + glickoDelta);
  const displayDelta  = Math.round((displayAfter - displayBefore) * 1e3) / 1e3;
  const display = (displayDelta >= 0 ? "+" : "") + displayDelta.toFixed(3);
  return { delta: displayDelta, display, interClub: isInterClub };
}
function RatingImpactBadge({ match, playerId, size = "sm" }) {
  const impact = calcMatchImpact(match, playerId);
  if (!impact) return null;
  const pos = impact.delta > 0;
  const zero = impact.delta === 0;
  const color = impact.blocked ? "var(--text-faint)" : pos ? "var(--success)" : "var(--danger)";
  const bg = impact.blocked ? "color-mix(in srgb, var(--text-faint) 13%, transparent)" : pos ? "color-mix(in srgb, var(--success) 9%, transparent)" : "color-mix(in srgb, var(--danger) 9%, transparent)";
  const label = impact.blocked ? "No Verified pts" : impact.display;
  if (size === "lg") {
    return /* @__PURE__ */ React.createElement("div", { style: { background: bg, border: `1px solid ${color}33`, borderRadius: 8, padding: "8px 12px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 900, color, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 1 } }, impact.blocked ? "\u2014" : impact.display), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", letterSpacing: 1.5, marginTop: 2 } }, "RATING IMPACT"), impact.interClub && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--warn)", fontWeight: 700, marginTop: 3 } }, "1.2x inter-club bonus"));
  }
  return /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: 800, color, background: bg, padding: "2px 7px", borderRadius: 5, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 0.5, flexShrink: 0, whiteSpace: "nowrap" } }, label);
}
function tierFromDisplayRating(displayRating) {
  if (displayRating >= 7) return 5;
  if (displayRating >= 6) return 4;
  if (displayRating >= 5) return 3;
  if (displayRating >= 3.5) return 2;
  return 1;
}
const css = `
  @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  @keyframes pop{0%{transform:scale(0.4);opacity:0}80%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
  @keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:none;opacity:1}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
  *{box-sizing:border-box} ::placeholder{color:var(--border-strong)}
  ::-webkit-scrollbar{display:none}
  input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}
  input[type=date]{color-scheme:dark}
  html[style*="--bg:#f5f6f8"] input[type=date]{color-scheme:light}
`;
