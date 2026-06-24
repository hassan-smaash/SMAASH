function RivalryScreen({ matches = [], profiles: profiles2 = [], currentUser = null }) {
  var _a, _b;
  const ME = profiles2.find((p) => p.id === (currentUser == null ? void 0 : currentUser.id));
  const [selected, setSelected] = useState(null);
  if (!ME || !currentUser) return /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "40px 20px", color: "var(--text-faint)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 36, marginBottom: 10 } }, "\u2694\uFE0F"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "var(--text-dim)" } }, "Log in to see your rivalries"));
  const rivals = profiles2.filter((p) => p.id !== ME.id).map((p) => {
    const h2h = matches.filter((m) => {
      if (!["confirmed", "auto_confirmed"].includes(m.status)) return false;
      const iAmA = m.player_a_id === ME.id || m.partner_a_id === ME.id;
      const iAmB = m.player_b_id === ME.id || m.partner_b_id === ME.id;
      if (!iAmA && !iAmB) return false;
      const theyAreA = m.player_a_id === p.id || m.partner_a_id === p.id;
      const theyAreB = m.player_b_id === p.id || m.partner_b_id === p.id;
      if (iAmA && theyAreA) return false;
      if (iAmB && theyAreB) return false;
      return theyAreA || theyAreB;
    });
    const wins = h2h.filter((m) => {
      const sets = (() => {
        try {
          return Array.isArray(m.sets) ? m.sets : JSON.parse(m.sets || "[]");
        } catch (e) {
          return [];
        }
      })();
      const sWA = sets.filter((s) => s.a > s.b).length;
      const sWB = sets.filter((s) => s.b > s.a).length;
      const iAmA = m.player_a_id === ME.id || m.partner_a_id === ME.id;
      return iAmA ? sWA > sWB : sWB > sWA;
    }).length;
    return { player: p, played: h2h.length, wins, losses: h2h.length - wins, winRate: h2h.length > 0 ? Math.round(wins / h2h.length * 100) : 0 };
  }).filter((r) => r.played > 0).sort((a, b) => b.played - a.played);
  const allRivals = rivals;
  if (allRivals.length === 0) return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "RIVALRIES"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, marginBottom: 20 } }, "HEAD-TO-HEAD RECORDS"), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "40px 20px", background: "var(--surface)", borderRadius: 14, border: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 40, marginBottom: 12 } }, "\u2694\uFE0F"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "var(--text-dim)" } }, "No rivalries yet"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text-faint)", marginTop: 6 } }, "Play matches against the same opponent to build a rivalry record")));
  if (selected) {
    const r = allRivals.find((x) => x.player.id === selected);
    if (!r) {
      setSelected(null);
      return null;
    }
    const tc = ((_a = TIERS.find((t) => t.id === r.player.tier)) == null ? void 0 : _a.color) || "var(--primary)";
    const myColor = r.winRate >= 50 ? "var(--success)" : "var(--danger)";
    return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setSelected(null), style: { background: "none", border: "none", color: "var(--text-dim)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 16, padding: 0 } }, "\u2190 Back to Rivals"), /* @__PURE__ */ React.createElement("div", { style: { background: `linear-gradient(135deg,${tc}14,var(--surface))`, border: `1px solid ${tc}33`, borderRadius: 16, padding: "18px", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, alignItems: "center", marginBottom: 16 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: r.player.avatar, size: 52, color: tc, photo: r.player.photo }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: 2, color: "var(--text)", lineHeight: 1 } }, r.player.name), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 4, alignItems: "center" } }, /* @__PURE__ */ React.createElement(TierBadge, { tier: r.player.tier }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "var(--text-dim)" } }, (2 + ((r.player.doublesRating || r.player.rating || 500) - 100) / 2400 * 6).toFixed(3))))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 8, alignItems: "center", background: "var(--sunken)", borderRadius: 12, padding: "14px" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)", marginBottom: 4 } }, "You"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 36, fontWeight: 900, color: myColor, fontFamily: "'Bebas Neue',sans-serif" } }, r.wins), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)" } }, "WINS")), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "0 10px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: "var(--border-strong)" } }, "vs"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", marginTop: 4 } }, r.played, " matches")), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)", marginBottom: 4 } }, r.player.name.split(" ")[0]), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 36, fontWeight: 900, color: r.winRate < 50 ? "var(--success)" : "var(--danger)", fontFamily: "'Bebas Neue',sans-serif" } }, r.losses), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)" } }, "WINS")))), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, padding: "13px 16px", marginBottom: 14, border: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-dim)", letterSpacing: 1 } }, "WIN RATE"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 800, color: myColor } }, r.winRate, "%")), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--border)", borderRadius: 4, height: 8, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { width: r.winRate + "%", height: "100%", background: myColor, borderRadius: 4 } }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 } }, [{ l: "Matches Played", v: r.played }, { l: "Your Win Rate", v: r.winRate + "%" }, { l: "Your Rating", v: toDisplayRating(ME.doublesRating || ME.rating || 500).toFixed(3) }, { l: "Their Rating", v: toDisplayRating(r.player.doublesRating || r.player.rating || 500).toFixed(3) }].map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: "var(--surface)", borderRadius: 10, padding: "11px 13px", border: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 900, color: "var(--text)", fontFamily: "'Bebas Neue',sans-serif" } }, s.v), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", letterSpacing: 1, marginTop: 2 } }, s.l.toUpperCase())))), r.lastMatch && /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, padding: "12px 14px", border: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 1.5, marginBottom: 8 } }, "LAST MATCH"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement(TierBadge, { tier: r.lastMatch.tier }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "var(--text-muted)" } }, r.lastMatch.date, " \xB7 ", (_b = r.lastMatch.sets) == null ? void 0 : _b.map((s) => `${s.a}-${s.b}`).join(", ")), /* @__PURE__ */ React.createElement(RatingImpactBadge, { match: r.lastMatch, playerId: ME.id }))));
  }
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "RIVALRIES"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 } }, "Head-to-Head Records"), allRivals.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "40px 20px", color: "var(--text-faint)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 36, marginBottom: 10 } }, "\u2694\uFE0F"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text-dim)" } }, "No rivalries yet"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-faint)", marginTop: 4 } }, "Play confirmed matches to build your rivalry record")) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, allRivals.map((r) => {
    var _a2;
    const tc = ((_a2 = TIERS.find((t) => t.id === r.player.tier)) == null ? void 0 : _a2.color) || "var(--primary)";
    const myColor = r.winRate >= 50 ? "var(--success)" : "var(--danger)";
    return /* @__PURE__ */ React.createElement("div", { key: r.player.id, onClick: () => setSelected(r.player.id), style: { background: "var(--surface)", borderRadius: 12, padding: "13px 14px", border: "1px solid var(--border)", cursor: "pointer", display: "flex", gap: 10, alignItems: "center" }, onMouseOver: (e) => e.currentTarget.style.borderColor = "var(--border-strong)", onMouseOut: (e) => e.currentTarget.style.borderColor = "var(--border)" }, /* @__PURE__ */ React.createElement(Avatar, { initials: r.player.avatar, size: 40, color: tc, photo: r.player.photo }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text)" } }, r.player.name), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 2, alignItems: "center" } }, /* @__PURE__ */ React.createElement(TierBadge, { tier: r.player.tier }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-dim)" } }, r.played, " matches"))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 900, fontFamily: "'Bebas Neue',sans-serif" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "var(--success)" } }, r.wins), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--border-strong)", fontSize: 14 } }, " - "), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--danger)" } }, r.losses)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: myColor, fontWeight: 700, marginTop: 2 } }, r.winRate, "% WIN")));
  })));
}
function HeatmapScreen({ matches = [], profiles: profiles2 = [], currentUser = null, myProfile = null }) {
  const myId = currentUser == null ? void 0 : currentUser.id;
  const tc = "var(--purple)";
  const [selectedH2HId, setSelectedH2HId] = useState("");
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const myMatches = matches.filter(
    (m) => (m.status === "confirmed" || m.status === "auto_confirmed") && (m.player_a_id === myId || m.player_b_id === myId || m.partner_a_id === myId || m.partner_b_id === myId)
  );
  const getName = (id) => {
    var _a;
    return ((_a = profiles2.find((p) => p.id === id)) == null ? void 0 : _a.name) || "Unknown";
  };
  const isWin = (m) => {
    const isA = m.player_a_id === myId || m.partner_a_id === myId;
    const ws = (m.winner_side || "").toUpperCase();
    return isA && ws === "A" || !isA && ws === "B";
  };
  const ratingTrend = (() => {
    const sorted = [...myMatches].sort((a, b) => new Date(a.submitted_at || a.played_at) - new Date(b.submitted_at || b.played_at));
    let r = 500;
    const points = [{ r }];
    sorted.forEach((m) => {
      const isA = m.player_a_id === myId || m.partner_a_id === myId;
      const delta = isA ? m.rating_change_a || 0 : m.rating_change_b || 0;
      r = Math.max(100, Math.min(2500, r + delta));
      points.push({ r, date: m.played_at });
    });
    return points.slice(-15);
  })();
  const currentRating = (myProfile == null ? void 0 : myProfile.doublesRating) || 500;
  const displayRating = (2 + (currentRating - 100) / 2400 * 6).toFixed(3);
  const h2h = (() => {
    const map = {};
    myMatches.forEach((m) => {
      const isA = m.player_a_id === myId || m.partner_a_id === myId;
      const oppIds = isA ? [m.player_b_id, m.partner_b_id].filter(Boolean) : [m.player_a_id, m.partner_a_id].filter(Boolean);
      oppIds.forEach((oppId) => {
        if (!map[oppId]) map[oppId] = { wins: 0, losses: 0 };
        if (isWin(m)) map[oppId].wins++;
        else map[oppId].losses++;
      });
    });
    return Object.entries(map).map(([id, s]) => __spreadProps(__spreadValues({ id, name: getName(id) }, s), { played: s.wins + s.losses, winRate: Math.round(s.wins / (s.wins + s.losses) * 100) })).sort((a, b) => b.played - a.played).slice(0, 8);
  })();
  const partnerStats = (() => {
    const map = {};
    myMatches.forEach((m) => {
      const isA = m.player_a_id === myId || m.partner_a_id === myId;
      let partnerId = null;
      if (m.player_a_id === myId) partnerId = m.partner_a_id;
      else if (m.partner_a_id === myId) partnerId = m.player_a_id;
      else if (m.player_b_id === myId) partnerId = m.partner_b_id;
      else if (m.partner_b_id === myId) partnerId = m.player_b_id;
      if (!partnerId) return;
      if (!map[partnerId]) map[partnerId] = { wins: 0, losses: 0 };
      if (isWin(m)) map[partnerId].wins++;
      else map[partnerId].losses++;
    });
    return Object.entries(map).map(([id, s]) => __spreadProps(__spreadValues({ id, name: getName(id) }, s), { played: s.wins + s.losses, winRate: Math.round(s.wins / (s.wins + s.losses) * 100) })).sort((a, b) => b.played - a.played);
  })();
  const bestPartner = [...partnerStats].filter((p) => p.played >= 2).sort((a, b) => b.winRate - a.winRate)[0];
  const worstPartner = [...partnerStats].filter((p) => p.played >= 2).sort((a, b) => a.winRate - b.winRate)[0];
  const freqPartner = partnerStats[0];
  const monthlyActivity = (() => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = /* @__PURE__ */ new Date();
      d.setMonth(d.getMonth() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = d.toLocaleString("default", { month: "short" });
      const count = myMatches.filter((m) => (m.played_at || "").startsWith(key)).length;
      months.push({ label, count });
    }
    return months;
  })();
  const maxActivity = Math.max(...monthlyActivity.map((m) => m.count), 1);
  const totalPlayed = myMatches.length;
  const totalWins = myMatches.filter(isWin).length;
  if (!myId) return /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "60px 20px", color: "var(--text-faint)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 36, marginBottom: 12 } }, "📈"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "var(--text-dim)" } }, "Sign in to see your analytics"));
  if (totalPlayed === 0) return /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "60px 20px", color: "var(--text-faint)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 36, marginBottom: 12 } }, "📈"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "var(--text-dim)" } }, "No matches yet"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, marginTop: 4 } }, "Play some matches to unlock your analytics"));
  const card = (children, style = {}) => /* @__PURE__ */ React.createElement("div", { style: __spreadValues({ background: "var(--surface)", borderRadius: 14, padding: "14px 16px", border: "1px solid var(--border)", marginBottom: 12 }, style) }, children);
  const sectionTitle = (t) => /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 2, color: "var(--text)", marginBottom: 12 } }, t);
  const statsItems = [
    { label: "Rating", value: displayRating, color: tc },
    { label: "Played", value: totalPlayed, color: "var(--text)" },
    { label: "Wins", value: totalWins, color: "var(--success)" },
    { label: "Win %", value: totalPlayed > 0 ? Math.round(totalWins / totalPlayed * 100) + "%" : "--", color: totalPlayed > 0 && totalWins / totalPlayed >= 0.5 ? "var(--success)" : "var(--danger)" }
  ];
  const sections = [];
  sections.push(card(/* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 } },
    ...statsItems.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { textAlign: "center" } },
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 900, color: s.color, fontFamily: "'Bebas Neue',sans-serif" } }, s.value),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", letterSpacing: 1 } }, s.label.toUpperCase()))))));
  sections.push(card(/* @__PURE__ */ React.createElement(React.Fragment, null,
    sectionTitle("\uD83D\uDCC8 RATING TREND"),
    ratingTrend.length > 1 ? (() => {
      const vals = ratingTrend.map((p) => p.r);
      const minV = Math.min(...vals), maxV = Math.max(...vals);
      const range = Math.max(maxV - minV, 50);
      const W = 280, H = 60;
      const x = (i) => i / (vals.length - 1) * W;
      const y = (v) => H - (v - minV) / range * (H - 8) - 4;
      const pts = vals.map((v, i) => `${x(i)},${y(v)}`).join(" ");
      return /* @__PURE__ */ React.createElement("div", null,
        /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 4 } },
          /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-faint)" } }, (2 + (Math.min(...vals) - 100) / 2400 * 6).toFixed(3)),
          /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: tc } }, displayRating)),
        /* @__PURE__ */ React.createElement("svg", { width: "100%", viewBox: `0 0 ${W} ${H}`, style: { overflow: "visible" } },
          /* @__PURE__ */ React.createElement("defs", null,
            /* @__PURE__ */ React.createElement("linearGradient", { id: "rg", x1: "0", y1: "0", x2: "0", y2: "1" },
              /* @__PURE__ */ React.createElement("stop", { offset: "0%", stopColor: tc, stopOpacity: "0.3" }),
              /* @__PURE__ */ React.createElement("stop", { offset: "100%", stopColor: tc, stopOpacity: "0" }))),
          /* @__PURE__ */ React.createElement("polygon", { points: `0,${H} ${pts} ${W},${H}`, fill: "url(#rg)" }),
          /* @__PURE__ */ React.createElement("polyline", { points: pts, fill: "none", stroke: tc, strokeWidth: "2" }),
          ...vals.map((v, i) => /* @__PURE__ */ React.createElement("circle", { key: i, cx: x(i), cy: y(v), r: i === vals.length - 1 ? 4 : 2, fill: i === vals.length - 1 ? tc : "var(--border)", stroke: tc, strokeWidth: "1.5" }))),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", marginTop: 4, textAlign: "right" } }, "Last ", ratingTrend.length - 1, " matches"));
    })() : /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-faint)" } }, "Need more matches for trend"))));
  sections.push(card(/* @__PURE__ */ React.createElement(React.Fragment, null,
    sectionTitle("\uD83D\uDCC5 MONTHLY ACTIVITY"),
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "flex-end", height: 60 } },
      ...monthlyActivity.map((m, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 } },
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: m.count > 0 ? "var(--primary)" : "var(--border-strong)" } }, m.count || ""),
        /* @__PURE__ */ React.createElement("div", { style: { width: "100%", background: m.count > 0 ? "color-mix(in srgb, var(--primary) 13%, transparent)" : "var(--border)", borderRadius: "4px 4px 0 0", height: m.count > 0 ? `${Math.max(8, m.count / maxActivity * 44)}px` : "4px", borderTop: m.count > 0 ? "2px solid color-mix(in srgb, var(--primary) 33%, transparent)" : "none", transition: "height 0.3s" } }),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)" } }, m.label)))))));
  if (partnerStats.length > 0) {
    sections.push(card(/* @__PURE__ */ React.createElement(React.Fragment, null,
      sectionTitle("\uD83E\uDD1D PARTNER STATS"),
      /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 } },
        ...[{ label: "Most Frequent", p: freqPartner, color: "var(--primary)" }, { label: "Best Record", p: bestPartner, color: "var(--success)" }, { label: "Worst Record", p: worstPartner, color: "var(--danger)" }].map(({ label, p, color }) =>
          p ? /* @__PURE__ */ React.createElement("div", { key: label, style: { background: "var(--sunken)", borderRadius: 10, padding: "10px 8px", textAlign: "center" } },
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", letterSpacing: 1, marginBottom: 4 } }, label.toUpperCase()),
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--text)", marginBottom: 2 } }, p.name.split(" ")[0]),
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color } }, p.winRate, "% W"),
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)" } }, p.played, " matches")) : null)),
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } },
        ...partnerStats.slice(0, 5).map((p) => /* @__PURE__ */ React.createElement("div", { key: p.id, style: { display: "flex", alignItems: "center", gap: 10 } },
          /* @__PURE__ */ React.createElement("div", { style: { width: 32, height: 32, borderRadius: 8, background: "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "var(--text-muted)", flexShrink: 0 } }, p.name.slice(0, 2).toUpperCase()),
          /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } },
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--text)" } }, p.name),
            /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, marginTop: 2 } },
              /* @__PURE__ */ React.createElement("div", { style: { flex: 1, height: 4, background: "var(--border)", borderRadius: 2, overflow: "hidden" } },
                /* @__PURE__ */ React.createElement("div", { style: { width: p.winRate + "%", height: "100%", background: p.winRate >= 50 ? "var(--success)" : "var(--danger)", borderRadius: 2 } })),
              /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: 700, color: p.winRate >= 50 ? "var(--success)" : "var(--danger)", flexShrink: 0 } }, p.winRate, "%"))),
          /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right", flexShrink: 0 } },
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--success)", fontWeight: 700 } }, p.wins, "W"),
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--danger)", fontWeight: 700 } }, p.losses, "L"))))))));
  }
  if (h2h.length > 0) {
    sections.push(card(/* @__PURE__ */ React.createElement(React.Fragment, null,
      sectionTitle("\u2694 H2H DRILL DOWN"),
      /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 } },
        /* @__PURE__ */ React.createElement("div", null,
          /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", letterSpacing: 1, marginBottom: 4 } }, "VS OPPONENT"),
          /* @__PURE__ */ React.createElement("select", { value: selectedH2HId, onChange: (e) => { setSelectedH2HId(e.target.value); setSelectedPartnerId(""); }, style: { width: "100%", background: "var(--sunken)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 10px", color: selectedH2HId ? "var(--text)" : "var(--text-faint)", fontSize: 12, fontFamily: "inherit" } },
            /* @__PURE__ */ React.createElement("option", { value: "" }, "Choose opponent..."),
            ...h2h.map((opp) => /* @__PURE__ */ React.createElement("option", { key: opp.id, value: opp.id }, opp.name + " (" + opp.wins + "W-" + opp.losses + "L)")))),
        /* @__PURE__ */ React.createElement("div", null,
          /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", letterSpacing: 1, marginBottom: 4 } }, "WITH PARTNER"),
          /* @__PURE__ */ React.createElement("select", { value: selectedPartnerId, onChange: (e) => { setSelectedPartnerId(e.target.value); setSelectedH2HId(""); }, style: { width: "100%", background: "var(--sunken)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 10px", color: selectedPartnerId ? "var(--text)" : "var(--text-faint)", fontSize: 12, fontFamily: "inherit" } },
            /* @__PURE__ */ React.createElement("option", { value: "" }, "Choose partner..."),
            ...partnerStats.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name + " (" + p.wins + "W-" + p.losses + "L)"))))),
      (() => {
        const filterId = selectedH2HId || selectedPartnerId;
        const isOpponent = !!selectedH2HId;
        if (!filterId) return /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "16px", color: "var(--text-faint)", fontSize: 11 } }, "Select a player above to see detailed history");
        const selectedName = getName(filterId);
        const filteredMatches = myMatches.filter((m) => {
          const isA = m.player_a_id === myId || m.partner_a_id === myId;
          const ids = isOpponent ? (isA ? [m.player_b_id, m.partner_b_id] : [m.player_a_id, m.partner_a_id]) : (isA ? [m.partner_a_id] : [m.partner_b_id]);
          return ids.filter(Boolean).includes(filterId);
        }).sort((a, b) => new Date(b.played_at) - new Date(a.played_at));
        const wins = filteredMatches.filter((m) => isWin(m)).length;
        const losses = filteredMatches.length - wins;
        const winRate = filteredMatches.length > 0 ? Math.round(wins / filteredMatches.length * 100) : 0;
        return /* @__PURE__ */ React.createElement("div", null,
          /* @__PURE__ */ React.createElement("div", { style: { background: "var(--sunken)", borderRadius: 10, padding: "12px 14px", marginBottom: 10 } },
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--text)", marginBottom: 8 } }, isOpponent ? "vs " : "with ", selectedName),
            /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 } },
              ...([{ l: "Played", v: filteredMatches.length, c: "var(--text-muted)" }, { l: "Wins", v: wins, c: "var(--success)" }, { l: "Win %", v: winRate + "%", c: winRate >= 50 ? "var(--success)" : "var(--danger)" }].map((s) =>
                /* @__PURE__ */ React.createElement("div", { key: s.l, style: { textAlign: "center" } },
                  /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 900, color: s.c, fontFamily: "'Bebas Neue',sans-serif" } }, s.v),
                  /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", letterSpacing: 1 } }, s.l.toUpperCase()))))),
            /* @__PURE__ */ React.createElement("div", { style: { height: 5, background: "var(--border)", borderRadius: 3, marginTop: 10, overflow: "hidden" } },
              /* @__PURE__ */ React.createElement("div", { style: { width: winRate + "%", height: "100%", background: winRate >= 50 ? "var(--success)" : "var(--danger)", borderRadius: 3 } }))),
          ...filteredMatches.map((m) => {
            const sets = (() => { try { return Array.isArray(m.sets) ? m.sets : JSON.parse(m.sets || "[]"); } catch (e) { return []; } })();
            const won = isWin(m);
            const isA = m.player_a_id === myId || m.partner_a_id === myId;
            const ratingChange = isA ? (m.rating_change_pa || m.rating_change_a || 0) : (m.rating_change_pb || m.rating_change_b || 0);
            return /* @__PURE__ */ React.createElement("div", { key: m.id, style: { background: "var(--surface)", borderRadius: 10, padding: "10px 12px", marginBottom: 6, border: "1px solid " + (won ? "color-mix(in srgb, var(--success) 13%, transparent)" : "color-mix(in srgb, var(--danger) 13%, transparent)"), display: "flex", gap: 8, alignItems: "center" } },
              /* @__PURE__ */ React.createElement("div", { style: { width: 3, alignSelf: "stretch", borderRadius: 2, background: won ? "var(--success)" : "var(--danger)", flexShrink: 0 } }),
              /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } },
                /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5, alignItems: "center", marginBottom: 2 } },
                  /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: 700, color: won ? "var(--success)" : "var(--danger)" } }, won ? "W" : "L"),
                  /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, color: "var(--text-faint)" } }, (m.played_at || "").split("T")[0])),
                /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)" } }, sets.map((s) => s.a + "-" + s.b).join(", "))),
              ratingChange !== 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: ratingChange > 0 ? "var(--success)" : "var(--danger)", flexShrink: 0 } }, fmtChange(ratingChange)));
          }));
      })())));
  }
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } },
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "MY ANALYTICS"),
    /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-faint)", marginBottom: 16 } }, "Based on ", totalPlayed, " confirmed matches"),
    ...sections);
}
function LadderNightScreen({ matches = [], setMatches }) {
  const [tab, setTab2] = useState("ladder");
  const [creating, setCreating] = useState(false);
  const [ladder, setLadder] = useState(MOCK_LADDER);
  const [challenge, setChallenge] = useState(null);
  const [nightName, setNightName] = useState("April Ladder Night");
  const [toast, setToast] = useState(null);
  const showToast = (msg, c = "var(--success)") => {
    setToast({ msg, c });
    setTimeout(() => setToast(null), 2400);
  };
  const issueChallenge = (fromId, toId) => {
    setChallenge({ from: ladder.find((p) => p.id === fromId), to: ladder.find((p) => p.id === toId) });
  };
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, toast && /* @__PURE__ */ React.createElement(Toast, { msg: toast.msg, color: toast.c }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "LADDER NIGHTS"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 } }, "Club Internal Rankings"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 0, marginBottom: 16, background: "var(--surface)", borderRadius: 10, padding: 3, border: "1px solid var(--border)" } }, [{ id: "ladder", label: "Current Ladder" }, { id: "create", label: "Run Session" }, { id: "history", label: "Past Sessions" }].map((tb) => /* @__PURE__ */ React.createElement("button", { key: tb.id, onClick: () => setTab2(tb.id), style: { flex: 1, background: tab === tb.id ? "var(--border)" : "none", border: "none", borderRadius: 8, padding: "9px 0", fontSize: 9, fontWeight: 700, color: tab === tb.id ? "var(--text)" : "var(--text-faint)", cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 0.5 } }, tb.label))), tab === "ladder" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb, var(--primary) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 13%, transparent)", borderRadius: 10, padding: "9px 14px", marginBottom: 14, fontSize: 11, color: "var(--primary)" } }, "ICCO Badminton \xB7 Season 1 \xB7 Updated after each night"), challenge && /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb, var(--purple) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--purple) 20%, transparent)", borderRadius: 12, padding: "13px 14px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--purple)", marginBottom: 8 } }, "\u26A1 Active Challenge"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text)" } }, "#", challenge.from.pos, " ", challenge.from.name), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--border-strong)" } }, "vs"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text)" } }, "#", challenge.to.pos, " ", challenge.to.name)), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setChallenge(null);
    showToast("Match recorded \u2014 ladder updated!");
  }, style: { background: "color-mix(in srgb, var(--success) 13%, transparent)", border: "1px solid color-mix(in srgb, var(--success) 27%, transparent)", borderRadius: 8, padding: "9px 0", fontSize: 11, fontWeight: 700, color: "var(--success)", cursor: "pointer", fontFamily: "inherit" } }, "\u2713 ", challenge.from.name.split(" ")[0], " Won"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setChallenge(null);
    showToast("Match recorded \u2014 ladder updated!");
  }, style: { background: "color-mix(in srgb, var(--danger) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--danger) 20%, transparent)", borderRadius: 8, padding: "9px 0", fontSize: 11, fontWeight: 700, color: "var(--danger)", cursor: "pointer", fontFamily: "inherit" } }, "\u2713 ", challenge.to.name.split(" ")[0], " Won"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, ladder.map((p, i) => {
    const moved = p.prevPos - p.pos;
    const canChallenge = i > 0;
    return /* @__PURE__ */ React.createElement("div", { key: p.id, style: { background: "var(--surface)", borderRadius: 11, padding: "11px 14px", border: `1px solid ${i === 0 ? "color-mix(in srgb, var(--warn) 20%, transparent)" : "var(--border)"}`, display: "flex", alignItems: "center", gap: 10 } }, i === 0 && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute" } }), /* @__PURE__ */ React.createElement("div", { style: { width: 28, height: 28, borderRadius: "50%", background: i === 0 ? "color-mix(in srgb, var(--warn) 13%, transparent)" : i === 1 ? "color-mix(in srgb, var(--text-muted) 13%, transparent)" : i === 2 ? "#fb923c22" : "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: i < 3 ? 14 : 11, fontWeight: 800, color: i === 0 ? "var(--warn)" : i === 1 ? "var(--text-muted)" : i === 2 ? "#fb923c" : "var(--text-faint)", flexShrink: 0 } }, i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : p.pos), /* @__PURE__ */ React.createElement(Avatar, { initials: p.avatar, size: 32, color: i === 0 ? "var(--warn)" : "var(--primary)" }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text)" } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)" } }, p.wins, "W ", p.losses, "L \xB7 ", p.rating)), moved !== 0 && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: 700, color: moved > 0 ? "var(--success)" : "var(--danger)" } }, moved > 0 ? "\u25B2" : "\u25BC", Math.abs(moved)), canChallenge && /* @__PURE__ */ React.createElement("button", { onClick: () => issueChallenge(p.id, ladder[i - 1].id), style: { background: "color-mix(in srgb, var(--primary) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)", borderRadius: 7, padding: "5px 10px", fontSize: 9, fontWeight: 700, color: "var(--primary)", cursor: "pointer", fontFamily: "inherit", flexShrink: 0 } }, "Challenge #", p.pos - 1));
  }))), tab === "create" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 6 } }, "Session Name"), /* @__PURE__ */ React.createElement("input", { value: nightName, onChange: (e) => setNightName(e.target.value), style: { width: "100%", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 14px", color: "var(--text)", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" } })), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, padding: "14px", border: "1px solid var(--border)", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 10 } }, "Participants (", MOCK_LADDER.length, ")"), MOCK_LADDER.map((p) => /* @__PURE__ */ React.createElement("div", { key: p.id, style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 8 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: p.avatar, size: 28, color: "var(--primary)" }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "var(--text)", flex: 1 } }, p.name), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "var(--text-dim)" } }, p.rating)))), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, padding: "14px", border: "1px solid var(--border)", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 10 } }, "Format"), [{ l: "Round Robin", d: "Everyone plays everyone", icon: "🔄" }, { l: "King of the Court", d: "Winners stay on", icon: "👑" }, { l: "Swiss System", d: "Matched by current standing", icon: "🔀" }].map((f, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 10, alignItems: "center", padding: "10px 0", borderBottom: i < 2 ? "1px solid var(--border)" : "none" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18 } }, f.icon), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--text-muted)" } }, f.l), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)" } }, f.d)), /* @__PURE__ */ React.createElement("input", { type: "radio", name: "format", style: { accentColor: "var(--primary)" } })))), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setTab2("ladder");
    showToast(`${nightName} started! Players can now issue challenges.`);
  }, style: { width: "100%", background: "linear-gradient(135deg,var(--primary),var(--primary-deep))", color: "var(--bg)", border: "none", borderRadius: 10, padding: "13px", fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" } }, "Start Ladder Night")), tab === "history" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, [{ name: "March Ladder Night", date: "2026-03-15", matches: 12, winner: "Marcus Chen" }, { name: "February Ladder Night", date: "2026-02-20", matches: 10, winner: "James Okafor" }, { name: "January Opener", date: "2026-01-18", matches: 8, winner: "Aisha Patel" }].map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: "var(--surface)", borderRadius: 11, padding: "12px 14px", border: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: "var(--text)", fontSize: 13, marginBottom: 4 } }, s.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)" } }, s.date, " \xB7 ", s.matches, " matches played"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--warn)", marginTop: 4 } }, "🏆 ", s.winner)))));
}
function LegalScreen() {
  const [doc, setDoc] = useState(null);
  const docs = [
    {
      id: "tos",
      icon: "📄",
      title: "Terms of Service",
      status: "draft",
      summary: "Governs use of the SMAASH platform, match submission rules, account conduct, and dispute resolution.",
      sections: [
        { title: "1. Acceptance of Terms", body: "By creating a SMAASH account you agree to these Terms of Service. SMAASH is currently in Pilot Beta and is available by invitation only. These terms will be updated before public launch." },
        { title: "2. Match Integrity", body: "Players must submit accurate match scores. Deliberately submitting false scores is grounds for account suspension. The dispute resolution system exists to handle genuine disagreements \u2014 abuse of the dispute system may result in restrictions." },
        { title: "3. Rating System", body: "SMAASH ratings are calculated automatically using the Glicko-2 algorithm. Ratings cannot be manually adjusted by players. The SMAASH admin team reserves the right to void matches found to be fraudulent." },
        { title: "4. Account Termination", body: "SMAASH reserves the right to suspend or terminate accounts found to be in breach of these terms, including but not limited to: creating multiple accounts, submitting fraudulent scores, or harassing other players." },
        { title: "5. Limitation of Liability", body: "SMAASH is provided as-is during the pilot phase. We make no guarantees about rating accuracy, uptime, or data retention during the pilot period." }
      ]
    },
    {
      id: "privacy",
      icon: "🔒",
      title: "Privacy Policy",
      status: "draft",
      summary: "How SMAASH collects, stores, and uses your personal data. Compliant with Canadian PIPEDA.",
      sections: [
        { title: "1. Data We Collect", body: "We collect: your name, email address, date of birth, gender, location, and profile photo (optional). We also collect match data including scores, dates, and opponent information." },
        { title: "2. How We Use Your Data", body: "Your data is used to: calculate your SMAASH rating, display your profile on the leaderboard (once you have 5+ matches), and facilitate match confirmation between players." },
        { title: "3. Data Storage", body: "All data is stored securely on Supabase infrastructure (hosted on AWS). Data is encrypted at rest and in transit. We do not sell your data to third parties." },
        { title: "4. Your Rights (PIPEDA)", body: "Under Canada's Personal Information Protection and Electronic Documents Act (PIPEDA), you have the right to: access your personal data, correct inaccurate data, withdraw consent, and request deletion of your account and data." },
        { title: "5. Contact", body: "For privacy concerns contact: hassan.ut@gmail.com. We will respond within 30 days." }
      ]
    },
    {
      id: "community",
      icon: "🤝",
      title: "Community Guidelines",
      status: "draft",
      summary: "Fair play standards, anti-sandbagging rules, and conduct expectations for all SMAASH players.",
      sections: [
        { title: "Fair Play", body: "Submit accurate scores. Intentionally losing to manipulate your rating (sandbagging) is prohibited. The SMAASH anti-fraud system monitors for unusual rating patterns." },
        { title: "Disputes", body: "Use the dispute system only for genuine score disagreements. Filing frivolous disputes may result in dispute privileges being temporarily suspended (3 warnings = 30-day restriction)." },
        { title: "Respect", body: "Treat all players with respect. Harassment, discrimination, or abusive conduct toward other players will result in immediate account suspension." },
        { title: "Multiple Accounts", body: "One account per person. Multiple accounts are prohibited and will be merged or deleted. Your identity is verified through email." }
      ]
    },
    {
      id: "cookies",
      icon: "🍪",
      title: "Cookie Policy",
      status: "draft",
      summary: "SMAASH uses minimal cookies for authentication only. No advertising or tracking cookies.",
      sections: [
        { title: "What We Use", body: "SMAASH uses session cookies only \u2014 these are required for you to stay logged in. We do not use advertising cookies, tracking pixels, or third-party analytics." },
        { title: "How to Control", body: "You can clear cookies at any time through your browser settings. Clearing cookies will log you out of SMAASH." }
      ]
    }
  ];
  if (doc) {
    const d = docs.find((x) => x.id === doc);
    return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setDoc(null), style: { background: "none", border: "none", color: "var(--text-dim)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 16, padding: 0 } }, "\u2190 Back to Legal"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 24 } }, d.icon), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: 2, color: "var(--text)", lineHeight: 1 } }, d.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, background: "color-mix(in srgb, var(--warn) 13%, transparent)", color: "var(--warn)", padding: "2px 8px", borderRadius: 4, fontWeight: 700, marginTop: 4, display: "inline-block" } }, "DRAFT \u2014 Requires legal review before public launch"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text-dim)", lineHeight: 1.7, marginBottom: 16, background: "var(--surface)", borderRadius: 10, padding: "12px 14px", border: "1px solid var(--border)" } }, d.summary), d.sections.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: "var(--surface)", borderRadius: 12, padding: "14px 16px", marginBottom: 10, border: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 8 } }, s.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)", lineHeight: 1.8 } }, s.body))), /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb, var(--danger) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--danger) 20%, transparent)", borderRadius: 10, padding: "12px 14px", marginTop: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "var(--danger)", marginBottom: 4 } }, "Action Required Before Public Launch"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)" } }, "This document is a draft. Have a Canadian lawyer review before opening to the public \u2014 specifically for PIPEDA compliance and liability clauses.")));
  }
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "LEGAL DOCS"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 } }, "Draft documents \u2014 review required before public launch"), /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb, var(--warn) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--warn) 20%, transparent)", borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 11, color: "var(--warn)", lineHeight: 1.7 } }, "All documents below are drafts. A Canadian lawyer must review before SMAASH opens to the public."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, docs.map((d) => /* @__PURE__ */ React.createElement("div", { key: d.id, onClick: () => setDoc(d.id), style: { background: "var(--surface)", borderRadius: 12, padding: "14px 16px", border: "1px solid var(--border)", cursor: "pointer", display: "flex", gap: 12, alignItems: "center" }, onMouseOver: (e) => e.currentTarget.style.borderColor = "var(--border-strong)", onMouseOut: (e) => e.currentTarget.style.borderColor = "var(--border)" }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 24 } }, d.icon), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: "var(--text)", fontSize: 14 } }, d.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", marginTop: 2 } }, d.summary)), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, background: "color-mix(in srgb, var(--warn) 13%, transparent)", color: "var(--warn)", padding: "2px 7px", borderRadius: 4, fontWeight: 700 } }, "DRAFT"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--border-strong)", marginTop: 4 } }, "\u203A"))))));
}
function AdminClubManager({ currentUser, profiles: profiles2 = [] }) {
  const [clubs, setClubs] = useState([]);
  const [view, setView] = useState("list");
  const [editing, setEditing] = useState(null);
  const [transferClub, setTransferClub] = useState(null);
  const [transferTo, setTransferTo] = useState("");
  const [form, setForm] = useState({ name: "", location: "", courts: 2, court_surface: "Synthetic", description: "", logo: "", logo_color: "var(--primary)", facilities: [] });
  const [toast, setToast] = useState(null);
  const showToast = (msg, c = "var(--success)") => {
    setToast({ msg, c });
    setTimeout(() => setToast(null), 2400);
  };
  const AMENITIES = ["Changing Rooms", "Showers", "Washrooms", "Water Fountains", "Pro Shop", "Caf\xE9", "Gym", "Prayer Space", "Parking", "Other Sports"];
  const doTransfer = () => {
    if (!transferClub || !transferTo) return;
    const tok = smaashDB.auth.getToken();
    const newDirector = profiles2.find((p) => p.id === transferTo);
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/clubs?id=eq." + transferClub.id, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ director_id: transferTo, director_name: (newDirector == null ? void 0 : newDirector.name) || "", director_email: (newDirector == null ? void 0 : newDirector.email) || "" })
    }).then((r) => {
      if (r.ok) {
        showToast("Director role transferred to " + (newDirector == null ? void 0 : newDirector.name) + "!");
        setView("list");
        setTransferClub(null);
        setTransferTo("");
        loadClubs();
      } else showToast("Transfer failed", "var(--danger)");
    });
  };
  const loadClubs = () => {
    const tok = smaashDB.auth.getToken() || SUPABASE_ANON_KEY;
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/clubs?select=*&order=name", {
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok }
    }).then((r) => r.json()).then((data) => {
      if (Array.isArray(data)) setClubs(data);
    });
  };
  useEffect(() => {
    loadClubs();
  }, []);
  const saveClub = () => {
    var _a;
    const tok = smaashDB.auth.getToken();
    if (!tok) return;
    const url = editing ? "https://yqqezxyayndzmqahguac.supabase.co/rest/v1/clubs?id=eq." + editing.id : "https://yqqezxyayndzmqahguac.supabase.co/rest/v1/clubs";
    fetch(url, {
      method: editing ? "PATCH" : "POST",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({
        name: form.name,
        status: editing ? editing.status : "pending",
        location: form.location,
        logo_initials: form.logo,
        logo_color: form.logo_color || "var(--primary)",
        description: form.description,
        courts: form.courts || 0,
        court_surface: form.court_surface,
        facilities: form.facilities || [],
        director_name: ((_a = currentUser == null ? void 0 : currentUser.user_metadata) == null ? void 0 : _a.full_name) || "",
        director_email: (currentUser == null ? void 0 : currentUser.email) || ""
      })
    }).then((r) => {
      if (r.ok) {
        showToast(editing ? "Club updated!" : "Club created!");
        loadClubs();
        setView("list");
        setEditing(null);
      }
    });
  };
  const approveClub = (id) => {
    const tok = smaashDB.auth.getToken();
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/clubs?id=eq." + id, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ status: "verified" })
    }).then((r) => {
      if (r.ok) {
        showToast("Club approved! \u2713");
        loadClubs();
      }
    });
  };
  const inp = { width: "100%", background: "var(--sunken)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 14px", color: "var(--text)", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box", marginBottom: 12 };
  if (view === "form") return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, toast && /* @__PURE__ */ React.createElement(Toast, { msg: toast.msg, color: toast.c }), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setView("list");
    setEditing(null);
  }, style: { background: "none", border: "none", color: "var(--text-dim)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 16, padding: 0 } }, "\u2190 Back"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: 2, color: "var(--text)", marginBottom: 16 } }, editing ? "EDIT CLUB" : "CREATE CLUB"), /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 5 } }, "Club Name *"), /* @__PURE__ */ React.createElement("input", { value: form.name, onChange: (e) => setForm((p) => __spreadProps(__spreadValues({}, p), { name: e.target.value })), placeholder: "e.g. ICCO Badminton", style: inp }), /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 5 } }, "Location"), /* @__PURE__ */ React.createElement("input", { value: form.location, onChange: (e) => setForm((p) => __spreadProps(__spreadValues({}, p), { location: e.target.value })), placeholder: "City, Province, Country", style: inp }), /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 5 } }, "Short Code (4 chars)"), /* @__PURE__ */ React.createElement("input", { value: form.logo, onChange: (e) => setForm((p) => __spreadProps(__spreadValues({}, p), { logo: e.target.value.slice(0, 4).toUpperCase() })), placeholder: "e.g. ICCO", style: inp }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 5 } }, "Courts"), /* @__PURE__ */ React.createElement("input", { type: "number", min: 1, max: 30, value: form.courts, onChange: (e) => setForm((p) => __spreadProps(__spreadValues({}, p), { courts: Number(e.target.value) })), style: __spreadProps(__spreadValues({}, inp), { marginBottom: 0 }) })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 5 } }, "Surface"), /* @__PURE__ */ React.createElement("input", { value: form.court_surface, onChange: (e) => setForm((p) => __spreadProps(__spreadValues({}, p), { court_surface: e.target.value })), placeholder: "e.g. Synthetic", style: __spreadProps(__spreadValues({}, inp), { marginBottom: 0 }) }))), /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", margin: "12px 0 8px" } }, "Description"), /* @__PURE__ */ React.createElement("input", { value: form.description, onChange: (e) => setForm((p) => __spreadProps(__spreadValues({}, p), { description: e.target.value })), placeholder: "Brief club description", style: inp }), /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 8 } }, "Facilities & Amenities"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 } }, AMENITIES.map((a) => {
    const on = (form.facilities || []).includes(a);
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: a,
        onClick: () => setForm((p) => __spreadProps(__spreadValues({}, p), { facilities: on ? p.facilities.filter((x) => x !== a) : [...p.facilities || [], a] })),
        style: { background: on ? "color-mix(in srgb, var(--primary) 13%, transparent)" : "var(--surface)", border: `1px solid ${on ? "color-mix(in srgb, var(--primary) 27%, transparent)" : "var(--border)"}`, borderRadius: 7, padding: "6px 12px", fontSize: 11, fontWeight: 700, color: on ? "var(--primary)" : "var(--text-faint)", cursor: "pointer", fontFamily: "inherit" }
      },
      a
    );
  })), /* @__PURE__ */ React.createElement("button", { onClick: saveClub, style: { width: "100%", background: "linear-gradient(135deg,var(--primary),var(--primary-deep))", color: "var(--bg)", border: "none", borderRadius: 10, padding: "14px", fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" } }, editing ? "Save Changes" : "Create Club"));
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, toast && /* @__PURE__ */ React.createElement(Toast, { msg: toast.msg, color: toast.c }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: 2, color: "var(--text)" } }, "CLUB MANAGER"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2 } }, "CREATE & MANAGE CLUBS")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setForm({ name: "", location: "", courts: 2, court_surface: "Synthetic", description: "", logo: "", logo_color: "var(--primary)", facilities: [] });
        setView("form");
      },
      style: { background: "color-mix(in srgb, var(--primary) 13%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 27%, transparent)", borderRadius: 8, padding: "9px 16px", fontSize: 11, fontWeight: 700, color: "var(--primary)", cursor: "pointer", fontFamily: "inherit" }
    },
    "+ New Club"
  )), clubs.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "40px 20px", background: "var(--surface)", borderRadius: 14, border: "1px solid var(--border)", color: "var(--text-faint)" } }, "No clubs yet. Create the first one!"), clubs.map((c) => {
    const verified = c.status === "verified";
    const memberCount = profiles2.filter((p) => p.clubId === c.id).length;
    return /* @__PURE__ */ React.createElement("div", { key: c.id, style: { background: "var(--surface)", borderRadius: 12, padding: "14px", border: `1px solid ${verified ? "color-mix(in srgb, var(--success) 20%, transparent)" : "var(--border)"}`, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text)" } }, c.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", marginTop: 2 } }, c.location, " \xB7 ", c.courts || 0, " courts \xB7 ", memberCount, " members")), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, background: verified ? "color-mix(in srgb, var(--success) 13%, transparent)" : "color-mix(in srgb, var(--warn) 13%, transparent)", color: verified ? "var(--success)" : "var(--warn)", padding: "2px 8px", borderRadius: 4, fontWeight: 700, flexShrink: 0 } }, verified ? "\u2713 VERIFIED" : "PENDING")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          setForm({ name: c.name, location: c.location || "", courts: c.courts || 2, court_surface: c.court_surface || "", description: c.description || "", logo: c.logo || "", logo_color: c.logo_color || "var(--primary)", facilities: c.facilities || [] });
          setEditing(c);
          setView("form");
        },
        style: { background: "var(--border)", border: "none", borderRadius: 7, padding: "6px 14px", fontSize: 10, fontWeight: 700, color: "var(--text-muted)", cursor: "pointer", fontFamily: "inherit" }
      },
      "Edit"
    ), !verified && /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => approveClub(c.id),
        style: { background: "color-mix(in srgb, var(--success) 13%, transparent)", border: "1px solid color-mix(in srgb, var(--success) 27%, transparent)", borderRadius: 7, padding: "6px 14px", fontSize: 10, fontWeight: 700, color: "var(--success)", cursor: "pointer", fontFamily: "inherit" }
      },
      "\u2713 Approve"
    )));
  }));
}
function AddToHomeScreenButton() {
  var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  var deferredPromptRef = React.useRef(null);
  var _s = React.useState(false); var showModal = _s[0]; var setShowModal = _s[1];
  React.useEffect(function() {
    function handler(e) { e.preventDefault(); deferredPromptRef.current = e; }
    window.addEventListener('beforeinstallprompt', handler);
    return function() { window.removeEventListener('beforeinstallprompt', handler); };
  }, []);
  function handleClick() {
    if (deferredPromptRef.current) {
      deferredPromptRef.current.prompt();
      deferredPromptRef.current.userChoice.then(function() { deferredPromptRef.current = null; });
    } else { setShowModal(true); }
  }
  var btnStyle = { width: "100%", background: "color-mix(in srgb, var(--primary) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 30%, transparent)", borderRadius: 10, padding: "13px", fontSize: 12, fontWeight: 700, color: "var(--primary)", cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 };
  var overlayStyle = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 9999, display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 16 };
  var cardStyle = { background: "var(--surface)", borderRadius: 16, padding: 24, width: "100%", maxWidth: 400 };
  var titleStyle = { fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: 2, color: "var(--primary)", marginBottom: 16 };
  var stepStyle = { fontSize: 14, color: "var(--text)", marginBottom: 10, lineHeight: 1.6 };
  var doneStyle = { fontSize: 14, color: "var(--text)", lineHeight: 1.6 };
  var gotItStyle = { marginTop: 20, width: "100%", background: "var(--primary)", border: "none", borderRadius: 10, padding: "12px", fontSize: 13, fontWeight: 700, color: "#020810", cursor: "pointer", fontFamily: "inherit" };
  var iosSteps = React.createElement(React.Fragment, null,
    React.createElement("p", { style: stepStyle }, "1. Open this page in Safari (not Chrome)"),
    React.createElement("p", { style: stepStyle }, "2. Tap the Share button at the bottom of Safari"),
    React.createElement("p", { style: stepStyle }, "3. Scroll down and tap 'Add to Home Screen'"),
    React.createElement("p", { style: doneStyle }, "4. Tap 'Add' - done!")
  );
  var androidSteps = React.createElement(React.Fragment, null,
    React.createElement("p", { style: stepStyle }, "1. Tap the 3-dot menu in Chrome (top right)"),
    React.createElement("p", { style: stepStyle }, "2. Tap 'Add to Home Screen'"),
    React.createElement("p", { style: doneStyle }, "3. Tap 'Add' - done!")
  );
  return React.createElement(React.Fragment, null,
    React.createElement("button", { onClick: handleClick, style: btnStyle }, "Add App to Home Screen"),
    showModal && React.createElement("div", { onClick: function() { setShowModal(false); }, style: overlayStyle },
      React.createElement("div", { onClick: function(e) { e.stopPropagation(); }, style: cardStyle },
        React.createElement("div", { style: titleStyle }, "ADD TO HOME SCREEN"),
        isIOS ? iosSteps : androidSteps,
        React.createElement("button", { onClick: function() { setShowModal(false); }, style: gotItStyle }, "Got it")
      )
    )
  );
}
function MoreScreen({ clubs, setClubs, matches = [], setMatches, profiles: profiles2 = [], currentUser = null, myProfile = null, appRole = "player", setAppRole, refetchMatches = null, refetchProfiles = null }) {
  const [subScreen, setSubScreenRaw] = useState(() => { try { return sessionStorage.getItem("smaash_more_sub") || new URLSearchParams(window.location.search).get("screen") || null; } catch (e) { return null; } });
  const setSubScreen = (id) => { setSubScreenRaw(id); try { if (id) sessionStorage.setItem("smaash_more_sub", id); else sessionStorage.removeItem("smaash_more_sub"); window.history.replaceState({ screen: "more" }, "", id ? "/more?screen=" + id : "/more"); } catch (e) {} };
  const sections = [
    {
      title: "MATCH TOOLS",
      items: [
        { id: "confirm", icon: "📩", label: "Confirm Matches", sub: "Pending confirmations", color: "var(--warn)" },
        { id: "history", icon: "📋", label: "Match History", sub: "All your matches", color: "var(--primary)" },
        { id: "director", icon: "🛡", label: "Club Director", sub: "Submit & manage matches", color: "var(--purple)", role: ["club_director", "admin"] }
      ]
    },
    {
      title: "CLUBS",
      items: [
        { id: "clubs_dir", icon: "🏛", label: "Club Directory", sub: "Find & join clubs", color: "var(--primary)" },
        { id: "join_club", icon: "🔑", label: "Join a Club", sub: "Enter your club's join code", color: "var(--success)" },
        { id: "apply_club", icon: "📝", label: "Create a Club", sub: "Apply to register your club", color: "var(--warn)" }
      ]
    },
    {
      title: "COMPETITIONS",
      items: [
        { id: "tournament", icon: "🏆", label: "Tournaments", sub: "Enter & run tournaments", color: "var(--warn)" },
        { id: "events", icon: "📅", label: "Events", sub: "Upcoming events near you", color: "var(--primary)" }
      ]
    },
    {
      title: "STATS & INSIGHTS",
      items: [
        { id: "heatmap", icon: "📈", label: "My Analytics", sub: "Performance deep dive", color: "var(--purple)" },
        { id: "rivalry", icon: "\u2694\uFE0F", label: "Rivalries", sub: "Head-to-head records", color: "var(--danger)" },
        { id: "search", icon: "🔍", label: "Find Players", sub: "Search & challenge", color: "var(--primary)" },
        { id: "glicko", icon: "\u26A1", label: "Rating Engine", sub: "How SMAASH ratings work", color: "var(--warn)" }
      ]
    },
    {
      title: "ADMIN",
      items: [
        { id: "admin_panel", icon: "\u2699\uFE0F", label: "Admin Panel", sub: "Club & match oversight", color: "var(--text-dim)", role: ["admin"] },
        { id: "club_manager", icon: "🏛", label: "Club Manager", sub: "Create & edit clubs", color: "var(--primary)", role: ["admin"] },
        { id: "legal", icon: "📋", label: "Legal", sub: "Terms, Privacy, Guidelines", color: "var(--text-faint)" }
      ]
    }
  ];
  if (subScreen) {
    const screenMap = {
      confirm: /* @__PURE__ */ React.createElement(MatchConfirm, { matches, setMatches, profiles: profiles2, currentUser, refetchMatches, refetchProfiles }),
      history: /* @__PURE__ */ React.createElement(MatchHistory, { matches, profiles: profiles2, currentUser, refetch: setMatches }),
      director: /* @__PURE__ */ React.createElement(DirectorPanel, { matches, setMatches, profiles: profiles2, currentUser, myProfile, clubs, refetchMatches, refetchProfiles }),
      tournament: /* @__PURE__ */ React.createElement(TournamentDirectorScreen, { currentUser, profiles: profiles2, appRole, myProfile }),
      ladder: /* @__PURE__ */ React.createElement(LadderNightScreen, { matches, setMatches }),
      events: /* @__PURE__ */ React.createElement(EventsScreen, null),
      heatmap: /* @__PURE__ */ React.createElement(HeatmapScreen, { matches, profiles: profiles2, currentUser, myProfile }),
      rivalry: /* @__PURE__ */ React.createElement(RivalryScreen, { matches, profiles: profiles2, currentUser }),
      search: /* @__PURE__ */ React.createElement(PlayerSearchScreen, { matches, profiles: profiles2, currentUser }),
      glicko: /* @__PURE__ */ React.createElement(Glicko2Screen, null),
      notifs: /* @__PURE__ */ React.createElement(NotificationsScreen, { matches, currentUser }),
      clubs_dir: /* @__PURE__ */ React.createElement(ClubDirectory, { clubs, profiles: profiles2, currentUser, appRole, setAppRole, myProfile, refetchProfiles }),
      apply_club: /* @__PURE__ */ React.createElement(ClubApplyScreen, { currentUser, onBack: function() { setSubScreen(null); } }),
      join_club: /* @__PURE__ */ React.createElement(JoinClubScreen, { currentUser, onBack: function() { setSubScreen(null); }, onJoined: function() { if (refetchProfiles) refetchProfiles(); setSubScreen(null); } }),
      admin_panel: /* @__PURE__ */ React.createElement(AdminPanel, { clubs, setClubs, matches, setMatches, profiles: profiles2, currentUser }),
      club_manager: /* @__PURE__ */ React.createElement(AdminClubManager, { currentUser, profiles: profiles2 }),
      legal: /* @__PURE__ */ React.createElement(LegalScreen, null)
    };
    return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setSubScreen(null), style: { background: "none", border: "none", color: "var(--text-dim)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 16, padding: 0, display: "flex", alignItems: "center", gap: 6 } }, "\u2190 Back to More"), screenMap[subScreen] || /* @__PURE__ */ React.createElement("div", { style: { color: "var(--text-faint)" } }, "Screen not found"));
  }
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, letterSpacing: 3, color: "var(--text)", lineHeight: 1 } }, "MORE"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, textTransform: "uppercase", marginTop: 3 } }, "All Features")), /* @__PURE__ */ React.createElement(ThemeToggle, null)), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }), sections.map((section, si) => {
    const visibleItems = section.items.filter(
      (item) => !item.role || item.role.includes(appRole)
    );
    if (visibleItems.length === 0) return null;
    return /* @__PURE__ */ React.createElement("div", { key: si, style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-faint)", textTransform: "uppercase", marginBottom: 10 } }, section.title), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 13, overflow: "hidden", border: "1px solid var(--border)" } }, visibleItems.map((item, ii) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: item.id,
        onClick: () => setSubScreen(item.id),
        style: { width: "100%", background: "none", border: "none", borderBottom: ii < visibleItems.length - 1 ? "1px solid var(--border)" : "none", padding: "14px 16px", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 12, textAlign: "left" },
        onMouseOver: (e) => e.currentTarget.style.background = "var(--border)",
        onMouseOut: (e) => e.currentTarget.style.background = "none"
      },
      /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: 10, background: item.color + "22", border: `1px solid ${item.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 } }, item.icon),
      /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text)" } }, item.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-faint)", marginTop: 1 } }, item.sub)),
      /* @__PURE__ */ React.createElement("span", { style: { color: "var(--border-strong)", fontSize: 16 } }, "\u203A")
    ))));
  }), (currentUser == null ? void 0 : currentUser.id) === "0fb7773b-85ca-4110-ad37-2bdf8bef2be2" && /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 13, padding: "14px 16px", border: "1px solid var(--border-strong)", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-faint)", textTransform: "uppercase", marginBottom: 10 } }, "DEV \u2014 Role Switcher"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } }, ["player", "club_director", "tournament_director", "admin"].map((role) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: role,
      onClick: () => {
        setAppRole(role);
      },
      style: { background: appRole === role ? "color-mix(in srgb, var(--purple) 13%, transparent)" : "var(--sunken)", border: `1px solid ${appRole === role ? "color-mix(in srgb, var(--purple) 27%, transparent)" : "var(--border)"}`, borderRadius: 7, padding: "6px 12px", fontSize: 10, fontWeight: 700, color: appRole === role ? "var(--purple)" : "var(--text-faint)", cursor: "pointer", fontFamily: "inherit" }
    },
    role
  )))));
}
