function PlayerSearch({ label, value, onChange, excludeIds = [], players = [], matchType = "doubles" }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const filtered = players.filter(
    (p) => !excludeIds.includes(p.id) && (!query || p.name.toLowerCase().includes(query.toLowerCase()))
  );
  if (value) return /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 10, padding: "10px 14px", border: "1px solid var(--border)", display: "flex", gap: 10, alignItems: "center", marginBottom: 8 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: value.avatar || "?", size: 30, color: "var(--primary)" }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--text)" } }, value.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)" } }, fmt(matchType === "doubles" ? value.doublesRating || value.rating : value.rating))), /* @__PURE__ */ React.createElement("button", { onClick: () => onChange(null), style: { background: "none", border: "1px solid var(--border-strong)", borderRadius: 6, padding: "4px 10px", fontSize: 10, color: "var(--text-faint)", cursor: "pointer", fontFamily: "inherit" } }, "\u2715 Change"));
  return /* @__PURE__ */ React.createElement("div", { ref, style: { position: "relative", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 5 } }, label), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 14px", cursor: "text" }, onClick: () => setOpen(true) }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, marginRight: 8, color: "var(--text-faint)" } }, "🔍"), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: query,
      onChange: (e) => {
        setQuery(e.target.value);
        setOpen(true);
      },
      onFocus: () => setOpen(true),
      placeholder: `Search ${players.length} players...`,
      style: { flex: 1, background: "none", border: "none", outline: "none", color: "var(--text)", fontSize: 13, fontFamily: "inherit" }
    }
  ), query && /* @__PURE__ */ React.createElement("button", { onClick: () => setQuery(""), style: { background: "none", border: "none", color: "var(--text-faint)", cursor: "pointer", fontSize: 14 } }, "\u2715")), open && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: "100%", left: 0, right: 0, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, zIndex: 999, maxHeight: 220, overflowY: "auto", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" } }, players.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { padding: "16px", textAlign: "center", color: "var(--text-faint)", fontSize: 12 } }, "Loading players...") : filtered.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { padding: "16px", textAlign: "center", color: "var(--text-faint)", fontSize: 12 } }, 'No players match "', query, '"') : filtered.slice(0, 20).map((p) => {
    var _a;
    const tc = ((_a = TIERS.find((t) => t.id === p.tier)) == null ? void 0 : _a.color) || "var(--primary)";
    const club = INIT_CLUBS.find((c) => c.id === p.clubId);
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: p.id,
        onClick: () => {
          onChange(p);
          setOpen(false);
          setQuery("");
        },
        style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", cursor: "pointer", borderBottom: "1px solid var(--border)" },
        onMouseOver: (e) => e.currentTarget.style.background = "var(--border)",
        onMouseOut: (e) => e.currentTarget.style.background = "none"
      },
      /* @__PURE__ */ React.createElement(Avatar, { initials: p.avatar || "?", size: 30, color: tc }),
      /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text)" } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)" } }, fmt(matchType === "doubles" ? p.doublesRating || p.rating || 500 : p.rating || 500), club ? /* @__PURE__ */ React.createElement("span", { style: { marginLeft: 6, fontSize: 9, background: club.logoColor + "22", color: club.logoColor, padding: "1px 5px", borderRadius: 3, fontWeight: 700 } }, club.logo) : ""))
    );
  })));
}
function SetScoreInput({ setNum, scoreA, scoreB, onChangeA, onChangeB, isLast, onRemove }) {
  const inp = {
    width: "100%",
    background: "var(--sunken)",
    border: "1.5px solid var(--border)",
    borderRadius: 9,
    padding: "11px 10px",
    color: "var(--text)",
    fontSize: 16,
    fontWeight: 700,
    textAlign: "center",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box"
  };
  return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: 700, color: "var(--text-faint)", letterSpacing: 1, width: 40, flexShrink: 0 } }, "SET ", setNum), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      min: 0,
      max: 30,
      value: scoreA,
      onChange: (e) => onChangeA(e.target.value),
      placeholder: "0",
      style: __spreadProps(__spreadValues({}, inp), { borderColor: scoreA > scoreB && scoreA ? "color-mix(in srgb, var(--primary) 33%, transparent)" : "var(--border)", color: scoreA > scoreB && scoreA ? "var(--primary)" : "var(--text)" })
    }
  ), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--border-strong)", fontWeight: 700, fontSize: 14 } }, "\u2014"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      min: 0,
      max: 30,
      value: scoreB,
      onChange: (e) => onChangeB(e.target.value),
      placeholder: "0",
      style: __spreadProps(__spreadValues({}, inp), { borderColor: scoreB > scoreA && scoreB ? "color-mix(in srgb, var(--purple) 33%, transparent)" : "var(--border)", color: scoreB > scoreA && scoreB ? "var(--purple)" : "var(--text)" })
    }
  )), isLast && setNum > 1 && /* @__PURE__ */ React.createElement("button", { onClick: onRemove, style: {
    background: "none",
    border: "1px solid var(--border)",
    borderRadius: 7,
    padding: "6px 8px",
    fontSize: 11,
    color: "var(--text-faint)",
    cursor: "pointer",
    fontFamily: "inherit",
    flexShrink: 0
  } }, "\u2715")));
}
function MatchSubmitWrapper({ onSubmit, userRole, currentUser, profiles: profiles2, matches, pendingConfirms, refetchMatches, refetchProfiles }) {
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const myId = currentUser == null ? void 0 : currentUser.id;
  const myProfile = profiles2.find((p) => p.id === myId);
  const myName = (myProfile == null ? void 0 : myProfile.name) || ((currentUser == null ? void 0 : currentUser.user_metadata) != null ? currentUser.user_metadata.full_name : null) || "Player";
  const myAvatar = (myProfile == null ? void 0 : myProfile.avatar) || myName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const myRating = myProfile == null ? void 0 : myProfile.doublesRating;
  const myPhoto = myProfile == null ? void 0 : myProfile.photo;
  const displayRating = myRating ? toDisplayRating(myRating).toFixed(3) : null;
  const singlesRating = myProfile == null ? void 0 : myProfile.rating;
  const displaySingles = myProfile && myProfile.playsSingles && singlesRating ? toDisplayRating(singlesRating).toFixed(3) : null;
  const confirmedStatuses = ["confirmed", "auto_confirmed", "admin_override"];
  const myConfirmed = matches.filter((m) => confirmedStatuses.includes(m.status) && [m.player_a_id, m.player_b_id, m.partner_a_id, m.partner_b_id].includes(myId)).sort((a, b) => new Date(b.played_at || b.submitted_at) - new Date(a.played_at || a.submitted_at));
  const last3 = myConfirmed.slice(0, 3);
  const ratingHistory = (() => {
    const sorted = [...myConfirmed].sort((a, b) => new Date(a.played_at || a.submitted_at) - new Date(b.played_at || b.submitted_at));
    let r = myRating || 533;
    const pts = [r];
    sorted.slice(-12).forEach((m) => {
      const isA = m.player_a_id === myId || m.partner_a_id === myId;
      const delta = isA ? m.rating_change_pa || m.rating_change_a || 0 : m.rating_change_pb || m.rating_change_b || 0;
      r = Math.max(100, Math.min(2500, r - delta));
      pts.unshift(r);
    });
    return pts.slice(-10);
  })();
  const totalWins = myConfirmed.filter((m) => {
    const isA = m.player_a_id === myId || m.partner_a_id === myId;
    return (isA && m.winner_side === "A") || (!isA && m.winner_side === "B");
  }).length;
  const winRate = myConfirmed.length > 0 ? Math.round(totalWins / myConfirmed.length * 100) : 0;
  const isProvisional = myConfirmed.length < 5;
  const matchesUntilVerified = Math.max(0, 5 - myConfirmed.length);
  if (showConfirm) return /* @__PURE__ */ React.createElement("div", null,
    /* @__PURE__ */ React.createElement("button", { onClick: () => setShowConfirm(false), style: { background: "none", border: "none", color: "var(--text-dim)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 16, padding: 0 } }, "\u2190 Back"),
    /* @__PURE__ */ React.createElement(MatchConfirm, { matches, setMatches: refetchMatches, profiles: profiles2, currentUser, refetchMatches, refetchProfiles }));
  if (showForm) return /* @__PURE__ */ React.createElement("div", null,
    /* @__PURE__ */ React.createElement("button", { onClick: () => setShowForm(false), style: { background: "none", border: "none", color: "var(--text-dim)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 16, padding: 0 } }, "\u2190 Home"),
    /* @__PURE__ */ React.createElement(MatchSubmit, { onSubmit: () => { onSubmit(); setShowForm(false); }, userRole, currentUser, profiles: profiles2, playsSingles: !!(myProfile && myProfile.playsSingles) }));
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease", paddingTop: 44 } },
    pendingConfirms > 0 && /* @__PURE__ */ React.createElement("div", { onClick: () => setShowConfirm(true), style: { background: "color-mix(in srgb, var(--warn) 4%, transparent)", border: "1px solid color-mix(in srgb, var(--warn) 27%, transparent)", borderRadius: 12, padding: "11px 16px", marginBottom: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 10 } },
      /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18 } }, "\u23F3"),
      /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } },
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--warn)" } }, pendingConfirms, " match", pendingConfirms > 1 ? "es" : "", " awaiting confirmation"),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)" } }, "Tap to confirm or dispute")),
      /* @__PURE__ */ React.createElement("span", { style: { color: "var(--warn)" } }, "\u203A")),
    /* @__PURE__ */ React.createElement("div", { style: { background: "linear-gradient(135deg, var(--surface) 0%, #0a1628 100%)", borderRadius: 20, padding: "20px", marginBottom: 14, position: "relative", overflow: "hidden" } },
      /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "color-mix(in srgb, var(--primary) 3%, transparent)", pointerEvents: "none" } }),
      /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", bottom: -20, left: -20, width: 80, height: 80, borderRadius: "50%", background: "color-mix(in srgb, var(--purple) 3%, transparent)", pointerEvents: "none" } }),
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 18 } },
        /* @__PURE__ */ React.createElement(Avatar, { initials: myAvatar, size: 52, color: "var(--primary)", photo: myPhoto }),
        /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } },
          /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 700, color: "var(--text)", lineHeight: 1.2 } }, myName.split(" ")[0]),
          /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", marginTop: 3 } }, isProvisional && matchesUntilVerified > 0 ? /* @__PURE__ */ React.createElement("span", { style: { color: "var(--warn)" } }, "🔒 ", matchesUntilVerified, " more to unlock ranking") : /* @__PURE__ */ React.createElement("span", { style: { color: "var(--success)" } }, "\u2713 Verified"))),
        displaySingles ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, textAlign: "right" } },
          /* @__PURE__ */ React.createElement("div", null,
            /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: 1, color: "var(--primary)", lineHeight: 1 } }, displaySingles),
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", letterSpacing: 2, textTransform: "uppercase" } }, "Singles")),
          /* @__PURE__ */ React.createElement("div", null,
            /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: 1, color: "var(--purple)", lineHeight: 1 } }, displayRating),
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", letterSpacing: 2, textTransform: "uppercase" } }, "Doubles")))
        : displayRating && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } },
          /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 42, letterSpacing: 2, color: "var(--primary)", lineHeight: 1 } }, displayRating),
          /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", letterSpacing: 2, textTransform: "uppercase" } }, "Doubles Rating"))),
      /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 18 } },
        [{ l: "Matches", v: myConfirmed.length }, { l: "Wins", v: totalWins }, { l: "Win %", v: myConfirmed.length > 0 ? winRate + "%" : "--" }].map((s) =>
          /* @__PURE__ */ React.createElement("div", { key: s.l, style: { background: "var(--sunken)", borderRadius: 10, padding: "10px 8px", textAlign: "center" } },
            /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: "var(--text)", lineHeight: 1 } }, s.v),
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", letterSpacing: 1, marginTop: 2 } }, s.l.toUpperCase())))),
      ratingHistory.length > 2 && /* @__PURE__ */ React.createElement("div", null,
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", letterSpacing: 1.5, marginBottom: 6, textTransform: "uppercase" } }, "Rating Trend"),
        /* @__PURE__ */ React.createElement(Sparkline, { data: ratingHistory, color: "var(--primary)", width: 280, height: 36 }))),
    last3.length > 0 && /* @__PURE__ */ React.createElement("div", { key: "recent-matches", style: { marginBottom: 14 } },
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-faint)", textTransform: "uppercase", marginBottom: 10 } }, "Recent Matches"),
      last3.map((m) => {
        const isA = m.player_a_id === myId || m.partner_a_id === myId;
        const won = (isA && m.winner_side === "A") || (!isA && m.winner_side === "B");
        const opp1Id = isA ? m.player_b_id : m.player_a_id;
        const opp2Id = isA ? m.partner_b_id : m.partner_a_id;
        const myPartnerId = m.player_a_id === myId ? m.partner_a_id : m.partner_a_id === myId ? m.player_a_id : m.player_b_id === myId ? m.partner_b_id : m.player_b_id;
        const opp1 = profiles2.find((p) => p.id === opp1Id) || { name: "Opponent", avatar: "??" };
        const opp2 = opp2Id && opp2Id !== myId ? profiles2.find((p) => p.id === opp2Id) : null;
        const myPartner = myPartnerId && myPartnerId !== myId ? profiles2.find((p) => p.id === myPartnerId) : null;
        const sets = (() => { try { return Array.isArray(m.sets) ? m.sets : JSON.parse(m.sets || "[]"); } catch (e) { return []; } })();
        const ratingChange = isA ? (m.rating_change_pa || m.rating_change_a || 0) : (m.rating_change_pb || m.rating_change_b || 0);
        const date = (m.played_at || "").split("T")[0];
        return /* @__PURE__ */ React.createElement("div", { key: m.id, style: { background: "var(--surface)", borderRadius: 12, padding: "12px 14px", marginBottom: 8, border: "1px solid " + (won ? "color-mix(in srgb, var(--success) 9%, transparent)" : "color-mix(in srgb, var(--danger) 9%, transparent)") } },
          /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
            /* @__PURE__ */ React.createElement("div", { style: { width: 4, alignSelf: "stretch", borderRadius: 2, background: won ? "var(--success)" : "var(--danger)", flexShrink: 0 } }),
            /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } },
              /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5, alignItems: "center", marginBottom: 3 } },
                /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: won ? "var(--success)" : "var(--danger)" } }, won ? "W" : "L"),
                /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "var(--text-muted)" } }, "vs"),
                /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: "var(--text)" } }, opp1.name.split(" ")[0]),
                opp2 && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "var(--text-dim)" } }, "& " + opp2.name.split(" ")[0])),
              myPartner && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", marginBottom: 2 } }, "w/ " + myPartner.name.split(" ")[0]),
              /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)" } }, sets.map((s) => s.a + "-" + s.b).join(", "), " \xB7 ", date)),
            ratingChange !== 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: ratingChange > 0 ? "var(--success)" : "var(--danger)", flexShrink: 0 } }, fmtChange(ratingChange))));
      })),
    /* @__PURE__ */ React.createElement("button", { onClick: () => setShowForm(true), style: { width: "100%", background: "linear-gradient(135deg, var(--primary), var(--primary-deep))", color: "var(--bg)", border: "none", borderRadius: 14, padding: "16px", fontSize: 14, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 } },
      /* @__PURE__ */ React.createElement("span", { style: { fontSize: 20 } }, "🏸"),
      "Submit Match"));
}
function MatchSubmit({ onSubmit, userRole = "player", currentUser = null, profiles: profiles2 = [], playsSingles = false }) {
  var _a, _b, _c, _d, _e, _f;
  const isPlayer = !["club_director","tournament_director","admin"].includes(userRole);
  const [step, setStep] = useState(2);
  const [matchType, setMatchType] = useState("doubles");
  const [tier, setTier] = useState(1);
  const [playerA, setPlayerA] = useState(() => {
    var _a2, _b2, _c2;
    if (currentUser) {
      const me = profiles2.find((p) => p.id === currentUser.id);
      return {
        id: currentUser.id,
        name: (me && me.name) || ((_a2 = currentUser.user_metadata) == null ? void 0 : _a2.full_name) || ((_b2 = currentUser.email) == null ? void 0 : _b2.split("@")[0]) || "You",
        avatar: (me && me.avatar) || (((_c2 = currentUser.user_metadata) == null ? void 0 : _c2.full_name) || "ME").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
        rating: me && me.rating != null ? me.rating : 500,
        doublesRating: me && me.doublesRating != null ? me.doublesRating : 500,
        accuracy: (me && me.accuracy) || 0,
        tier: (me && me.tier) || 1,
        clubId: me ? me.clubId : null,
        photo: (me && me.photo) || null
      };
    }
    return null;
  });
  const [playerB, setPlayerB] = useState(null);
  const [partnerA, setPartnerA] = useState(null);
  const [partnerB, setPartnerB] = useState(null);
  const [sets, setSets] = useState([{ a: "", b: "" }]);
  const [date, setDate] = useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [ratingChanges, setRatingChanges] = useState({ a: 0, b: 0, newA: 500, newB: 500 });
  const [done, setDone] = useState(false);
  const [submitterRole, setSubmitterRole] = useState("player");
  const handleRoleChange = (role) => {
    setSubmitterRole(role);
    const allowed = TIER_ACCESS[role] || [1];
    if (!allowed.includes(tier)) setTier(allowed[allowed.length - 1]);
  };
  const t = TIERS.find((x) => x.id === tier);
  const tc = (t == null ? void 0 : t.color) || "var(--primary)";
  const updateSet = (i, side, val) => setSets((s) => s.map((set, idx) => idx === i ? __spreadProps(__spreadValues({}, set), { [side]: val }) : set));
  const sWA = sets.filter((s) => Number(s.a) > Number(s.b) && s.a !== "" && s.b !== "").length;
  const sWB = sets.filter((s) => Number(s.b) > Number(s.a) && s.a !== "" && s.b !== "").length;
  const allSetsValid = sets.every((s) => s.a !== "" && s.b !== "" && isValidBadmintonScore(s.a, s.b).valid);
  const canGo2 = tier !== null;
  const canGo3 = matchType === "singles" ? playerA && playerB : playerA && playerB && partnerA && partnerB;
  const canGo4 = sets.length >= 1 && allSetsValid && sets.every((s) => s.a !== "" && s.b !== "");
  const STEPS = ["Format", "Players", "Score", "Review"];
  const reset = () => {
    var _a2, _b2, _c2, _d2, _e2, _f2;
    setDone(false);
    setStep(isPlayer ? 2 : 1);
    setTier(null);
    setPlayerA(currentUser ? {
      id: currentUser.id,
      name: ((_a2 = currentUser.user_metadata) == null ? void 0 : _a2.full_name) || ((_b2 = currentUser.email) == null ? void 0 : _b2.split("@")[0]) || "You",
      avatar: (((_c2 = currentUser.user_metadata) == null ? void 0 : _c2.full_name) || "ME").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
      rating: 500,
      doublesRating: 500,
      accuracy: 0,
      tier: 1,
      clubId: 1,
      photo: null
    } : null);
    setPlayerB(null);
    setPartnerA(null);
    setPartnerB(null);
    setSets([{ a: "", b: "" }]);
    setMatchType("doubles");
    setRatingChanges({ a: 0, b: 0, newA: 500, newB: 500 });
    setStep(isPlayer ? 2 : 1);
    setTier(null);
    setPlayerA(currentUser ? { id: currentUser.id, name: ((_d2 = currentUser.user_metadata) == null ? void 0 : _d2.full_name) || ((_e2 = currentUser.email) == null ? void 0 : _e2.split("@")[0]) || "You", avatar: (((_f2 = currentUser.user_metadata) == null ? void 0 : _f2.full_name) || "ME").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(), rating: 500, doublesRating: 500, accuracy: 0, tier: 1, clubId: 1, photo: null } : null);
    setPlayerB(null);
    setPartnerA(null);
    setPartnerB(null);
  };
  const handleSubmit = async () => {
    const isDirector = submitterRole === "director";
    const setsData = sets.map((s) => ({ a: Number(s.a), b: Number(s.b) }));
    const setsWonA = setsData.filter((s) => s.a > s.b).length;
    const setsWonB = setsData.filter((s) => s.b > s.a).length;
    const aWon = setsWonA > setsWonB;
    const isDirectorSubmit = submitterRole === "club_director" || submitterRole === "admin" || submitterRole === "tournament_director";
    console.log("Submitting as:", submitterRole, "isDirectorSubmit:", isDirectorSubmit);
    const matchStatus = isDirectorSubmit ? "auto_confirmed" : "pending";
    console.log("Match status will be:", matchStatus);
    const newMatch = {
      player_a_id: playerA == null ? void 0 : playerA.id,
      player_b_id: playerB == null ? void 0 : playerB.id,
      partner_a_id: (partnerA == null ? void 0 : partnerA.id) || null,
      partner_b_id: (partnerB == null ? void 0 : partnerB.id) || null,
      tier,
      match_type: matchType,
      sets: JSON.stringify(setsData),
      sets_won_a: setsWonA,
      sets_won_b: setsWonB,
      winner_side: aWon ? "A" : "B",
      status: matchStatus,
      played_at: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    };
    console.log("Match payload:", JSON.stringify(newMatch));
    const tok = smaashDB.auth.getToken();
    if (tok) {
      fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/matches", {
        method: "POST",
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": "Bearer " + tok,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify(newMatch)
      }).then((r) => {
        console.log("Match saved:", r.status);
        if (onSubmit) onSubmit(newMatch);
      });
    }
    setRatingChanges({ a: 0, b: 0, newA: 500, newB: 500 });
    setDone(true);
  };
  if (done) return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", textAlign: "center", padding: 24, animation: "fadeIn 0.3s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 64, animation: "pop 0.5s cubic-bezier(.34,1.56,.64,1)" } }, "🏸"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 38, letterSpacing: 3, color: "var(--text)", marginTop: 12 } }, "MATCH SUBMITTED"), /* @__PURE__ */ React.createElement("div", { style: { color: "var(--text-dim)", fontSize: 13, marginTop: 8, lineHeight: 1.8 } }, submitterRole === "club_director" || submitterRole === "admin" || submitterRole === "tournament_director" ? "Match recorded \xB7 Ratings updated instantly" : "Match submitted \xB7 Awaiting confirmation from opponent"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 16, marginTop: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", background: "var(--surface)", borderRadius: 10, padding: "10px 16px", border: "1px solid color-mix(in srgb, var(--success) 20%, transparent)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", marginBottom: 2 } }, (_a = playerA == null ? void 0 : playerA.name) == null ? void 0 : _a.split(" ")[0]), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: ratingChanges.a >= 0 ? "var(--success)" : "var(--danger)", fontFamily: "'Bebas Neue',sans-serif" } }, fmtChange(ratingChanges.a))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", background: "var(--surface)", borderRadius: 10, padding: "10px 16px", border: "1px solid color-mix(in srgb, var(--purple) 20%, transparent)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", marginBottom: 2 } }, (_b = playerB == null ? void 0 : playerB.name) == null ? void 0 : _b.split(" ")[0]), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: ratingChanges.b >= 0 ? "var(--success)" : "var(--danger)", fontFamily: "'Bebas Neue',sans-serif" } }, fmtChange(ratingChanges.b)))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 20, background: "var(--surface)", borderRadius: 14, padding: "16px 20px", border: "1px solid " + tc + "22", display: "flex", gap: 16, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement(Avatar, { initials: playerA == null ? void 0 : playerA.avatar, size: 36, color: "var(--primary)", photo: playerA == null ? void 0 : playerA.photo }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-muted)", marginTop: 4 } }, (_c = playerA == null ? void 0 : playerA.name) == null ? void 0 : _c.split(" ")[0])), /* @__PURE__ */ React.createElement(ScoreDisplay, { sets }), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement(Avatar, { initials: playerB == null ? void 0 : playerB.avatar, size: 36, color: "var(--purple)", photo: playerB == null ? void 0 : playerB.photo }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-muted)", marginTop: 4 } }, (_d = playerB == null ? void 0 : playerB.name) == null ? void 0 : _d.split(" ")[0]))), /* @__PURE__ */ React.createElement("button", { onClick: reset, style: { marginTop: 20, background: tc, color: "var(--bg)", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" } }, "Submit Another"));
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 22, letterSpacing: 3, color: "var(--text)", lineHeight: 1 } }, "MATCH SUBMISSION"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2 } }, "Glicko-2 \xB7 SMAASH Rating")), step === 2 && /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.25s ease" } }, playsSingles && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 14, background: "var(--surface)", borderRadius: 10, padding: 4, border: "1px solid var(--border)" } }, [{ id: "singles", l: "🏸 Singles" }, { id: "doubles", l: "👥 Doubles" }].map((m) => /* @__PURE__ */ React.createElement("button", { key: m.id, onClick: () => { setMatchType(m.id); if (m.id === "singles") { setPartnerA(null); setPartnerB(null); } }, style: { flex: 1, background: matchType === m.id ? "var(--primary)" : "none", border: "none", borderRadius: 8, padding: "8px 0", fontSize: 11, fontWeight: 800, letterSpacing: 1, color: matchType === m.id ? "var(--bg)" : "var(--text-faint)", cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase" } }, m.l))),  matchType === "singles" ? /* @__PURE__ */ React.createElement("div", null, playerA && currentUser && !["club_director", "tournament_director", "admin"].includes(userRole) ? /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 10, padding: "10px 14px", border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)", display: "flex", gap: 10, alignItems: "center", marginBottom: 8 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: playerA.avatar, size: 32, color: "var(--primary)" }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--primary)" } }, playerA.name, " ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-faint)" } }, "(You)")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)" } }, "Logged in \xB7 ", fmt(playerA.rating))), /* @__PURE__ */ null) : /* @__PURE__ */ React.createElement(PlayerSearch, { label: ["club_director", "tournament_director", "admin"].includes(userRole) ? "Player A" : "Player A (You)", value: playerA, onChange: setPlayerA, excludeIds: [playerB == null ? void 0 : playerB.id].filter(Boolean), matchType, players: profiles2 }), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: "var(--border)", fontSize: 18, letterSpacing: 3, margin: "8px 0" } }, "VS"), /* @__PURE__ */ React.createElement(PlayerSearch, { label: "Player B (Opponent)", value: playerB, onChange: setPlayerB, excludeIds: [playerA == null ? void 0 : playerA.id].filter(Boolean), matchType, players: profiles2 })) : /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, padding: 14, border: "1px solid var(--border)", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--primary)", fontWeight: 700, letterSpacing: 2, marginBottom: 12, textTransform: "uppercase" } }, "\u25C6 Team A"), playerA && currentUser ? /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 10, padding: "10px 14px", border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)", display: "flex", gap: 10, alignItems: "center", marginBottom: 8 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: playerA.avatar, size: 32, color: "var(--primary)" }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--primary)" } }, playerA.name, " ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-faint)" } }, "(You)")))) : /* @__PURE__ */ React.createElement(PlayerSearch, { label: "Player A1 (You)", value: playerA, onChange: setPlayerA, excludeIds: [playerB == null ? void 0 : playerB.id, partnerA == null ? void 0 : partnerA.id, partnerB == null ? void 0 : partnerB.id].filter(Boolean), players: profiles2 }), /* @__PURE__ */ React.createElement(PlayerSearch, { label: "Player A2 (Partner)", value: partnerA, onChange: setPartnerA, excludeIds: [playerA == null ? void 0 : playerA.id, playerB == null ? void 0 : playerB.id, partnerB == null ? void 0 : partnerB.id].filter(Boolean), players: profiles2, matchType })), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: "var(--border)", fontSize: 18, letterSpacing: 3, margin: "8px 0" } }, "VS"), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, padding: 14, border: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--purple)", fontWeight: 700, letterSpacing: 2, marginBottom: 12, textTransform: "uppercase" } }, "\u25C6 Team B"), /* @__PURE__ */ React.createElement(PlayerSearch, { label: "Player B1", value: playerB, onChange: setPlayerB, excludeIds: [playerA == null ? void 0 : playerA.id, partnerA == null ? void 0 : partnerA.id, partnerB == null ? void 0 : partnerB.id].filter(Boolean), matchType, players: profiles2 }), /* @__PURE__ */ React.createElement(PlayerSearch, { label: "Player B2 (Partner)", value: partnerB, onChange: setPartnerB, excludeIds: [playerA == null ? void 0 : playerA.id, playerB == null ? void 0 : playerB.id, partnerA == null ? void 0 : partnerA.id].filter(Boolean), matchType, players: profiles2 }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 18 } }, /* @__PURE__ */ React.createElement(Btn, { outline: true, color: "var(--text-faint)", onClick: () => setStep(1) }, "\u2190 Back"), /* @__PURE__ */ React.createElement(Btn, { disabled: !canGo3, color: tc, onClick: () => setStep(3) }, "Continue \u2192"))), step === 3 && /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.25s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, paddingLeft: 48 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: playerA == null ? void 0 : playerA.avatar, size: 26, color: "var(--primary)", photo: playerA == null ? void 0 : playerA.photo }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: "var(--primary)" } }, (_e = playerA == null ? void 0 : playerA.name) == null ? void 0 : _e.split(" ")[0])), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--border-strong)", letterSpacing: 2 } }, "\u2014\u2014"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: "var(--purple)" } }, (_f = playerB == null ? void 0 : playerB.name) == null ? void 0 : _f.split(" ")[0]), /* @__PURE__ */ React.createElement(Avatar, { initials: playerB == null ? void 0 : playerB.avatar, size: 26, color: "var(--purple)", photo: playerB == null ? void 0 : playerB.photo }))), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--sunken)", borderRadius: 10, padding: "10px 12px", marginBottom: 12, fontSize: 11, color: "var(--text-dim)", lineHeight: 1.7 } }, "🏸 ", /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--text-muted)" } }, "Badminton scoring:"), " First to 21 (win by 2). Deuce plays to 30 max (30\u201329)."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase" } }, "Sets Played"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--primary)", fontWeight: 700 } }, sets.length === 1 ? "Best of 1 \u2014 add more if needed" : sets.length === 2 ? "Best of 3 \u2014 add set 3 if needed" : `${sets.length} sets`)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 } }, sets.map((s, i) => /* @__PURE__ */ React.createElement(SetScoreInput, { key: i, setNum: i + 1, scoreA: s.a, scoreB: s.b, onChangeA: (v) => updateSet(i, "a", v), onChangeB: (v) => updateSet(i, "b", v), isLast: i === sets.length - 1, onRemove: () => setSets((p) => p.slice(0, -1)) }))), sets.length < 5 && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSets((s) => [...s, { a: "", b: "" }]),
      style: { background: "color-mix(in srgb, var(--primary) 3%, transparent)", border: "1.5px dashed color-mix(in srgb, var(--primary) 20%, transparent)", borderRadius: 8, padding: "10px 0", width: "100%", color: "var(--primary)", cursor: "pointer", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", fontFamily: "inherit", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }
    },
    /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14 } }, "+"),
    " Add Set ",
    sets.length + 1
  ), allSetsValid && sets.every((s) => s.a !== "" && s.b !== "") && /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, padding: "12px 16px", marginBottom: 14, border: "1px solid " + tc + "22", display: "flex", justifyContent: "space-around", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24, fontWeight: 900, color: "var(--primary)", fontFamily: "'Bebas Neue',sans-serif" } }, sWA), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", letterSpacing: 1.5 } }, "SETS WON")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--border-strong)", letterSpacing: 2 } }, "VS"), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24, fontWeight: 900, color: "var(--purple)", fontFamily: "'Bebas Neue',sans-serif" } }, sWB), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", letterSpacing: 1.5 } }, "SETS WON"))), /* @__PURE__ */ React.createElement(Textarea, { label: "Notes (optional)", value: notes, onChange: setNotes, placeholder: "e.g. Club tournament, round robin\u2026", rows: 3 }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, /* @__PURE__ */ React.createElement(Btn, { outline: true, color: "var(--text-faint)", onClick: () => setStep(2) }, "\u2190 Back"), /* @__PURE__ */ React.createElement(Btn, { disabled: !canGo4, color: tc, onClick: () => setStep(4) }, "Review \u2192"))), step === 4 && /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.25s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 14, overflow: "hidden", border: "1px solid var(--border)", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { background: tc + "14", borderBottom: "1px solid " + tc + "22", padding: "10px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } }, /* @__PURE__ */ React.createElement(TierBadge, { tier }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-dim)" } }, matchType)), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-faint)" } }, date)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "var(--text)", textAlign: "center" } }, (playerA ? playerA.name.split(" ")[0] : "") + (partnerA ? " & " + partnerA.name.split(" ")[0] : ""), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--border-strong)", margin: "0 6px" } }, "vs"), (playerB ? playerB.name.split(" ")[0] : "") + (partnerB ? " & " + partnerB.name.split(" ")[0] : "")), /* @__PURE__ */ React.createElement("div", { style: { padding: 16 } }, [{ player: playerA, partner: partnerA, color: "var(--primary)" }, { player: playerB, partner: partnerB, color: "var(--purple)" }].map((row, ri) => {
    var _a2, _b2, _c2, _d2, _e2;
    return /* @__PURE__ */ React.createElement("div", { key: ri, style: { display: "flex", alignItems: "center", gap: 10, marginBottom: ri === 0 ? 12 : 0 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: (_a2 = row.player) == null ? void 0 : _a2.avatar, size: 36, color: row.color, photo: (_b2 = row.player) == null ? void 0 : _b2.photo }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: "var(--text)", fontSize: 13 } }, (_c2 = row.player) == null ? void 0 : _c2.name, row.partner ? " & " + row.partner.name : "")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 900, color: (ri === 0 ? sWA > sWB : sWB > sWA) ? row.color : "var(--border-strong)", fontFamily: "'Bebas Neue',sans-serif" } }, ri === 0 ? sWA : sWB));
  }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, justifyContent: "center", margin: "14px 0" } }, sets.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 8, color: "var(--text-faint)", marginBottom: 2 } }, "S", i + 1), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--border)", borderRadius: "3px 3px 0 0", padding: "2px 6px", fontSize: 11, fontWeight: 700, color: Number(s.a) > Number(s.b) ? "var(--primary)" : "var(--text-faint)" } }, s.a), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--sunken)", borderRadius: "0 0 3px 3px", padding: "2px 6px", fontSize: 11, fontWeight: 700, color: Number(s.b) > Number(s.a) ? "var(--purple)" : "var(--text-faint)" } }, s.b))))), /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid var(--border)", padding: "8px 16px", background: "var(--sunken)" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--warn)", fontWeight: 700 } }, "\u23F1 72hr confirmation window")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, /* @__PURE__ */ React.createElement(Btn, { outline: true, color: "var(--text-faint)", onClick: () => setStep(3) }, "\u2190 Back"), /* @__PURE__ */ React.createElement(Btn, { color: tc, onClick: handleSubmit }, "Submit Match"))))))
}
function MatchConfirm({ matches = [], setMatches, profiles: profiles2 = [], currentUser = null, refetchMatches = null }) {
  const myId = currentUser == null ? void 0 : currentUser.id;
  const [toast, setToast] = useState(null);
  const [disputingId, setDisputingId] = useState(null);
  const [disputeText, setDisputeText] = useState("");
  const [proposedSets, setProposedSets] = useState([]);
  const [processing, setProcessing] = useState({});
  const showToast = (msg, c = "var(--success)") => {
    setToast({ msg, c });
    setTimeout(() => setToast(null), 2600);
  };
  const findPlayer = (id) => profiles2.find((p) => p.id === id) || { name: "Unknown", avatar: "?", rating: 500, tier: 1 };
  const needsMyConfirm = matches.filter(
    (m) => m.status === "pending" && [m.player_b_id, m.partner_b_id].includes(myId)
  ).map((m) => {
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
      type: m.match_type || "doubles",
      hoursLeft: Math.max(0, Math.round(72 - (Date.now() - new Date(m.played_at || Date.now())) / 36e5))
    });
  });
  const awaitingConfirm = matches.filter(
    (m) => m.status === "pending" && [m.player_a_id, m.partner_a_id].includes(myId)
  ).map((m) => {
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
      type: m.match_type || "doubles",
      hoursLeft: Math.max(0, Math.round(72 - (Date.now() - new Date(m.played_at || Date.now())) / 36e5))
    });
  });
  const confirmMatch = (matchId, ratingChangeA, ratingChangeB, matchType, playerAId, playerBId, partnerAId, partnerBId) => {
    setProcessing((p) => __spreadProps(__spreadValues({}, p), { [matchId]: true }));
    const tok = smaashDB.auth.getToken();
    // Re-store sets as a real jsonb ARRAY (older rows stored it as a stringified scalar, which
    // makes the rating trigger's jsonb_array_elements fail with 22023 "cannot extract elements from a scalar").
    const mm = matches.find((x) => x.id === matchId);
    let setsArr = [];
    if (mm) { try { setsArr = Array.isArray(mm.sets) ? mm.sets : JSON.parse(mm.sets || "[]"); } catch (e) { setsArr = []; } }
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/matches?id=eq." + matchId, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ status: "confirmed", sets: setsArr })
    }).then((r) => {
      if (r.ok) {
        showToast("Match confirmed \u2014 ratings updated!");
        if (setMatches) setMatches();
      }
      setProcessing((p) => __spreadProps(__spreadValues({}, p), { [matchId]: false }));
    });
  };
  const disputeMatch = (matchId) => {
    if (!disputeText.trim()) return;
    const tok = smaashDB.auth.getToken();
    const proposed = proposedSets
      .map((s) => ({ a: Number(s.a), b: Number(s.b) }))
      .filter((s) => !Number.isNaN(s.a) && !Number.isNaN(s.b));
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/matches?id=eq." + matchId, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ status: "disputed", dispute_reason: disputeText.trim(), dispute_proposed_sets: proposed.length ? proposed : null })
    }).then((r) => {
      if (r.ok) {
        showToast("Dispute filed with your proposed score. Director will review.", "var(--warn)");
        if (setMatches) setMatches();
      }
    });
    setDisputingId(null);
    setDisputeText("");
    setProposedSets([]);
  };
  const MatchCard = ({ m, canConfirm }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const tc = ((_a = TIERS.find((t) => t.id === m.tier)) == null ? void 0 : _a.color) || "var(--primary)";
    const sWA = m.sets.filter((s) => s.a > s.b).length;
    const sWB = m.sets.filter((s) => s.b > s.a).length;
    return /* @__PURE__ */ React.createElement("div", { key: m.id, style: { background: "var(--surface)", borderRadius: 13, overflow: "hidden", border: `1px solid ${canConfirm ? "color-mix(in srgb, var(--warn) 20%, transparent)" : "var(--border)"}`, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { height: 2, background: `linear-gradient(90deg,${tc},transparent)` } }), /* @__PURE__ */ React.createElement("div", { style: { padding: "13px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } }, /* @__PURE__ */ React.createElement(TierBadge, { tier: m.tier }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-faint)" } }, m.type, " \xB7 ", m.date)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } }, canConfirm && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, background: "color-mix(in srgb, var(--warn) 13%, transparent)", color: "var(--warn)", padding: "2px 8px", borderRadius: 4, fontWeight: 700 } }, "\u23F3 ", m.hoursLeft, "h left"), !canConfirm && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, background: "color-mix(in srgb, var(--text-muted) 13%, transparent)", color: "var(--text-muted)", padding: "2px 8px", borderRadius: 4, fontWeight: 700 } }, "\u23F3 Awaiting opponent"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 4 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: ((_b = m.playerA) == null ? void 0 : _b.avatar) || "?", size: 26, color: "var(--primary)" }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: sWA > sWB ? "var(--primary)" : "var(--text-muted)" } }, (_c = m.playerA) == null ? void 0 : _c.name)), m.partnerA && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 4, paddingLeft: 4 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: ((_d = m.partnerA) == null ? void 0 : _d.avatar) || "?", size: 22, color: "var(--primary)" }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "var(--text-dim)" } }, (_e = m.partnerA) == null ? void 0 : _e.name)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 4 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: ((_f = m.playerB) == null ? void 0 : _f.avatar) || "?", size: 26, color: "var(--purple)" }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: sWB > sWA ? "var(--purple)" : "var(--text-muted)" } }, (_g = m.playerB) == null ? void 0 : _g.name)), m.partnerB && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, paddingLeft: 4 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: ((_h = m.partnerB) == null ? void 0 : _h.avatar) || "?", size: 22, color: "var(--purple)" }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "var(--text-dim)" } }, (_i = m.partnerB) == null ? void 0 : _i.name))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", flexShrink: 0 } }, m.sets.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 4, justifyContent: "center", marginBottom: 2 } }, /* @__PURE__ */ React.createElement("span", { style: { background: s.a > s.b ? "color-mix(in srgb, var(--primary) 13%, transparent)" : "var(--border)", borderRadius: 4, padding: "2px 8px", fontSize: 12, fontWeight: 700, color: s.a > s.b ? "var(--primary)" : "var(--text-faint)", minWidth: 28, textAlign: "center" } }, s.a), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--border-strong)", alignSelf: "center" } }, "-"), /* @__PURE__ */ React.createElement("span", { style: { background: s.b > s.a ? "color-mix(in srgb, var(--purple) 13%, transparent)" : "var(--border)", borderRadius: 4, padding: "2px 8px", fontSize: 12, fontWeight: 700, color: s.b > s.a ? "var(--purple)" : "var(--text-faint)", minWidth: 28, textAlign: "center" } }, s.b))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--border-strong)", marginTop: 4 } }, sWA, "\u2013", sWB))), canConfirm && !processing[m.id] && /* @__PURE__ */ React.createElement("div", null, disputingId === m.id ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 6 } }, "Propose the correct score"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, proposedSets.map((s, si) => /* @__PURE__ */ React.createElement("div", { key: si, style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-faint)", width: 34 } }, "Set " + (si + 1)), /* @__PURE__ */ React.createElement("input", { type: "number", value: s.a, onChange: (e) => setProposedSets((p) => p.map((x, xi) => xi === si ? __spreadProps(__spreadValues({}, x), { a: e.target.value }) : x)), style: { width: 52, background: "var(--sunken)", border: "1px solid var(--border)", borderRadius: 6, padding: "6px 8px", color: "var(--text)", fontSize: 13, textAlign: "center", outline: "none", fontFamily: "inherit" } }), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--border-strong)" } }, "–"), /* @__PURE__ */ React.createElement("input", { type: "number", value: s.b, onChange: (e) => setProposedSets((p) => p.map((x, xi) => xi === si ? __spreadProps(__spreadValues({}, x), { b: e.target.value }) : x)), style: { width: 52, background: "var(--sunken)", border: "1px solid var(--border)", borderRadius: 6, padding: "6px 8px", color: "var(--text)", fontSize: 13, textAlign: "center", outline: "none", fontFamily: "inherit" } }))))), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        value: disputeText,
        onChange: (e) => setDisputeText(e.target.value),
        placeholder: "Describe the issue with this score...",
        rows: 2,
        style: { width: "100%", background: "var(--sunken)", border: "1px solid color-mix(in srgb, var(--danger) 20%, transparent)", borderRadius: 8, padding: "8px 10px", color: "var(--text)", fontSize: 12, outline: "none", fontFamily: "inherit", boxSizing: "border-box", resize: "none", marginBottom: 8 }
      }
    ), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setDisputingId(null), style: { background: "none", border: "1px solid var(--border-strong)", borderRadius: 8, padding: "10px", fontSize: 11, fontWeight: 700, color: "var(--text-faint)", cursor: "pointer", fontFamily: "inherit" } }, "Cancel"), /* @__PURE__ */ React.createElement("button", { onClick: () => disputeMatch(m.id), style: { background: "color-mix(in srgb, var(--danger) 13%, transparent)", border: "1px solid color-mix(in srgb, var(--danger) 27%, transparent)", borderRadius: 8, padding: "10px", fontSize: 11, fontWeight: 700, color: "var(--danger)", cursor: "pointer", fontFamily: "inherit" } }, "Submit Dispute"))) : /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => { setDisputingId(m.id); setDisputeText(""); setProposedSets((m.sets || []).map((s) => ({ a: String(s.a), b: String(s.b) }))); },
        style: { background: "none", border: "1px solid color-mix(in srgb, var(--danger) 20%, transparent)", borderRadius: 8, padding: "11px", fontSize: 11, fontWeight: 700, color: "var(--danger)", cursor: "pointer", fontFamily: "inherit" }
      },
      "\u26A0 Dispute"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => confirmMatch(m.id, m.rating_change_a, m.rating_change_b, m.match_type || m.type, m.player_a_id, m.player_b_id, m.partner_a_id, m.partner_b_id),
        style: { background: "linear-gradient(135deg,var(--success),#16a34a)", border: "none", borderRadius: 8, padding: "11px", fontSize: 11, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "inherit" }
      },
      "\u2713 Confirm Result"
    ))), processing[m.id] && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", fontSize: 12, color: "var(--primary)", padding: "8px" } }, "Updating ratings...")));
  };
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, toast && /* @__PURE__ */ React.createElement(Toast, { msg: toast.msg, color: toast.c }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "CONFIRM MATCHES"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 } }, needsMyConfirm.length, " awaiting your confirmation"), needsMyConfirm.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--warn)", marginBottom: 10, letterSpacing: 1 } }, "\u23F3 NEEDS YOUR CONFIRMATION"), needsMyConfirm.map((m) => MatchCard({ m, canConfirm: true }))), awaitingConfirm.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--text-muted)", marginBottom: 10, letterSpacing: 1 } }, "📤 SUBMITTED \u2014 AWAITING OPPONENT"), awaitingConfirm.map((m) => MatchCard({ m, canConfirm: false }))), needsMyConfirm.length === 0 && awaitingConfirm.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "40px 20px", background: "var(--surface)", borderRadius: 14, border: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 40, marginBottom: 12 } }, "\u2713"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "var(--text-dim)" } }, "All caught up"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text-faint)", marginTop: 4 } }, "No matches waiting for confirmation")));
}
function DirectorPanel({ matches = [], setMatches, profiles: profiles2 = [], currentUser = null, myProfile = null, clubs = [], refetchMatches = null, refetchProfiles = null }) {
  const myClubId = (myProfile == null ? void 0 : myProfile.clubId) || (myProfile == null ? void 0 : myProfile.club_id);
  const myClub = clubs.find((c) => c.id === myClubId);
  const clubMembers = profiles2.filter((p) => p.clubId === myClubId || p.club_id === myClubId);
  const clubMemberIds = new Set(clubMembers.map((p) => p.id));
  const clubMatches = matches.filter((m) => !myClubId || [m.player_a_id, m.player_b_id, m.partner_a_id, m.partner_b_id].some((id) => id && clubMemberIds.has(id)));
  const pendingMatches = matches.filter((m) => m.status === "pending");
  const disputes = clubMatches.filter((m) => m.status === "disputed");
  const [dirTab, setDirTab] = useState("pending");
  const [editMatch, setEditMatch] = useState(null);
  const [editToast, setEditToast] = useState(null);
  const [selected, setSelected] = useState(null);
  const [resolution, setResolution] = useState("");
  const [resType, setResType] = useState(null);
  const [resolved, setResolved] = useState({});
  const [toast, setToast] = useState(null);
  // Join requests
  const [pendingRequests, setPendingRequests] = useState([]);
  // Suspension
  const [suspendedIds, setSuspendedIds] = useState({});
  // Announcement
  const [announcement, setAnnouncement] = useState("");
  const [savedAnnouncement, setSavedAnnouncement] = useState("");
  const [announcementSaving, setAnnouncementSaving] = useState(false);
  // Activity log
  const [activityLog, setActivityLog] = useState([]);
  // Director handoff
  const [handoffTo, setHandoffTo] = useState("");
  const [handoffConfirm, setHandoffConfirm] = useState(false);
  // Club privacy/PIN settings
  const [clubPrivate, setClubPrivate] = useState((myClub && myClub.is_private) || false);
  const [clubPin, setClubPin] = useState((myClub && myClub.join_pin) || "");
  const [privacySaving, setPrivacySaving] = useState(false);
  const showToast = (msg, c = "var(--success)") => { setToast({ msg, c }); setTimeout(() => setToast(null), 2600); };
  const showEditToast = (msg, c = "var(--success)") => { setEditToast({ msg, c }); setTimeout(() => setEditToast(null), 3e3); };

  // Load join requests, activity log, existing announcement
  useEffect(() => {
    if (!myClubId) return;
    const tok = smaashDB.auth.getToken();
    if (!tok) return;
    // Pending join requests
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/join_requests?club_id=eq." + myClubId + "&status=eq.pending&order=created_at.asc", {
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok }
    }).then(function(r) { return r.json(); }).then(function(data) {
      if (Array.isArray(data)) setPendingRequests(data);
    }).catch(function() {});
    // Activity log (last 20)
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/director_activity_log?club_id=eq." + myClubId + "&order=created_at.desc&limit=20", {
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok }
    }).then(function(r) { return r.json(); }).then(function(data) {
      if (Array.isArray(data)) setActivityLog(data);
    }).catch(function() {});
    // Club announcement
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/clubs?id=eq." + myClubId + "&select=announcement", {
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok }
    }).then(function(r) { return r.json(); }).then(function(data) {
      if (Array.isArray(data) && data.length > 0 && data[0].announcement) {
        setSavedAnnouncement(data[0].announcement);
        setAnnouncement(data[0].announcement);
      }
    }).catch(function() {});
  }, [myClubId]);
  const emptyRow = () => ({ id: Date.now() + Math.random(), pA: "", pArtA: "", pB: "", pArtB: "", sets: [{ a: "", b: "" }] });
  const [bulkRows, setBulkRows] = useState([emptyRow()]);
  const [bulkToast, setBulkToast] = useState(null);
  const showBulkToast = (msg, c = "var(--success)") => { setBulkToast({ msg, c }); setTimeout(() => setBulkToast(null), 2500); };
  const updateRow = (idx, field, val) => setBulkRows((rows) => rows.map((r, i) => i === idx ? __spreadProps(__spreadValues({}, r), { [field]: val }) : r));
  const updateSetVal = (rowIdx, setIdx, side, val) => setBulkRows((rows) => rows.map((r, i) => i === rowIdx ? __spreadProps(__spreadValues({}, r), { sets: r.sets.map((s, si) => si === setIdx ? __spreadProps(__spreadValues({}, s), { [side]: val }) : s) }) : r));
  const addSet = (rowIdx) => setBulkRows((rows) => rows.map((r, i) => i === rowIdx && r.sets.length < 5 ? __spreadProps(__spreadValues({}, r), { sets: [...r.sets, { a: "", b: "" }] }) : r));
  const removeSet = (rowIdx, setIdx) => setBulkRows((rows) => rows.map((r, i) => i === rowIdx && r.sets.length > 1 ? __spreadProps(__spreadValues({}, r), { sets: r.sets.filter((_, si) => si !== setIdx) }) : r));
  const submitBulk = () => {
    const tok = smaashDB.auth.getToken();
    if (!tok) { showBulkToast("Not authenticated", "var(--danger)"); return; }
    const valid = bulkRows.filter((r) => r.pA && r.pB && r.sets.every((s) => s.a !== "" && s.b !== ""));
    if (!valid.length) { showBulkToast("Fill in all required fields", "var(--danger)"); return; }
    let done = 0;
    valid.forEach((r) => {
      const sets = r.sets.map((s) => ({ a: Number(s.a), b: Number(s.b) }));
      const sWA = sets.filter((s) => s.a > s.b).length;
      const sWB = sets.filter((s) => s.b > s.a).length;
      const body = { player_a_id: r.pA, player_b_id: r.pB, partner_a_id: r.pArtA || null, partner_b_id: r.pArtB || null, sets: sets, sets_won_a: sWA, sets_won_b: sWB, winner_side: sWA > sWB ? "A" : "B", tier: 2, match_type: r.pArtA || r.pArtB ? "doubles" : "singles", status: "auto_confirmed", played_at: new Date().toISOString(), submitted_at: new Date().toISOString() };
      fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/matches", {
        method: "POST",
        headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
        body: JSON.stringify(body)
      }).then(() => {
        done++;
        if (done === valid.length) {
          showBulkToast(valid.length + " match" + (valid.length !== 1 ? "es" : "") + " submitted!");
          setBulkRows([emptyRow()]);
          if (refetchMatches) setTimeout(refetchMatches, 800);
          if (refetchProfiles) setTimeout(refetchProfiles, 1200);
        }
      }).catch(() => showBulkToast("Submit failed", "var(--danger)"));
    });
  };
  const confirmPending = (matchId) => {
    const tok = smaashDB.auth.getToken();
    if (!tok) return;
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/matches?id=eq." + matchId, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ status: "auto_confirmed" })
    }).then((r) => {
      if (r.ok) { showEditToast("Match confirmed \u2713"); if (refetchMatches) setTimeout(refetchMatches, 800); if (refetchProfiles) setTimeout(refetchProfiles, 2000); }
      else showEditToast("Failed to confirm", "var(--danger)");
    });
  };
  const [editingMatch, setEditingMatch] = useState(null);
  const [editPlayers, setEditPlayers] = useState({});
  const [editSets, setEditSets] = useState([]);
  const openEdit = (m) => {
    const sets = (() => { try { return Array.isArray(m.sets) ? m.sets : JSON.parse(m.sets || "[]"); } catch(e) { return [{a:"",b:""}]; } })();
    setEditingMatch(m.id);
    setEditPlayers({ pA: m.player_a_id, paA: m.partner_a_id||"", pB: m.player_b_id, paB: m.partner_b_id||"" });
    setEditSets(sets.map((s) => ({ a: String(s.a), b: String(s.b) })));
  };
  const saveEdit = (matchId) => {
    const tok = smaashDB.auth.getToken();
    if (!tok) return;
    const validSets = editSets.filter((s) => s.a !== "" && s.b !== "");
    if (!validSets.length) return;
    const sWA = validSets.filter((s) => Number(s.a) > Number(s.b)).length;
    const sWB = validSets.filter((s) => Number(s.b) > Number(s.a)).length;
    const body = {
      player_a_id: editPlayers.pA, partner_a_id: editPlayers.paA || null,
      player_b_id: editPlayers.pB, partner_b_id: editPlayers.paB || null,
      sets: JSON.stringify(validSets.map((s) => ({ a: Number(s.a), b: Number(s.b) }))),
      sets_won_a: sWA, sets_won_b: sWB,
      winner_side: sWA >= sWB ? "A" : "B",
      status: "auto_confirmed"
    };
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/matches?id=eq." + matchId, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify(body)
    }).then((r) => {
      if (r.ok) {
        showEditToast("Match updated \u2713");
        setEditingMatch(null);
        if (refetchMatches) setTimeout(refetchMatches, 800);
        if (refetchProfiles) setTimeout(refetchProfiles, 2000);
        // Notify all 4 players of the edit
        const m = matches.find(function(x) { return x.id === matchId; });
        const dirName = (myProfile && myProfile.name) || "Director";
        const playerIds = m ? [m.player_a_id, m.player_b_id, m.partner_a_id, m.partner_b_id] : [editPlayers.pA, editPlayers.pB, editPlayers.paA, editPlayers.paB];
        sendDirectorMatchNotification(matchId, "Edited", dirName, playerIds, tok);
        logDirectorAction(currentUser && currentUser.id, myClubId, "edited", { matchId: matchId, note: "Score/players edited via Director Panel" }, tok);
      } else showEditToast("Update failed", "var(--danger)");
    });
  };
  const voidMatch = (matchId) => {
    const tok = smaashDB.auth.getToken();
    if (!tok) return;
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/matches?id=eq." + matchId, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ status: "voided" })
    }).then((r) => {
      if (r.ok) {
        showEditToast("Match voided");
        if (refetchMatches) setTimeout(refetchMatches, 800);
        // Notify all 4 players
        const m = matches.find(function(x) { return x.id === matchId; });
        if (m) {
          const dirName = (myProfile && myProfile.name) || "Director";
          sendDirectorMatchNotification(matchId, "Voided", dirName, [m.player_a_id, m.player_b_id, m.partner_a_id, m.partner_b_id], tok);
          logDirectorAction(currentUser && currentUser.id, myClubId, "voided", { matchId: matchId, note: "Voided via Director Panel" }, tok);
        }
      }
    });
  };
  const resolve = (id, type) => {
    if (!resolution.trim() || !type) return;
    const tok = smaashDB.auth.getToken();
    const newStatus = type === "confirm" ? "auto_confirmed" : "voided";
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/matches?id=eq." + id, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ status: newStatus, resolution_note: resolution, resolved_by: currentUser == null ? void 0 : currentUser.id, resolved_at: new Date().toISOString() })
    }).then((r) => {
      if (r.ok) {
        setResolved((rv) => __spreadProps(__spreadValues({}, rv), { [id]: { type, note: resolution } }));
        if (refetchMatches) setTimeout(refetchMatches, 800);
        if (refetchProfiles) setTimeout(refetchProfiles, 800);
        showToast(type === "confirm" ? "Match confirmed & ratings updated." : "Match voided.", type === "confirm" ? "var(--success)" : "var(--warn)");
      } else showToast("Failed to resolve", "var(--danger)");
    }).catch(() => showToast("Error resolving dispute", "var(--danger)"));
    setSelected(null); setResolution(""); setResType(null);
  };
  const selStyle = { width: "100%", background: "var(--sunken)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 10px", color: "var(--text)", fontSize: 12, fontFamily: "inherit", marginBottom: 8, boxSizing: "border-box" };
  const numStyle = { width: "52px", background: "var(--sunken)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 6px", color: "var(--text)", fontSize: 13, fontWeight: 700, textAlign: "center", outline: "none", fontFamily: "inherit" };
  const TABS = [
    { id: "pending", label: "\u23F3 Pending" + (pendingMatches.length ? " (" + pendingMatches.length + ")" : "") },
    { id: "matches", label: "📋 All" },
    { id: "disputes", label: "\u26A0 Disputes" },
    { id: "requests", label: "📥 Requests" + (pendingRequests.length ? " (" + pendingRequests.length + ")" : "") },
    { id: "bulk", label: "\u2795 Add" },
    { id: "roster", label: "👥 Roster" },
    { id: "announce", label: "📣 Post" },
    { id: "settings", label: "\u2699 Settings" },
    { id: "log", label: "🗒 Log" },
    { id: "handoff", label: "🔄 Handoff" }
  ];
  const renderMatches = (list, showEdit) => {
    if (list.length === 0) return /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "40px 20px", color: "var(--text-faint)", background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 36, marginBottom: 10 } }, "📋"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "var(--text-dim)" } }, "No matches"));
    return list.map((m) => {
      var _a, _b, _c, _d;
      const pA = profiles2.find((p) => p.id === m.player_a_id) || { name: "Player A", avatar: "PA" };
      const pB = profiles2.find((p) => p.id === m.player_b_id) || { name: "Player B", avatar: "PB" };
      const paA = m.partner_a_id ? profiles2.find((p) => p.id === m.partner_a_id) : null;
      const paB = m.partner_b_id ? profiles2.find((p) => p.id === m.partner_b_id) : null;
      const sets = (() => { try { return Array.isArray(m.sets) ? m.sets : JSON.parse(m.sets || "[]"); } catch (e) { return []; } })();
      const sWA = sets.filter((s) => s.a > s.b).length;
      const sWB = sets.filter((s) => s.b > s.a).length;
      const statusColor = m.status === "auto_confirmed" || m.status === "confirmed" ? "var(--success)" : m.status === "pending" ? "var(--warn)" : m.status === "disputed" ? "var(--danger)" : "var(--text-faint)";
      return /* @__PURE__ */ React.createElement("div", { key: m.id, style: { background: "var(--surface)", borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", marginBottom: 8 } },
        /* @__PURE__ */ React.createElement("div", { style: { background: statusColor + "11", borderBottom: "1px solid " + statusColor + "22", padding: "7px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" } },
          /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } },
            /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, background: statusColor + "22", color: statusColor, padding: "2px 7px", borderRadius: 4, fontWeight: 700 } }, m.status.toUpperCase().replace("_", " ")),
            /* @__PURE__ */ React.createElement(TierBadge, { tier: m.tier })),
          /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-faint)" } }, (m.played_at || "").split("T")[0] || "Today")),
        /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 14px" } },
          /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 } },
            /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } },
              /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--text)" } }, pA.name, paA ? " & " + paA.name : "")),
            /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", flexShrink: 0 } },
              sets.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 3, justifyContent: "center", marginBottom: 2 } },
                /* @__PURE__ */ React.createElement("span", { style: { background: s.a > s.b ? "color-mix(in srgb, var(--primary) 13%, transparent)" : "var(--border)", borderRadius: 3, padding: "1px 5px", fontSize: 11, fontWeight: 700, color: s.a > s.b ? "var(--primary)" : "var(--text-faint)" } }, s.a),
                /* @__PURE__ */ React.createElement("span", { style: { color: "var(--border-strong)", fontSize: 9 } }, "-"),
                /* @__PURE__ */ React.createElement("span", { style: { background: s.b > s.a ? "color-mix(in srgb, var(--purple) 13%, transparent)" : "var(--border)", borderRadius: 3, padding: "1px 5px", fontSize: 11, fontWeight: 700, color: s.b > s.a ? "var(--purple)" : "var(--text-faint)" } }, s.b)))),
            /* @__PURE__ */ React.createElement("div", { style: { flex: 1, textAlign: "right" } },
              /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--text)" } }, pB.name, paB ? " & " + paB.name : ""))),
          showEdit && /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 } },
            /* @__PURE__ */ React.createElement("button", { onClick: () => confirmPending(m.id), style: { background: "color-mix(in srgb, var(--success) 13%, transparent)", border: "1px solid color-mix(in srgb, var(--success) 27%, transparent)", borderRadius: 8, padding: "8px", fontSize: 10, fontWeight: 700, color: "var(--success)", cursor: "pointer", fontFamily: "inherit" } }, "\u2713 Confirm"),
            /* @__PURE__ */ React.createElement("button", { onClick: () => voidMatch(m.id), style: { background: "color-mix(in srgb, var(--danger) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--danger) 20%, transparent)", borderRadius: 8, padding: "8px", fontSize: 10, fontWeight: 700, color: "var(--danger)", cursor: "pointer", fontFamily: "inherit" } }, "\u2715 Void")),
          !showEdit && editingMatch === m.id ? /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, borderTop: "1px solid var(--border)", paddingTop: 10 } },
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--purple)", fontWeight: 700, letterSpacing: 1, marginBottom: 8 } }, "EDIT MATCH"),
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)", marginBottom: 4 } }, "Team A Player 1"),
            /* @__PURE__ */ React.createElement("select", { value: editPlayers.pA, onChange: (e) => setEditPlayers((p) => ({ ...p, pA: e.target.value })), style: { width: "100%", background: "var(--sunken)", border: "1px solid var(--border)", borderRadius: 7, padding: "7px 10px", color: "var(--text)", fontSize: 11, fontFamily: "inherit", marginBottom: 4 } }, profiles2.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name))),
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)", marginBottom: 4 } }, "Team A Player 2 (partner)"),
            /* @__PURE__ */ React.createElement("select", { value: editPlayers.paA, onChange: (e) => setEditPlayers((p) => ({ ...p, paA: e.target.value })), style: { width: "100%", background: "var(--sunken)", border: "1px solid var(--border)", borderRadius: 7, padding: "7px 10px", color: "var(--text)", fontSize: 11, fontFamily: "inherit", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("option", { value: "" }, "None"), profiles2.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name))),
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)", marginBottom: 4 } }, "Team B Player 1"),
            /* @__PURE__ */ React.createElement("select", { value: editPlayers.pB, onChange: (e) => setEditPlayers((p) => ({ ...p, pB: e.target.value })), style: { width: "100%", background: "var(--sunken)", border: "1px solid var(--border)", borderRadius: 7, padding: "7px 10px", color: "var(--text)", fontSize: 11, fontFamily: "inherit", marginBottom: 4 } }, profiles2.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name))),
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)", marginBottom: 4 } }, "Team B Player 2 (partner)"),
            /* @__PURE__ */ React.createElement("select", { value: editPlayers.paB, onChange: (e) => setEditPlayers((p) => ({ ...p, paB: e.target.value })), style: { width: "100%", background: "var(--sunken)", border: "1px solid var(--border)", borderRadius: 7, padding: "7px 10px", color: "var(--text)", fontSize: 11, fontFamily: "inherit", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("option", { value: "" }, "None"), profiles2.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name))),
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)", marginBottom: 6 } }, "Score"),
            editSets.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 8, alignItems: "center", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-faint)" } }, "Set ", i + 1), /* @__PURE__ */ React.createElement("input", { type: "number", value: s.a, onChange: (e) => setEditSets((ss) => ss.map((x, xi) => xi === i ? { ...x, a: e.target.value } : x)), style: { width: 52, background: "var(--sunken)", border: "1px solid var(--border)", borderRadius: 7, padding: "7px 6px", color: "var(--primary)", fontSize: 13, fontWeight: 700, textAlign: "center", outline: "none", fontFamily: "inherit" } }), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--border-strong)" } }, "-"), /* @__PURE__ */ React.createElement("input", { type: "number", value: s.b, onChange: (e) => setEditSets((ss) => ss.map((x, xi) => xi === i ? { ...x, b: e.target.value } : x)), style: { width: 52, background: "var(--sunken)", border: "1px solid var(--border)", borderRadius: 7, padding: "7px 6px", color: "var(--purple)", fontSize: 13, fontWeight: 700, textAlign: "center", outline: "none", fontFamily: "inherit" } }))),
            /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginTop: 8 } },
              /* @__PURE__ */ React.createElement("button", { onClick: () => setEditingMatch(null), style: { background: "var(--border)", border: "none", borderRadius: 8, padding: "8px", fontSize: 10, fontWeight: 700, color: "var(--text-dim)", cursor: "pointer", fontFamily: "inherit" } }, "Cancel"),
              /* @__PURE__ */ React.createElement("button", { onClick: () => { voidMatch(m.id); setEditingMatch(null); }, style: { background: "color-mix(in srgb, var(--danger) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--danger) 20%, transparent)", borderRadius: 8, padding: "8px", fontSize: 10, fontWeight: 700, color: "var(--danger)", cursor: "pointer", fontFamily: "inherit" } }, "\u2715 Void"),
              /* @__PURE__ */ React.createElement("button", { onClick: () => saveEdit(m.id), style: { background: "linear-gradient(135deg,var(--success),#16a34a)", color: "#fff", border: "none", borderRadius: 8, padding: "8px", fontSize: 10, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" } }, "\u2713 Save"))) :
          !showEdit && /* @__PURE__ */ React.createElement("button", { onClick: () => openEdit(m), style: { marginTop: 8, width: "100%", background: "var(--border)", border: "none", borderRadius: 8, padding: "7px", fontSize: 10, fontWeight: 700, color: "var(--text-dim)", cursor: "pointer", fontFamily: "inherit" } }, "Edit / Void \u2026")));
    });
  };
  const approveJoinRequest = function(req) {
    const tok = smaashDB.auth.getToken();
    if (!tok) return;
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/profiles?id=eq." + req.user_id, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ club_id: myClubId })
    }).then(function() {
      fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/join_requests?id=eq." + req.id, {
        method: "PATCH",
        headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
        body: JSON.stringify({ status: "approved" })
      });
      fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/notifications", {
        method: "POST",
        headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
        body: JSON.stringify({ user_id: req.user_id, type: "join_approved", message: "Your request to join " + ((myClub && myClub.name) || "the club") + " has been approved! Welcome!", is_read: false })
      });
      logDirectorAction(currentUser && currentUser.id, myClubId, "approved_join", { targetUserId: req.user_id, note: "Join request approved" }, tok);
      setPendingRequests(function(p) { return p.filter(function(r) { return r.id !== req.id; }); });
      if (refetchProfiles) setTimeout(refetchProfiles, 800);
      showToast("Player approved and added to club \u2713");
    }).catch(function() { showToast("Approval failed", "var(--danger)"); });
  };
  const declineJoinRequest = function(req) {
    const tok = smaashDB.auth.getToken();
    if (!tok) return;
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/join_requests?id=eq." + req.id, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ status: "declined" })
    }).then(function() {
      fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/notifications", {
        method: "POST",
        headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
        body: JSON.stringify({ user_id: req.user_id, type: "join_declined", message: "Your request to join " + ((myClub && myClub.name) || "the club") + " was not approved.", is_read: false })
      });
      logDirectorAction(currentUser && currentUser.id, myClubId, "declined_join", { targetUserId: req.user_id, note: "Join request declined" }, tok);
      setPendingRequests(function(p) { return p.filter(function(r) { return r.id !== req.id; }); });
      showToast("Request declined");
    }).catch(function() { showToast("Decline failed", "var(--danger)"); });
  };
  const toggleSuspend = function(playerId, playerName) {
    const tok = smaashDB.auth.getToken();
    if (!tok) return;
    const currently = suspendedIds[playerId];
    const newVal = !currently;
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/profiles?id=eq." + playerId, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ is_suspended: newVal })
    }).then(function(r) {
      if (r.ok) {
        setSuspendedIds(function(s) { return Object.assign({}, s, { [playerId]: newVal }); });
        logDirectorAction(currentUser && currentUser.id, myClubId, newVal ? "suspended_player" : "unsuspended_player", { targetUserId: playerId, note: (newVal ? "Suspended" : "Unsuspended") + " by Director" }, tok);
        showToast((newVal ? "Suspended " : "Unsuspended ") + playerName);
      }
    });
  };
  const saveAnnouncement = function() {
    const tok = smaashDB.auth.getToken();
    if (!tok || !myClubId) return;
    const text = announcement.trim();
    if (!text) return;
    setAnnouncementSaving(true);
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/clubs?id=eq." + myClubId, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ announcement: text })
    }).then(function(r) {
      setAnnouncementSaving(false);
      if (r.ok) {
        setSavedAnnouncement(text);
        logDirectorAction(currentUser && currentUser.id, myClubId, "announcement", { note: text.slice(0, 100) }, tok);
        // Member notifications now fan out server-side via the DB trigger on the
        // clubs.announcement update (see sql/notifications_fanout.sql) \u2014 secure,
        // reliable for big clubs, and sends opt-out-aware email.
        showToast("Announcement posted \u2713");
      } else showToast("Failed to save", "var(--danger)");
    }).catch(function() { setAnnouncementSaving(false); showToast("Error saving", "var(--danger)"); });
  };
  const doHandoff = function() {
    if (!handoffTo) return;
    const tok = smaashDB.auth.getToken();
    if (!tok) return;
    const newDir = profiles2.find(function(p) { return p.id === handoffTo; });
    // Update club director_id
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/clubs?id=eq." + myClubId, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ director_id: handoffTo, director_name: (newDir && newDir.name) || "" })
    }).then(function() {
      // New director gets club_director role
      fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/profiles?id=eq." + handoffTo, {
        method: "PATCH",
        headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
        body: JSON.stringify({ role: "club_director" })
      });
      // Current director gets reset to player
      if (currentUser && currentUser.id) {
        fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/profiles?id=eq." + currentUser.id, {
          method: "PATCH",
          headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
          body: JSON.stringify({ role: "player" })
        });
      }
      // Notify new director
      if (newDir) {
        fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/notifications", {
          method: "POST",
          headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
          body: JSON.stringify({ user_id: handoffTo, type: "director_action", message: "You have been made Club Director of " + ((myClub && myClub.name) || "your club") + "!", is_read: false })
        });
      }
      logDirectorAction(currentUser && currentUser.id, myClubId, "handoff", { targetUserId: handoffTo, note: "Directorship handed off to " + ((newDir && newDir.name) || handoffTo) }, tok);
      showToast("Director role handed off to " + ((newDir && newDir.name) || "new director") + " \u2713");
      setHandoffConfirm(false);
      setHandoffTo("");
      if (refetchProfiles) setTimeout(refetchProfiles, 800);
    }).catch(function() { showToast("Handoff failed", "var(--danger)"); });
  };

  const savePrivacySettings = function() {
    const tok = smaashDB.auth.getToken();
    if (!tok || !myClubId) return;
    setPrivacySaving(true);
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/clubs?id=eq." + myClubId, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ is_private: clubPrivate, join_pin: clubPrivate ? (clubPin || null) : null })
    }).then(function(r) {
      setPrivacySaving(false);
      if (r.ok) showToast(clubPrivate ? "Club set to Private \uD83D\uDD12" : "Club set to Open \u2713");
      else showToast("Save failed", "var(--danger)");
    }).catch(function() { setPrivacySaving(false); showToast("Error saving", "var(--danger)"); });
  };

  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } },
    editToast && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", background: editToast.c, color: "#fff", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, zIndex: 999 } }, editToast.msg),
    /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, padding: "12px 16px", marginBottom: 14, border: "1px solid var(--border)", display: "flex", gap: 12, alignItems: "center" } },
      /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: 9, background: "color-mix(in srgb, var(--purple) 13%, transparent)", border: "1px solid color-mix(in srgb, var(--purple) 20%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 } }, "🛡"),
      /* @__PURE__ */ React.createElement("div", null,
        /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: "var(--text)", fontSize: 13 } }, "Club Director Panel"),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--purple)" } }, (myClub == null ? void 0 : myClub.name) || "Your Club", " \xB7 ", clubMembers.length, " members")),
      /* @__PURE__ */ React.createElement("div", { style: { marginLeft: "auto", textAlign: "right" } },
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 900, color: pendingMatches.length ? "var(--warn)" : "var(--success)", fontFamily: "'Bebas Neue',sans-serif" } }, pendingMatches.length || "\u2713"),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-dim)", letterSpacing: 1 } }, "PENDING"))),
    savedAnnouncement && /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb,var(--warn) 7%,transparent)", border: "1px solid color-mix(in srgb,var(--warn) 20%,transparent)", borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 12, color: "var(--warn)", display: "flex", gap: 8, alignItems: "flex-start" } },
      /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16, flexShrink: 0 } }, "📣"),
      /* @__PURE__ */ React.createElement("div", null, savedAnnouncement)),
    (myClub == null ? void 0 : myClub.join_code) && /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb, var(--primary) 4%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)", borderRadius: 12, padding: "12px 16px", marginBottom: 14, display: "flex", gap: 14, alignItems: "center" } },
      /* @__PURE__ */ React.createElement("div", null,
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 } }, "Club Join Code"),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 26, fontWeight: 900, color: "var(--primary)", fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 6 } }, myClub.join_code)),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", flex: 1, lineHeight: 1.6 } }, "Share with players to join via More → Join a Club")),
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 0, marginBottom: 16, background: "var(--surface)", borderRadius: 10, padding: 3, border: "1px solid var(--border)" } },
      TABS.map((tb) => /* @__PURE__ */ React.createElement("button", { key: tb.id, onClick: () => setDirTab(tb.id), style: { flex: 1, background: dirTab === tb.id ? "var(--border)" : "none", border: "none", borderRadius: 8, padding: "8px 0", fontSize: 9, fontWeight: 700, color: dirTab === tb.id ? (tb.id === "pending" && pendingMatches.length ? "var(--warn)" : "var(--text)") : "var(--text-faint)", cursor: "pointer", letterSpacing: 0.3, textTransform: "uppercase", fontFamily: "inherit" } }, tb.label))),
    dirTab === "pending" && /* @__PURE__ */ React.createElement("div", null, renderMatches(pendingMatches, true),
      pendingMatches.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "40px 20px", color: "var(--text-faint)", background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)" } },
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 40, marginBottom: 10 } }, "\u2705"),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text-dim)" } }, "No pending matches"),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-faint)", marginTop: 4 } }, "All club matches confirmed"))),
    dirTab === "matches" && /* @__PURE__ */ React.createElement("div", null,
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", marginBottom: 10 } }, clubMatches.length, " club matches total"),
      renderMatches(clubMatches.slice(0, 50), false)),
    dirTab === "disputes" && /* @__PURE__ */ React.createElement("div", null,
      /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: 3, color: "var(--text)", marginBottom: 14 } }, "DISPUTE QUEUE"),
      disputes.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "40px 20px", color: "var(--text-faint)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 40, marginBottom: 10 } }, "\u2705"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "var(--text-dim)" } }, "No active disputes")),
      disputes.map((m) => {
        const isRes = !!resolved[m.id];
        const pA = profiles2.find((p) => p.id === m.player_a_id) || { name: "Player A", avatar: "PA" };
        const pB = profiles2.find((p) => p.id === m.player_b_id) || { name: "Player B", avatar: "PB" };
        const sets = (() => { try { return Array.isArray(m.sets) ? m.sets : JSON.parse(m.sets || "[]"); } catch (e) { return []; } })();
        const sWA = sets.filter((s) => s.a > s.b).length, sWB = sets.filter((s) => s.b > s.a).length;
        return /* @__PURE__ */ React.createElement("div", { key: m.id, style: { background: "var(--surface)", borderRadius: 14, overflow: "hidden", border: "1px solid " + (isRes ? "color-mix(in srgb, var(--success) 20%, transparent)" : "color-mix(in srgb, var(--danger) 20%, transparent)"), marginBottom: 12 } },
          /* @__PURE__ */ React.createElement("div", { style: { background: isRes ? "color-mix(in srgb, var(--success) 7%, transparent)" : "color-mix(in srgb, var(--danger) 7%, transparent)", borderBottom: "1px solid " + (isRes ? "color-mix(in srgb, var(--success) 13%, transparent)" : "color-mix(in srgb, var(--danger) 13%, transparent)"), padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" } },
            /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, background: isRes ? "color-mix(in srgb, var(--success) 13%, transparent)" : "color-mix(in srgb, var(--danger) 13%, transparent)", color: isRes ? "var(--success)" : "var(--danger)", padding: "2px 8px", borderRadius: 5, fontWeight: 800 } }, isRes ? "\u2713 RESOLVED" : "\u26A0 DISPUTED"),
            /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-faint)" } }, (m.played_at || "").split("T")[0] || "")),
          /* @__PURE__ */ React.createElement("div", { style: { padding: 14 } },
            /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 } },
              /* @__PURE__ */ React.createElement("div", null,
                /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--text)", marginBottom: 4 } }, pA.name),
                /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--text)" } }, pB.name)),
              /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } },
                sets.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { fontSize: 11, fontWeight: 700, color: "var(--text-muted)" } }, s.a, "-", s.b)))),
            isRes ? /* @__PURE__ */ React.createElement("div", { style: { background: "var(--sunken)", borderRadius: 8, padding: "8px 12px", fontSize: 11, color: "var(--text-dim)" } },
              /* @__PURE__ */ React.createElement("span", { style: { color: resolved[m.id].type === "confirm" ? "var(--success)" : "var(--warn)", fontWeight: 700 } }, resolved[m.id].type === "confirm" ? "\u2713 Confirmed" : "\u2715 Voided"),
              " \xB7 ", resolved[m.id].note) :
            selected === m.id ? /* @__PURE__ */ React.createElement("div", null,
              /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10 } },
                [{ type: "confirm", label: "Confirm", color: "var(--success)", icon: "\u2713" }, { type: "void", label: "Void", color: "var(--warn)", icon: "\u2715" }].map((opt) => /* @__PURE__ */ React.createElement("button", { key: opt.type, onClick: () => setResType(opt.type), style: { background: resType === opt.type ? opt.color + "22" : "var(--sunken)", border: "1.5px solid " + (resType === opt.type ? opt.color + "55" : "var(--border)"), borderRadius: 9, padding: "10px 8px", cursor: "pointer", fontFamily: "inherit" } },
                  /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14 } }, opt.icon),
                  /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: resType === opt.type ? opt.color : "var(--text-faint)", marginTop: 3 } }, opt.label)))),
              /* @__PURE__ */ React.createElement("textarea", { value: resolution, onChange: (e) => setResolution(e.target.value), placeholder: "Director notes (required)...", style: { width: "100%", background: "var(--sunken)", border: "1.5px solid var(--border)", borderRadius: 9, padding: "10px 12px", color: "var(--text)", fontSize: 12, resize: "none", height: 72, outline: "none", fontFamily: "inherit", marginBottom: 10, boxSizing: "border-box" } }),
              /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 } },
                /* @__PURE__ */ React.createElement(Btn, { outline: true, color: "var(--text-faint)", onClick: () => { setSelected(null); setResolution(""); setResType(null); } }, "Cancel"),
                /* @__PURE__ */ React.createElement(Btn, { color: "var(--purple)", disabled: !resolution.trim() || !resType, onClick: () => resolve(m.id, resType) }, "Submit"))) :
            /* @__PURE__ */ React.createElement("button", { onClick: () => setSelected(m.id), style: { width: "100%", background: "color-mix(in srgb, var(--danger) 7%, transparent)", border: "1.5px solid color-mix(in srgb, var(--danger) 20%, transparent)", borderRadius: 10, padding: 11, fontSize: 12, fontWeight: 700, color: "var(--danger)", cursor: "pointer", fontFamily: "inherit" } }, "Review Dispute \u2192")));
      })),
    dirTab === "bulk" && /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.25s ease" } },
      /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "ADD MATCHES"),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", lineHeight: 1.7, marginBottom: 14 } }, "Tier 2 \xB7 Auto-confirmed \xB7 No player confirmation needed"),
      bulkRows.map((row, rowIdx) => /* @__PURE__ */ React.createElement("div", { key: row.id, style: { background: "var(--surface)", borderRadius: 12, padding: "14px", border: "1px solid var(--border)", marginBottom: 10 } },
        /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 } },
          /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "var(--purple)", letterSpacing: 1 } }, "MATCH ", rowIdx + 1, " \u2014 TIER 2"),
          bulkRows.length > 1 && /* @__PURE__ */ React.createElement("button", { onClick: () => setBulkRows((r) => r.filter((_, i) => i !== rowIdx)), style: { background: "none", border: "none", color: "var(--text-faint)", cursor: "pointer", fontSize: 16 } }, "\u2715")),
        /* @__PURE__ */ React.createElement("div", { style: { background: "var(--sunken)", borderRadius: 10, padding: "10px 12px", marginBottom: 8 } },
          /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: "var(--primary)", letterSpacing: 1.5, marginBottom: 6 } }, "\u25C6 TEAM A"),
          /* @__PURE__ */ React.createElement("select", { value: row.pA, onChange: (e) => updateRow(rowIdx, "pA", e.target.value), style: selStyle },
            /* @__PURE__ */ React.createElement("option", { value: "" }, "Player A1 *"),
            clubMembers.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name))),
          /* @__PURE__ */ React.createElement("select", { value: row.pArtA, onChange: (e) => updateRow(rowIdx, "pArtA", e.target.value), style: selStyle },
            /* @__PURE__ */ React.createElement("option", { value: "" }, "Partner A2 (optional)"),
            clubMembers.filter((p) => p.id !== row.pA).map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name)))),
        /* @__PURE__ */ React.createElement("div", { style: { background: "var(--sunken)", borderRadius: 10, padding: "10px 12px", marginBottom: 8 } },
          /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: "var(--purple)", letterSpacing: 1.5, marginBottom: 6 } }, "\u25C6 TEAM B"),
          /* @__PURE__ */ React.createElement("select", { value: row.pB, onChange: (e) => updateRow(rowIdx, "pB", e.target.value), style: selStyle },
            /* @__PURE__ */ React.createElement("option", { value: "" }, "Player B1 *"),
            clubMembers.filter((p) => p.id !== row.pA && p.id !== row.pArtA).map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name))),
          /* @__PURE__ */ React.createElement("select", { value: row.pArtB, onChange: (e) => updateRow(rowIdx, "pArtB", e.target.value), style: selStyle },
            /* @__PURE__ */ React.createElement("option", { value: "" }, "Partner B2 (optional)"),
            clubMembers.filter((p) => p.id !== row.pA && p.id !== row.pArtA && p.id !== row.pB).map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name)))),
        /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 6 } },
          /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: "var(--text-dim)", letterSpacing: 1.5, marginBottom: 6 } }, "SCORES"),
          row.sets.map((s, si) => /* @__PURE__ */ React.createElement("div", { key: si, style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 } },
            /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-faint)", width: 36, flexShrink: 0 } }, "Set ", si + 1),
            /* @__PURE__ */ React.createElement("input", { type: "number", min: 0, max: 30, value: s.a, onChange: (e) => updateSetVal(rowIdx, si, "a", e.target.value), placeholder: "0", style: numStyle }),
            /* @__PURE__ */ React.createElement("span", { style: { color: "var(--border-strong)" } }, "\u2014"),
            /* @__PURE__ */ React.createElement("input", { type: "number", min: 0, max: 30, value: s.b, onChange: (e) => updateSetVal(rowIdx, si, "b", e.target.value), placeholder: "0", style: numStyle }),
            si > 0 && /* @__PURE__ */ React.createElement("button", { onClick: () => removeSet(rowIdx, si), style: { background: "none", border: "none", color: "var(--text-faint)", cursor: "pointer", fontSize: 11, fontFamily: "inherit" } }, "\u2715"))),
          row.sets.length < 5 && /* @__PURE__ */ React.createElement("button", { onClick: () => addSet(rowIdx), style: { background: "none", border: "1px dashed var(--border-strong)", borderRadius: 7, padding: "4px 10px", fontSize: 10, color: "var(--text-faint)", cursor: "pointer", fontFamily: "inherit", marginTop: 4 } }, "+ Set")))),
      /* @__PURE__ */ React.createElement("button", { onClick: () => setBulkRows((r) => [...r, emptyRow()]), style: { width: "100%", background: "color-mix(in srgb, var(--primary) 4%, transparent)", border: "1px dashed color-mix(in srgb, var(--primary) 20%, transparent)", borderRadius: 10, padding: "11px 0", fontSize: 12, fontWeight: 700, color: "var(--primary)", cursor: "pointer", fontFamily: "inherit", marginBottom: 12 } }, "\u2795 Add Another Match"),
      /* @__PURE__ */ React.createElement("button", { onClick: submitBulk, style: { width: "100%", background: "linear-gradient(135deg,var(--success),#16a34a)", color: "#fff", border: "none", borderRadius: 10, padding: "13px 0", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" } }, "\u2713 Submit All Matches")),
    dirTab === "roster" && /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.25s ease" } },
      /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "CLUB ROSTER"),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, marginBottom: 14 } }, clubMembers.length, " members \xB7 ranked by doubles rating"),
      clubMembers.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "40px 20px", color: "var(--text-faint)", background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)" } },
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 36, marginBottom: 10 } }, "👥"),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "var(--text-dim)" } }, "No members found")) :
      [...clubMembers].sort((a, b) => (b.doublesRating || b.rating || 500) - (a.doublesRating || a.rating || 500)).map((p, i) => {
        var _a;
        const tc = ((_a = TIERS.find((t) => t.id === p.tier)) == null ? void 0 : _a.color) || "var(--primary)";
        const isMe = p.id === (currentUser == null ? void 0 : currentUser.id);
        const pMatches = clubMatches.filter((m) => [m.player_a_id, m.player_b_id, m.partner_a_id, m.partner_b_id].includes(p.id) && ["confirmed", "auto_confirmed"].includes(m.status));
        return /* @__PURE__ */ React.createElement("div", { key: p.id, style: { background: isMe ? "color-mix(in srgb, var(--primary) 3%, transparent)" : "var(--surface)", borderRadius: 10, padding: "11px 14px", marginBottom: 7, border: "1px solid " + (isMe ? "color-mix(in srgb, var(--primary) 20%, transparent)" : "var(--border)"), display: "flex", gap: 10, alignItems: "center" } },
          /* @__PURE__ */ React.createElement("div", { style: { width: 22, textAlign: "center", fontSize: 11, fontWeight: 700, color: i < 3 ? tc : "var(--border-strong)", flexShrink: 0 } }, "#" + (i + 1)),
          /* @__PURE__ */ React.createElement(Avatar, { initials: p.avatar, size: 34, color: tc, photo: p.photo }),
          /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } },
            /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } },
              /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--text)" } }, p.name),
              isMe && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, background: "color-mix(in srgb, var(--primary) 13%, transparent)", color: "var(--primary)", padding: "1px 5px", borderRadius: 3, fontWeight: 700 } }, "YOU"),
              /* @__PURE__ */ React.createElement(TierBadge, { tier: p.tier })),
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)", marginTop: 2 } }, pMatches.length, " matches \xB7 ", (p.rd || p.doublesRd || 350) < 150 ? "\u2713 Verified" : (p.rd || p.doublesRd || 350) < 300 ? "\u25CE Developing" : "\u25CB Provisional")),
          /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: tc, fontFamily: "'Bebas Neue',sans-serif" } }, fmt(p.doublesRating || p.rating)),
          /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end", marginLeft: 6 } },
            suspendedIds[p.id] && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 8, background: "color-mix(in srgb,var(--danger) 13%,transparent)", color: "var(--danger)", padding: "1px 6px", borderRadius: 3, fontWeight: 700 } }, "SUSPENDED"),
            !isMe && /* @__PURE__ */ React.createElement("button", { onClick: function(e) { e.stopPropagation(); toggleSuspend(p.id, p.name); }, style: { fontSize: 9, background: suspendedIds[p.id] ? "color-mix(in srgb,var(--success) 7%,transparent)" : "color-mix(in srgb,var(--danger) 7%,transparent)", border: "1px solid " + (suspendedIds[p.id] ? "color-mix(in srgb,var(--success) 20%,transparent)" : "color-mix(in srgb,var(--danger) 20%,transparent)"), borderRadius: 5, padding: "2px 7px", color: suspendedIds[p.id] ? "var(--success)" : "var(--danger)", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 } }, suspendedIds[p.id] ? "Lift" : "Suspend")));
      })),
    // --- JOIN REQUESTS TAB ---
    dirTab === "requests" && /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.25s ease" } },
      /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "JOIN REQUESTS"),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, marginBottom: 14 } }, "Players requesting to join your club"),
      pendingRequests.length === 0
        ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "40px 20px", color: "var(--text-faint)", background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 } }, "No pending join requests")
        : pendingRequests.map(function(req) {
            const rp = profiles2.find(function(p) { return p.id === req.user_id; });
            return /* @__PURE__ */ React.createElement("div", { key: req.id, style: { background: "var(--surface)", borderRadius: 12, padding: "14px 16px", border: "1px solid color-mix(in srgb, var(--warn) 20%, transparent)", marginBottom: 10 } },
              /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center", marginBottom: 10 } },
                /* @__PURE__ */ React.createElement(Avatar, { initials: (rp && rp.avatar) || "??", size: 36, color: "var(--primary)", photo: rp && rp.photo }),
                /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } },
                  /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text)" } }, (rp && rp.name) || "Player"),
                  /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)", marginTop: 2 } }, "Requested ", req.created_at ? new Date(req.created_at).toLocaleDateString() : "recently"))),
              /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } },
                /* @__PURE__ */ React.createElement("button", { onClick: function() { declineJoinRequest(req); }, style: { background: "color-mix(in srgb,var(--danger) 7%,transparent)", border: "1px solid color-mix(in srgb,var(--danger) 20%,transparent)", borderRadius: 8, padding: "9px", fontSize: 11, fontWeight: 700, color: "var(--danger)", cursor: "pointer", fontFamily: "inherit" } }, "\u2715 Decline"),
                /* @__PURE__ */ React.createElement("button", { onClick: function() { approveJoinRequest(req); }, style: { background: "linear-gradient(135deg,var(--success),#16a34a)", color: "#fff", border: "none", borderRadius: 8, padding: "9px", fontSize: 11, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" } }, "\u2713 Approve")));
          })),
    // --- ANNOUNCEMENT TAB ---
    dirTab === "announce" && /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.25s ease" } },
      /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "CLUB ANNOUNCEMENT"),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, marginBottom: 14 } }, "Pinned message shown to all club members"),
      savedAnnouncement && /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb, var(--warn) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--warn) 20%, transparent)", borderRadius: 10, padding: "12px 14px", marginBottom: 14, fontSize: 12, color: "var(--warn)" } },
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, fontWeight: 700, letterSpacing: 2, marginBottom: 4 } }, "CURRENT PINNED ANNOUNCEMENT"),
        savedAnnouncement),
      /* @__PURE__ */ React.createElement("textarea", { value: announcement, onChange: function(e) { setAnnouncement(e.target.value); }, placeholder: "Type your announcement here (e.g. 'No sessions this Friday — gym maintenance')...", rows: 4, style: { width: "100%", background: "var(--sunken)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 14px", color: "var(--text)", fontSize: 12, outline: "none", fontFamily: "inherit", marginBottom: 12, boxSizing: "border-box", resize: "vertical" } }),
      /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } },
        /* @__PURE__ */ React.createElement("button", { onClick: function() { setAnnouncement(""); }, style: { background: "color-mix(in srgb,var(--danger) 7%,transparent)", border: "1px solid color-mix(in srgb,var(--danger) 20%,transparent)", borderRadius: 8, padding: "11px", fontSize: 11, fontWeight: 700, color: "var(--danger)", cursor: "pointer", fontFamily: "inherit" } }, "Clear"),
        /* @__PURE__ */ React.createElement("button", { onClick: saveAnnouncement, disabled: announcementSaving, style: { background: "linear-gradient(135deg,var(--primary),var(--primary-deep))", color: "var(--bg)", border: "none", borderRadius: 8, padding: "11px", fontSize: 11, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" } }, announcementSaving ? "Saving..." : "📣 Post"))),
    // --- ACTIVITY LOG TAB ---
    dirTab === "log" && /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.25s ease" } },
      /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "ACTIVITY LOG"),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, marginBottom: 14 } }, "Permanent record of all Director actions"),
      activityLog.length === 0
        ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "40px 20px", color: "var(--text-faint)", background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 } }, "No actions logged yet")
        : activityLog.map(function(entry, i) {
            const actionColor = { voided: "var(--danger)", edited: "var(--purple)", approved_join: "var(--success)", declined_join: "var(--danger)", suspended_player: "var(--danger)", unsuspended_player: "var(--success)", handoff: "var(--warn)", announcement: "var(--primary)" }[entry.action] || "var(--text-dim)";
            return /* @__PURE__ */ React.createElement("div", { key: i, style: { background: "var(--surface)", borderRadius: 10, padding: "10px 14px", marginBottom: 7, border: "1px solid var(--border)" } },
              /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 3 } },
                /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, background: actionColor + "22", color: actionColor, padding: "2px 8px", borderRadius: 4, fontWeight: 700 } }, entry.action.toUpperCase().replace(/_/g, " ")),
                /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, color: "var(--text-faint)" } }, entry.created_at ? new Date(entry.created_at).toLocaleDateString() : "")),
              entry.note && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", marginTop: 4, fontStyle: "italic" } }, '"', entry.note, '"'));
          })),
    // --- CLUB SETTINGS TAB ---
    dirTab === "settings" && /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.25s ease" } },
      /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "CLUB SETTINGS"),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, marginBottom: 14 } }, "Privacy, access control, and join settings"),
      /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, padding: "14px 16px", border: "1px solid var(--border)", marginBottom: 12 } },
        /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: clubPrivate ? 14 : 0 } },
          /* @__PURE__ */ React.createElement("div", null,
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text)" } }, "Club Privacy"),
            /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-faint)", marginTop: 2 } }, clubPrivate ? "\uD83D\uDD12 Closed — PIN required to join" : "🔓 Open — anyone can join with join code")),
          /* @__PURE__ */ React.createElement("div", { onClick: function() { setClubPrivate(!clubPrivate); }, style: { width: 44, height: 24, borderRadius: 12, background: clubPrivate ? "var(--purple)" : "var(--border)", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 } },
            /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 3, left: clubPrivate ? 22 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.2s" } }))),
        clubPrivate && /* @__PURE__ */ React.createElement("div", null,
          /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: "var(--text-dim)", letterSpacing: 1.5, marginBottom: 6 } }, "6-DIGIT PIN"),
          /* @__PURE__ */ React.createElement("input", { value: clubPin, onChange: function(e) { setClubPin(e.target.value.replace(/\D/g,"").slice(0,6)); }, placeholder: "e.g. 123456", maxLength: 6, style: { width: "100%", background: "var(--sunken)", border: "1.5px solid var(--border)", borderRadius: 9, padding: "10px", textAlign: "center", fontSize: 22, letterSpacing: 8, color: "var(--text)", fontFamily: "inherit", boxSizing: "border-box", outline: "none" } }))),
      /* @__PURE__ */ React.createElement("button", { onClick: savePrivacySettings, disabled: privacySaving || (clubPrivate && clubPin.length !== 6), style: { width: "100%", background: (!privacySaving && (!clubPrivate || clubPin.length === 6)) ? "linear-gradient(135deg,var(--primary),var(--primary-deep))" : "var(--border)", color: (!privacySaving && (!clubPrivate || clubPin.length === 6)) ? "var(--bg)" : "var(--text-faint)", border: "none", borderRadius: 10, padding: "13px", fontSize: 12, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", letterSpacing: 1 } }, privacySaving ? "Saving..." : "Save Settings")),
    // --- HANDOFF TAB ---
    dirTab === "handoff" && /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.25s ease" } },
      /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "DIRECTOR HANDOFF"),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, marginBottom: 14 } }, "Transfer Director role to another club member"),
      /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb,var(--danger) 7%,transparent)", border: "1px solid color-mix(in srgb,var(--danger) 20%,transparent)", borderRadius: 10, padding: "12px 14px", marginBottom: 14, fontSize: 11, color: "var(--danger)", lineHeight: 1.7 } }, "⚠ This is permanent. You will lose Director access immediately and your role will be reset to Player."),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 6 } }, "Select New Director"),
      /* @__PURE__ */ React.createElement("select", { value: handoffTo, onChange: function(e) { setHandoffTo(e.target.value); setHandoffConfirm(false); }, style: { width: "100%", background: "var(--sunken)", border: "1px solid var(--border)", borderRadius: 9, padding: "11px 14px", color: "var(--text)", fontSize: 12, fontFamily: "inherit", marginBottom: 12, boxSizing: "border-box" } },
        /* @__PURE__ */ React.createElement("option", { value: "" }, "Choose a club member..."),
        clubMembers.filter(function(p) { return p.id !== (currentUser && currentUser.id); }).map(function(p) { return /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name); })),
      handoffTo && !handoffConfirm && /* @__PURE__ */ React.createElement("button", { onClick: function() { setHandoffConfirm(true); }, style: { width: "100%", background: "color-mix(in srgb,var(--danger) 13%,transparent)", border: "1px solid color-mix(in srgb,var(--danger) 27%,transparent)", borderRadius: 9, padding: "12px", fontSize: 12, fontWeight: 700, color: "var(--danger)", cursor: "pointer", fontFamily: "inherit" } }, "Transfer Director Role \u2192"),
      handoffConfirm && /* @__PURE__ */ React.createElement("div", null,
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text)", marginBottom: 10, fontWeight: 700 } }, "Confirm: hand off to ", (profiles2.find(function(p) { return p.id === handoffTo; }) || {}).name, "?"),
        /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } },
          /* @__PURE__ */ React.createElement("button", { onClick: function() { setHandoffConfirm(false); }, style: { background: "var(--border)", border: "none", borderRadius: 8, padding: "11px", fontSize: 11, fontWeight: 700, color: "var(--text-dim)", cursor: "pointer", fontFamily: "inherit" } }, "Cancel"),
          /* @__PURE__ */ React.createElement("button", { onClick: doHandoff, style: { background: "var(--danger)", color: "#fff", border: "none", borderRadius: 8, padding: "11px", fontSize: 11, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" } }, "\u2713 Confirm Handoff")))));
}
// ---- End DirectorPanel ----

