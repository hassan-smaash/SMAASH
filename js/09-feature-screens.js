function EventsScreen() {
  const ME = DEFAULT_USER;
  const [filterType, setFilterType] = useState("all");
  const [filterTier, setFilterTier] = useState("all");
  const [selected, setSelected] = useState(null);
  const [registered, setRegistered] = useState({});
  const [toast, setToast] = useState(null);
  const showToast = (msg, c = "var(--success)") => {
    setToast({ msg, c });
    setTimeout(() => setToast(null), 2200);
  };
  ;
  const filtered = MOCK_EVENTS.filter(
    (e) => (filterType === "all" || e.type === filterType) && (filterTier === "all" || e.tier === Number(filterTier))
  );
  const canRegister = (e) => {
    const myRating = toDisplayRating(ME.rating);
    if (e.minRating && myRating < e.minRating) return { ok: false, reason: `Minimum rating ${e.minRating}` };
    if (e.maxRating && myRating > e.maxRating) return { ok: false, reason: `Maximum rating ${e.maxRating}` };
    if (e.registered >= e.maxPlayers) return { ok: false, reason: "Full" };
    if (e.status === "coming_soon") return { ok: false, reason: "Coming soon" };
    return { ok: true, reason: null };
  };
  if (selected) {
    const e = selected;
    const t = TIERS.find((x) => x.id === e.tier);
    const tc = (t == null ? void 0 : t.color) || "var(--primary)";
    const reg = canRegister(e);
    const isReg = registered[e.id];
    const spotsLeft = e.maxPlayers - e.registered;
    return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setSelected(null), style: { background: "none", border: "none", color: "var(--text-dim)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 16, padding: 0 } }, "\u2190 Back to Events"), /* @__PURE__ */ React.createElement("div", { style: { background: `linear-gradient(135deg,${tc}14,var(--surface))`, border: `1px solid ${tc}33`, borderRadius: 16, overflow: "hidden", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { background: tc + "14", borderBottom: "1px solid " + tc + "22", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement(TierBadge, { tier: e.tier }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "var(--text-dim)", fontWeight: 700, textTransform: "uppercase" } }, e.type === "tournament" ? "🏆 Tournament" : "📋 Ladder Night"), e.interClub && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, background: "color-mix(in srgb, var(--warn) 13%, transparent)", color: "var(--warn)", padding: "1px 6px", borderRadius: 4, fontWeight: 700 } }, "🌐 INTER-CLUB")), /* @__PURE__ */ React.createElement(StatusPill, { status: e.status === "open" ? "confirmed" : e.status === "coming_soon" ? "pending" : "pending" })), /* @__PURE__ */ React.createElement("div", { style: { padding: "16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 22, letterSpacing: 2, color: "var(--text)", marginBottom: 4 } }, e.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text-dim)", marginBottom: 14, lineHeight: 1.7 } }, e.description), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 } }, [
      { l: "Date", v: e.date },
      { l: "Location", v: e.location },
      { l: "Format", v: e.format.charAt(0).toUpperCase() + e.format.slice(1) },
      { l: "Host", v: e.clubName },
      { l: "Entry Fee", v: e.entryFee === 0 ? "Free" : `$${e.entryFee} CAD` },
      { l: "Spots Left", v: `${spotsLeft} / ${e.maxPlayers}` }
    ].map((r, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: "var(--sunken)", borderRadius: 8, padding: "8px 10px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", letterSpacing: 1, marginBottom: 2 } }, r.l.toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--text-muted)" } }, r.v)))), (e.minRating || e.maxRating) && /* @__PURE__ */ React.createElement("div", { style: { background: "var(--border)", borderRadius: 9, padding: "10px 12px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)", letterSpacing: 1, marginBottom: 4 } }, "RATING REQUIREMENT"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)" } }, e.minRating && `Min: ${e.minRating}`, e.minRating && e.maxRating ? " \xB7 " : "", e.maxRating && `Max: ${e.maxRating}`, /* @__PURE__ */ React.createElement("span", { style: { marginLeft: 8, fontSize: 10, color: reg.ok ? "var(--success)" : "var(--danger)", fontWeight: 700 } }, reg.ok ? "\u2713 You qualify" : "\u2715 " + reg.reason))), /* @__PURE__ */ React.createElement("div", { style: { background: tc + "0a", border: "1px solid " + tc + "22", borderRadius: 10, padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-dim)", letterSpacing: 1 } }, "REGISTRATIONS"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 800, color: tc } }, e.registered, " / ", e.maxPlayers)), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--border)", borderRadius: 3, height: 5, overflow: "hidden", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { width: `${e.registered / e.maxPlayers * 100}%`, height: "100%", background: tc, borderRadius: 3 } })), isReg ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "10px 0" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--success)" } }, "\u2713 You're registered!"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)", marginTop: 3 } }, "See you on the court")) : /* @__PURE__ */ React.createElement("button", { disabled: !reg.ok, onClick: () => {
      setRegistered((r) => __spreadProps(__spreadValues({}, r), { [e.id]: true }));
      showToast(`Registered for ${e.name}!`);
    }, style: { width: "100%", background: reg.ok ? `linear-gradient(135deg,${tc},${tc}cc)` : "var(--border)", color: reg.ok ? "var(--bg)" : "var(--border-strong)", border: "none", borderRadius: 9, padding: "12px 0", fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", cursor: reg.ok ? "pointer" : "not-allowed", fontFamily: "inherit", boxShadow: reg.ok ? `0 0 16px ${tc}44` : "none" } }, reg.ok ? e.entryFee > 0 ? `Register \u2014 $${e.entryFee} CAD` : "Register Free" : reg.reason)))));
  }
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, toast && /* @__PURE__ */ React.createElement(Toast, { msg: toast.msg, color: toast.c }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 26, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "EVENTS"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 } }, "Tournaments \xB7 Ladder Nights \xB7 Leagues"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" } }, [{ v: "all", l: "All" }, { v: "tournament", l: "🏆 Tournaments" }, { v: "ladder", l: "📋 Ladders" }].map((f) => /* @__PURE__ */ React.createElement("button", { key: f.v, onClick: () => setFilterType(f.v), style: { background: filterType === f.v ? "color-mix(in srgb, var(--primary) 13%, transparent)" : "var(--surface)", border: `1px solid ${filterType === f.v ? "color-mix(in srgb, var(--primary) 27%, transparent)" : "var(--border)"}`, borderRadius: 7, padding: "6px 12px", fontSize: 10, fontWeight: 700, color: filterType === f.v ? "var(--primary)" : "var(--text-faint)", cursor: "pointer", fontFamily: "inherit" } }, f.l)), TIERS.slice(0, 4).map((t) => /* @__PURE__ */ React.createElement("button", { key: t.id, onClick: () => setFilterTier(filterTier === String(t.id) ? "all" : String(t.id)), style: { background: filterTier === String(t.id) ? t.color + "22" : "var(--surface)", border: `1px solid ${filterTier === String(t.id) ? t.color + "44" : "var(--border)"}`, borderRadius: 7, padding: "6px 12px", fontSize: 10, fontWeight: 700, color: filterTier === String(t.id) ? t.color : "var(--text-faint)", cursor: "pointer", fontFamily: "inherit" } }, t.badge))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, filtered.map((e) => {
    const t = TIERS.find((x) => x.id === e.tier);
    const tc = (t == null ? void 0 : t.color) || "var(--primary)";
    const reg = canRegister(e);
    const isReg = registered[e.id];
    const pct = Math.round(e.registered / e.maxPlayers * 100);
    return /* @__PURE__ */ React.createElement("div", { key: e.id, onClick: () => setSelected(e), style: { background: "var(--surface)", borderRadius: 13, overflow: "hidden", border: `1px solid ${isReg ? "color-mix(in srgb, var(--success) 20%, transparent)" : "var(--border)"}`, cursor: "pointer", transition: "border-color 0.2s" }, onMouseOver: (ev) => ev.currentTarget.style.borderColor = "var(--border-strong)", onMouseOut: (ev) => ev.currentTarget.style.borderColor = isReg ? "color-mix(in srgb, var(--success) 20%, transparent)" : "var(--border)" }, /* @__PURE__ */ React.createElement("div", { style: { height: 2, background: `linear-gradient(90deg,${tc},transparent)` } }), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(TierBadge, { tier: e.tier }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-faint)" } }, e.type === "tournament" ? "🏆" : "📋", " ", e.date), !e.clubId && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, background: "color-mix(in srgb, var(--warn) 13%, transparent)", color: "var(--warn)", padding: "1px 6px", borderRadius: 4, fontWeight: 700 } }, "🌐 INTER-CLUB"), isReg && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, background: "color-mix(in srgb, var(--success) 13%, transparent)", color: "var(--success)", padding: "1px 6px", borderRadius: 4, fontWeight: 700 } }, "\u2713 REGISTERED")), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-faint)", flexShrink: 0 } }, e.entryFee === 0 ? "Free" : `$${e.entryFee}`)), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: "var(--text)", fontSize: 14, marginBottom: 2 } }, e.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", marginBottom: 8 } }, "📍 ", e.location, " \xB7 ", e.clubName), (e.minRating || e.maxRating) && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: reg.ok ? "var(--success)" : "var(--danger)", fontWeight: 700, marginBottom: 6 } }, reg.ok ? "\u2713 You qualify" : "\u2715 " + reg.reason, e.minRating && ` \xB7 Min ${e.minRating}`, e.maxRating && ` \xB7 Max ${e.maxRating}`), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-faint)" } }, e.registered, "/", e.maxPlayers, " registered"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: 700, color: pct >= 80 ? "var(--danger)" : pct >= 60 ? "var(--warn)" : "var(--success)" } }, e.maxPlayers - e.registered, " spots left")), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--border)", borderRadius: 3, height: 4, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { width: pct + "%", height: "100%", background: pct >= 80 ? "var(--danger)" : pct >= 60 ? "var(--warn)" : tc, borderRadius: 3 } }))));
  }), filtered.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "40px 20px", color: "var(--text-faint)", fontSize: 13 } }, "No events match these filters")));
}
const DEMO_PLAYERS = [
  { id: 1, name: "Marcus Chen", rating: 1722, rd: 62, volatility: 0.0591, doublesRating: 1910, doublesRD: 70, doublesVolatility: 0.06, accuracy: 94, provisional: false, uniqueOppsCount: 47 },
  { id: 2, name: "Priya Nair", rating: 1514, rd: 88, volatility: 0.0603, doublesRating: 1580, doublesRD: 95, doublesVolatility: 0.061, accuracy: 78, provisional: false, uniqueOppsCount: 39 },
  { id: 3, name: "James Okafor", rating: 1958, rd: 45, volatility: 0.058, doublesRating: 2040, doublesRD: 52, doublesVolatility: 0.059, accuracy: 97, provisional: false, uniqueOppsCount: 49 },
  { id: 4, name: "Sofia Reyes", rating: 1126, rd: 142, volatility: 0.0621, doublesRating: 1190, doublesRD: 155, doublesVolatility: 0.063, accuracy: 41, provisional: false, uniqueOppsCount: 20 },
  { id: 5, name: "Liam Nguyen", rating: 750, rd: 285, volatility: 0.065, doublesRating: 950, doublesRD: 300, doublesVolatility: 0.066, accuracy: 8, provisional: true, uniqueOppsCount: 4 },
  { id: 6, name: "Aisha Patel", rating: 1617, rd: 75, volatility: 0.0597, doublesRating: 1800, doublesRD: 82, doublesVolatility: 0.0605, accuracy: 88, provisional: false, uniqueOppsCount: 44 }
];
function RuleTag({ status, msg, rule }) {
  const c = { info: "var(--primary)", warn: "var(--warn)", block: "var(--danger)" }[status] || "var(--text-dim)";
  const ic = { info: "\u2139", warn: "\u26A0", block: "\u2715" }[status];
  return /* @__PURE__ */ React.createElement("div", { style: { background: c + "11", border: `1px solid ${c}33`, borderRadius: 8, padding: "8px 10px", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: c, fontWeight: 800, flexShrink: 0 } }, ic), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: c, letterSpacing: 0.5 } }, rule.toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)", marginTop: 2, lineHeight: 1.5 } }, msg))));
}
function MathStep({ step, formula, result, color = "var(--primary)" }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: "var(--sunken)", borderRadius: 8, padding: "10px 12px", marginBottom: 6, borderLeft: `3px solid ${color}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", letterSpacing: 1.5, marginBottom: 3 } }, "STEP ", step), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", fontFamily: "monospace", marginBottom: 3, lineHeight: 1.5 } }, formula), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color, fontFamily: "monospace" } }, "= ", result));
}
function G2PlayerCard({ player, side }) {
  const color = side === "A" ? "var(--primary)" : "var(--purple)";
  const rdColor = player.rd > 200 ? "var(--danger)" : player.rd > 120 ? "var(--warn)" : "var(--success)";
  return /* @__PURE__ */ React.createElement("div", { style: { background: "var(--sunken)", borderRadius: 12, padding: "12px 14px", border: `1px solid ${color}22` } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 32, height: 32, borderRadius: "50%", background: color + "22", border: `1.5px solid ${color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color } }, player.name.split(" ").map((w) => w[0]).join("")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text)" } }, player.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)" } }, player.accuracy, "% accuracy \xB7 ", player.provisional ? "\u25D1 Provisional" : "\u25CF Verified"))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 } }, [{ label: "Display", val: fmt(player.rating), c: color }, { label: "Glicko-2", val: player.rating, c: "var(--text-faint)" }, { label: "RD (\u03C6)", val: player.rd, c: rdColor }, { label: "Volatility (\u03C3)", val: player.volatility, c: "var(--text-muted)" }].map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { textAlign: "center", background: "var(--sunken)", borderRadius: 8, padding: "8px 4px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 900, color: s.c, fontFamily: "'Bebas Neue',sans-serif" } }, s.val), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 8, color: "var(--text-faint)", letterSpacing: 0.5, marginTop: 2 } }, s.label)))));
}
function Glicko2Screen() {
  const [pA, setPa] = useState(DEMO_PLAYERS[0]);
  const [pB, setPb] = useState(DEMO_PLAYERS[1]);
  const [tier, setTier] = useState(3);
  const [winner, setWinner] = useState("A");
  const [tab, setTab2] = useState("calculator");
  const [weeklyA, setWeeklyA] = useState(0);
  const [weeklyB, setWeeklyB] = useState(0);
  const [result, setResult] = useState(null);
  const calculate = () => {
    const score = winner === "A" ? 1 : 0;
    const resA = glicko2Update(pA.rating, pA.rd, pA.volatility, [{ oppRating: pB.rating, oppRD: pB.rd, score }]);
    const resB = glicko2Update(pB.rating, pB.rd, pB.volatility, [{ oppRating: pA.rating, oppRD: pA.rd, score: 1 - score }]);
    const fraudA = checkAntifraud({ tier, oppAccuracy: pB.accuracy, isProvisional: pA.provisional, weeklyTier1Gains: weeklyA });
    const fraudB = checkAntifraud({ tier, oppAccuracy: pA.accuracy, isProvisional: pB.provisional, weeklyTier1Gains: weeklyB });
    const applyRules = (raw, fraud) => {
      let c = raw;
      if (!fraud.affectsVerified) c = 0;
      if (fraud.cappedGain !== null && c > 0) c = Math.min(c, fraud.cappedGain);
      return c;
    };
    const effA = applyRules(resA.ratingChange, fraudA);
    const effB = applyRules(resB.ratingChange, fraudB);
    const newAccA = calcAccuracy(pA.uniqueOppsCount + (pA.id === pB.id ? 0 : 1));
    const newAccB = calcAccuracy(pB.uniqueOppsCount + (pA.id === pB.id ? 0 : 1));
    setResult({ resA, resB, fraudA, fraudB, effA, effB, newAccA, newAccB, score });
  };
  const t = TIERS.find((x) => x.id === tier);
  const tc = (t == null ? void 0 : t.color) || "var(--purple)";
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 26, letterSpacing: 3, color: "var(--text)", lineHeight: 1 } }, "GLICKO-2 ENGINE"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, textTransform: "uppercase", marginTop: 3 } }, "Live Rating Calculator \xB7 Anti-Fraud Rules")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 0, marginBottom: 18, background: "var(--surface)", borderRadius: 10, padding: 3, border: "1px solid var(--border)" } }, [{ id: "calculator", label: "\u26A1 Calculator" }, { id: "howit", label: "📐 How It Works" }, { id: "rules", label: "🛡 Rule Engine" }].map((tb) => /* @__PURE__ */ React.createElement("button", { key: tb.id, onClick: () => setTab2(tb.id), style: { flex: 1, background: tab === tb.id ? "var(--border)" : "none", border: "none", borderRadius: 8, padding: "9px 4px", fontSize: 10, fontWeight: 700, color: tab === tb.id ? "var(--text)" : "var(--text-faint)", cursor: "pointer", letterSpacing: 0.5, textTransform: "uppercase", fontFamily: "inherit", transition: "all 0.2s" } }, tb.label))), tab === "calculator" && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "40px 20px", background: "var(--surface)", borderRadius: 14, border: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 36, marginBottom: 12 } }, "🔧"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: 2, color: "var(--text)", marginBottom: 8 } }, "CALCULATOR"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "var(--text-dim)", lineHeight: 1.6 } }, "Interactive rating calculator coming in Phase 3."), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-faint)", marginTop: 8 } }, "Will show exact rating impact for any 4 players at any tier.")), tab === "calculator_disabled" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 8 } }, "Match Tier"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, TIERS.map((t2) => /* @__PURE__ */ React.createElement("button", { key: t2.id, onClick: () => setTier(t2.id), style: { flex: 1, background: tier === t2.id ? t2.color + "22" : "var(--surface)", border: `1.5px solid ${tier === t2.id ? t2.color + "66" : "var(--border)"}`, borderRadius: 8, padding: "8px 4px", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, fontWeight: 800, color: tier === t2.id ? t2.color : "var(--text-faint)", letterSpacing: 0.5 } }, t2.badge), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 8, color: "var(--text-faint)", marginTop: 1 } }, "K", t2.k))))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 } }, [{ side: "A", p: pA, set: setPa, opp: pB }, { side: "B", p: pB, set: setPb, opp: pA }].map(({ side, p, set, opp }) => /* @__PURE__ */ React.createElement("div", { key: side }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: side === "A" ? "var(--primary)" : "var(--purple)", textTransform: "uppercase", marginBottom: 5 } }, "Player ", side), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: p.id,
      onChange: (e) => {
        const np = DEMO_PLAYERS.find((x) => x.id === Number(e.target.value));
        if (np && np.id !== opp.id) set(np);
      },
      style: { width: "100%", background: "var(--surface)", border: `1.5px solid ${side === "A" ? "color-mix(in srgb, var(--primary) 20%, transparent)" : "color-mix(in srgb, var(--purple) 20%, transparent)"}`, borderRadius: 9, padding: "9px 10px", color: "var(--text)", fontSize: 12, outline: "none", fontFamily: "inherit", appearance: "none", cursor: "pointer" }
    },
    DEMO_PLAYERS.filter((x) => x.id !== opp.id).map((x) => /* @__PURE__ */ React.createElement("option", { key: x.id, value: x.id }, x.name))
  )))), /* @__PURE__ */ React.createElement(G2PlayerCard, { player: pA, side: "A" }), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: "var(--border)", fontSize: 18, letterSpacing: 4, margin: "10px 0" } }, "VS"), /* @__PURE__ */ React.createElement(G2PlayerCard, { player: pB, side: "B" }), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, marginBottom: tier === 1 ? 0 : 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 8 } }, "Winner"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, ["A", "B"].map((side) => /* @__PURE__ */ React.createElement("button", { key: side, onClick: () => setWinner(side), style: { background: winner === side ? (side === "A" ? "var(--primary)" : "var(--purple)") + "22" : "var(--surface)", border: `1.5px solid ${winner === side ? side === "A" ? "color-mix(in srgb, var(--primary) 33%, transparent)" : "color-mix(in srgb, var(--purple) 33%, transparent)" : "var(--border)"}`, borderRadius: 10, padding: 12, cursor: "pointer", fontWeight: 700, fontSize: 12, color: winner === side ? side === "A" ? "var(--primary)" : "var(--purple)" : "var(--text-faint)", fontFamily: "inherit", transition: "all 0.2s" } }, side === "A" ? pA.name.split(" ")[0] : pB.name.split(" ")[0], " wins")))), tier === 1 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--warn)", textTransform: "uppercase", marginBottom: 8 } }, "Weekly Tier 1 Gains Already Earned"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, [{ label: pA.name.split(" ")[0], val: weeklyA, set: setWeeklyA }, { label: pB.name.split(" ")[0], val: weeklyB, set: setWeeklyB }].map((p, i) => /* @__PURE__ */ React.createElement("div", { key: i }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)", marginBottom: 4 } }, p.label), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      min: 0,
      max: 30,
      value: p.val,
      onChange: (e) => p.set(Number(e.target.value)),
      style: { width: "100%", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 9, padding: "9px 12px", color: "var(--warn)", fontSize: 14, fontWeight: 700, outline: "none", fontFamily: "inherit", textAlign: "center" }
    }
  ))))), /* @__PURE__ */ React.createElement("button", { onClick: calculate, style: { width: "100%", background: `linear-gradient(135deg,${tc},${tc}cc)`, color: "var(--bg)", border: "none", borderRadius: 12, padding: "14px", fontSize: 13, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit", boxShadow: `0 0 20px ${tc}44`, marginTop: 14, marginBottom: 20 } }, "\u26A1 Calculate Rating Update"), result && /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 18, letterSpacing: 2, color: "var(--text)", marginBottom: 12 } }, "RATING UPDATE RESULTS"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 } }, [{ label: "Player A", player: pA, res: result.resA, eff: result.effA, fraud: result.fraudA, color: "var(--primary)", newAcc: result.newAccA }, { label: "Player B", player: pB, res: result.resB, eff: result.effB, fraud: result.fraudB, color: "var(--purple)", newAcc: result.newAccB }].map((row, i) => {
    const raw = row.res.ratingChange, eff = row.eff;
    const blocked = eff === 0 && raw !== 0, capped = eff !== raw && !blocked && raw > 0;
    return /* @__PURE__ */ React.createElement("div", { key: i, style: { background: "var(--surface)", borderRadius: 12, padding: "14px", border: `1px solid ${row.color}22` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: row.color, letterSpacing: 2, marginBottom: 6 } }, row.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", marginBottom: 8 } }, row.player.name), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", letterSpacing: 1 } }, "GLICKO-2 RAW"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 900, color: raw >= 0 ? "var(--success)" : "var(--danger)", fontFamily: "'Bebas Neue',sans-serif" } }, raw >= 0 ? "+" : "", raw, "pts")), (blocked || capped) && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: blocked ? "var(--danger)" : "var(--warn)", letterSpacing: 1 } }, blocked ? "\u2715 BLOCKED" : "\u26A0 CAPPED"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 900, color: blocked ? "var(--danger)" : "var(--warn)", fontFamily: "'Bebas Neue',sans-serif" } }, eff >= 0 ? "+" : "", eff, "pts")), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--sunken)", borderRadius: 8, padding: "8px 10px", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", letterSpacing: 1, marginBottom: 2 } }, "NEW RATING"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 900, color: row.color, fontFamily: "'Bebas Neue',sans-serif" } }, row.player.rating + eff)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)" } }, "RD: ", row.player.rd, " \u2192 ", /* @__PURE__ */ React.createElement("span", { style: { color: row.res.rdChange < 0 ? "var(--success)" : "var(--warn)" } }, row.res.newRD)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)" } }, "\u03C3: ", row.player.volatility, " \u2192 ", row.res.newVolatility), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)" } }, "Acc: ", row.player.accuracy, "% \u2192 ", row.newAcc, "%"), row.fraud.rules.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, row.fraud.rules.map((r, ri) => /* @__PURE__ */ React.createElement("div", { key: ri, style: { fontSize: 9, background: { block: "color-mix(in srgb, var(--danger) 7%, transparent)", warn: "color-mix(in srgb, var(--warn) 7%, transparent)", info: "color-mix(in srgb, var(--primary) 7%, transparent)" }[r.status], color: { block: "var(--danger)", warn: "var(--warn)", info: "var(--primary)" }[r.status], padding: "2px 6px", borderRadius: 4, marginBottom: 2, fontWeight: 700 } }, { block: "\u2715", warn: "\u26A0", info: "\u2139" }[r.status], " ", r.rule))));
  })), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 14, padding: "14px 16px", border: "1px solid var(--border)", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 12 } }, "MATH BREAKDOWN \u2014 ", pA.name), (() => {
    const mu = toMu(pA.rating), phi = toPhi(pA.rd), muj = toMu(pB.rating), phij = toPhi(pB.rd);
    const gp = gPhi(phij), E = Eexp(mu, muj, phij), score = winner === "A" ? 1 : 0;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(MathStep, { step: 1, formula: `\u03BC = (${pA.rating} \u2212 1500) / 173.72`, result: mu.toFixed(4), color: "var(--primary)" }), /* @__PURE__ */ React.createElement(MathStep, { step: 2, formula: `\u03C6 = ${pA.rd} / 173.72`, result: phi.toFixed(4), color: "var(--primary)" }), /* @__PURE__ */ React.createElement(MathStep, { step: 3, formula: `g(\u03C6\u2C7C) = 1 / \u221A(1 + 3\xD7${phij.toFixed(4)}\xB2 / \u03C0\xB2)`, result: gp.toFixed(4) + " \u2014 opponent RD reduction factor", color: "var(--purple)" }), /* @__PURE__ */ React.createElement(MathStep, { step: 4, formula: `E = 1 / (1 + e^(\u2212${gp.toFixed(3).replace(",", ".")}\xD7(${mu.toFixed(3).replace(",", ".")}\u2212${muj.toFixed(3).replace(",", ".")})))`, result: `${E.toFixed(4)} \u2014 ${Math.round(E * 100)}% expected win probability`, color: "var(--purple)" }), /* @__PURE__ */ React.createElement(MathStep, { step: 5, formula: `score s=${score} \u2192 contribution: ${gp.toFixed(4)}\xD7(${score}\u2212${E.toFixed(4)})`, result: (gp * (score - E)).toFixed(4), color: tc }), /* @__PURE__ */ React.createElement(MathStep, { step: 6, formula: `After variance v, \u0394, volatility update \u03C3'=${result.resA.newVolatility} \u2192 new \u03C6'`, result: `New RD: ${result.resA.newRD} (${result.resA.rdChange >= 0 ? "+" : ""}${result.resA.rdChange})`, color: "var(--success)" }), /* @__PURE__ */ React.createElement(MathStep, { step: 7, formula: `New rating: ${fmt(pA.rating)} + raw \u0394 ${result.resA.ratingChange} \u2192 after rules \u2192 +${result.effA}pts`, result: `${fmt(pA.rating + result.effA)} (Glicko: ${pA.rating + result.effA})`, color: "var(--success)" }));
  })()), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, padding: "14px 16px", border: "1px solid " + tc + "22", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 } }, "Pre-Match Win Probability"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24, fontWeight: 900, color: "var(--primary)", fontFamily: "'Bebas Neue',sans-serif" } }, Math.round(result.resA.expectedScores[0] * 100), "%"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)" } }, pA.name.split(" ")[0])), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", background: "var(--border)", borderRadius: 4, height: 8, flex: 2, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { width: Math.round(result.resA.expectedScores[0] * 100) + "%", height: "100%", background: "linear-gradient(90deg,var(--primary),var(--purple))", borderRadius: 4 } })), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24, fontWeight: 900, color: "var(--purple)", fontFamily: "'Bebas Neue',sans-serif" } }, Math.round(result.resB.expectedScores[0] * 100), "%"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)" } }, pB.name.split(" ")[0])))), (result.fraudA.rules.length > 0 || result.fraudB.rules.length > 0) && /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 14, padding: "14px 16px", border: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 12 } }, "ANTI-FRAUD DECISIONS"), [...result.fraudA.rules, ...result.fraudB.rules].map((r, i) => /* @__PURE__ */ React.createElement(RuleTag, __spreadValues({ key: i }, r)))))), tab === "howit" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 14, padding: 16, border: "1px solid var(--border)", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 8 } }, "What is Glicko-2?"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)", lineHeight: 1.8 } }, "Glicko-2 improves on basic Elo by tracking ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--primary)", fontWeight: 700 } }, "three values"), " per player \u2014 not just a single number. SMAASH displays ratings on a ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--warn)", fontWeight: 700 } }, "2.000\u20138.000 scale"), " (like DUPR) \u2014 the Glicko-2 math runs internally on a 100\u20132900 scale but what you see is always the mapped display value."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginTop: 12 } }, [{ l: "r \u2014 Rating", c: "var(--primary)", d: "Your skill estimate. Starts at 1500. Moves up/down after each match based on expected vs actual outcome." }, { l: "\u03C6 \u2014 RD (Rating Deviation)", c: "var(--purple)", d: "Uncertainty in your rating. New players have high RD (big swings). Established players have low RD. Grows during inactivity." }, { l: "\u03C3 \u2014 Volatility", c: "var(--warn)", d: "How erratic your results are. Consistent players have low \u03C3. Unpredictable performers have high \u03C3 \u2014 this affects how fast your RD can change." }].map((item, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: "var(--sunken)", borderRadius: 10, padding: "12px 14px", borderLeft: `3px solid ${item.c}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 800, color: item.c, marginBottom: 4 } }, item.l), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)", lineHeight: 1.6 } }, item.d))))), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 14, padding: 16, border: "1px solid var(--border)", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--text)", marginBottom: 12 } }, "RD Reference Guide"), [{ r: "< 75", l: "Very Certain", c: "var(--success)", d: "Played many matches recently. Rating is highly accurate." }, { r: "75\u2013120", l: "Certain", c: "#84cc16", d: "Good match activity. Rating is reliable." }, { r: "120\u2013200", l: "Uncertain", c: "var(--warn)", d: "Some inactivity. Rating may not reflect current skill." }, { r: "200\u2013350", l: "Very Uncertain", c: "var(--danger)", d: "New or inactive player. Large rating swings expected." }].map((r, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, background: r.c + "22", color: r.c, padding: "2px 8px", borderRadius: 5, fontWeight: 700, flexShrink: 0, whiteSpace: "nowrap" } }, r.r), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: r.c } }, r.l), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)", marginTop: 2 } }, r.d))))), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 14, padding: 16, border: "1px solid var(--border)", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--text)", marginBottom: 12 } }, "Why Glicko-2 over Elo?"), [{ elo: "Same weight for every match", g2: "Matches weighted by RD \u2014 beating a well-known player is worth more" }, { elo: "No uncertainty tracking", g2: "RD means new players' wins cause big swings; established players change slowly" }, { elo: "Gameable by playing many weak opponents", g2: "Low-accuracy opponents are blocked \u2014 wins don't count toward Verified rating" }, { elo: "No inactivity penalty", g2: "RD grows when inactive \u2014 your first matches back cause larger swings" }].map((row, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "var(--sunken)", borderRadius: 8, padding: "8px 10px", borderLeft: "3px solid var(--danger)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--danger)", fontWeight: 700, marginBottom: 2 } }, "ELO"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)" } }, row.elo)), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--sunken)", borderRadius: 8, padding: "8px 10px", borderLeft: "3px solid var(--success)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--success)", fontWeight: 700, marginBottom: 2 } }, "GLICKO-2"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-muted)" } }, row.g2))))), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 14, padding: 16, border: "1px solid color-mix(in srgb, var(--purple) 13%, transparent)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--text)", marginBottom: 10 } }, "Doubles Rating Logic"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 12 } }, "Each player has a ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--purple)", fontWeight: 700 } }, "separate doubles rating"), " independent of singles. After a doubles match, each player is rated individually against the ", /* @__PURE__ */ React.createElement("em", null, "average"), " of the two opponents' doubles ratings."), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--sunken)", borderRadius: 10, padding: "12px", border: "1px solid color-mix(in srgb, var(--purple) 13%, transparent)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--purple)", fontWeight: 700, letterSpacing: 1, marginBottom: 8 } }, "PARTNER AVERAGING EXAMPLE"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)", lineHeight: 2 } }, "Team A: Player 1 (DR ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--primary)" } }, "1800"), ") + Player 2 (DR ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--primary)" } }, "1200"), ")", /* @__PURE__ */ React.createElement("br", null), "Team B: Player 3 (DR ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--purple)" } }, "1600"), ") + Player 4 (DR ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--purple)" } }, "1500"), ")", /* @__PURE__ */ React.createElement("br", null), "Opp avg = (1600+1500)/2 = ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--warn)", fontWeight: 700 } }, "1550"), /* @__PURE__ */ React.createElement("br", null), "Player 1 (1800 vs 1550) \u2192 expected win \u2192 gains ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--success)" } }, "small amount"), /* @__PURE__ */ React.createElement("br", null), "Player 2 (1200 vs 1550) \u2192 ", /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--success)" } }, "unexpected win \u2192 gains large amount"))))), tab === "rules" && /* @__PURE__ */ React.createElement("div", null, [
    { title: "Provisional \u2192 Verified Promotion", color: "var(--success)", icon: "🏅", desc: "New accounts start as Provisional. 5 confirmed matches vs 5 different opponents = Verified.", rules: ["Tier 1 matches count toward provisional promotion", "Voided disputed matches do NOT count", "Verified status unlocks leaderboard visibility", "Provisional rating still updates \u2014 it's just not Verified"] },
    { title: "Verified vs Provisional Rating", color: "var(--primary)", icon: "\u2713", desc: "Two separate ratings per player \u2014 one public, one internal.", rules: ["Provisional: updated by ALL tiers including Tier 1", "Verified: only updated by Tier 2\u20135 matches", "Opponent accuracy < 10% \u2192 match skips Verified update", "Display shows Verified if available, else Provisional"] },
    { title: "Weekly Tier 1 Cap", color: "var(--warn)", icon: "📅", desc: "Prevents farming recreational matches for easy rating points.", rules: ["Max 30pts from Tier 1 per player per week (K10 \xD7 20)", "Resets every Monday 00:00 UTC", "Cap applies to GAINS only \u2014 losses always count in full", "Per-player cap, independent of match count"] },
    { title: "Low Accuracy Opponent Block", color: "var(--danger)", icon: "\u26A0", desc: "Stops manipulation via fake or unreliable accounts.", rules: ["Opponent accuracy < 10% \u2192 winner gets 0 Verified change", "Loser still loses Provisional rating normally", "Match is still recorded and counts toward accuracy", "Only Verified rating is blocked \u2014 Provisional always updates"] },
    { title: "Accuracy % Formula", color: "var(--purple)", icon: "📊", desc: "Measures how reliable a player's rating truly is.", rules: ["Formula: min(100, (uniqueOpponents / 50) \xD7 100)", "50 unique opponents = 100% accuracy (fully reliable)", "Doubles and singles accuracy tracked separately", "Same opponent played twice doesn't increase accuracy"] },
    { title: "RD Decay (Inactivity)", color: "var(--text-muted)", icon: "\u23F1", desc: "Uncertainty grows when you stop playing.", rules: ["RD increases each rating period (monthly) with no matches", "Formula: \u03C6* = \u221A(\u03C6\xB2 + \u03C3\xB2)", "Max RD capped at 350 (same as new player default)", "High RD = your next matches will cause bigger swings"] }
  ].map((block, bi) => /* @__PURE__ */ React.createElement("div", { key: bi, style: { background: "var(--surface)", borderRadius: 14, padding: 16, border: `1px solid ${block.color}22`, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 20 } }, block.icon), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: block.color } }, block.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", marginTop: 3, lineHeight: 1.6 } }, block.desc))), block.rules.map((rule, ri) => /* @__PURE__ */ React.createElement("div", { key: ri, style: { display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { color: block.color, fontSize: 10, marginTop: 2, flexShrink: 0 } }, "\u25B8"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "var(--text-muted)", lineHeight: 1.5 } }, rule)))))));
}
const MOCK_TOURNAMENTS_DATA = [];
// --- Single-elimination bracket helpers (Task 2a) ---
function tUUID() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    return (c === "x" ? r : r & 3 | 8).toString(16);
  });
}
function tNextPow2(n) { return Math.pow(2, Math.ceil(Math.log2(Math.max(2, n)))); }
function tSlug(name) {
  const base = (name || "tournament").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 24) || "tournament";
  return base + "-" + Math.random().toString(36).slice(2, 8);
}
function tSeedSlots(size) {
  // standard single-elim seed order, e.g. size 8 -> [1,8,4,5,2,7,3,6]
  let pls = [1, 2];
  while (pls.length < size) {
    const sum = pls.length * 2 + 1;
    const next = [];
    pls.forEach((p) => { next.push(p); next.push(sum - p); });
    pls = next;
  }
  return pls;
}
function tRoundLabel(matchesInRound) {
  if (matchesInRound === 1) return "Final";
  if (matchesInRound === 2) return "Semi-Final";
  if (matchesInRound === 4) return "Quarter-Final";
  return "Round of " + matchesInRound * 2;
}
function PublicTournamentScreen({ slug }) {
  const [tour, setTour] = useState(null);
  const [entries, setEntries] = useState([]);
  const [matches, setMatches] = useState([]);
  const [mrows, setMrows] = useState([]);
  const [state, setState] = useState("loading");
  const B = "https://yqqezxyayndzmqahguac.supabase.co/rest/v1/";
  const H = { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + SUPABASE_ANON_KEY };
  const loadAll = (tid) => {
    fetch(B + "tournament_entries?tournament_id=eq." + tid + "&select=*", { headers: H }).then((r) => r.json()).then((d) => { if (Array.isArray(d)) setEntries(d); }).catch(() => {});
    fetch(B + "tournament_matches?tournament_id=eq." + tid + "&select=*&order=round_number.asc", { headers: H }).then((r) => r.json()).then((d) => { if (Array.isArray(d)) setMatches(d); }).catch(() => {});
    fetch(B + "matches?tournament_id=eq." + tid + "&select=player_a_id,player_b_id,sets", { headers: H }).then((r) => r.json()).then((d) => { if (Array.isArray(d)) setMrows(d); }).catch(() => {});
  };
  useEffect(() => {
    if (!slug) { setState("notfound"); return; }
    fetch(B + "tournaments?sharelink_slug=eq." + encodeURIComponent(slug) + "&select=*", { headers: H }).then((r) => r.json()).then((d) => {
      if (Array.isArray(d) && d.length) { setTour(d[0]); setState("ok"); loadAll(d[0].id); } else setState("notfound");
    }).catch(() => setState("notfound"));
  }, [slug]);
  useEffect(() => {
    if (!tour || !smaashRealtime) return;
    const ch = smaashRealtime.channel("pub:" + tour.id).on("postgres_changes", { event: "*", schema: "public", table: "tournament_matches", filter: "tournament_id=eq." + tour.id }, () => loadAll(tour.id)).subscribe();
    return () => smaashRealtime.removeChannel(ch);
  }, [tour && tour.id]);
  const wrap = (kids) => /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Sans',sans-serif" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 560, margin: "0 auto", padding: "24px 16px 60px" } }, kids));
  if (state === "loading") return wrap(/* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", paddingTop: 60, fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: 3, color: "var(--primary)" } }, "SMAASH"));
  if (state === "notfound" || !tour) return wrap(/* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", paddingTop: 60 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 40, marginBottom: 10 } }, "🏆"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "var(--text-dim)" } }, "Tournament not found")));
  const nameOf = (eid) => { if (!eid) return "TBD"; const e = entries.find((x) => x.id === eid); return e ? e.display_name || "Player" : "TBD"; };
  const isRR = (tour.format || "").indexOf("round_robin") === 0;
  const statusLabel = { registration_open: "Registration Open", draw_generated: "Draw Set", in_progress: "Live", completed: "Completed" }[tour.status] || tour.status;
  const header = /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 30, letterSpacing: 2, color: "var(--text)", lineHeight: 1 } }, tour.name), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center", marginTop: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: 700, color: tour.status === "in_progress" ? "var(--success)" : "var(--text-dim)", background: tour.status === "in_progress" ? "color-mix(in srgb,var(--success) 14%,transparent)" : "var(--surface)", padding: "3px 9px", borderRadius: 5, textTransform: "uppercase", letterSpacing: 1 } }, tour.status === "in_progress" ? "● Live" : statusLabel), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "var(--text-faint)" } }, (isRR ? "Round Robin" : "Single Elim") + " · " + (tour.match_type || "singles"))));
  let body;
  if (isRR) {
    const by = {};
    entries.forEach((e) => { by[e.id] = { id: e.id, pid: e.player_id, name: e.display_name || "Player", played: 0, wins: 0, losses: 0, pts: 0, gf: 0, ga: 0 }; });
    matches.forEach((m) => { if (!m.winner_entry_id || m.is_bye) return; const A = by[m.player_a_entry_id], Bb = by[m.player_b_entry_id]; if (!A || !Bb) return; A.played++; Bb.played++; if (m.winner_entry_id === A.id) { A.wins++; A.pts++; Bb.losses++; } else { Bb.wins++; Bb.pts++; A.losses++; } });
    const byp = {}; Object.keys(by).forEach((k) => { byp[by[k].pid] = by[k]; });
    mrows.forEach((mr) => { let arr = []; try { arr = typeof mr.sets === "string" ? JSON.parse(mr.sets) : mr.sets || []; } catch (e) { arr = []; } let ga = 0, gb = 0; arr.forEach((s) => { ga += Number(s.a) || 0; gb += Number(s.b) || 0; }); const PA = byp[mr.player_a_id], PB = byp[mr.player_b_id]; if (PA) { PA.gf += ga; PA.ga += gb; } if (PB) { PB.gf += gb; PB.ga += ga; } });
    const standings = Object.keys(by).map((k) => by[k]).map((s) => __spreadProps(__spreadValues({}, s), { diff: s.gf - s.ga })).sort((x, y) => y.pts - x.pts || y.diff - x.diff || y.wins - x.wins);
    const col = "28px 1fr 28px 28px 28px 34px 42px";
    body = /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: col, padding: "9px 12px", fontSize: 9, fontWeight: 700, letterSpacing: 1, color: "var(--text-dim)", background: "var(--sunken)" } }, ["#", "PLAYER", "P", "W", "L", "PTS", "DIFF"].map((h, hi) => /* @__PURE__ */ React.createElement("span", { key: hi, style: { textAlign: hi === 1 ? "left" : "center" } }, h))), standings.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: s.id, style: { display: "grid", gridTemplateColumns: col, padding: "9px 12px", fontSize: 11, alignItems: "center", borderTop: "1px solid var(--border)", background: i === 0 ? "color-mix(in srgb,var(--warn) 7%,transparent)" : "transparent" } }, /* @__PURE__ */ React.createElement("span", { style: { textAlign: "center", fontWeight: 700, color: i === 0 ? "var(--warn)" : "var(--text-faint)" } }, i === 0 ? "🥇" : i + 1), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, s.name), /* @__PURE__ */ React.createElement("span", { style: { textAlign: "center", color: "var(--text-dim)" } }, s.played), /* @__PURE__ */ React.createElement("span", { style: { textAlign: "center", color: "var(--success)", fontWeight: 700 } }, s.wins), /* @__PURE__ */ React.createElement("span", { style: { textAlign: "center", color: "var(--danger)", fontWeight: 700 } }, s.losses), /* @__PURE__ */ React.createElement("span", { style: { textAlign: "center", color: "var(--warn)", fontWeight: 800 } }, s.pts), /* @__PURE__ */ React.createElement("span", { style: { textAlign: "center", color: s.diff > 0 ? "var(--success)" : s.diff < 0 ? "var(--danger)" : "var(--text-faint)" } }, (s.diff > 0 ? "+" : "") + s.diff))));
  } else {
    const rounds = {}; matches.forEach((m) => { (rounds[m.round_number] = rounds[m.round_number] || []).push(m); });
    const rnums = Object.keys(rounds).map(Number).sort((a, b) => a - b);
    body = /* @__PURE__ */ React.createElement("div", null, rnums.map((rn) => /* @__PURE__ */ React.createElement("div", { key: rn, style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "var(--text-faint)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 } }, rounds[rn][0] && rounds[rn][0].round_label || "Round " + rn), rounds[rn].map((m) => {
      const aw = m.winner_entry_id && m.winner_entry_id === m.player_a_entry_id;
      const bw = m.winner_entry_id && m.winner_entry_id === m.player_b_entry_id;
      return /* @__PURE__ */ React.createElement("div", { key: m.id, style: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 12px", marginBottom: 6, opacity: m.is_bye ? 0.55 : 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: aw ? "var(--success)" : "var(--text)" } }, nameOf(m.player_a_entry_id), aw ? " 🏆" : ""), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, color: "var(--text-faint)" } }, m.is_bye ? "BYE" : "")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: bw ? "var(--success)" : "var(--text-muted)", marginTop: 2 } }, nameOf(m.player_b_entry_id), bw ? " 🏆" : ""));
    }))));
  }
  return wrap(/* @__PURE__ */ React.createElement(React.Fragment, null, header, body, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginTop: 24, fontSize: 10, color: "var(--text-faint)", letterSpacing: 1 } }, "Powered by SMAASH · live results")));
}
function TournamentManageView({ tId, tournaments, profiles = [], refreshTournaments = null }) {
  var _a, _b;
  const t = tournaments.find((x) => x.id === tId);
  if (!t) return null;
  const [bracketState, setBracketState] = useState(t.bracket || { type: null, winnersBracket: [], losersBracket: null, grandFinal: null });
  const [scores, setScores] = useState({});
  const [toast, setToast] = useState(null);
  const showToast = (msg, c = "var(--success)") => {
    setToast({ msg, c });
    setTimeout(() => setToast(null), 2400);
  };
  const [entries, setEntries] = useState([]);
  const [entryQuery, setEntryQuery] = useState("");
  const loadEntries = () => {
    const tok = smaashDB.auth.getToken() || SUPABASE_ANON_KEY;
    return fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/tournament_entries?tournament_id=eq.${tId}&select=*&order=seed.asc.nullslast,created_at.asc`, {
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok }
    }).then((r) => r.json()).then((data) => { if (Array.isArray(data)) setEntries(data); }).catch(() => {});
  };
  useEffect(() => { loadEntries(); }, [tId]);
  const enteredIds = new Set(entries.map((e) => e.player_id));
  const nameFor = (pid) => { const p = profiles.find((x) => x.id === pid); return (p && p.name) || "Player"; };
  const addEntries = (players) => {
    const tok = smaashDB.auth.getToken();
    if (!tok) { showToast("Sign in first", "var(--danger)"); return; }
    const cap = t.drawSize || 16;
    const room = cap - entries.length;
    if (room <= 0) { showToast("Draw is full (" + cap + ") — remove a player first", "var(--danger)"); return; }
    let toAdd = players.filter((p) => !enteredIds.has(p.id));
    if (toAdd.length === 0) { showToast("Already added", "var(--warn)"); return; }
    const trimmed = toAdd.length > room;
    toAdd = toAdd.slice(0, room);
    const rows = toAdd.map((p) => ({
      tournament_id: tId,
      player_id: p.id,
      display_name: p.name || null,
      entry_rating_snapshot: Number((toDisplayRating(p.doublesRating || 500)).toFixed(3)),
      entry_rd_snapshot: Math.round(p.rd || 350),
      status: "registered"
    }));
    if (rows.length === 0) { showToast("Already added", "var(--warn)"); return; }
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/tournament_entries", {
      method: "POST",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify(rows)
    }).then(async (res) => {
      if (!res.ok) { console.error("Add entries failed:", res.status, await res.text()); showToast("Add failed", "var(--danger)"); return; }
      loadEntries();
      showToast(rows.length + " added" + (trimmed ? " — draw now full (" + (t.drawSize || 16) + ")" : "") + " ✓");
    }).catch(() => showToast("Add failed", "var(--danger)"));
  };
  const removeEntry = (entryId) => {
    const tok = smaashDB.auth.getToken();
    if (!tok) return;
    fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/tournament_entries?id=eq.${entryId}`, {
      method: "DELETE", headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok }
    }).then(() => loadEntries()).catch(() => {});
  };
  const quickAddDummies = (count) => {
    const avail = profiles.filter((p) => !enteredIds.has(p.id)).slice(0, count);
    if (avail.length === 0) { showToast("No more players to add", "var(--warn)"); return; }
    addEntries(avail);
  };
  const entryCandidates = profiles.filter((p) => !enteredIds.has(p.id) && (!entryQuery || (p.name || "").toLowerCase().includes(entryQuery.toLowerCase()))).slice(0, 12);
  const [dbMatches, setDbMatches] = useState([]);
  const [tMatchRows, setTMatchRows] = useState([]);
  const [confirmingId, setConfirmingId] = useState(null);
  const [generating, setGenerating] = useState(false);
  const started = dbMatches.length > 0 || t.status === "in_progress" || t.status === "completed";
  const entriesSection = /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 14, padding: "14px 16px", border: "1px solid var(--border)", marginBottom: 16 } },
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 } },
      /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 2, color: "var(--text)" } }, "ENTRIES (" + entries.length + "/" + (t.drawSize || 16) + ")"),
      started ? /* @__PURE__ */ React.createElement("button", { onClick: () => reopenRegistration(), style: { background: "color-mix(in srgb,var(--danger) 10%,transparent)", border: "1px solid color-mix(in srgb,var(--danger) 28%,transparent)", borderRadius: 7, padding: "5px 10px", fontSize: 10, fontWeight: 700, color: "var(--danger)", cursor: "pointer", fontFamily: "inherit" } }, "Reopen registration") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, [8, 16].map((nn) => /* @__PURE__ */ React.createElement("button", { key: nn, onClick: () => quickAddDummies(nn), disabled: entries.length >= (t.drawSize || 16), style: { background: "color-mix(in srgb,var(--purple) 12%,transparent)", border: "1px solid color-mix(in srgb,var(--purple) 28%,transparent)", borderRadius: 7, padding: "5px 10px", fontSize: 10, fontWeight: 700, color: "var(--purple)", cursor: entries.length >= (t.drawSize || 16) ? "not-allowed" : "pointer", opacity: entries.length >= (t.drawSize || 16) ? 0.4 : 1, fontFamily: "inherit" } }, "+" + nn + " dummy")))),
    entries.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 } }, entries.map((e) => /* @__PURE__ */ React.createElement("span", { key: e.id, onClick: started ? void 0 : () => removeEntry(e.id), title: started ? "" : "Click to remove", style: { fontSize: 11, background: "var(--sunken)", borderRadius: 6, padding: "4px 9px", color: "var(--text-muted)", cursor: started ? "default" : "pointer" } }, (e.seed ? "#" + e.seed + " " : "") + (e.display_name || nameFor(e.player_id))))),
    !started && /* @__PURE__ */ React.createElement("input", { value: entryQuery, onChange: (ev) => setEntryQuery(ev.target.value), placeholder: "Search players to add…", style: { width: "100%", background: "var(--sunken)", border: "1px solid var(--border)", borderRadius: 9, padding: "9px 12px", color: "var(--text)", fontSize: 12, outline: "none", fontFamily: "inherit", boxSizing: "border-box", marginBottom: 8 } }),
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 4, maxHeight: 200, overflowY: "auto" } }, started ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", padding: "4px 2px" } }, "🔒 Roster locked — tournament has started") : entries.length >= (t.drawSize || 16) ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--warn)", padding: "4px 2px" } }, "Draw full (" + (t.drawSize || 16) + ") — remove a player to add another") : entryCandidates.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-faint)", padding: "4px 2px" } }, "No players found") : entryCandidates.map((p) => /* @__PURE__ */ React.createElement("div", { key: p.id, style: { display: "flex", alignItems: "center", gap: 8, padding: "5px 2px" } }, /* @__PURE__ */ React.createElement(Avatar, { initials: p.avatar || "?", size: 24, color: "var(--purple)" }), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontSize: 12, fontWeight: 600, color: "var(--text)" } }, p.name), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-dim)" } }, fmt(p.doublesRating)), /* @__PURE__ */ React.createElement("button", { onClick: () => addEntries([p]), style: { background: "color-mix(in srgb,var(--success) 12%,transparent)", border: "1px solid color-mix(in srgb,var(--success) 28%,transparent)", borderRadius: 7, padding: "4px 12px", fontSize: 10, fontWeight: 700, color: "var(--success)", cursor: "pointer", fontFamily: "inherit" } }, "Add")))));
  const [tScores, setTScores] = useState({});
  const loadBracket = () => {
    const tok = smaashDB.auth.getToken() || SUPABASE_ANON_KEY;
    return fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/tournament_matches?tournament_id=eq.${tId}&select=*&order=round_number.asc`, {
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok }
    }).then((r) => r.json()).then((data) => { if (Array.isArray(data)) setDbMatches(data); }).catch(() => {});
  };
  const clearBracketRows = async (tok) => {
    const h = { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json" };
    try {
      // Null the self-references first so the bulk DELETE can't trip the next_match_id self-FK, then delete.
      await fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/tournament_matches?tournament_id=eq.${tId}`, { method: "PATCH", headers: __spreadProps(__spreadValues({}, h), { "Prefer": "return=minimal" }), body: JSON.stringify({ next_match_id: null, loser_next_match_id: null }) });
      const del = await fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/tournament_matches?tournament_id=eq.${tId}`, { method: "DELETE", headers: h });
      if (!del.ok) { console.error("Clear bracket DELETE failed:", del.status, await del.text()); return false; }
      return true;
    } catch (e) { console.error("Clear bracket error:", e); return false; }
  };
  useEffect(() => { loadBracket(); }, [tId]);
  const loadTMatchRows = () => {
    const tok = smaashDB.auth.getToken() || SUPABASE_ANON_KEY;
    return fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/matches?tournament_id=eq.${tId}&select=player_a_id,player_b_id,winner_side,sets_won_a,sets_won_b,sets`, { headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok } }).then((r) => r.json()).then((data) => { if (Array.isArray(data)) setTMatchRows(data); }).catch(() => {});
  };
  useEffect(() => { loadTMatchRows(); }, [tId]);
  useEffect(() => {
    if (!smaashRealtime || !tId) return;
    const tok = smaashDB.auth.getToken();
    if (tok) smaashRealtime.realtime.setAuth(tok);
    let debounce = null;
    const onChange = () => { if (debounce) clearTimeout(debounce); debounce = setTimeout(() => { loadBracket(); loadTMatchRows(); }, 300); };
    const channel = smaashRealtime.channel("tmatch:" + tId).on("postgres_changes", { event: "*", schema: "public", table: "tournament_matches", filter: "tournament_id=eq." + tId }, onChange).subscribe();
    return () => { if (debounce) clearTimeout(debounce); smaashRealtime.removeChannel(channel); };
  }, [tId]);
  const reopenRegistration = () => {
    const tok = smaashDB.auth.getToken();
    if (!tok) { showToast("Sign in first", "var(--danger)"); return; }
    if (typeof window !== "undefined" && !window.confirm(dbMatches.some((m) => m.match_id) ? "Reopening clears the bracket. Ratings from played matches are NOT reverted. Continue?" : "Reopen registration and clear the current draw?")) return;
    const hdr = { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json" };
    clearBracketRows(tok)
      .then(() => fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/tournaments?id=eq.${tId}`, { method: "PATCH", headers: __spreadProps(__spreadValues({}, hdr), { "Prefer": "return=minimal" }), body: JSON.stringify({ status: "registration_open" }) }))
      .then(() => { loadBracket(); if (refreshTournaments) refreshTournaments(); showToast("Registration reopened — bracket cleared"); })
      .catch((e) => { console.error("Reopen error:", e); showToast("Reopen failed", "var(--danger)"); });
  };
  const generateRoundRobin = async (tok, forceShuffle) => {
    let seeded = entries.slice();
    if (forceShuffle) seeded.sort(() => Math.random() - 0.5);
    else seeded.sort((a, b) => (b.entry_rating_snapshot || 0) - (a.entry_rating_snapshot || 0));
    const rows = [];
    let idx = 0;
    for (let i = 0; i < seeded.length; i++) for (let j = i + 1; j < seeded.length; j++) {
      idx++;
      rows.push({ id: tUUID(), tournament_id: tId, round_number: 1, round_label: "Round Robin", bracket_slot: "RR" + idx, player_a_entry_id: seeded[i].id, player_b_entry_id: seeded[j].id, winner_entry_id: null, is_bye: false, next_match_id: null });
    }
    const cleared = await clearBracketRows(tok);
    if (!cleared) { showToast("Couldn't clear old bracket — try again", "var(--danger)"); return; }
    const hdr = { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" };
    const res = await fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/tournament_matches", { method: "POST", headers: hdr, body: JSON.stringify(rows) });
    if (!res.ok) { console.error("RR insert failed:", res.status, await res.text()); showToast("Draw failed", "var(--danger)"); return; }
    await fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/tournaments?id=eq.${tId}`, { method: "PATCH", headers: hdr, body: JSON.stringify({ status: "in_progress" }) }).catch(() => {});
    loadBracket();
    if (refreshTournaments) refreshTournaments();
    showToast("Round robin generated — " + rows.length + " matches ✓");
  };
  const generateDraw = async (forceShuffle) => {
    if (generating) return;
    const tok = smaashDB.auth.getToken();
    if (!tok) { showToast("Sign in first", "var(--danger)"); return; }
    if (entries.length < 2) { showToast("Add at least 2 entries first", "var(--danger)"); return; }
    if (dbMatches.some((m) => m.match_id) && typeof window !== "undefined" && !window.confirm("This tournament already has played matches. Regenerating rebuilds the bracket but does NOT undo ratings already applied. Continue?")) return;
    const fmt = t.format || "";
    if (fmt.indexOf("round_robin") !== 0 && fmt.indexOf("single") !== 0) { showToast("Only Single Elimination & Round Robin are wired up so far", "var(--warn)"); return; }
    setGenerating(true);
    try {
    if (fmt.indexOf("round_robin") === 0) { await generateRoundRobin(tok, forceShuffle); return; }
    let seeded = entries.slice();
    if (forceShuffle || (t.seedingMethod || "rating") === "random") seeded.sort(() => Math.random() - 0.5);
    else seeded.sort((a, b) => (b.entry_rating_snapshot || 0) - (a.entry_rating_snapshot || 0));
    const n = seeded.length;
    const size = tNextPow2(n);
    const slots = tSeedSlots(size);
    const bySeed = slots.map((sn) => sn <= n ? seeded[sn - 1] : null);
    const numRounds = Math.round(Math.log2(size));
    const rounds = [];
    for (let r = 1; r <= numRounds; r++) {
      const cnt = size / Math.pow(2, r);
      const arr = [];
      for (let i = 0; i < cnt; i++) arr.push({ id: tUUID(), round: r, a: null, b: null, next: null, isBye: false, winner: null });
      rounds.push(arr);
    }
    for (let r = 0; r < rounds.length - 1; r++) rounds[r].forEach((m, i) => { m.next = rounds[r + 1][Math.floor(i / 2)].id; });
    rounds[0].forEach((m, i) => { m.a = bySeed[i * 2] || null; m.b = bySeed[i * 2 + 1] || null; });
    rounds[0].forEach((m, i) => {
      const aR = m.a && m.a.id, bR = m.b && m.b.id;
      if (aR && !bR) { m.isBye = true; m.winner = m.a; }
      else if (bR && !aR) { m.isBye = true; m.winner = m.b; }
      if (m.isBye && m.winner && rounds[1]) { const nm = rounds[1][Math.floor(i / 2)]; if (i % 2 === 0) nm.a = m.winner; else nm.b = m.winner; }
    });
    const rows = [];
    for (let r = rounds.length - 1; r >= 0; r--) rounds[r].forEach((m, i) => rows.push({
      id: m.id, tournament_id: tId, round_number: m.round,
      round_label: tRoundLabel(size / Math.pow(2, m.round)),
      bracket_slot: "R" + m.round + "M" + (i + 1),
      player_a_entry_id: m.a ? m.a.id : null,
      player_b_entry_id: m.b ? m.b.id : null,
      winner_entry_id: m.winner ? m.winner.id : null,
      is_bye: !!m.isBye, next_match_id: m.next
    }));
    const cleared = await clearBracketRows(tok);
    if (!cleared) { showToast("Couldn't clear old bracket — try again", "var(--danger)"); return; }
    const hdr = { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" };
    const res = await fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/tournament_matches", { method: "POST", headers: hdr, body: JSON.stringify(rows) });
    if (!res.ok) { console.error("Draw insert failed:", res.status, await res.text()); showToast("Draw failed", "var(--danger)"); return; }
    await fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/tournaments?id=eq.${tId}`, { method: "PATCH", headers: hdr, body: JSON.stringify({ status: "in_progress" }) }).catch(() => {});
    loadBracket();
    if (refreshTournaments) refreshTournaments();
    showToast("Draw generated — " + rows.length + " matches ✓");
    } finally {
      setGenerating(false);
    }
  };
  const entryById = (eid) => entries.find((e) => e.id === eid);
  const entryDisplay = (eid) => { if (!eid) return "TBD"; const e = entryById(eid); return e ? (e.display_name || nameFor(e.player_id)) : "TBD"; };
  const roundsMap = {};
  dbMatches.forEach((m) => { (roundsMap[m.round_number] = roundsMap[m.round_number] || []).push(m); });
  const roundNums = Object.keys(roundsMap).map(Number).sort((a, b) => a - b);
  const isSingleElim = (t.format || "").indexOf("single") === 0;
  const isRoundRobin = (t.format || "").indexOf("round_robin") === 0;
  const setTScore = (id, side, v) => setTScores((s) => __spreadProps(__spreadValues({}, s), { [id]: __spreadProps(__spreadValues({}, s[id]), { [side]: v }) }));
  const tSlotForNext = (slot) => { const mm = /M(\d+)/.exec(slot || ""); const idx = mm ? parseInt(mm[1], 10) - 1 : 0; return idx % 2 === 0 ? "player_a_entry_id" : "player_b_entry_id"; };
  const confirmTMatch = (m) => {
    if (confirmingId) return;
    const sc = tScores[m.id] || {};
    const a = Number(sc.a), b = Number(sc.b);
    if (sc.a === void 0 || sc.b === void 0 || sc.a === "" || sc.b === "" || isNaN(a) || isNaN(b) || a === b) { showToast("Enter two different scores", "var(--danger)"); return; }
    const tok = smaashDB.auth.getToken();
    if (!tok) { showToast("Sign in first", "var(--danger)"); return; }
    const eA = entryById(m.player_a_entry_id), eB = entryById(m.player_b_entry_id);
    if (!eA || !eB) { showToast("Match not ready yet", "var(--danger)"); return; }
    setConfirmingId(m.id);
    const winnerEntry = a > b ? eA : eB;
    const hdr = { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json" };
    const nowIso = new Date().toISOString();
    const matchBody = {
      player_a_id: eA.player_id, player_b_id: eB.player_id,
      partner_a_id: eA.partner_id || null, partner_b_id: eB.partner_id || null,
      match_type: t.matchType || "singles", tier: 2,
      sets: JSON.stringify([{ a, b }]),
      sets_won_a: a > b ? 1 : 0, sets_won_b: b > a ? 1 : 0,
      winner_side: a > b ? "A" : "B",
      status: "pending", tournament_id: tId,
      played_at: nowIso, submitted_at: nowIso
    };
    // Insert pending, then PATCH to confirmed — this is the app's normal confirm flow,
    // so the existing BEFORE-UPDATE rating trigger fires unchanged (K/rating untouched).
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/matches", { method: "POST", headers: __spreadProps(__spreadValues({}, hdr), { "Prefer": "return=representation" }), body: JSON.stringify(matchBody) })
      .then(async (res) => {
        if (!res.ok) { console.error("Tournament match insert failed:", res.status, await res.text()); showToast("Save failed", "var(--danger)"); setConfirmingId(null); return; }
        const rows = await res.json(); const nm = Array.isArray(rows) ? rows[0] : rows; const mid = nm && nm.id;
        if (mid) await fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/matches?id=eq.${mid}`, { method: "PATCH", headers: __spreadProps(__spreadValues({}, hdr), { "Prefer": "return=minimal" }), body: JSON.stringify({ status: "confirmed" }) });
        await fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/tournament_matches?id=eq.${m.id}`, { method: "PATCH", headers: __spreadProps(__spreadValues({}, hdr), { "Prefer": "return=minimal" }), body: JSON.stringify({ winner_entry_id: winnerEntry.id, match_id: mid || null }) });
        if (m.next_match_id) {
          const slot = tSlotForNext(m.bracket_slot);
          await fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/tournament_matches?id=eq.${m.next_match_id}`, { method: "PATCH", headers: __spreadProps(__spreadValues({}, hdr), { "Prefer": "return=minimal" }), body: JSON.stringify({ [slot]: winnerEntry.id }) });
        }
        // Complete the tournament only when every non-bye match is resolved (works for SE and RR).
        const remaining = dbMatches.filter((x) => x.id !== m.id && !x.winner_entry_id && !x.is_bye).length;
        if (remaining === 0) {
          await fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/tournaments?id=eq.${tId}`, { method: "PATCH", headers: __spreadProps(__spreadValues({}, hdr), { "Prefer": "return=minimal" }), body: JSON.stringify({ status: "completed" }) }).catch(() => {});
          if (refreshTournaments) refreshTournaments();
        }
        setTScores((s) => __spreadProps(__spreadValues({}, s), { [m.id]: { a: "", b: "" } }));
        loadBracket();
        loadTMatchRows();
        setConfirmingId(null);
        showToast(remaining === 0 ? "🏆 Tournament complete!" : "Result saved ✓");
      }).catch((e) => { console.error("Tournament match error:", e); showToast("Save failed", "var(--danger)"); setConfirmingId(null); });
  };
  const undoResult = (m) => {
    if (typeof window !== "undefined" && !window.confirm("Undo this result and reopen the match? Ratings already applied are NOT reverted.")) return;
    const tok = smaashDB.auth.getToken();
    if (!tok) { showToast("Sign in first", "var(--danger)"); return; }
    if (m.next_match_id) {
      const nm = dbMatches.find((x) => x.id === m.next_match_id);
      if (nm && nm.winner_entry_id) { showToast("Undo the later-round match first", "var(--danger)"); return; }
    }
    const hdr = { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" };
    const ops = [];
    ops.push(fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/tournament_matches?id=eq.${m.id}`, { method: "PATCH", headers: hdr, body: JSON.stringify({ winner_entry_id: null, match_id: null }) }));
    if (m.match_id) ops.push(fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/matches?id=eq.${m.match_id}`, { method: "PATCH", headers: hdr, body: JSON.stringify({ status: "voided" }) }));
    if (m.next_match_id) { const slot = tSlotForNext(m.bracket_slot); ops.push(fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/tournament_matches?id=eq.${m.next_match_id}`, { method: "PATCH", headers: hdr, body: JSON.stringify({ [slot]: null }) })); }
    Promise.all(ops).then(() => {
      if (t.status === "completed") fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/tournaments?id=eq.${tId}`, { method: "PATCH", headers: hdr, body: JSON.stringify({ status: "in_progress" }) }).then(() => { if (refreshTournaments) refreshTournaments(); }).catch(() => {});
      loadBracket(); loadTMatchRows();
      showToast("Result undone — re-enter the score");
    }).catch(() => showToast("Undo failed", "var(--danger)"));
  };
  const matchRow = (m) => {
    const aWin = m.winner_entry_id && m.winner_entry_id === m.player_a_entry_id;
    const bWin = m.winner_entry_id && m.winner_entry_id === m.player_b_entry_id;
    const done = !!m.winner_entry_id;
    const ready = m.player_a_entry_id && m.player_b_entry_id && !m.is_bye && !done;
    const sc = tScores[m.id] || {};
    const aName = m.player_a_entry_id ? entryDisplay(m.player_a_entry_id) : m.is_bye ? "BYE" : "TBD";
    const bName = m.player_b_entry_id ? entryDisplay(m.player_b_entry_id) : m.is_bye ? "BYE" : "TBD";
    const numInp = { width: 40, background: "var(--sunken)", border: "1px solid var(--border)", borderRadius: 7, padding: "6px 0", color: "var(--primary)", fontSize: 14, fontWeight: 700, textAlign: "center", outline: "none", fontFamily: "inherit" };
    return /* @__PURE__ */ React.createElement("div", { key: m.id, style: { background: "var(--surface)", border: "1px solid " + (done ? "color-mix(in srgb,var(--success) 22%,transparent)" : "var(--border)"), borderRadius: 10, padding: "8px 12px", marginBottom: 6, opacity: m.is_bye ? 0.55 : 1 } },
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: aWin ? "var(--success)" : "var(--text)" } }, aName, aWin ? " 🏆" : ""), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, color: "var(--text-faint)" } }, m.is_bye ? "BYE" : done ? "DONE" : "vs")),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: bWin ? "var(--success)" : "var(--text-muted)", marginTop: 2 } }, bName, bWin ? " 🏆" : ""),
      ready && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center", marginTop: 8 } }, /* @__PURE__ */ React.createElement("input", { type: "number", min: 0, max: 30, value: sc.a == null ? "" : sc.a, onChange: (e) => setTScore(m.id, "a", e.target.value), placeholder: "21", style: numInp }), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--border-strong)" } }, "-"), /* @__PURE__ */ React.createElement("input", { type: "number", min: 0, max: 30, value: sc.b == null ? "" : sc.b, onChange: (e) => setTScore(m.id, "b", e.target.value), placeholder: "17", style: numInp }), /* @__PURE__ */ React.createElement("button", { onClick: () => confirmTMatch(m), disabled: confirmingId === m.id, style: { marginLeft: "auto", background: "color-mix(in srgb,var(--success) 13%,transparent)", border: "1px solid color-mix(in srgb,var(--success) 28%,transparent)", borderRadius: 7, padding: "5px 14px", fontSize: 10, fontWeight: 700, color: "var(--success)", cursor: confirmingId === m.id ? "wait" : "pointer", opacity: confirmingId === m.id ? 0.5 : 1, fontFamily: "inherit" } }, confirmingId === m.id ? "Saving…" : "Confirm")), done && !m.is_bye && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: 6 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => undoResult(m), style: { background: "none", border: "1px solid color-mix(in srgb,var(--danger) 25%,transparent)", borderRadius: 6, padding: "3px 10px", fontSize: 9, fontWeight: 700, color: "var(--danger)", cursor: "pointer", fontFamily: "inherit" } }, "Undo")));
  };
  const finalMatch = dbMatches.find((m) => !m.next_match_id);
  const champion = finalMatch && finalMatch.winner_entry_id ? entryDisplay(finalMatch.winner_entry_id) : null;
  const shareUrl = t.slug && typeof window !== "undefined" ? window.location.origin + "/t/" + t.slug : null;
  const shareBar = shareUrl ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 12px", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: "var(--text-dim)", textTransform: "uppercase" } }, "🔗 Public leaderboard"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, shareUrl)), /* @__PURE__ */ React.createElement("button", { onClick: () => { try { navigator.clipboard.writeText(shareUrl); showToast("Link copied ✓"); } catch (e) { showToast("Copy failed", "var(--danger)"); } }, style: { background: "color-mix(in srgb,var(--primary) 13%,transparent)", border: "1px solid color-mix(in srgb,var(--primary) 28%,transparent)", borderRadius: 7, padding: "6px 12px", fontSize: 10, fontWeight: 700, color: "var(--primary)", cursor: "pointer", fontFamily: "inherit", flexShrink: 0 } }, "Copy")) : null;
  const rrStandings = (() => {
    const byEntry = {};
    entries.forEach((e) => { byEntry[e.id] = { entryId: e.id, playerId: e.player_id, name: nameFor(e.player_id), played: 0, wins: 0, losses: 0, pts: 0, gf: 0, ga: 0 }; });
    dbMatches.forEach((m) => {
      if (!m.winner_entry_id || m.is_bye) return;
      const A = byEntry[m.player_a_entry_id], B = byEntry[m.player_b_entry_id];
      if (!A || !B) return;
      A.played++; B.played++;
      if (m.winner_entry_id === A.entryId) { A.wins++; A.pts += 1; B.losses++; } else { B.wins++; B.pts += 1; A.losses++; }
    });
    const byPlayer = {};
    Object.keys(byEntry).forEach((k) => { byPlayer[byEntry[k].playerId] = byEntry[k]; });
    tMatchRows.forEach((mr) => {
      let arr = [];
      try { arr = typeof mr.sets === "string" ? JSON.parse(mr.sets) : mr.sets || []; } catch (e) { arr = []; }
      let ga = 0, gb = 0;
      arr.forEach((s) => { ga += Number(s.a) || 0; gb += Number(s.b) || 0; });
      const PA = byPlayer[mr.player_a_id], PB = byPlayer[mr.player_b_id];
      if (PA) { PA.gf += ga; PA.ga += gb; }
      if (PB) { PB.gf += gb; PB.ga += ga; }
    });
    return Object.keys(byEntry).map((k) => byEntry[k]).map((s) => __spreadProps(__spreadValues({}, s), { diff: s.gf - s.ga })).sort((x, y) => y.pts - x.pts || y.diff - x.diff || y.wins - x.wins);
  })();
  const rrComplete = dbMatches.length > 0 && dbMatches.every((m) => m.winner_entry_id || m.is_bye);
  const rrCol = "28px 1fr 28px 28px 28px 34px 42px";
  const rrSection = /* @__PURE__ */ React.createElement("div", null,
    rrComplete && rrStandings[0] && /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb,var(--warn) 12%,transparent)", border: "1px solid color-mix(in srgb,var(--warn) 30%,transparent)", borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 13, fontWeight: 800, color: "var(--warn)", textAlign: "center" } }, "🏆 Winner: " + rrStandings[0].name + " — Tournament Complete"),
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 2, color: "var(--success)" } }, "STANDINGS"), /* @__PURE__ */ React.createElement("button", { onClick: () => generateDraw(true), disabled: generating || rrComplete, title: rrComplete ? "Tournament is complete" : "", style: { background: "none", border: "1px solid var(--border)", borderRadius: 7, padding: "5px 10px", fontSize: 10, fontWeight: 700, color: "var(--text-faint)", cursor: generating || rrComplete ? "not-allowed" : "pointer", opacity: generating || rrComplete ? 0.4 : 1, fontFamily: "inherit" } }, generating ? "…" : "↻ Regenerate")),
    /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: rrCol, padding: "8px 12px", fontSize: 9, fontWeight: 700, letterSpacing: 1, color: "var(--text-dim)", background: "var(--sunken)" } }, ["#", "PLAYER", "P", "W", "L", "PTS", "DIFF"].map((h, hi) => /* @__PURE__ */ React.createElement("span", { key: hi, style: { textAlign: hi === 1 ? "left" : "center" } }, h))), rrStandings.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: s.entryId, style: { display: "grid", gridTemplateColumns: rrCol, padding: "8px 12px", fontSize: 11, alignItems: "center", borderTop: "1px solid var(--border)", background: i === 0 && rrComplete ? "color-mix(in srgb,var(--warn) 8%,transparent)" : "transparent" } }, /* @__PURE__ */ React.createElement("span", { style: { textAlign: "center", fontWeight: 700, color: i === 0 ? "var(--warn)" : "var(--text-faint)" } }, i + 1), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, s.name), /* @__PURE__ */ React.createElement("span", { style: { textAlign: "center", color: "var(--text-dim)" } }, s.played), /* @__PURE__ */ React.createElement("span", { style: { textAlign: "center", color: "var(--success)", fontWeight: 700 } }, s.wins), /* @__PURE__ */ React.createElement("span", { style: { textAlign: "center", color: "var(--danger)", fontWeight: 700 } }, s.losses), /* @__PURE__ */ React.createElement("span", { style: { textAlign: "center", color: "var(--warn)", fontWeight: 800 } }, s.pts), /* @__PURE__ */ React.createElement("span", { style: { textAlign: "center", color: s.diff > 0 ? "var(--success)" : s.diff < 0 ? "var(--danger)" : "var(--text-faint)" } }, (s.diff > 0 ? "+" : "") + s.diff)))),
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 2, color: "var(--text)", marginBottom: 10 } }, "MATCHES (" + dbMatches.length + ")"),
    dbMatches.map((m) => matchRow(m)));
  const bracketSection = dbMatches.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", border: "1px dashed var(--border-strong)", borderRadius: 14, padding: "18px 16px", textAlign: "center", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text-dim)", marginBottom: 10 } }, (isSingleElim || isRoundRobin) ? "No draw yet. Add entries above, then generate." : "This format isn't wired up yet."), (isSingleElim || isRoundRobin) && /* @__PURE__ */ React.createElement("button", { onClick: () => generateDraw(false), disabled: entries.length < 2 || generating, style: { background: entries.length < 2 ? "var(--border)" : "linear-gradient(135deg,var(--purple),#7c3aed)", color: entries.length < 2 ? "var(--text-faint)" : "#fff", border: "none", borderRadius: 10, padding: "11px 20px", fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", cursor: entries.length < 2 ? "not-allowed" : "pointer", fontFamily: "inherit" } }, (isRoundRobin ? "Generate Round Robin (" : "Generate Draw (") + entries.length + ")")) : isRoundRobin ? rrSection : /* @__PURE__ */ React.createElement("div", null, champion && /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb,var(--warn) 12%,transparent)", border: "1px solid color-mix(in srgb,var(--warn) 30%,transparent)", borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 13, fontWeight: 800, color: "var(--warn)", textAlign: "center" } }, "🏆 Champion: " + champion + " — Tournament Complete"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 2, color: "var(--success)" } }, "BRACKET"), /* @__PURE__ */ React.createElement("button", { onClick: () => generateDraw(true), disabled: generating || rrComplete, title: rrComplete ? "Tournament is complete" : "", style: { background: "none", border: "1px solid var(--border)", borderRadius: 7, padding: "5px 10px", fontSize: 10, fontWeight: 700, color: "var(--text-faint)", cursor: generating || rrComplete ? "not-allowed" : "pointer", opacity: generating || rrComplete ? 0.4 : 1, fontFamily: "inherit" } }, generating ? "…" : "↻ Regenerate")), roundNums.map((rn) => /* @__PURE__ */ React.createElement("div", { key: rn, style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "var(--text-faint)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 } }, roundsMap[rn][0] && roundsMap[rn][0].round_label || "Round " + rn), roundsMap[rn].map((m) => matchRow(m)))));
  const tc = ((_a = TIERS.find((x) => x.id === t.tier)) == null ? void 0 : _a.color) || "var(--purple)";
  const formatLabel = { single_elimination: "Single Elim", double_elimination: "Double Elim", triple_elimination: "Triple Elim", round_robin: "Round Robin", league: "League", swiss: "Swiss" };
  const formatIcon = { single_elimination: "\u26A1", double_elimination: "🔄", triple_elimination: "🔱", round_robin: "🔃", league: "🏅", swiss: "🔀" };
  const setScore = (matchId, side, val) => setScores((s) => __spreadProps(__spreadValues({}, s), { [matchId]: __spreadProps(__spreadValues({}, s[matchId]), { [side]: val }) }));
  const confirmMatch = (matchId, bracket = "winners") => {
    const sc = scores[matchId];
    if (!(sc == null ? void 0 : sc.a) || !(sc == null ? void 0 : sc.b)) {
      _showToast("Enter both scores first", "var(--danger)");
      return;
    }
    setBracketState((prev) => {
      const updated = JSON.parse(JSON.stringify(prev));
      const rounds = bracket === "winners" ? updated.winnersBracket : updated.losersBracket;
      if (!rounds) return prev;
      rounds.forEach((r) => r.matches.forEach((m) => {
        if (m.id === matchId) {
          m.scoreA = Number(sc.a);
          m.scoreB = Number(sc.b);
          m.status = "confirmed";
          m.winner = Number(sc.a) > Number(sc.b) ? m.entryA : m.entryB;
        }
      }));
      return updated;
    });
    _showToast("Result confirmed \u2014 ratings will update!");
  };
  const confirmRRMatch = (matchId) => {
    const sc = scores[matchId];
    if (!(sc == null ? void 0 : sc.a) || !(sc == null ? void 0 : sc.b)) {
      _showToast("Enter both scores first", "var(--danger)");
      return;
    }
    setBracketState((prev) => {
      var _a2, _b2;
      const updated = JSON.parse(JSON.stringify(prev));
      updated.matches.forEach((m) => {
        if (m.id === matchId) {
          m.scoreA = Number(sc.a);
          m.scoreB = Number(sc.b);
          m.status = "confirmed";
          m.winner = Number(sc.a) > Number(sc.b) ? m.entryA : m.entryB;
        }
      });
      const winner = Number(sc.a) > Number(sc.b) ? (_a2 = updated.matches.find((m) => m.id === matchId)) == null ? void 0 : _a2.entryA : (_b2 = updated.matches.find((m) => m.id === matchId)) == null ? void 0 : _b2.entryB;
      updated.standings = updated.standings.map((s) => {
        var _a3, _b3;
        if (s.id === (winner == null ? void 0 : winner.id)) return __spreadProps(__spreadValues({}, s), { wins: s.wins + 1, pts: s.pts + 2 });
        const m = updated.matches.find((x) => x.id === matchId);
        if (s.id === ((_a3 = m == null ? void 0 : m.entryA) == null ? void 0 : _a3.id) || s.id === ((_b3 = m == null ? void 0 : m.entryB) == null ? void 0 : _b3.id)) return __spreadProps(__spreadValues({}, s), { losses: s.losses + 1 });
        return s;
      }).sort((a, b) => b.pts - a.pts).map((s, i) => __spreadProps(__spreadValues({}, s), { pos: i + 1 }));
      return updated;
    });
    _showToast("Result confirmed!");
  };
  const MatchCard = ({ match, onConfirm, showByes = true }) => {
    var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    if (!showByes && match.status === "bye") return null;
    const isBye = match.status === "bye";
    const isDone = match.status === "confirmed";
    const sc = scores[match.id] || {};
    const entryName = (e) => (e == null ? void 0 : e.isTeam) ? e.name : (e == null ? void 0 : e.name) || "TBD";
    return /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 11, overflow: "hidden", border: `1px solid ${isDone ? "color-mix(in srgb, var(--success) 20%, transparent)" : isBye ? "color-mix(in srgb, var(--border) 20%, transparent)" : "var(--border)"}`, marginBottom: 6, opacity: isBye ? 0.4 : 1 } }, /* @__PURE__ */ React.createElement("div", { style: { background: tc + "0a", padding: "5px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, fontWeight: 700, color: tc } }, match.round), isDone && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, background: "color-mix(in srgb, var(--success) 13%, transparent)", color: "var(--success)", padding: "1px 6px", borderRadius: 3, fontWeight: 700 } }, "DONE"), isBye && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, color: "var(--border-strong)" } }, "BYE")), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 6 } }, !((_a2 = match.entryA) == null ? void 0 : _a2.isTeam) && /* @__PURE__ */ React.createElement(Avatar, { initials: ((_b2 = match.entryA) == null ? void 0 : _b2.avatar) || "?", size: 22, color: tc }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: isDone && ((_c = match.winner) == null ? void 0 : _c.id) === ((_d = match.entryA) == null ? void 0 : _d.id) ? "var(--success)" : "var(--text)" } }, entryName(match.entryA)), isDone && ((_e = match.winner) == null ? void 0 : _e.id) === ((_f = match.entryA) == null ? void 0 : _f.id) && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10 } }, "🏆")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } }, !((_g = match.entryB) == null ? void 0 : _g.isTeam) && /* @__PURE__ */ React.createElement(Avatar, { initials: ((_h = match.entryB) == null ? void 0 : _h.avatar) || "?", size: 22, color: "var(--text-faint)" }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: isDone && ((_i = match.winner) == null ? void 0 : _i.id) === ((_j = match.entryB) == null ? void 0 : _j.id) ? "var(--success)" : "var(--text-muted)" } }, entryName(match.entryB)), isDone && ((_k = match.winner) == null ? void 0 : _k.id) === ((_l = match.entryB) == null ? void 0 : _l.id) && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10 } }, "🏆"))), !isBye && (isDone ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", background: "var(--sunken)", borderRadius: 9, padding: "8px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 900, color: "var(--success)", fontFamily: "'Bebas Neue',sans-serif" } }, match.scoreA, " - ", match.scoreB)) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "number",
        min: 0,
        max: 30,
        value: sc.a || "",
        onChange: (e) => setScore(match.id, "a", e.target.value),
        placeholder: "21",
        style: { width: 42, background: "var(--sunken)", border: "1px solid var(--border)", borderRadius: 7, padding: "7px 0", color: "var(--primary)", fontSize: 15, fontWeight: 700, textAlign: "center", outline: "none", fontFamily: "inherit" }
      }
    ), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--border-strong)", fontSize: 12 } }, "-"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "number",
        min: 0,
        max: 30,
        value: sc.b || "",
        onChange: (e) => setScore(match.id, "b", e.target.value),
        placeholder: "17",
        style: { width: 42, background: "var(--sunken)", border: "1px solid var(--border)", borderRadius: 7, padding: "7px 0", color: "var(--purple)", fontSize: 15, fontWeight: 700, textAlign: "center", outline: "none", fontFamily: "inherit" }
      }
    )), /* @__PURE__ */ React.createElement("button", { onClick: () => onConfirm(match.id), style: { background: "color-mix(in srgb, var(--success) 13%, transparent)", border: "1px solid color-mix(in srgb, var(--success) 27%, transparent)", borderRadius: 7, padding: "4px 14px", fontSize: 9, fontWeight: 700, color: "var(--success)", cursor: "pointer", fontFamily: "inherit" } }, "Confirm"))))));
  };
  const StandingsTable = ({ standings }) => /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { background: tc + "14", padding: "8px 14px", fontSize: 9, fontWeight: 700, letterSpacing: 2, color: tc, display: "grid", gridTemplateColumns: "28px 1fr 32px 32px 32px 40px" } }, /* @__PURE__ */ React.createElement("span", null, "#"), /* @__PURE__ */ React.createElement("span", null, "PLAYER"), /* @__PURE__ */ React.createElement("span", { style: { textAlign: "center" } }, "W"), /* @__PURE__ */ React.createElement("span", { style: { textAlign: "center" } }, "L"), /* @__PURE__ */ React.createElement("span", { style: { textAlign: "center" } }, "PTS"), /* @__PURE__ */ React.createElement("span", { style: { textAlign: "center" } }, "RATING")), standings.map((s, i) => {
    var _a2;
    return /* @__PURE__ */ React.createElement("div", { key: s.id || i, style: { padding: "9px 14px", borderTop: "1px solid var(--border)", display: "grid", gridTemplateColumns: "28px 1fr 32px 32px 32px 40px", alignItems: "center", background: i === 0 ? "color-mix(in srgb, var(--warn) 2%, transparent)" : "transparent" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: i === 0 ? "var(--warn)" : i === 1 ? "var(--text-muted)" : i === 2 ? "#fb923c" : "var(--text-faint)" } }, i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center", minWidth: 0 } }, !s.isTeam && /* @__PURE__ */ React.createElement(Avatar, { initials: s.avatar || "?", size: 22, color: tc }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, s.name)), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: "var(--success)", textAlign: "center" } }, s.wins || 0), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: "var(--danger)", textAlign: "center" } }, s.losses || 0), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 800, color: "var(--warn)", textAlign: "center" } }, s.pts || 0), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-dim)", textAlign: "center" } }, s.isTeam ? ((_a2 = s.members) == null ? void 0 : _a2.length) + "p" : fmt(s.rating)));
  }));
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, toast && /* @__PURE__ */ React.createElement(Toast, { msg: toast.msg, color: toast.c }), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setManaged(null);
    setTab("list");
  }, style: { background: "none", border: "none", color: "var(--text-dim)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 14, padding: 0 } }, "\u2190 Back to Tournaments"), /* @__PURE__ */ React.createElement("div", { style: { background: `linear-gradient(135deg,${tc}14,var(--surface))`, border: `1px solid ${tc}33`, borderRadius: 14, padding: "14px 16px", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: 2, color: "var(--text)", marginBottom: 6 } }, t.name), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" } }, /* @__PURE__ */ React.createElement(TierBadge, { tier: t.tier }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, background: tc + "22", color: tc, padding: "2px 8px", borderRadius: 5, fontWeight: 700 } }, formatIcon[t.format], " ", formatLabel[t.format]), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-dim)" } }, t.matchType, " \xB7 ", t.startDate, " \xB7 ", t.location)), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 12 } }, [{ l: "Entries", v: t.registeredCount }, { l: "Tier", v: "T3 Rated" }, { l: "Entry Fee", v: `$${t.entryFee}` }].map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: "var(--sunken)", borderRadius: 8, padding: "8px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 900, color: tc, fontFamily: "'Bebas Neue',sans-serif" } }, s.v), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 8, color: "var(--text-faint)", letterSpacing: 1 } }, s.l.toUpperCase()))))), shareBar, entriesSection, bracketSection, (bracketState == null ? void 0 : bracketState.type) === "round_robin" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(StandingsTable, { standings: bracketState.standings }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 2, color: "var(--text)", marginBottom: 10 } }, "MATCHES (", bracketState.matches.length, ")"), bracketState.matches.map((m) => /* @__PURE__ */ React.createElement(MatchCard, { key: m.id, match: m, onConfirm: confirmRRMatch }))), (bracketState == null ? void 0 : bracketState.type) === "swiss" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(StandingsTable, { standings: bracketState.standings }), bracketState.rounds.map((r, ri) => /* @__PURE__ */ React.createElement("div", { key: ri }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 2, color: "var(--text)", marginBottom: 10, marginTop: ri > 0 ? 16 : 0 } }, "ROUND ", r.round), r.matches.map((m) => /* @__PURE__ */ React.createElement(MatchCard, { key: m.id, match: m, onConfirm: (id) => confirmMatch(id, "winners") }))))), ((bracketState == null ? void 0 : bracketState.type) === "single_elimination" || (bracketState == null ? void 0 : bracketState.type) === "double_elimination" || (bracketState == null ? void 0 : bracketState.type) === "triple_elimination") && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 2, color: "var(--success)", marginBottom: 10 } }, "WINNERS BRACKET"), (_b = bracketState.winnersBracket) == null ? void 0 : _b.map((rnd, ri) => /* @__PURE__ */ React.createElement("div", { key: ri, style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "var(--text-faint)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 } }, rnd.name), rnd.matches.map((m) => /* @__PURE__ */ React.createElement(MatchCard, { key: m.id, match: m, onConfirm: (id) => confirmMatch(id, "winners") })))), bracketState.type !== "single_elimination" && bracketState.losersBracket && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 2, color: "var(--warn)", marginBottom: 10, marginTop: 16 } }, "LOSERS BRACKET"), bracketState.losersBracket.map((rnd, ri) => /* @__PURE__ */ React.createElement("div", { key: ri, style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "var(--text-faint)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 } }, "Losers ", rnd.name), rnd.matches.map((m) => /* @__PURE__ */ React.createElement(MatchCard, { key: m.id, match: m, onConfirm: (id) => confirmMatch(id, "losers") }))))), bracketState.grandFinal && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 2, color: "var(--warn)", marginBottom: 10 } }, "GRAND FINAL"), /* @__PURE__ */ React.createElement(MatchCard, { match: bracketState.grandFinal, onConfirm: (id) => confirmMatch(id, "grand") }))));
}
;
function TournamentCreateWizard({ form, setForm, formStep, setFormStep, createTournament, showToast, profiles = [] }) {
  const setF = (k, v) => setForm((p) => __spreadProps(__spreadValues({}, p), { [k]: v }));
  const [toast, setToast] = useState(null);
  const _showToast2 = showToast || ((msg, c) => {
    setToast({ msg, c });
    setTimeout(() => setToast(null), 2400);
  });
  const inp = { width: "100%", background: "var(--sunken)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 14px", color: "var(--text)", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" };
  const steps = ["Basics", "Format", "Players", "Preview"];
  const formatOptions = [
    { id: "single_elimination", icon: "\u26A1", label: "Single Elimination", sub: "Lose once = out. Clean and fast.", good: "8\u201364 players" },
    { id: "double_elimination", icon: "🔄", label: "Double Elimination", sub: "Two losses to be eliminated. Most common in badminton.", good: "8\u201332 players" },
    { id: "triple_elimination", icon: "🔱", label: "Triple Elimination", sub: "Three losses to be eliminated. Great for competitive leagues.", good: "8\u201324 players" },
    { id: "round_robin", icon: "🔃", label: "Round Robin", sub: "Everyone plays everyone. Best for small groups.", good: "4\u201312 entries" },
    { id: "league", icon: "🏅", label: "Team League", sub: "Teams compete in a league table. Captain picks lineup.", good: "4\u201310 teams" },
    { id: "swiss", icon: "🔀", label: "Swiss System", sub: "Paired by current score. No eliminations.", good: "8\u201332 players" }
  ];
  const entryCounts = form.format === "round_robin" ? [3, 4, 5, 6, 8, 10, 12, 16] : [4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 64];
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 0, marginBottom: 20, position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: "50%", left: 0, right: 0, height: 2, background: "var(--border)", transform: "translateY(-50%)", zIndex: 0 } }), steps.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { onClick: () => i < formStep && setFormStep(i + 1), style: { width: 28, height: 28, borderRadius: "50%", background: formStep > i ? "var(--purple)" : formStep === i + 1 ? "var(--purple)" : "var(--surface)", border: `2px solid ${formStep >= i + 1 ? "var(--purple)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: formStep >= i + 1 ? "#fff" : "var(--text-faint)", cursor: i < formStep ? "pointer" : "default" } }, formStep > i + 1 ? "\u2713" : i + 1), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 8, color: formStep === i + 1 ? "var(--purple)" : "var(--text-faint)", marginTop: 4, fontWeight: formStep === i + 1 ? 700 : 400 } }, s)))), formStep === 1 && /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.2s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 16 } }, "Tournament Details"), [{ l: "Tournament Name", k: "name", ph: "e.g. Riverside Spring Open 2026" }, { l: "Location", k: "location", ph: "City, Country" }, { l: "Start Date", k: "startDate", type: "date" }].map((f, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 5 } }, f.l), /* @__PURE__ */ React.createElement("input", { type: f.type || "text", value: form[f.k], onChange: (e) => setF(f.k, e.target.value), placeholder: f.ph || "", style: inp }))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 8 } }, "Match Type"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, [{ id: "singles", label: "🏸 Singles", sub: "Individual players" }, { id: "doubles", label: "👥 Doubles", sub: "Pairs compete" }].map((mt) => /* @__PURE__ */ React.createElement("button", { key: mt.id, onClick: () => setF("matchType", mt.id), style: { background: form.matchType === mt.id ? "color-mix(in srgb, var(--purple) 13%, transparent)" : "var(--surface)", border: `1.5px solid ${form.matchType === mt.id ? "color-mix(in srgb, var(--purple) 33%, transparent)" : "var(--border)"}`, borderRadius: 10, padding: "12px", cursor: "pointer", fontFamily: "inherit", textAlign: "left" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: form.matchType === mt.id ? "var(--purple)" : "var(--text-muted)" } }, mt.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", marginTop: 2 } }, mt.sub))))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 6 } }, "Entry Fee (CAD)"), /* @__PURE__ */ React.createElement("input", { type: "number", min: 0, value: form.entryFee, onChange: (e) => setF("entryFee", Number(e.target.value)), style: inp }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", marginTop: 4 } }, "Minimum $1/player for official Tier 3 rating weighting. $0 = unrated exhibition.")), /* @__PURE__ */ React.createElement("button", { onClick: () => setFormStep(2), disabled: !form.name || !form.startDate, style: { width: "100%", background: form.name && form.startDate ? "linear-gradient(135deg,var(--purple),#7c3aed)" : "var(--border)", color: form.name && form.startDate ? "#fff" : "var(--border-strong)", border: "none", borderRadius: 10, padding: "13px", fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", cursor: form.name && form.startDate ? "pointer" : "not-allowed", fontFamily: "inherit" } }, "Next: Format \u2192")), formStep === 2 && /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.2s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 16 } }, "Tournament Format"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 } }, formatOptions.map((f) => /* @__PURE__ */ React.createElement("button", { key: f.id, onClick: () => setF("format", f.id), style: { background: form.format === f.id ? "color-mix(in srgb, var(--purple) 13%, transparent)" : "var(--surface)", border: `1.5px solid ${form.format === f.id ? "color-mix(in srgb, var(--purple) 33%, transparent)" : "var(--border)"}`, borderRadius: 11, padding: "13px 14px", cursor: "pointer", fontFamily: "inherit", display: "flex", gap: 12, alignItems: "center", transition: "all 0.2s", textAlign: "left" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 22, flexShrink: 0 } }, f.icon), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: form.format === f.id ? "var(--purple)" : "var(--text-muted)" } }, f.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", marginTop: 2 } }, f.sub), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--border-strong)", marginTop: 2 } }, "Best for: ", f.good)), form.format === f.id && /* @__PURE__ */ React.createElement("span", { style: { color: "var(--purple)", fontSize: 16 } }, "\u2713")))), form.matchType === "doubles" && form.format !== "league" && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 8 } }, "Seeding Method"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, [{ id: "rating", l: "By SMAASH Rating", sub: "Highest rated pairs seeded #1 (default)" }, { id: "td_manual", l: "TD Manual Seeding", sub: "You assign seeds after draw is generated" }, { id: "random", l: "Random Draw", sub: "No seeding \u2014 completely random bracket" }].map((s) => /* @__PURE__ */ React.createElement("button", { key: s.id, onClick: () => setF("seedingMethod", s.id), style: { background: form.seedingMethod === s.id ? "color-mix(in srgb, var(--primary) 7%, transparent)" : "var(--surface)", border: `1px solid ${form.seedingMethod === s.id ? "color-mix(in srgb, var(--primary) 27%, transparent)" : "var(--border)"}`, borderRadius: 9, padding: "10px 13px", cursor: "pointer", fontFamily: "inherit", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: form.seedingMethod === s.id ? "var(--primary)" : "var(--text-muted)" } }, s.l), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", marginTop: 1 } }, s.sub)), form.seedingMethod === s.id && /* @__PURE__ */ React.createElement("span", { style: { color: "var(--primary)" } }, "\u2713"))))), form.format === "league" && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 8 } }, "Team Size"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 } }, [{ id: false, l: "Fixed (5 players)" }, { id: true, l: "Custom size" }].map((o) => /* @__PURE__ */ React.createElement("button", { key: String(o.id), onClick: () => setF("flexTeamSize", o.id), style: { background: form.flexTeamSize === o.id ? "color-mix(in srgb, var(--purple) 13%, transparent)" : "var(--surface)", border: `1px solid ${form.flexTeamSize === o.id ? "color-mix(in srgb, var(--purple) 27%, transparent)" : "var(--border)"}`, borderRadius: 9, padding: "10px", cursor: "pointer", fontFamily: "inherit", fontSize: 11, fontWeight: 700, color: form.flexTeamSize === o.id ? "var(--purple)" : "var(--text-faint)" } }, o.l))), form.flexTeamSize && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, color: "var(--text-dim)", display: "block", marginBottom: 5 } }, "Players per team"), /* @__PURE__ */ React.createElement("input", { type: "number", min: 2, max: 12, value: form.teamSize, onChange: (e) => setF("teamSize", Number(e.target.value)), style: __spreadProps(__spreadValues({}, inp), { width: "auto" }) })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", marginTop: 8, lineHeight: 1.6 } }, "In team leagues, captains decide which players from their team play each rubber. All results count toward individual SMAASH ratings.")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setFormStep(1), style: { background: "none", border: "1px solid var(--border)", borderRadius: 10, padding: "12px", fontSize: 12, fontWeight: 700, color: "var(--text-faint)", cursor: "pointer", fontFamily: "inherit" } }, "\u2190 Back"), /* @__PURE__ */ React.createElement("button", { onClick: () => setFormStep(3), style: { background: "linear-gradient(135deg,var(--purple),#7c3aed)", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontSize: 12, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" } }, "Next: Players \u2192"))), formStep === 3 && /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.2s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 16 } }, "Player Registration"), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 8 } }, "Number of ", form.format === "league" ? "Teams" : "Entries"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } }, entryCounts.map((n) => /* @__PURE__ */ React.createElement("button", { key: n, onClick: () => setF("entryCount", n), style: { background: form.entryCount === n ? "color-mix(in srgb, var(--purple) 13%, transparent)" : "var(--surface)", border: `1px solid ${form.entryCount === n ? "color-mix(in srgb, var(--purple) 33%, transparent)" : "var(--border)"}`, borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 700, color: form.entryCount === n ? "var(--purple)" : "var(--text-faint)", cursor: "pointer", fontFamily: "inherit" } }, n))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", marginTop: 8 } }, form.format === "round_robin" && form.entryCount > 12 && /* @__PURE__ */ React.createElement("span", { style: { color: "var(--warn)" } }, "\u26A0 Round robin with ", form.entryCount, " entries = ", form.entryCount * (form.entryCount - 1) / 2, " matches. Consider Swiss instead."), form.format === "league" && /* @__PURE__ */ React.createElement("span", null, "Team league: ", form.entryCount, " teams \xD7 ", form.flexTeamSize ? form.teamSize : 5, " players = ", form.entryCount * (form.flexTeamSize ? form.teamSize : 5), " total players"))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 8 } }, "Rating Eligibility (optional)"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 9, color: "var(--text-faint)", display: "block", marginBottom: 4 } }, "Min Rating"), /* @__PURE__ */ React.createElement("input", { type: "number", step: "0.001", min: "2", max: "8", value: form.minRating, onChange: (e) => setF("minRating", e.target.value), placeholder: "e.g. 4.500", style: inp })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 9, color: "var(--text-faint)", display: "block", marginBottom: 4 } }, "Max Rating"), /* @__PURE__ */ React.createElement("input", { type: "number", step: "0.001", min: "2", max: "8", value: form.maxRating, onChange: (e) => setF("maxRating", e.target.value), placeholder: "e.g. 6.500", style: inp })))), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, padding: "13px 14px", border: "1px solid var(--border)", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 10 } }, "Registered Players (", Math.min(form.entryCount, profiles.length), ")"), [].map((p) => {
    var _a;
    return /* @__PURE__ */ React.createElement("div", { key: p.id, style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 7 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: p.avatar, size: 26, color: ((_a = TIERS.find((t) => t.id === p.tier)) == null ? void 0 : _a.color) || "var(--primary)" }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "var(--text)" } }, p.name)), /* @__PURE__ */ React.createElement(TierBadge, { tier: p.tier }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-dim)" } }, fmt(p.rating)));
  }), form.entryCount > profiles.length && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", marginTop: 8 } }, "+", form.entryCount - profiles.length, " more spots open")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setFormStep(2), style: { background: "none", border: "1px solid var(--border)", borderRadius: 10, padding: "12px", fontSize: 12, fontWeight: 700, color: "var(--text-faint)", cursor: "pointer", fontFamily: "inherit" } }, "\u2190 Back"), /* @__PURE__ */ React.createElement("button", { onClick: () => setFormStep(4), style: { background: "linear-gradient(135deg,var(--purple),#7c3aed)", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontSize: 12, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" } }, "Preview \u2192"))), formStep === 4 && /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.2s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 16 } }, "Preview & Generate"), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, padding: "16px", border: "1px solid color-mix(in srgb, var(--purple) 20%, transparent)", marginBottom: 16 } }, [
    { l: "Name", v: form.name },
    { l: "Match Type", v: form.matchType },
    { l: "Format", v: { single_elimination: "Single Elimination", double_elimination: "Double Elimination", triple_elimination: "Triple Elimination", round_robin: "Round Robin", league: "Team League", swiss: "Swiss System" }[form.format] },
    { l: "Entries", v: form.entryCount },
    { l: "Seeding", v: form.matchType === "singles" ? "By SMAASH Rating" : { rating: "By SMAASH Rating", td_manual: "TD Manual", random: "Random Draw" }[form.seedingMethod] },
    { l: "Location", v: form.location || "TBD" },
    { l: "Start Date", v: form.startDate || "TBD" },
    { l: "Entry Fee", v: `$${form.entryFee} CAD` },
    { l: "Rating Weight", v: form.entryFee > 0 ? "Tier 3 Official (K=45)" : "Exhibition \u2014 unrated" }
  ].map((r, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: i < 8 ? "1px solid var(--border)" : "none" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "var(--text-dim)" } }, r.l), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "var(--text)" } }, r.v)))), /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb, var(--purple) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--purple) 20%, transparent)", borderRadius: 10, padding: "12px 14px", marginBottom: 20, fontSize: 11, color: "var(--purple)", lineHeight: 1.7 } }, "Generating the bracket will auto-seed all players by ", form.matchType === "singles" ? "SMAASH rating" : form.seedingMethod === "random" ? "random draw" : "your chosen method", " and create all first-round matchups. Results can be entered match by match."), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setFormStep(3), style: { background: "none", border: "1px solid var(--border)", borderRadius: 10, padding: "12px", fontSize: 12, fontWeight: 700, color: "var(--text-faint)", cursor: "pointer", fontFamily: "inherit" } }, "\u2190 Back"), /* @__PURE__ */ React.createElement("button", { onClick: createTournament, style: { background: "linear-gradient(135deg,var(--purple),#7c3aed)", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontSize: 13, fontWeight: 800, letterSpacing: 1, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 0 20px color-mix(in srgb, var(--purple) 27%, transparent)" } }, "Generate Bracket"))));
}
;
function TournamentListView({ tournaments, setManaged: setManaged2, setTab: setTab2 }) {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", { onClick: () => setTab2("create"), style: { width: "100%", background: "linear-gradient(135deg,var(--purple),#7c3aed)", color: "#fff", border: "none", borderRadius: 10, padding: "13px", fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit", marginBottom: 16 } }, "+ Create New Tournament"), tournaments.map((t) => {
    var _a;
    const tc = ((_a = TIERS.find((x) => x.id === t.tier)) == null ? void 0 : _a.color) || "var(--purple)";
    const fmtLabel = { single_elimination: "Single Elim", double_elimination: "Double Elim", triple_elimination: "Triple Elim", round_robin: "Round Robin", league: "League", swiss: "Swiss" };
    const fmtIcon = { single_elimination: "\u26A1", double_elimination: "🔄", triple_elimination: "🔱", round_robin: "🔃", league: "🏅", swiss: "🔀" };
    return /* @__PURE__ */ React.createElement("div", { key: t.id, onClick: () => {
      setManaged2(t.id);
      setTab2("manage");
    }, style: { background: "var(--surface)", borderRadius: 13, overflow: "hidden", border: "1px solid var(--border)", marginBottom: 10, cursor: "pointer" }, onMouseOver: (e) => e.currentTarget.style.borderColor = "var(--border-strong)", onMouseOut: (e) => e.currentTarget.style.borderColor = "var(--border)" }, /* @__PURE__ */ React.createElement("div", { style: { height: 2, background: `linear-gradient(90deg,${tc},transparent)` } }), /* @__PURE__ */ React.createElement("div", { style: { padding: "13px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: "var(--text)", fontSize: 14, flex: 1, marginRight: 8 } }, t.name), /* @__PURE__ */ React.createElement(StatusPill, { status: t.status })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 } }, /* @__PURE__ */ React.createElement(TierBadge, { tier: t.tier }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, background: tc + "22", color: tc, padding: "2px 8px", borderRadius: 5, fontWeight: 700 } }, fmtIcon[t.format] || "🏆", " ", fmtLabel[t.format] || t.format), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-faint)" } }, t.matchType, " \xB7 ", t.registeredCount, " entries")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)" } }, t.startDate, " \xB7 ", t.location)));
  }));
}
function TournamentDirectorScreen({ currentUser = null, profiles = [] }) {
  const [tab, setTab2] = useState(() => { try { return (sessionStorage.getItem("smaash_tourn") || new URLSearchParams(window.location.search).get("t")) ? "manage" : "list"; } catch (e) { return "list"; } });
  const [tournaments, setTournaments] = useState(MOCK_TOURNAMENTS_DATA);
  const loadTournaments = () => {
    const tok = smaashDB.auth.getToken() || SUPABASE_ANON_KEY;
    return fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/tournaments?select=*&order=created_at.desc", {
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok }
    }).then((r) => r.json()).then((data) => {
      if (Array.isArray(data)) setTournaments(data.map((t) => ({
        id: t.id,
        name: t.name,
        tier: t.tier || 2,
        format: t.format,
        matchType: t.match_type,
        seedingMethod: t.seeding_method,
        status: t.status,
        registeredCount: 0,
        drawSize: t.draw_size,
        startDate: t.start_date || "",
        location: t.location || "",
        entryFee: t.entry_fee_cad || 0,
        slug: t.sharelink_slug || null,
        bracket: null
      })));
    }).catch((e) => console.error("Load tournaments error:", e));
  };
  useEffect(() => { loadTournaments(); }, []);
  const [managed, setManaged2Raw] = useState(() => { try { return sessionStorage.getItem("smaash_tourn") || new URLSearchParams(window.location.search).get("t") || null; } catch (e) { return null; } });
  const setManaged2 = (id) => { setManaged2Raw(id); try { if (id) sessionStorage.setItem("smaash_tourn", id); else sessionStorage.removeItem("smaash_tourn"); window.history.replaceState({ screen: "more" }, "", id ? "/more?screen=tournament&t=" + id : "/more?screen=tournament"); } catch (e) {} };
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    name: "",
    location: "",
    startDate: "",
    matchType: "doubles",
    eventType: "tournament",
    format: "double_elimination",
    teamSize: 5,
    flexTeamSize: false,
    seedingMethod: "rating",
    entryCount: 16,
    minRating: "",
    maxRating: "",
    entryFee: 1,
    description: ""
  });
  const [formStep, setFormStep] = useState(1);
  const showToast = (msg, c = "var(--success)") => {
    setToast({ msg, c });
    setTimeout(() => setToast(null), 2600);
  };
  const setF = (k, v) => setForm((p) => __spreadProps(__spreadValues({}, p), { [k]: v }));
  const buildTeams = (players, teamSize) => {
    var _a;
    const teams = [];
    for (let i = 0; i < players.length; i += teamSize) {
      const members = players.slice(i, i + teamSize);
      teams.push({ id: "team_" + i, name: `Team ${String.fromCharCode(65 + teams.length)}`, members, rating: members.reduce((s, p) => s + p.rating, 0) / members.length, avatar: ((_a = members[0]) == null ? void 0 : _a.avatar) || "T", isTeam: true });
    }
    return teams;
  };
  const generateBracket = (entryList, format, seedingMethod) => {
    var _a, _b;
    let seeded = [...entryList];
    if (seedingMethod === "rating") seeded.sort((a, b) => b.rating - a.rating);
    else if (seedingMethod === "random") seeded.sort(() => Math.random() - 0.5);
    const n = seeded.length;
    if (format === "round_robin" || format === "league") {
      const matches = [];
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++)
        matches.push({ id: `rr_${i}_${j}`, entryA: seeded[i], entryB: seeded[j], scoreA: null, scoreB: null, status: "pending", round: "Round Robin" });
      return { type: "round_robin", matches, standings: seeded.map((e, i) => __spreadProps(__spreadValues({}, e), { pos: i + 1, wins: 0, losses: 0, pts: 0 })) };
    }
    if (format === "swiss") {
      const shuffled = [...seeded].sort(() => Math.random() - 0.5);
      const r1matches = [];
      for (let i = 0; i < shuffled.length - 1; i += 2)
        r1matches.push({ id: `sw_1_${i}`, entryA: shuffled[i], entryB: shuffled[i + 1], scoreA: null, scoreB: null, status: "pending", round: "Round 1" });
      return { type: "swiss", rounds: [{ round: 1, matches: r1matches }], currentRound: 1, standings: seeded.map((e) => __spreadProps(__spreadValues({}, e), { wins: 0, losses: 0, pts: 0 })) };
    }
    const bracketSize = Math.pow(2, Math.ceil(Math.log2(Math.max(n, 2))));
    const byes = bracketSize - n;
    const padded = [...seeded, ...Array(byes).fill({ id: "bye", name: "BYE", avatar: "--", rating: 0, isBye: true })];
    const seededOrder = [];
    let lo = 0, hi = padded.length - 1;
    while (lo <= hi) {
      seededOrder.push(padded[lo]);
      if (lo !== hi) seededOrder.push(padded[hi]);
      lo++;
      hi--;
    }
    const qfMatches = [];
    for (let i = 0; i < seededOrder.length - 1; i += 2)
      qfMatches.push({ id: `e_r1_${i}`, entryA: seededOrder[i], entryB: seededOrder[i + 1], scoreA: null, scoreB: null, status: ((_a = seededOrder[i + 1]) == null ? void 0 : _a.isBye) ? "bye" : "pending", round: `Round of ${bracketSize}`, winner: ((_b = seededOrder[i + 1]) == null ? void 0 : _b.isBye) ? seededOrder[i] : null });
    return { type: format, winnersBracket: [{ name: `Round of ${bracketSize}`, matches: qfMatches }], losersBracket: format !== "single_elimination" ? [] : null, grandFinal: null, allEntries: seeded };
  };
  const createTournament = () => {
    const tok = smaashDB.auth.getToken();
    const uid = currentUser == null ? void 0 : currentUser.id;
    if (!tok || !uid) { showToast("Sign in to create a tournament", "var(--danger)"); return; }
    const body = {
      name: form.name || "New Tournament",
      location: form.location || null,
      start_date: form.startDate || null,
      match_type: form.matchType,
      format: form.format,
      draw_size: form.entryCount,
      seeding_method: form.seedingMethod === "td_manual" ? "manual" : form.seedingMethod,
      entry_fee_cad: form.entryFee || 0,
      entry_restriction: "open",
      status: "registration_open",
      tier: 2,
      sharelink_slug: tSlug(form.name),
      created_by: uid
      // NOTE: applied_k_factor intentionally omitted \u2014 DB default (36) handles it; rating untouched.
    };
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/tournaments", {
      method: "POST",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=representation" },
      body: JSON.stringify(body)
    }).then(async (res) => {
      if (!res.ok) { console.error("Create tournament failed:", res.status, await res.text()); showToast("Create failed \u2014 try again", "var(--danger)"); return; }
      const rows = await res.json();
      const created = Array.isArray(rows) ? rows[0] : rows;
      await loadTournaments();
      if (created && created.id) setManaged2(created.id);
      setTab2("list");
      setFormStep(1);
      showToast("Tournament created \u2713");
    }).catch((e) => { console.error("Create tournament error:", e); showToast("Create failed", "var(--danger)"); });
  };
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, toast && /* @__PURE__ */ React.createElement(Toast, { msg: toast.msg, color: toast.c }), tab !== "manage" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "TOURNAMENT DIRECTOR"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 } }, "Create \xB7 Seed \xB7 Run \xB7 Score"), tab !== "create" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 0, marginBottom: 16, background: "var(--surface)", borderRadius: 10, padding: 3, border: "1px solid var(--border)" } }, [{ id: "list", label: "My Tournaments" }, { id: "create", label: "Create New" }].map((tb) => /* @__PURE__ */ React.createElement("button", { key: tb.id, onClick: () => setTab2(tb.id), style: { flex: 1, background: tab === tb.id ? "var(--border)" : "none", border: "none", borderRadius: 8, padding: "9px 0", fontSize: 10, fontWeight: 700, color: tab === tb.id ? "var(--text)" : "var(--text-faint)", cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 0.5 } }, tb.label)))), tab === "list" && /* @__PURE__ */ React.createElement(TournamentListView, { tournaments, setManaged: setManaged2, setTab: setTab2 }), tab === "create" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setTab2("list");
    setFormStep(1);
  }, style: { background: "none", border: "none", color: "var(--text-dim)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 16, padding: 0 } }, "\u2190 Back"), /* @__PURE__ */ React.createElement(TournamentCreateWizard, { form, setForm, formStep, setFormStep, createTournament, showToast, profiles })), tab === "manage" && managed && (tournaments.some((x) => x.id === managed) ? /* @__PURE__ */ React.createElement(TournamentManageView, { tId: managed, tournaments, profiles, showToast, refreshTournaments: loadTournaments }) : /* @__PURE__ */ React.createElement("div", { style: { color: "var(--text-faint)", padding: 20, fontSize: 12 } }, "Loading tournament…")));
}
function NotificationsScreen({ matches = [], currentUser = null, setScreen = null, setUnreadNotifs = null, setFocusMatchId = null }) {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const unread = notifications.filter((n) => !n.is_read).length;
  useEffect(() => {
    if (!(currentUser == null ? void 0 : currentUser.id)) {
      setLoading(false);
      return;
    }
    const tok = smaashDB.auth.getToken() || SUPABASE_ANON_KEY;
    fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/notifications?user_id=eq.${currentUser.id}&order=created_at.desc&limit=50`, {
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok }
    }).then((r) => r.json()).then((data) => {
      setLoading(false);
      if (Array.isArray(data)) {
        setNotifications(data.map((n) => __spreadProps(__spreadValues({}, n), { is_read: n.is_read || false })));
        if (setUnreadNotifs) setUnreadNotifs(0);
        // Persist "seen" so the bell badge actually clears and doesn't bounce back
        // from the background re-count. Local list keeps its read-state for this
        // visit, so the "new" highlights still show until you leave the screen.
        const tok2 = smaashDB.auth.getToken();
        const anyUnread = data.some((n) => !n.is_read);
        if (tok2 && anyUnread) {
          fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/notifications?user_id=eq.${currentUser.id}&is_read=eq.false`, {
            method: "PATCH",
            headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok2, "Content-Type": "application/json", "Prefer": "return=minimal" },
            body: JSON.stringify({ is_read: true })
          }).catch(() => {});
        }
      }
    }).catch(() => setLoading(false));
  }, [currentUser == null ? void 0 : currentUser.id]);
  const markAllRead = () => {
    const tok = smaashDB.auth.getToken();
    if (!tok || !(currentUser == null ? void 0 : currentUser.id)) return;
    fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/notifications?user_id=eq.${currentUser.id}&is_read=eq.false`, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ is_read: true })
    });
    setNotifications((n) => n.map((x) => __spreadProps(__spreadValues({}, x), { is_read: true })));
    if (setUnreadNotifs) setUnreadNotifs(0);
  };
  const markRead = (id, matchId, ntype, clubId) => {
    const tok = smaashDB.auth.getToken();
    if (tok) fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/notifications?id=eq.${id}`, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ is_read: true })
    });
    setNotifications((n) => n.map((x) => x.id === id ? __spreadProps(__spreadValues({}, x), { is_read: true }) : x));
    if (matchId) {
      if (setFocusMatchId) setFocusMatchId(matchId);
      if (setScreen) setScreen("feed");
      try { window.history.replaceState({ screen: "feed" }, "", "/community?match=" + matchId); } catch (e) {}
    } else if (ntype === "announcement" || clubId) {
      if (setScreen) setScreen("portal");
      try { window.history.replaceState({ screen: "portal" }, "", "/me?tab=club"); } catch (e) {}
    }
  };
  const pendingMatches = matches.filter((m) => m.status === "pending" && [m.player_a_id, m.player_b_id, m.partner_a_id, m.partner_b_id].includes(currentUser == null ? void 0 : currentUser.id)).slice(0, 3);
  const filtered = notifications.filter((n) => filter === "all" || filter === "unread" && !n.is_read);
  const typeIcon = { reaction: "🔥", comment: "💬", match_confirmed: "\u2705", match_disputed: "\u26A0", rating_up: "📈" };
  const typeColor = { reaction: "var(--warn)", comment: "var(--primary)", match_confirmed: "var(--success)", match_disputed: "var(--danger)", rating_up: "var(--purple)" };
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } },
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 } },
      /* @__PURE__ */ React.createElement("div", null,
        /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, letterSpacing: 3, color: "var(--text)", lineHeight: 1 } }, "NOTIFICATIONS"),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, textTransform: "uppercase", marginTop: 3 } }, unread, " unread")),
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, unread > 0 && /* @__PURE__ */ React.createElement("button", { onClick: markAllRead, style: { background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 12px", fontSize: 10, fontWeight: 700, color: "var(--text-faint)", cursor: "pointer", fontFamily: "inherit" } }, "Mark all read"), /* @__PURE__ */ React.createElement(ThemeToggle, null))),
    pendingMatches.map((m) => {
      var _a;
      return /* @__PURE__ */ React.createElement("div", { key: m.id, style: { background: "color-mix(in srgb, var(--warn) 4%, transparent)", border: "1px solid color-mix(in srgb, var(--warn) 20%, transparent)", borderRadius: 12, padding: "12px 14px", marginBottom: 10, display: "flex", gap: 10, alignItems: "center" } },
        /* @__PURE__ */ React.createElement("span", { style: { fontSize: 20 } }, "\u23F3"),
        /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } },
          /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--warn)" } }, "Match Pending Confirmation"),
          /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", marginTop: 2 } }, "vs ", (_a = m.playerB) == null ? void 0 : _a.name, " \xB7 Auto-confirms in ~60hrs")),
        /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } },
          /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 900, color: "var(--warn)", fontFamily: "'Bebas Neue',sans-serif" } }, "60h"),
          /* @__PURE__ */ React.createElement("div", { style: { fontSize: 8, color: "var(--text-faint)" } }, "LEFT")));
    }),
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 16 } },
      [{ v: "all", l: "All" }, { v: "unread", l: `Unread (${unread})` }].map((f) =>
        /* @__PURE__ */ React.createElement("button", { key: f.v, onClick: () => setFilter(f.v), style: { background: filter === f.v ? "color-mix(in srgb, var(--primary) 13%, transparent)" : "var(--surface)", border: `1px solid ${filter === f.v ? "color-mix(in srgb, var(--primary) 27%, transparent)" : "var(--border)"}`, borderRadius: 7, padding: "6px 12px", fontSize: 10, fontWeight: 700, color: filter === f.v ? "var(--primary)" : "var(--text-faint)", cursor: "pointer", fontFamily: "inherit" } }, f.l))),
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } },
      filtered.map((n) => {
        const nc = typeColor[n.type] || "var(--primary)";
        return /* @__PURE__ */ React.createElement("div", { key: n.id, onClick: () => markRead(n.id, n.match_id, n.type, n.club_id), style: { background: "var(--surface)", borderRadius: 12, padding: "13px 14px", border: `1px solid ${n.is_read ? "var(--border)" : nc + "33"}`, cursor: "pointer", position: "relative", overflow: "hidden" } },
          !n.is_read && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 0, left: 0, bottom: 0, width: 3, background: nc, borderRadius: "3px 0 0 3px" } }),
          /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "flex-start", paddingLeft: n.is_read ? 0 : 6 } },
            /* @__PURE__ */ React.createElement("div", { style: { width: 34, height: 34, borderRadius: 9, background: nc + "22", border: `1px solid ${nc}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 } }, typeIcon[n.type] || "📣"),
            /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } },
              /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 3 } },
                /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: n.is_read ? "var(--text-muted)" : "var(--text)" } }, n.message || "New notification"),
                /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, color: "var(--text-faint)", flexShrink: 0, marginLeft: 8 } }, n.created_at ? new Date(n.created_at).toLocaleDateString() : "")),
              n.match_id && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: nc, marginTop: 3 } }, "Tap to view in Community \u2192"), !n.match_id && (n.type === "announcement" || n.club_id) && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: nc, marginTop: 3 } }, "Tap to view club \u2192"))));
      })));
}
