const RATING_HISTORY_MOCK = {};
function Sparkline({ data, color, width = 60, height = 24 }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = i / (data.length - 1) * width;
    const y = height - (v - min) / range * height;
    return `${x},${y}`;
  }).join(" ");
  const first = data[0], last = data[data.length - 1];
  const trend = last >= first;
  const trendColor = trend ? "var(--success)" : "var(--danger)";
  return /* @__PURE__ */ React.createElement("svg", { width, height, style: { overflow: "visible" } }, /* @__PURE__ */ React.createElement("polyline", { points: pts, fill: "none", stroke: color || trendColor, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", opacity: "0.8" }), /* @__PURE__ */ React.createElement("circle", { cx: (data.length - 1) / (data.length - 1) * width, cy: height - (last - min) / range * height, r: "2.5", fill: color || trendColor }));
}
function RankBadge({ rank }) {
  if (rank === 1) return /* @__PURE__ */ React.createElement("div", { style: { width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,var(--warn),#d97706)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 } }, "🥇");
  if (rank === 2) return /* @__PURE__ */ React.createElement("div", { style: { width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,var(--text-muted),var(--text-dim))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 } }, "🥈");
  if (rank === 3) return /* @__PURE__ */ React.createElement("div", { style: { width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#fb923c,#c2410c)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 } }, "🥉");
  return /* @__PURE__ */ React.createElement("div", { style: { width: 28, height: 28, borderRadius: "50%", background: "var(--border)", border: "1px solid var(--border-strong)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "var(--text-dim)", flexShrink: 0 } }, rank);
}
function PlayerProfile({ player: propPlayer, matches = [], currentUser = null, myProfile = null, profiles: profiles2 = [] }) {
  var _a;
  const player = propPlayer || myProfile || DEFAULT_USER;
  const myId = player.id;
  const [mode, setMode] = useState("doubles");
  const tc = ((_a = TIERS.find((t) => t.id === (player.tier || 1))) == null ? void 0 : _a.color) || "#fb923c";
  const club = INIT_CLUBS.find((c) => c.id === player.clubId);
  const findPlayer = (id) => profiles2.find((p) => p.id === id) || { name: "Unknown", avatar: "?", rating: 500, doublesRating: 500, tier: 1 };
  const myConfirmed = matches.filter(
    (m) => (m.status === "auto_confirmed" || m.status === "confirmed") && [m.player_a_id, m.player_b_id, m.partner_a_id, m.partner_b_id].includes(myId)
  );
  const myWins = myConfirmed.filter((m) => {
    const sets = (() => {
      try {
        return Array.isArray(m.sets) ? m.sets : JSON.parse(m.sets || "[]");
      } catch (e) {
        return [];
      }
    })();
    const sWA = sets.filter((s) => s.a > s.b).length, sWB = sets.filter((s) => s.b > s.a).length;
    const iAmA = m.player_a_id === myId || m.partner_a_id === myId;
    return iAmA ? sWA > sWB : sWB > sWA;
  }).length;
  const myWinRate = myConfirmed.length > 0 ? Math.round(myWins / myConfirmed.length * 100) : 0;
  const recentMatches = myConfirmed.slice(0, 5).map((m) => {
    const sets = (() => {
      try {
        return Array.isArray(m.sets) ? m.sets : JSON.parse(m.sets || "[]");
      } catch (e) {
        return [];
      }
    })();
    return __spreadProps(__spreadValues({}, m), {
      sets,
      playerA: findPlayer(m.player_a_id),
      playerB: findPlayer(m.player_b_id),
      partnerA: m.partner_a_id ? findPlayer(m.partner_a_id) : null,
      partnerB: m.partner_b_id ? findPlayer(m.partner_b_id) : null,
      date: m.played_at ? m.played_at.split("T")[0] : "Today",
      type: m.match_type || "doubles"
    });
  });
  const displayR = mode === "doubles" ? toDisplayRating(player.doublesRating || player.rating || 500) : toDisplayRating(player.rating || 500);
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { background: `linear-gradient(135deg,${tc}14,var(--surface))`, border: `1px solid ${tc}33`, borderRadius: 16, padding: "20px 16px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, alignItems: "center", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 64, height: 64, borderRadius: 16, background: tc + "22", border: `2px solid ${tc}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: tc, flexShrink: 0 } }, player.avatar || "?"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, letterSpacing: 2, color: "var(--text)", lineHeight: 1 } }, player.name || "Player"), club && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", marginTop: 3 } }, "🏛 ", club.name), player.location && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", marginTop: 2 } }, "📍 ", player.location))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 0, background: "var(--sunken)", borderRadius: 10, padding: 3, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setMode("doubles"), style: { flex: 1, background: mode === "doubles" ? tc + "22" : "none", border: "none", borderRadius: 8, padding: "8px 0", fontSize: 11, fontWeight: 700, color: mode === "doubles" ? tc : "var(--text-faint)", cursor: "pointer", fontFamily: "inherit" } }, "👥 Doubles"), /* @__PURE__ */ React.createElement("button", { onClick: () => setMode("singles"), style: { flex: 1, background: mode === "singles" ? "color-mix(in srgb, var(--primary) 13%, transparent)" : "none", border: "none", borderRadius: 8, padding: "8px 0", fontSize: 11, fontWeight: 700, color: mode === "singles" ? "var(--primary)" : "var(--text-faint)", cursor: "pointer", fontFamily: "inherit" } }, "🏸 Singles")), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 64, fontWeight: 900, color: tc, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 2, lineHeight: 1 } }, displayR.toFixed(3).replace(",", ".")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-faint)", marginTop: 4 } }, mode === "singles" ? (player.singlesReliability || "—") : (player.reliability || "0%"))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 } }, [{ l: "Matches", v: myConfirmed.length }, { l: "Wins", v: myWins }, { l: "Win Rate", v: myWinRate + "%" }].map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: "var(--sunken)", borderRadius: 10, padding: "10px 8px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 900, color: tc, fontFamily: "'Bebas Neue',sans-serif" } }, s.v), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", letterSpacing: 1, marginTop: 2 } }, s.l.toUpperCase()))))), recentMatches.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 13, padding: "14px 16px", border: "1px solid var(--border)", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 2, color: "var(--text)", marginBottom: 12 } }, "RECENT MATCHES"), recentMatches.map((m, i) => {
    const sets = m.sets || [];
    const sWA = sets.filter((s) => s.a > s.b).length, sWB = sets.filter((s) => s.b > s.a).length;
    const iAmA = m.player_a_id === myId || m.partner_a_id === myId;
    const iWon = iAmA ? sWA > sWB : sWB > sWA;
    const opp = iAmA ? m.playerB : m.playerA;
    const score = sets.map((s) => iAmA ? `${s.a}-${s.b}` : `${s.b}-${s.a}`).join(", ");
    const change = iAmA ? m.rating_change_a || 0 : m.rating_change_b || 0;
    return /* @__PURE__ */ React.createElement("div", { key: m.id, style: { display: "flex", alignItems: "center", gap: 10, paddingBottom: i < recentMatches.length - 1 ? 10 : 0, marginBottom: i < recentMatches.length - 1 ? 10 : 0, borderBottom: i < recentMatches.length - 1 ? "1px solid var(--border)" : "none" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 8, height: 8, borderRadius: "50%", background: iWon ? "var(--success)" : "var(--danger)", flexShrink: 0 } }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--text)" } }, iWon ? "W" : "L", " vs ", (opp == null ? void 0 : opp.name) || "Unknown"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)" } }, score, " \xB7 ", m.date)), change !== 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: change > 0 ? "var(--success)" : "var(--danger)" } }, fmtChange(change)));
  })), myConfirmed.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "30px 20px", background: "var(--surface)", borderRadius: 13, border: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, marginBottom: 8 } }, "🏸"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text-dim)" } }, "No confirmed matches yet"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-faint)", marginTop: 4 } }, "Submit your first match to see stats here")));
}
function LeaderboardScreen({ matches = [], profiles: profiles2 = [], currentUser = null, myProfile = null, clubs = [] }) {
  var _a, _b, _c;
  const [mode, setMode] = useState("doubles");
  const [search, setSearch] = useState("");
  const [clubScope, setClubScope] = useState("myclub");
  const [expanded, setExpanded] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterTier, setFilterTier] = useState("all");
  const [filterClub, setFilterClub] = useState("all");
  const [filterCity, setFilterCity] = useState("all");
  const [filterGender, setFilterGender] = useState("all");
  const [filterAge, setFilterAge] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const confirmedStatuses = ["confirmed", "admin_override", "auto_confirmed"];
  const playerMatchCount = (pid) => matches.filter(
    (m) => {
      var _a2, _b2, _c2, _d;
      return confirmedStatuses.includes(m.status) && [
        (_a2 = m.playerA) == null ? void 0 : _a2.id,
        (_b2 = m.playerB) == null ? void 0 : _b2.id,
        (_c2 = m.partnerA) == null ? void 0 : _c2.id,
        (_d = m.partnerB) == null ? void 0 : _d.id,
        m.player_a_id,
        m.player_b_id,
        m.partner_a_id,
        m.partner_b_id
      ].includes(pid);
    }
  ).length;
  const ageGroup = (dob) => {
    if (!dob) return "Unknown";
    const age = (/* @__PURE__ */ new Date()).getFullYear() - new Date(dob).getFullYear();
    if (age < 18) return "U18";
    if (age < 30) return "18\u201330";
    if (age < 45) return "30\u201345";
    return "45+";
  };
  const allCities = ["Mississauga, Canada", "Toronto, Canada"];
  const allClubs = (profiles2.length > 0 ? [] : INIT_CLUBS).filter((c) => c.status === "verified") || [];
  const activeFilters = [filterTier, filterClub, filterCity, filterGender, filterAge, filterStatus].filter((f) => f !== "all").length;
  const entries = profiles2.map((p) => {
    var _a2;
    return __spreadValues(__spreadProps(__spreadValues({}, p), {
      confirmedMatches: playerMatchCount(p.id),
      ratingHistory: [p.rating],
      displayRating: mode === "singles" ? toDisplayRating(p.rating) : toDisplayRating(p.doublesRating),
      doublesRd: p.doubles_rd || 350,
      glickoRating: mode === "singles" ? p.rating : p.doublesRating,
      ageGroup: ageGroup(p.dob),
      clubName: ((_a2 = (clubs && clubs.length > 0 ? clubs : INIT_CLUBS).find((c) => c.id === p.clubId)) == null ? void 0 : _a2.name) || null
    }), (() => {
      const pid = p.id;
      const myMatches = matches.filter(
        (m) => (m.status === "confirmed" || m.status === "auto_confirmed") && (m.player_a_id === pid || m.player_b_id === pid || m.partner_a_id === pid || m.partner_b_id === pid)
      );
      const played = myMatches.length;
      const wins = myMatches.filter((m) => {
        const isA = m.player_a_id === pid || m.partner_a_id === pid;
        const ws = (m.winner_side || "").toUpperCase();
        return isA && ws === "A" || !isA && ws === "B";
      }).length;
      const losses = played - wins;
      const winRate = played > 0 ? Math.round(wins / played * 100) : 0;
      let ptsWon = 0, ptsLost = 0;
      myMatches.forEach((m) => {
        const isA = m.player_a_id === pid || m.partner_a_id === pid;
        try {
          const raw = m.sets;
          const sets = typeof raw === "string" ? JSON.parse(raw.replace(/\\"/g, '"')) : Array.isArray(raw) ? raw : [];
          sets.forEach((s) => {
            ptsWon += isA ? Number(s.a) || 0 : Number(s.b) || 0;
            ptsLost += isA ? Number(s.b) || 0 : Number(s.a) || 0;
          });
        } catch (e) {
        }
      });
      const totalPts = ptsWon + ptsLost;
      const ptsWinRate = totalPts > 0 ? Math.round(ptsWon / totalPts * 100) : 0;
      const sorted = [...myMatches].sort((a, b) => new Date(b.submitted_at || b.played_at) - new Date(a.submitted_at || a.played_at));
      let streak = 0, streakType = null;
      for (const m of sorted) {
        const isA = m.player_a_id === pid || m.partner_a_id === pid;
        const ws = (m.winner_side || "").toUpperCase();
        const won = isA && ws === "A" || !isA && ws === "B";
        if (streakType === null) {
          streakType = won;
          streak = 1;
        } else if (won === streakType) streak++;
        else break;
      }
      return {
        played,
        wins,
        losses,
        winRate,
        ptsWon,
        ptsLost,
        ptsWinRate,
        streak,
        streakType,
        computedAccuracy: played,
        realAccuracy: played
      };
    })());
  }).filter((p) => {
    if (p.id !== (currentUser == null ? void 0 : currentUser.id) && p.played < 5) return false;
    if (clubScope === "myclub") {
      if (!(myProfile == null ? void 0 : myProfile.clubId)) return false;
      if (p.clubId !== myProfile.clubId && p.club_id !== myProfile.clubId) return false;
    }
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterTier !== "all" && p.tier !== Number(filterTier)) return false;
    if (filterClub !== "all" && p.clubId !== Number(filterClub)) return false;
    if (filterCity !== "all" && p.location !== filterCity) return false;
    if (filterGender !== "all" && p.gender !== filterGender) return false;
    if (filterAge !== "all" && p.ageGroup !== filterAge) return false;
    if (filterStatus === "verified" && p.provisional) return false;
    if (filterStatus === "provisional" && !p.provisional) return false;
    return true;
  }).sort((a, b) => {
    const aLocked = (a.played || 0) < 5;
    const bLocked = (b.played || 0) < 5;
    if (aLocked && !bLocked) return 1;
    if (!aLocked && bLocked) return -1;
    return b.displayRating - a.displayRating;
  });
  const lockedCount = 0;
  const topThree = entries.slice(0, 3);
  const showPodium = topThree.length >= 2 && activeFilters === 0 && !search;
  const trend = (id) => {
    const h = RATING_HISTORY_MOCK[id];
    if (!h || h.length < 2) return 0;
    return h[h.length - 1] - h[h.length - 2];
  };
  const resetFilters = () => {
    setFilterTier("all");
    setFilterClub("all");
    setFilterCity("all");
    setFilterGender("all");
    setFilterAge("all");
    setFilterStatus("all");
  };
  const FilterSelect = ({ label, value, onChange, options }) => /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, fontWeight: 700, letterSpacing: 2, color: "var(--text-faint)", textTransform: "uppercase", marginBottom: 5 } }, label), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 5 } }, [{ v: "all", l: "All" }, ...options].map((opt) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: opt.v,
      onClick: () => onChange(opt.v),
      style: { background: value === opt.v ? "color-mix(in srgb, var(--primary) 13%, transparent)" : "var(--surface)", border: `1px solid ${value === opt.v ? "color-mix(in srgb, var(--primary) 33%, transparent)" : "var(--border)"}`, borderRadius: 6, padding: "4px 10px", fontSize: 10, fontWeight: 700, color: value === opt.v ? "var(--primary)" : "var(--text-faint)", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }
    },
    opt.l
  ))));
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease", paddingTop: 44 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 26, letterSpacing: 3, color: "var(--text)", lineHeight: 1 } }, "LEADERBOARD"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, textTransform: "uppercase", marginTop: 3 } }, "SMAASH Global Rankings")), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowFilters((f) => !f), style: { position: "relative", background: showFilters ? "color-mix(in srgb, var(--primary) 13%, transparent)" : "var(--surface)", border: `1.5px solid ${showFilters ? "color-mix(in srgb, var(--primary) 33%, transparent)" : "var(--border)"}`, borderRadius: 10, padding: "8px 12px", fontSize: 11, fontWeight: 700, color: showFilters ? "var(--primary)" : "var(--text-faint)", cursor: "pointer", fontFamily: "inherit", flexShrink: 0, marginTop: 2 } }, "\u2699 Filter", activeFilters > 0 && /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: -5, right: -5, width: 16, height: 16, borderRadius: "50%", background: "var(--primary)", color: "var(--bg)", fontSize: 9, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" } }, activeFilters))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 0, marginBottom: 12, background: "var(--surface)", borderRadius: 10, padding: 3, border: "1px solid var(--border)" } }, [{ id: "doubles", label: "👥 Doubles" }].map((m) => /* @__PURE__ */ React.createElement("button", { key: m.id, onClick: () => setMode(m.id), style: { flex: 1, background: mode === m.id ? "var(--border)" : "none", border: "none", borderRadius: 8, padding: "9px 0", fontSize: 11, fontWeight: 700, color: mode === m.id ? "var(--text)" : "var(--text-faint)", cursor: "pointer", letterSpacing: 0.5, textTransform: "uppercase", fontFamily: "inherit", transition: "all 0.2s" } }, m.label))), (myProfile == null ? void 0 : myProfile.clubId) && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 12 } }, ["global", "myclub"].map((scope) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: scope,
      onClick: () => setClubScope(scope),
      style: {
        flex: 1,
        padding: "8px 0",
        borderRadius: 9,
        border: `1.5px solid ${clubScope === scope ? "color-mix(in srgb, var(--primary) 27%, transparent)" : "var(--border)"}`,
        background: clubScope === scope ? "color-mix(in srgb, var(--primary) 7%, transparent)" : "var(--surface)",
        color: clubScope === scope ? "var(--primary)" : "var(--text-faint)",
        fontSize: 11,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "inherit",
        letterSpacing: 0.5
      }
    },
    scope === "global" ? "🌐 Global" : "🏛 My Club"
  ))), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", marginBottom: 12 } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: search,
      onChange: (e) => setSearch(e.target.value),
      placeholder: "Search player name\u2026",
      style: { width: "100%", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "9px 14px 9px 34px", color: "var(--text)", fontSize: 12, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }
    }
  ), /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--text-faint)", fontSize: 13 } }, "\u2315"), search && /* @__PURE__ */ React.createElement("button", { onClick: () => setSearch(""), style: { position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text-faint)", cursor: "pointer", fontSize: 14, padding: 2 } }, "\u2715")), showFilters && /* @__PURE__ */ React.createElement("div", { style: { background: "var(--sunken)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px", marginBottom: 14, animation: "fadeIn 0.2s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "var(--text)", letterSpacing: 1 } }, "FILTER BY"), activeFilters > 0 && /* @__PURE__ */ React.createElement("button", { onClick: resetFilters, style: { background: "none", border: "none", fontSize: 10, color: "var(--danger)", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5 } }, "\u2715 Clear all (", activeFilters, ")")), /* @__PURE__ */ React.createElement(
    FilterSelect,
    {
      label: "Tier",
      value: filterTier,
      onChange: setFilterTier,
      options: TIERS.map((t) => ({ v: String(t.id), l: `${t.badge} ${t.sublabel}` }))
    }
  ), /* @__PURE__ */ React.createElement(
    FilterSelect,
    {
      label: "Club",
      value: filterClub,
      onChange: setFilterClub,
      options: allClubs.map((c) => ({ v: String(c.id), l: c.name.length > 20 ? c.name.slice(0, 18) + "\u2026" : c.name }))
    }
  ), /* @__PURE__ */ React.createElement(
    FilterSelect,
    {
      label: "City / Location",
      value: filterCity,
      onChange: setFilterCity,
      options: allCities.map((c) => ({ v: c, l: c }))
    }
  ), /* @__PURE__ */ React.createElement(
    FilterSelect,
    {
      label: "Gender",
      value: filterGender,
      onChange: setFilterGender,
      options: [{ v: "Male", l: "Male" }, { v: "Female", l: "Female" }, { v: "Non-binary", l: "Non-binary" }]
    }
  ), /* @__PURE__ */ React.createElement(
    FilterSelect,
    {
      label: "Age Group",
      value: filterAge,
      onChange: setFilterAge,
      options: [{ v: "U18", l: "Under 18" }, { v: "18\u201330", l: "18\u201330" }, { v: "30\u201345", l: "30\u201345" }, { v: "45+", l: "45+" }]
    }
  ), /* @__PURE__ */ React.createElement(
    FilterSelect,
    {
      label: "Status",
      value: filterStatus,
      onChange: setFilterStatus,
      options: [{ v: "verified", l: "\u2713 Verified only" }, { v: "provisional", l: "\u25D1 Provisional only" }]
    }
  )), activeFilters > 0 && !showFilters && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 } }, [
    { val: filterTier, label: filterTier !== "all" ? `Tier: ${(_a = TIERS.find((t) => t.id === Number(filterTier))) == null ? void 0 : _a.badge}` : null, reset: () => setFilterTier("all") },
    { val: filterClub, label: filterClub !== "all" ? `Club: ${(_c = (_b = allClubs.find((c) => c.id === Number(filterClub))) == null ? void 0 : _b.name) == null ? void 0 : _c.split(" ")[0]}` : null, reset: () => setFilterClub("all") },
    { val: filterCity, label: filterCity !== "all" ? `📍 ${filterCity}` : null, reset: () => setFilterCity("all") },
    { val: filterGender, label: filterGender !== "all" ? `\u26A5 ${filterGender}` : null, reset: () => setFilterGender("all") },
    { val: filterAge, label: filterAge !== "all" ? `🎂 ${filterAge}` : null, reset: () => setFilterAge("all") },
    { val: filterStatus, label: filterStatus !== "all" ? filterStatus === "verified" ? "\u2713 Verified" : "\u25D1 Provisional" : null, reset: () => setFilterStatus("all") }
  ].filter((f) => f.label).map((f, i) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: i,
      onClick: f.reset,
      style: { background: "color-mix(in srgb, var(--primary) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)", borderRadius: 6, padding: "3px 8px", fontSize: 10, fontWeight: 700, color: "var(--primary)", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }
    },
    f.label,
    " ",
    /* @__PURE__ */ React.createElement("span", { style: { opacity: 0.6 } }, "\u2715")
  ))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--border-strong)", marginBottom: 10, letterSpacing: 0.5 } }, entries.length, " player", entries.length !== 1 ? "s" : "", " ", activeFilters > 0 || search ? "matching" : "ranked", lockedCount > 0 && !search && activeFilters === 0 && /* @__PURE__ */ React.createElement("span", { style: { color: "var(--warn)" } }, " \xB7 ", lockedCount, " locked 🔒")), entries.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "40px 20px", color: "var(--text-faint)", background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 36, marginBottom: 10 } }, "🔍"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text-dim)" } }, "No players match these filters"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    resetFilters();
    setSearch("");
  }, style: { marginTop: 12, background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "7px 16px", fontSize: 11, color: "var(--text-faint)", cursor: "pointer", fontFamily: "inherit" } }, "Clear filters")), showPodium && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 8 } }, topThree[1] && /* @__PURE__ */ React.createElement("div", { style: { flex: 1, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { background: "linear-gradient(180deg,color-mix(in srgb, var(--text-muted) 13%, transparent),color-mix(in srgb, var(--text-muted) 7%, transparent))", border: "1px solid color-mix(in srgb, var(--text-muted) 20%, transparent)", borderRadius: "12px 12px 0 0", padding: "14px 8px 10px" } }, /* @__PURE__ */ React.createElement(Avatar, { initials: topThree[1].avatar, size: 38, color: "var(--text-muted)", photo: topThree[1].photo }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "var(--text)", marginTop: 5 } }, topThree[1].name.split(" ")[0]), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 900, color: "var(--text-muted)", fontFamily: "'Bebas Neue',sans-serif" } }, fmt(mode === "singles" ? topThree[1].rating : topThree[1].doublesRating))), /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb, var(--text-muted) 20%, transparent)", borderRadius: "0 0 8px 8px", padding: "5px 0", fontSize: 18 } }, "🥈")), topThree[0] && /* @__PURE__ */ React.createElement("div", { style: { flex: 1, textAlign: "center", marginBottom: -8 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "linear-gradient(180deg,color-mix(in srgb, var(--warn) 13%, transparent),color-mix(in srgb, var(--warn) 7%, transparent))", border: "1px solid color-mix(in srgb, var(--warn) 27%, transparent)", borderRadius: "12px 12px 0 0", padding: "18px 8px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", display: "inline-block" } }, /* @__PURE__ */ React.createElement(Avatar, { initials: topThree[0].avatar, size: 48, color: "var(--warn)", photo: topThree[0].photo }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: -8, right: -8, fontSize: 16 } }, "👑")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--text)", marginTop: 5 } }, topThree[0].name.split(" ")[0]), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 900, color: "var(--warn)", fontFamily: "'Bebas Neue',sans-serif" } }, fmt(mode === "singles" ? topThree[0].rating : topThree[0].doublesRating))), /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb, var(--warn) 20%, transparent)", borderRadius: "0 0 8px 8px", padding: "5px 0", fontSize: 18 } }, "🥇")), topThree[2] && /* @__PURE__ */ React.createElement("div", { style: { flex: 1, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { background: "linear-gradient(180deg,#fb923c22,#fb923c11)", border: "1px solid #fb923c33", borderRadius: "12px 12px 0 0", padding: "10px 8px 10px" } }, /* @__PURE__ */ React.createElement(Avatar, { initials: topThree[2].avatar, size: 34, color: "#fb923c", photo: topThree[2].photo }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "var(--text)", marginTop: 5 } }, topThree[2].name.split(" ")[0]), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 900, color: "#fb923c", fontFamily: "'Bebas Neue',sans-serif" } }, fmt(mode === "singles" ? topThree[2].rating : topThree[2].doublesRating))), /* @__PURE__ */ React.createElement("div", { style: { background: "#fb923c33", borderRadius: "0 0 8px 8px", padding: "5px 0", fontSize: 18 } }, "🥉")))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, entries.map((player, idx) => {
    const rank = idx + 1;
    const t = TIERS.find((x) => x.id === player.tier);
    const tc = (t == null ? void 0 : t.color) || "var(--primary)";
    const trendVal = trend(player.id);
    const isExp = expanded === player.id;
    const history = RATING_HISTORY_MOCK[player.id] || [];
    const club = INIT_CLUBS.find((c) => c.id === player.clubId);
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: player.id,
        onClick: () => setExpanded(isExp ? null : player.id),
        style: { background: "var(--surface)", borderRadius: 12, overflow: "hidden", border: `1px solid ${isExp ? tc + "55" : rank <= 3 && showPodium ? tc + "22" : "var(--border)"}`, cursor: "pointer", transition: "border-color 0.2s" }
      },
      rank <= 3 && showPodium && /* @__PURE__ */ React.createElement("div", { style: { height: 2, background: `linear-gradient(90deg,${tc},transparent)` } }),
      /* @__PURE__ */ React.createElement("div", { style: { padding: "11px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, opacity: matches.length > 0 && (player.played || 0) < 5 && (player.played || 0) > 0 ? 0.65 : 1 } }, matches.length > 0 && (player.played || 0) < 5 && (player.played || 0) > 0 ? /* @__PURE__ */ React.createElement("div", { style: { width: 28, height: 28, borderRadius: 8, background: "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 } }, "🔒") : /* @__PURE__ */ React.createElement(RankBadge, { rank }), /* @__PURE__ */ React.createElement(Avatar, { initials: player.avatar, size: 36, color: (player.played || 0) < 5 ? "var(--border-strong)" : tc, photo: player.photo }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: "var(--text)" } }, player.name), /* @__PURE__ */ React.createElement(TierBadge, { tier: player.tier }), player.role === "club_director" && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 8, background: "color-mix(in srgb,var(--purple) 13%,transparent)", color: "var(--purple)", padding: "1px 5px", borderRadius: 3, fontWeight: 700, letterSpacing: 0.5 } }, "\uD83D\uDEE1 DIR"), (player.played || 0) < 5 && (player.played || 0) > 0 && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 8, background: "color-mix(in srgb, var(--warn) 13%, transparent)", color: "var(--warn)", padding: "1px 5px", borderRadius: 3, fontWeight: 700 } }, `PLAY ${5 - (player.played || 0)} MORE`)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 2, flexWrap: "wrap", alignItems: "center" } }, (player.played || 0) < 5 && (player.played || 0) > 0 ? /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, color: "var(--warn)", fontWeight: 700 } }, "🔒 ", 5 - (player.played || 0), " matches to unlock ranking") : /* @__PURE__ */ React.createElement(React.Fragment, null, club && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, color: "var(--border-strong)" } }, "🏛 ", club.name.split(" ").slice(0, 2).join(" ")), player.location && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, color: "var(--border-strong)" } }, "📍 ", player.location))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 2, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: player.doublesRd < 100 ? "var(--success)" : player.doublesRd < 200 ? "#84cc16" : player.doublesRd < 300 ? "var(--warn)" : "var(--text-faint)" } }, "Reliability: ", player.reliability || "0%"), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--border-strong)", fontSize: 10 } }, "\xB7"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: player.winRate >= 60 ? "var(--success)" : player.winRate >= 40 ? "var(--warn)" : "var(--danger)" } }, player.confirmedMatches > 0 ? player.winRate + "%" : "--", " W"))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 900, color: tc, fontFamily: "'Bebas Neue',sans-serif", lineHeight: 1 } }, player.displayRating.toFixed(3).replace(",", ".")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: trendVal > 0 ? "var(--success)" : trendVal < 0 ? "var(--danger)" : "var(--text-faint)", marginTop: 1 } }, trendVal > 0 ? "\u2191" : trendVal < 0 ? "\u2193" : "\u2192", trendVal === 0 ? "\u2014" : (trendVal > 0 ? "+" : "") + trendVal)), /* @__PURE__ */ React.createElement("div", { style: { flexShrink: 0, paddingLeft: 6 } }, /* @__PURE__ */ React.createElement(Sparkline, { data: history, color: tc, width: 48, height: 20 }))), isExp && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border)", animation: "fadeIn 0.2s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 } }, [
        club && { icon: "🏛", label: club.name },
        player.location && { icon: "📍", label: player.location },
        player.gender && { icon: "\u26A5", label: player.gender },
        player.dob && { icon: "🎂", label: `${player.ageGroup} (${(/* @__PURE__ */ new Date()).getFullYear() - new Date(player.dob).getFullYear()} yrs)` }
      ].filter(Boolean).map((d, i) => /* @__PURE__ */ React.createElement("span", { key: i, style: { fontSize: 10, background: "var(--border)", color: "var(--text-muted)", padding: "3px 8px", borderRadius: 5 } }, d.icon, " ", d.label))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7, marginBottom: 8 } }, [
        { label: "Doubles", value: fmt(player.doublesRating), color: "var(--purple)" },
        { label: "Reliability", value: player.reliability || "0%", color: "var(--text-dim)" ? "var(--text-dim)" : player.reliability === "Developing" ? "var(--warn)" : "var(--text-dim)" },
        { label: "RD", value: Math.round(player.rd || 350), color: "var(--text-faint)" }
      ].map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: "var(--sunken)", borderRadius: 8, padding: "8px 6px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 900, color: s.color, fontFamily: "'Bebas Neue',sans-serif" } }, s.value), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 8, color: "var(--text-faint)", letterSpacing: 1, marginTop: 1 } }, s.label.toUpperCase())))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 8 } }, [
        { label: "Played", value: player.played || 0, color: "var(--text)" },
        { label: "Reliability", value: player.reliability || "0%", color: "var(--text-dim)" },
        { label: "Win Rate", value: (player.played || 0) > 0 ? (player.winRate || 0) + "%" : "--", color: (player.winRate || 0) >= 50 ? "var(--success)" : "var(--danger)" },
        { label: "Wins", value: player.wins || 0, color: "var(--success)" },
        { label: "Losses", value: player.losses || 0, color: "var(--danger)" },
        { label: "Pts Won", value: player.ptsWon || 0, color: "var(--purple)" },
        { label: "Pts %", value: (player.ptsWon || 0) > 0 ? (player.ptsWinRate || 0) + "%" : "--", color: "var(--purple)" },
        { label: "Streak", value: (player.played || 0) > 0 ? (player.streakType ? "W" : "L") + " " + player.streak : "--", color: "var(--warn)" }
      ].map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: "var(--sunken)", borderRadius: 8, padding: "7px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-faint)" } }, s.label), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: s.color || "var(--text-muted)" } }, s.value)))), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--sunken)", borderRadius: 8, padding: "10px 12px", marginBottom: player.bio ? 8 : 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", letterSpacing: 1.5, marginBottom: 6 } }, "RATING TREND"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, color: "var(--text-faint)" } }, fmt(history[0])), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: 700, color: tc } }, fmt(history[history.length - 1]))), /* @__PURE__ */ React.createElement(Sparkline, { data: history, color: tc, width: 240, height: 34 })), player.bio && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontSize: 11, color: "var(--text-dim)", fontStyle: "italic", lineHeight: 1.6 } }, '"', player.bio, '"')))
    );
  })), entries.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "16px 0 6px", fontSize: 10, color: "var(--border-strong)" } }, entries.length, " ranked \xB7 sorted by rating \xB7 updates after each confirmed match"));
}
function PlayerSearchScreen({ matches = [], profiles: profiles2 = [], currentUser = null }) {
  var _a;
  const ME = profiles2.find((p) => p.id === (currentUser == null ? void 0 : currentUser.id)) || DEFAULT_USER;
  const [search, setSearch] = useState("");
  const [filterGender, setFilterGender] = useState("all");
  const [filterTier, setFilterTier] = useState("all");
  const [filterClub, setFilterClub] = useState("all");
  const [selected, setSelected] = useState(null);
  const [challenged, setChallenged] = useState({});
  const confirmedStatuses = ["confirmed", "admin_override", "auto_confirmed"];
  const matchCount = (pid) => matches.filter(
    (m) => {
      var _a2, _b, _c, _d;
      return confirmedStatuses.includes(m.status) && [(_a2 = m.playerA) == null ? void 0 : _a2.id, (_b = m.playerB) == null ? void 0 : _b.id, (_c = m.partnerA) == null ? void 0 : _c.id, (_d = m.partnerB) == null ? void 0 : _d.id].includes(pid);
    }
  ).length;
  const results = profiles2.filter((p) => p.id !== ME.id).filter((p) => {
    var _a2;
    return !search || p.name.toLowerCase().includes(search.toLowerCase()) || ((_a2 = p.location) == null ? void 0 : _a2.toLowerCase().includes(search.toLowerCase()));
  }).filter((p) => filterTier === "all" || p.tier === Number(filterTier)).filter((p) => filterClub === "all" || p.clubId === filterClub || p.club_id === filterClub);
  const handleChallenge = (pid) => {
    setChallenged((c) => __spreadProps(__spreadValues({}, c), { [pid]: true }));
    setSelected(null);
  };
  if (selected) {
    const p = selected;
    const tc = ((_a = TIERS.find((t) => t.id === p.tier)) == null ? void 0 : _a.color) || "var(--primary)";
    const myMatches = matches.filter(
      (m) => confirmedStatuses.includes(m.status) && [m.player_a_id, m.player_b_id, m.partner_a_id, m.partner_b_id].includes(p.id)
    ).slice(0, 5);
    return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setSelected(null), style: { background: "none", border: "none", color: "var(--text-dim)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 16, padding: 0 } }, "\u2190 Back to Search"), /* @__PURE__ */ React.createElement("div", { style: { background: `linear-gradient(135deg,${tc}18,var(--surface))`, border: `1px solid ${tc}33`, borderRadius: 16, padding: "20px 18px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, alignItems: "center", marginBottom: 16 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: p.avatar, size: 56, color: tc, photo: p.photo }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 22, letterSpacing: 2, color: "var(--text)", lineHeight: 1 } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap", alignItems: "center" } }, /* @__PURE__ */ React.createElement(TierBadge, { tier: p.tier }), p.role === "club_director" && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, background: "color-mix(in srgb,var(--purple) 13%,transparent)", color: "var(--purple)", padding: "2px 7px", borderRadius: 4, fontWeight: 700 } }, "\uD83D\uDEE1 Club Director"), !p.provisional && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, background: "color-mix(in srgb, var(--success) 13%, transparent)", color: "var(--success)", padding: "2px 7px", borderRadius: 4, fontWeight: 700 } }, "\u2713 VERIFIED")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", marginTop: 4 } }, "📍 ", p.location, " \xB7 ", p.gender, " \xB7 🎂 ", p.dob ? (/* @__PURE__ */ new Date()).getFullYear() - new Date(p.dob).getFullYear() : "?", " yrs"))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 } }, [{ l: "Singles", v: fmt(p.rating), c: "var(--primary)" }, { l: "Doubles", v: fmt(p.doublesRating), c: "var(--purple)" }, { l: "Accuracy", v: p.accuracy + "%", c: tc }].map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: "var(--sunken)", borderRadius: 9, padding: "10px 8px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 17, fontWeight: 900, color: s.c, fontFamily: "'Bebas Neue',sans-serif" } }, s.v), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 8, color: "var(--text-faint)", letterSpacing: 1, marginTop: 2 } }, s.l.toUpperCase())))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 } }, [{ l: "Matches", v: p.matches }, { l: "Win Rate", v: Math.round(p.wins / Math.max(p.matches, 1) * 100) + "%" }].map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: "var(--sunken)", borderRadius: 9, padding: "9px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-faint)" } }, s.l), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 800, color: "var(--text-muted)" } }, s.v)))), p.bio && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text-dim)", fontStyle: "italic", lineHeight: 1.7, marginBottom: 14 } }, '"', p.bio, '"'), challenged[p.id] ? /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb, var(--success) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--success) 20%, transparent)", borderRadius: 10, padding: "12px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--success)" } }, "\u2713 Challenge Sent!"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)", marginTop: 3 } }, p.name, " will be notified")) : /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => handleChallenge(p.id), style: { background: "color-mix(in srgb, var(--primary) 13%, transparent)", border: "1.5px solid color-mix(in srgb, var(--primary) 27%, transparent)", borderRadius: 10, padding: "11px 0", fontSize: 11, fontWeight: 800, color: "var(--primary)", cursor: "pointer", fontFamily: "inherit" } }, "\u26A1 Challenge"), /* @__PURE__ */ React.createElement("button", { onClick: () => setSelected(null), style: { background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 0", fontSize: 11, fontWeight: 700, color: "var(--text-faint)", cursor: "pointer", fontFamily: "inherit" } }, "\u2190 Back"))), (() => {
      const allConfirmed = matches.filter(
        (m) => {
          var _a2, _b, _c, _d;
          return ["confirmed", "admin_override", "auto_confirmed"].includes(m.status) && [(_a2 = m.playerA) == null ? void 0 : _a2.id, (_b = m.playerB) == null ? void 0 : _b.id, (_c = m.partnerA) == null ? void 0 : _c.id, (_d = m.partnerB) == null ? void 0 : _d.id].includes(p.id);
        }
      );
      const h2h = allConfirmed.filter(
        (m) => {
          var _a2, _b;
          return [(_a2 = m.playerA) == null ? void 0 : _a2.id, (_b = m.playerB) == null ? void 0 : _b.id].includes(ME.id);
        }
      );
      const [histView, setHistView] = ["all", () => {}];
      return allConfirmed.length > 0 ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-faint)", textTransform: "uppercase" } }, "Match History"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)" } }, allConfirmed.length, " match", allConfirmed.length !== 1 ? "es" : "")), allConfirmed.slice(0, 8).map((m) => {
        var _a2, _b, _c, _d;
        const isPlayerA = ((_a2 = m.playerA) == null ? void 0 : _a2.id) === p.id || ((_b = m.partnerA) == null ? void 0 : _b.id) === p.id;
        const opp = isPlayerA ? m.playerB : m.playerA;
        const sWA = m.sets.filter((s) => s.a > s.b).length, sWB = m.sets.filter((s) => s.b > s.a).length;
        const won = isPlayerA ? sWA > sWB : sWB > sWA;
        const isVsMe = [(_c = m.playerA) == null ? void 0 : _c.id, (_d = m.playerB) == null ? void 0 : _d.id].includes(ME.id);
        return /* @__PURE__ */ React.createElement("div", { key: m.id, style: { background: "var(--surface)", borderRadius: 10, padding: "10px 14px", marginBottom: 6, border: `1px solid ${isVsMe ? "color-mix(in srgb, var(--primary) 13%, transparent)" : "var(--border)"}`, display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 3, height: 32, borderRadius: 2, background: won ? "var(--success)" : "var(--danger)", flexShrink: 0 } }), /* @__PURE__ */ React.createElement(Avatar, { initials: (opp == null ? void 0 : opp.avatar) || "?", size: 26, color: won ? "var(--success)" : "var(--danger)", photo: opp == null ? void 0 : opp.photo }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "var(--text)" } }, won ? "W" : "L", " vs ", opp == null ? void 0 : opp.name), /* @__PURE__ */ React.createElement(TierBadge, { tier: m.tier }), isVsMe && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 8, background: "color-mix(in srgb, var(--primary) 13%, transparent)", color: "var(--primary)", padding: "1px 4px", borderRadius: 3, fontWeight: 700 } }, "vs ME")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", marginTop: 1 } }, m.date, " \xB7 ", m.sets.map((s) => `${s.a}-${s.b}`).join(", "))), /* @__PURE__ */ React.createElement(RatingImpactBadge, { match: m, playerId: p.id }));
      })) : null;
    })());
  }
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 26, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "FIND PLAYERS"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 } }, "Browse \xB7 Challenge \xB7 Connect"), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", marginBottom: 12 } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: search,
      onChange: (e) => setSearch(e.target.value),
      placeholder: "Search by name or location\u2026",
      style: { width: "100%", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "10px 14px 10px 34px", color: "var(--text)", fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }
    }
  ), /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--text-faint)", fontSize: 14 } }, "\u2315")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" } }, [
    { label: "All Tiers", val: "all", set: setFilterTier, cur: filterTier, opts: [{ v: "all", l: "All" }, ...TIERS.map((t) => ({ v: String(t.id), l: t.badge }))] },
    { label: "Gender", val: "all", set: setFilterGender, cur: filterGender, opts: [{ v: "all", l: "All" }, { v: "Male", l: "Male" }, { v: "Female", l: "Female" }] }
  ].map((f, fi) => f.opts.map((opt) => /* @__PURE__ */ React.createElement("button", { key: fi + opt.v, onClick: () => f.set(opt.v), style: { background: f.cur === opt.v ? "color-mix(in srgb, var(--primary) 13%, transparent)" : "var(--surface)", border: `1px solid ${f.cur === opt.v ? "color-mix(in srgb, var(--primary) 27%, transparent)" : "var(--border)"}`, borderRadius: 6, padding: "5px 10px", fontSize: 10, fontWeight: 700, color: f.cur === opt.v ? "var(--primary)" : "var(--text-faint)", cursor: "pointer", fontFamily: "inherit" } }, opt.l)))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--border-strong)", marginBottom: 12 } }, results.length, " player", results.length !== 1 ? "s" : "", " found"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, results.map((p) => {
    var _a2;
    const tc = ((_a2 = TIERS.find((t) => t.id === p.tier)) == null ? void 0 : _a2.color) || "var(--primary)";
    const ratingDiff = Math.abs(toDisplayRating(p.doublesRating || p.rating) - toDisplayRating(ME.doublesRating || ME.rating));
    const diffColor = ratingDiff < 0.3 ? "var(--success)" : ratingDiff < 0.8 ? "var(--warn)" : "var(--danger)";
    const diffLabel = ratingDiff < 0.3 ? "Even match" : ratingDiff < 0.8 ? "Good challenge" : "Big gap";
    return /* @__PURE__ */ React.createElement("div", { key: p.id, onClick: () => setSelected(p), style: { background: "var(--surface)", borderRadius: 12, padding: "12px 14px", border: "1px solid var(--border)", cursor: "pointer", display: "flex", gap: 10, alignItems: "center", transition: "border-color 0.2s" }, onMouseOver: (e) => e.currentTarget.style.borderColor = "var(--border-strong)", onMouseOut: (e) => e.currentTarget.style.borderColor = "var(--border)" }, /* @__PURE__ */ React.createElement(Avatar, { initials: p.avatar, size: 40, color: tc, photo: p.photo }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: "var(--text)" } }, p.name), /* @__PURE__ */ React.createElement(TierBadge, { tier: p.tier })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", marginTop: 2 } }, "📍 ", p.location, " \xB7 ", p.gender), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, background: diffColor + "22", color: diffColor, padding: "2px 7px", borderRadius: 4, fontWeight: 700, display: "inline-block", marginTop: 4 } }, diffLabel)), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 900, color: tc, fontFamily: "'Bebas Neue',sans-serif" } }, fmt(p.rating)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", marginTop: 1 } }, p.computedAccuracy || p.accuracy || 0, "% acc"), challenged[p.id] && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--success)", fontWeight: 700, marginTop: 2 } }, "\u2713 Challenged")));
  })));
}
function SocialFeedScreen({ matches = [], profiles: profiles2 = [], currentUser = null, onNewActivity, focusMatchId = null }) {
  const myId = currentUser == null ? void 0 : currentUser.id;
  const myProfile = profiles2.find((p) => p.id === myId) || DEFAULT_USER;
  const [following, setFollowing] = useState([]);
  // Load existing follows from Supabase on mount so buttons show correct state
  useEffect(() => {
    if (!myId) return;
    const tok = smaashDB.auth.getToken();
    if (!tok) return;
    fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/follows?follower_id=eq.${myId}&select=following_id`, {
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok }
    }).then(r => r.json()).then(data => {
      if (Array.isArray(data)) setFollowing(data.map(d => d.following_id));
    }).catch(() => {});
  }, [myId]);
  const [reactions, setReactions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("smaash_reactions") || "{}");
    } catch (e) {
      return {};
    }
  });
  const [comments, setComments] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("smaash_comments") || "{}");
    } catch (e) {
      return {};
    }
  });
  const [commentInput, setCommentInput] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  const [activeTab, setActiveTab] = useState("club");
  const [highlightId, setHighlightId] = useState(null);
  // Deep-link: when arriving with a focused match (notification tap, or an email
  // "View match" link → /community?match=<id>), switch to the All tab so it's
  // visible, scroll to it, and flash a highlight ring for a couple seconds.
  useEffect(() => {
    if (!focusMatchId) return;
    setActiveTab("all");
    let tries = 0;
    const tick = () => {
      const el = typeof document !== "undefined" && document.getElementById("feed-match-" + focusMatchId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setHighlightId(focusMatchId);
        setTimeout(() => setHighlightId(null), 2600);
      } else if (tries++ < 20) {
        setTimeout(tick, 150);
      }
    };
    tick();
  }, [focusMatchId, matches.length]);
  const [toast, setToast] = useState(null);
  const showToast = (msg, c = "var(--success)") => {
    setToast({ msg, c });
    setTimeout(() => setToast(null), 2200);
  };
  const findPlayer = (id) => profiles2.find((p) => p.id === id) || { name: "Unknown", avatar: "?", rating: 500, doublesRating: 500, tier: 1, clubId: null };
  const feedItems = matches.filter((m) => m.status === "auto_confirmed" || m.status === "confirmed").map((m) => {
    var _a;
    const sets = (() => {
      try {
        return Array.isArray(m.sets) ? m.sets : JSON.parse(m.sets || "[]");
      } catch (e) {
        return [];
      }
    })();
    const pA = findPlayer(m.player_a_id);
    const pB = findPlayer(m.player_b_id);
    const paA = m.partner_a_id ? findPlayer(m.partner_a_id) : null;
    const paB = m.partner_b_id ? findPlayer(m.partner_b_id) : null;
    const sWA = sets.filter((s) => s.a > s.b).length;
    const sWB = sets.filter((s) => s.b > s.a).length;
    const winner = sWA > sWB ? pA : pB;
    const loser = sWA > sWB ? pB : pA;
    const score = sets.map((s) => `${s.a}-${s.b}`).join(", ");
    const isInterClub = pA.clubId && pB.clubId && pA.clubId !== pB.clubId;
    const tc = ((_a = TIERS.find((t) => t.id === m.tier)) == null ? void 0 : _a.color) || "var(--primary)";
    return {
      id: m.id,
      type: "match",
      date: m.played_at || "Today",
      pA,
      pB,
      paA,
      paB,
      sets,
      sWA,
      sWB,
      winner,
      loser,
      score,
      isInterClub,
      tc,
      tier: m.tier,
      matchType: m.match_type || "doubles",
      ratingChangeA:     m.rating_change_a    || 0,
      ratingChangePartA: m.rating_change_parta || m.rating_change_a || 0,
      ratingChangeB:     m.rating_change_b    || 0,
      ratingChangePartB: m.rating_change_partb || m.rating_change_b || 0,
      involvedIds: [m.player_a_id, m.player_b_id, m.partner_a_id, m.partner_b_id].filter(Boolean)
    };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
  const filteredFeed = feedItems.filter((item) => {
    if (activeTab === "following") return item.involvedIds.some((id) => following.includes(id) || id === myId);
    if (activeTab === "club") return item.involvedIds.some((id) => {
      const p = findPlayer(id);
      return p.clubId === myProfile.clubId;
    });
    return true;
  });
  const toggleFollow = (pid) => {
    if (pid === myId || !myId) return;
    const tok = smaashDB.auth.getToken();
    if (!tok) { showToast("Sign in to follow players", "var(--danger)"); return; }
    const isFollowing = following.includes(pid);
    const p = findPlayer(pid);
    // Optimistic update — apply immediately so button doesn't flicker
    setFollowing((f) => isFollowing ? f.filter((x) => x !== pid) : [...f, pid]);
    if (isFollowing) {
      fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/follows?follower_id=eq.${myId}&following_id=eq.${pid}`, {
        method: "DELETE",
        headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok }
      }).then(r => {
        if (!r.ok) {
          // Roll back on failure
          setFollowing((f) => [...f, pid]);
          showToast("Couldn't unfollow — try again", "var(--danger)");
        } else {
          showToast(`Unfollowed ${p.name}`);
        }
      }).catch(() => {
        setFollowing((f) => [...f, pid]);
        showToast("Couldn't unfollow — try again", "var(--danger)");
      });
    } else {
      fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/follows", {
        method: "POST",
        headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "resolution=ignore-duplicates,return=minimal" },
        body: JSON.stringify({ follower_id: myId, following_id: pid })
      }).then(r => {
        if (!r.ok && r.status !== 409) {
          // Roll back on failure (409 = duplicate = already following, that's fine)
          setFollowing((f) => f.filter((x) => x !== pid));
          showToast("Couldn't follow — try again", "var(--danger)");
        } else {
          showToast(`Following ${p.name} 🏸`);
        }
      }).catch(() => {
        setFollowing((f) => f.filter((x) => x !== pid));
        showToast("Couldn't follow — try again", "var(--danger)");
      });
    }
  };
  const refetchReactions = (uid, tok) => {
    const ids = matches.slice(0, 120).map((m) => m.id).filter(Boolean);
    if (!ids.length) { setReactions({}); return; }
    fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/reactions?match_id=in.(${ids.join(",")})&select=match_id,user_id,emoji`, {
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok }
    }).then((r) => r.json()).then((data) => {
      if (!Array.isArray(data)) return;
      const built = {};
      data.forEach(({ match_id, user_id, emoji }) => {
        if (!built[match_id]) built[match_id] = { fire: 0, clap: 0, muscle: 0, mine: null };
        if (built[match_id][emoji] !== void 0) built[match_id][emoji]++;
        if (user_id === uid) built[match_id].mine = emoji;
      });
      setReactions(built);
    }).catch((e) => console.error("refetchReactions error:", e));
  };
  const refetchOneReaction = (matchId, uid, tok) => {
    fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/reactions?match_id=eq.${matchId}&select=match_id,user_id,emoji`, {
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok }
    }).then((r) => r.json()).then((data) => {
      if (!Array.isArray(data)) return;
      const agg = { fire: 0, clap: 0, muscle: 0, mine: null };
      data.forEach(({ user_id, emoji }) => { if (agg[emoji] !== void 0) agg[emoji]++; if (user_id === uid) agg.mine = emoji; });
      setReactions((r) => __spreadProps(__spreadValues({}, r), { [matchId]: agg }));
    }).catch(() => {});
  };
  const addReaction = (matchId, emoji) => {
    const tok = smaashDB.auth.getToken();
    const uid = currentUser == null ? void 0 : currentUser.id;
    if (!tok || !uid) { showToast("Sign in to react"); return; }
    const cur = reactions[matchId] || { fire: 0, clap: 0, muscle: 0, mine: null };
    const removing = cur.mine === emoji;
    setReactions((r) => {
      const cur2 = r[matchId] || { fire: 0, clap: 0, muscle: 0, mine: null };
      const prev = cur2.mine;
      const removing2 = prev === emoji;
      const newR = removing2 ? __spreadProps(__spreadValues({}, cur2), { [emoji]: Math.max(0, cur2[emoji] - 1), mine: null }) : __spreadProps(__spreadValues({}, cur2), { [emoji]: cur2[emoji] + 1, mine: emoji });
      if (!removing2 && prev) newR[prev] = Math.max(0, newR[prev] - 1);
      return __spreadProps(__spreadValues({}, r), { [matchId]: newR });
    });
    if (removing) {
      fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/reactions?match_id=eq.${matchId}&user_id=eq.${uid}`, {
        method: "DELETE",
        headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok }
      }).then(() => refetchOneReaction(matchId, uid, tok));
    } else {
      if (cur.mine) {
        fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/reactions?match_id=eq.${matchId}&user_id=eq.${uid}`, {
          method: "DELETE",
          headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok }
        });
      }
      fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/reactions", {
        method: "POST",
        headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify({ match_id: matchId, user_id: uid, emoji })
      }).then((res) => {
        if (res.ok) {
          refetchOneReaction(matchId, uid, tok);
          showToast({ fire: "🔥", clap: "👏", muscle: "💪" }[emoji] + " Reacted!");
          // Notifications now fan out server-side via the DB trigger on this
          // reactions insert (see sql/notifications_fanout.sql) — secure, and
          // also sends opt-out-aware email. No client-side notification inserts.
        } else res.json().then((e) => console.error("Reaction POST error:", e));
      });
    }
  };
  useEffect(() => {
    const tok = smaashDB.auth.getToken();
    const uid = currentUser == null ? void 0 : currentUser.id;
    if (!tok || !uid) return;
    refetchReactions(uid, tok);
  }, [currentUser == null ? void 0 : currentUser.id, matches.length]);
  useEffect(() => {
    if (!smaashRealtime) return;
    const tok = smaashDB.auth.getToken();
    if (tok) smaashRealtime.realtime.setAuth(tok);
    const pending = {};
    const onChange = (payload) => {
      const mid = payload.new && payload.new.match_id || payload.old && payload.old.match_id;
      if (!mid) return;
      if (pending[mid]) clearTimeout(pending[mid]);
      pending[mid] = setTimeout(() => { refetchOneReaction(mid, currentUser == null ? void 0 : currentUser.id, smaashDB.auth.getToken() || SUPABASE_ANON_KEY); delete pending[mid]; }, 250);
    };
    const channel = smaashRealtime.channel("reactions-feed").on("postgres_changes", { event: "*", schema: "public", table: "reactions" }, onChange).subscribe();
    return () => { Object.keys(pending).forEach((k) => clearTimeout(pending[k])); smaashRealtime.removeChannel(channel); };
  }, [currentUser == null ? void 0 : currentUser.id]);
  const addComment = (matchId) => {
    const text = (commentInput[matchId] || "").trim();
    if (!text) return;
    const tok = smaashDB.auth.getToken();
    const uid = currentUser == null ? void 0 : currentUser.id;
    const newComment = { author: (myProfile == null ? void 0 : myProfile.name) || "You", avatar: (myProfile == null ? void 0 : myProfile.avatar) || "?", text, time: (/* @__PURE__ */ new Date()).toLocaleDateString() };
    setComments((c) => __spreadProps(__spreadValues({}, c), { [matchId]: [...c[matchId] || [], newComment] }));
    setCommentInput((ci) => __spreadProps(__spreadValues({}, ci), { [matchId]: "" }));
    if (tok && uid) {
      fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/comments", {
        method: "POST",
        headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
        body: JSON.stringify({ match_id: matchId, user_id: uid, text })
      }).then((r) => {
        if (!r.ok) console.error("Comment save failed:", r.status);
      });
      // Notifications now fan out server-side via the DB trigger on this
      // comments insert (see sql/notifications_fanout.sql) — secure + email.
    }
  };
  useEffect(() => {
    const tok = smaashDB.auth.getToken() || SUPABASE_ANON_KEY;
    const H = { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok };
    const ids = matches.slice(0, 120).map((m) => m.id).filter(Boolean);
    if (!ids.length) { setComments({}); return; }
    const initialsOf = (nm) => nm && nm !== "Player" ? nm.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() : "?";
    fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/comments?match_id=in.(${ids.join(",")})&select=match_id,user_id,text,created_at&order=created_at.asc`, { headers: H })
      .then((r) => r.json()).then(async (data) => {
        if (!Array.isArray(data)) return;
        const inList = (uid) => profiles2.find((p) => p.id === uid);
        const missing = [...new Set(data.map((c) => c.user_id).filter((uid) => uid && !inList(uid)))];
        const extra = {};
        if (missing.length) {
          try {
            const pr = await fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/profiles?id=in.(${missing.join(",")})&select=id,full_name,avatar_url`, { headers: H }).then((r) => r.json());
            if (Array.isArray(pr)) pr.forEach((p) => { extra[p.id] = { name: p.full_name || "Player", avatar: initialsOf(p.full_name) }; });
          } catch (e) {}
        }
        const nameOf = (uid) => { const p = inList(uid); if (p) return { name: p.name, avatar: p.avatar }; return extra[uid] || { name: "Player", avatar: "?" }; };
        const built = {};
        data.forEach(({ match_id, user_id, text, created_at }) => {
          const a = nameOf(user_id);
          if (!built[match_id]) built[match_id] = [];
          built[match_id].push({ author: a.name, avatar: a.avatar, text, time: new Date(created_at).toLocaleDateString() });
        });
        setComments(built);
      }).catch(() => {
      });
  }, [matches.length, profiles2.length, currentUser == null ? void 0 : currentUser.id]);
  const refetchOneComment = (matchId) => {
    const tok = smaashDB.auth.getToken() || SUPABASE_ANON_KEY;
    const H = { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok };
    const initialsOf = (nm) => nm && nm !== "Player" ? nm.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() : "?";
    fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/comments?match_id=eq.${matchId}&select=match_id,user_id,text,created_at&order=created_at.asc`, { headers: H })
      .then((r) => r.json()).then(async (data) => {
        if (!Array.isArray(data)) return;
        const inList = (uid) => profiles2.find((p) => p.id === uid);
        const missing = [...new Set(data.map((c) => c.user_id).filter((uid) => uid && !inList(uid)))];
        const extra = {};
        if (missing.length) {
          try {
            const pr = await fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/profiles?id=in.(${missing.join(",")})&select=id,full_name,avatar_url`, { headers: H }).then((r) => r.json());
            if (Array.isArray(pr)) pr.forEach((p) => { extra[p.id] = { name: p.full_name || "Player", avatar: initialsOf(p.full_name) }; });
          } catch (e) {}
        }
        const nameOf = (uid) => { const p = inList(uid); if (p) return { name: p.name, avatar: p.avatar }; return extra[uid] || { name: "Player", avatar: "?" }; };
        const list = data.map(({ user_id, text, created_at }) => { const a = nameOf(user_id); return { author: a.name, avatar: a.avatar, text, time: new Date(created_at).toLocaleDateString() }; });
        setComments((c) => __spreadProps(__spreadValues({}, c), { [matchId]: list }));
      }).catch(() => {});
  };
  useEffect(() => {
    if (!smaashRealtime) return;
    const tok = smaashDB.auth.getToken();
    if (tok) smaashRealtime.realtime.setAuth(tok);
    const pending = {};
    const onChange = (payload) => {
      const mid = payload.new && payload.new.match_id || payload.old && payload.old.match_id;
      if (!mid) return;
      if (pending[mid]) clearTimeout(pending[mid]);
      pending[mid] = setTimeout(() => { refetchOneComment(mid); delete pending[mid]; }, 250);
    };
    const channel = smaashRealtime.channel("comments-feed").on("postgres_changes", { event: "*", schema: "public", table: "comments" }, onChange).subscribe();
    return () => { Object.keys(pending).forEach((k) => clearTimeout(pending[k])); smaashRealtime.removeChannel(channel); };
  }, [currentUser == null ? void 0 : currentUser.id]);
  const emojiBtn = (matchId, emoji, icon) => {
    const r = reactions[matchId] || { fire: 0, clap: 0, muscle: 0, mine: null };
    const count = r[emoji] || 0;
    const active = r.mine === emoji;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => addReaction(matchId, emoji),
        style: { background: active ? "color-mix(in srgb, var(--primary) 13%, transparent)" : "none", border: `1px solid ${active ? "color-mix(in srgb, var(--primary) 27%, transparent)" : "var(--border)"}`, borderRadius: 20, padding: "4px 10px", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: active ? "var(--primary)" : "var(--text-dim)", fontFamily: "inherit" }
      },
      /* @__PURE__ */ React.createElement("span", null, icon),
      count > 0 && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700 } }, count)
    );
  };
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease", paddingTop: 44 } }, toast && /* @__PURE__ */ React.createElement(Toast, { msg: toast.msg, color: toast.c }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, letterSpacing: 3, color: "var(--text)", lineHeight: 1 } }, "COMMUNITY"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, marginTop: 2 } }, "SMAASH SOCIAL HUB")), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--primary)" } }, following.length, " following"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)" } }, profiles2.filter((p) => following.includes(p.id)).length > 0 ? "tap players to follow" : "follow players below"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 0, marginBottom: 16, background: "var(--surface)", borderRadius: 10, padding: 3, border: "1px solid var(--border)" } }, [{ id: "all", label: "All Activity" }, { id: "following", label: "Following" }, { id: "club", label: "My Club" }].map((t) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: t.id,
      onClick: () => setActiveTab(t.id),
      style: { flex: 1, background: activeTab === t.id ? "var(--border)" : "none", border: "none", borderRadius: 8, padding: "9px 0", fontSize: 10, fontWeight: 700, color: activeTab === t.id ? "var(--text)" : "var(--text-faint)", cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 0.5 }
    },
    t.label
  ))), filteredFeed.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "40px 20px", background: "var(--surface)", borderRadius: 14, border: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 36, marginBottom: 10 } }, "🏸"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text-dim)" } }, activeTab === "following" ? "Follow players to see their matches here" : "No matches yet \u2014 play some games!")) : filteredFeed.map((item) => {
    var _a, _b, _c, _d, _e;
    const r = reactions[item.id] || { fire: 0, clap: 0, muscle: 0, mine: null };
    const itemComments = comments[item.id] || [];
    const showComments = expandedComments[item.id];
    const tc = item.tc;
    const wonA = item.sWA > item.sWB;
    // ── playerRow: unified layout for all 4 players ─────────────────────────
    const playerRow = (player, delta, sideWon, accentColor, alignRight) => {
      if (!player) return null;
      const isMe = player.id === myId;
      const isFollowed = following.includes(player.id);
      const firstName = (player.name || "?").split(" ")[0];
      const deltaDisplay = delta !== 0 ? fmtChange(delta) : null;
      const deltaPos = delta > 0;
      const deltaBadge = deltaDisplay ? /* @__PURE__ */ React.createElement("span", { style: {
        fontSize: 10, fontWeight: 700, color: deltaPos ? "var(--success)" : "var(--text-muted)",
        background: deltaPos ? "color-mix(in srgb, var(--success) 7%, transparent)" : "var(--border)",
        border: "1px solid " + (deltaPos ? "color-mix(in srgb, var(--success) 19%, transparent)" : "var(--border-strong)"),
        borderRadius: 4, padding: "1px 5px", flexShrink: 0, whiteSpace: "nowrap", lineHeight: 1
      } }, deltaDisplay) : null;
      const nameEl = /* @__PURE__ */ React.createElement("span", { style: {
        fontSize: 11, fontWeight: 600, color: sideWon ? "var(--text)" : "var(--text-dim)",
        lineHeight: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 70
      } }, firstName);
      if (alignRight) return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4, minHeight: 26, overflow: "hidden" } },
        deltaBadge, nameEl,
        /* @__PURE__ */ React.createElement(Avatar, { initials: player.avatar, size: 24, color: sideWon ? accentColor : "var(--border-strong)", photo: player.photo })
      );
      return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4, minHeight: 26, overflow: "hidden" } },
        /* @__PURE__ */ React.createElement(Avatar, { initials: player.avatar, size: 24, color: sideWon ? accentColor : "var(--border-strong)", photo: player.photo }),
        nameEl, deltaBadge
      );
    };
    return /* @__PURE__ */ React.createElement("div", { key: item.id, id: "feed-match-" + item.id, style: { background: "var(--surface)", borderRadius: 14, overflow: "hidden", border: item.id === highlightId ? "2px solid var(--primary)" : "1px solid var(--border)", marginBottom: 12, boxShadow: item.id === highlightId ? "0 0 0 3px color-mix(in srgb, var(--primary) 25%, transparent)" : "none", transition: "border 0.3s, box-shadow 0.3s" } },
      /* @__PURE__ */ React.createElement("div", { style: { height: 2, background: `linear-gradient(90deg,${tc},transparent)` } }),
      /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px 0" } },
        /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 10 } },
          /* @__PURE__ */ React.createElement(TierBadge, { tier: item.tier }),
          /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-faint)" } }, item.matchType, " · ", ((_a = item.date) == null ? void 0 : _a.split("T")[0]) || "Today"),
          item.isInterClub && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, background: "color-mix(in srgb, var(--warn) 13%, transparent)", color: "var(--warn)", padding: "1px 6px", borderRadius: 3, fontWeight: 700 } }, "⚡ INTER-CLUB"),
          /* @__PURE__ */ React.createElement("span", { style: { marginLeft: "auto", fontSize: 10, color: "var(--success)", fontWeight: 700, letterSpacing: 0.5 } }, "✓ CONFIRMED")
        ),
        /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4, marginBottom: 12 } },
          /* @__PURE__ */ React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 7 } },
            playerRow(item.pA,  item.ratingChangeA,     wonA,  "var(--primary)", false),
            item.paA && playerRow(item.paA, item.ratingChangePartA, wonA, "var(--primary)", false)
          ),
          /* @__PURE__ */ React.createElement("div", { style: { flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, margin: "0 4px" } },
            item.sets.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 2, alignItems: "center" } },
              /* @__PURE__ */ React.createElement("span", { style: { background: s.a > s.b ? "color-mix(in srgb, var(--primary) 13%, transparent)" : "var(--border)", borderRadius: 3, padding: "2px 6px", fontSize: 12, fontWeight: 700, color: s.a > s.b ? "var(--primary)" : "var(--text-faint)", minWidth: 24, textAlign: "center" } }, s.a),
              /* @__PURE__ */ React.createElement("span", { style: { color: "var(--border-strong)", fontSize: 9 } }, "-"),
              /* @__PURE__ */ React.createElement("span", { style: { background: s.b > s.a ? "color-mix(in srgb, var(--purple) 13%, transparent)" : "var(--border)", borderRadius: 3, padding: "2px 6px", fontSize: 12, fontWeight: 700, color: s.b > s.a ? "var(--purple)" : "var(--text-faint)", minWidth: 24, textAlign: "center" } }, s.b)
            )),
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--border-strong)", marginTop: 1 } }, item.sWA, "-", item.sWB)
          ),
          /* @__PURE__ */ React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 7, alignItems: "flex-end" } },
            playerRow(item.pB,  item.ratingChangeB,     !wonA, "var(--purple)", true),
            item.paB && playerRow(item.paB, item.ratingChangePartB, !wonA, "var(--purple)", true)
          )
        )
      ),
      /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid var(--border)", padding: "10px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } }, emojiBtn(item.id, "fire", "🔥"), emojiBtn(item.id, "clap", "👏"), emojiBtn(item.id, "muscle", "💪"), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setExpandedComments((e) => __spreadProps(__spreadValues({}, e), { [item.id]: !e[item.id] })),
        style: { marginLeft: "auto", background: "none", border: "1px solid var(--border)", borderRadius: 20, padding: "4px 12px", fontSize: 11, cursor: "pointer", color: "var(--text-dim)", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }
      },
      "💬 ",
      itemComments.length > 0 ? itemComments.length : ""
    )), showComments && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10 } }, itemComments.map((c, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement(Avatar, { initials: c.avatar, size: 24, color: "var(--primary)" }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, background: "var(--sunken)", borderRadius: 8, padding: "6px 10px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "var(--text)" } }, c.author, " "), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "var(--text-muted)" } }, c.text)))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center", marginTop: 8 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: myProfile.avatar || "?", size: 24, color: "var(--primary)" }), /* @__PURE__ */ React.createElement(
      "input",
      {
        value: commentInput[item.id] || "",
        onChange: (e) => setCommentInput((ci) => __spreadProps(__spreadValues({}, ci), { [item.id]: e.target.value })),
        onKeyDown: (e) => e.key === "Enter" && addComment(item.id),
        placeholder: "Add a comment...",
        style: { flex: 1, background: "var(--sunken)", border: "1px solid var(--border)", borderRadius: 20, padding: "7px 14px", color: "var(--text)", fontSize: 12, outline: "none", fontFamily: "inherit" }
      }
    ), /* @__PURE__ */ React.createElement("button", { onClick: () => addComment(item.id), style: { background: "color-mix(in srgb, var(--primary) 13%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 27%, transparent)", borderRadius: 20, padding: "7px 14px", fontSize: 11, fontWeight: 700, color: "var(--primary)", cursor: "pointer", fontFamily: "inherit" } }, "Post")))));
  }), profiles2.filter((p) => p.id !== myId && !following.includes(p.id)).length > 0 && activeTab === "all" && /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 14, padding: "14px 16px", border: "1px solid var(--border)", marginTop: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 2, color: "var(--text)", marginBottom: 12 } }, "PLAYERS TO FOLLOW"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, profiles2.filter((p) => p.id !== myId && !following.includes(p.id)).slice(0, 5).map((p) => {
    var _a;
    const tc = ((_a = TIERS.find((t) => t.id === p.tier)) == null ? void 0 : _a.color) || "var(--primary)";
    const club = INIT_CLUBS.find((c) => c.id === p.clubId);
    return /* @__PURE__ */ React.createElement("div", { key: p.id, style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: p.avatar, size: 36, color: tc }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text)" } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)" } }, toDisplayRating(p.doublesRating || p.rating || 500).toFixed(3).replace(",", "."), club ? ` \xB7 ${club.logo}` : "")), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => toggleFollow(p.id),
        style: { background: "color-mix(in srgb, var(--primary) 13%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 27%, transparent)", borderRadius: 8, padding: "6px 14px", fontSize: 11, fontWeight: 700, color: "var(--primary)", cursor: "pointer", fontFamily: "inherit" }
      },
      "+ Follow"
    ));
  }))));
}
