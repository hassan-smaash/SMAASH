function MatchHistory({ matches = [], profiles: profiles2 = [], currentUser = null, refetch }) {
  const enrichedMatches = matches.map((m) => {
    const findPlayer = (id) => profiles2.find((p) => p.id === id) || { id, name: "Unknown", avatar: "?", rating: 500, doublesRating: 500, tier: 1 };
    const sets = (() => {
      try {
        if (!m.sets) return [];
        if (Array.isArray(m.sets)) return m.sets;
        const parsed = typeof m.sets === "string" ? JSON.parse(m.sets) : m.sets;
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    })();
    return __spreadProps(__spreadValues({}, m), {
      playerA: findPlayer(m.player_a_id),
      playerB: findPlayer(m.player_b_id),
      partnerA: m.partner_a_id ? findPlayer(m.partner_a_id) : null,
      partnerB: m.partner_b_id ? findPlayer(m.partner_b_id) : null,
      sets,
      date: m.played_at ? m.played_at.split("T")[0] : "Today",
      type: m.match_type || "doubles"
    });
  });
  const [filter, setFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showMine, setShowMine] = useState(true);
  const myId = currentUser == null ? void 0 : currentUser.id;
  const visibleMatches = showMine && myId ? enrichedMatches.filter((m) => {
    var _a, _b, _c, _d;
    return [(_a = m.playerA) == null ? void 0 : _a.id, (_b = m.playerB) == null ? void 0 : _b.id, (_c = m.partnerA) == null ? void 0 : _c.id, (_d = m.partnerB) == null ? void 0 : _d.id, m.player_a_id, m.player_b_id, m.partner_a_id, m.partner_b_id].includes(myId);
  }) : enrichedMatches;
  const filtered = visibleMatches.filter((m) => (filter === "all" || m.status === filter) && (typeFilter === "all" || (m.type || m.match_type) === typeFilter));
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 22, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "MATCH HISTORY"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginBottom: 14 } }, [{ label: "All", filter: "all", color: "var(--text-dim)" }, { label: "Confirmed", filter: "confirmed", color: "var(--success)" }, { label: "Pending", filter: "pending", color: "var(--warn)" }, { label: "Disputed", filter: "disputed", color: "var(--danger)" }].map((s) => /* @__PURE__ */ React.createElement("div", { key: s.filter, onClick: () => setFilter(s.filter), style: { background: "var(--surface)", borderRadius: 10, padding: "10px 6px", textAlign: "center", border: `1px solid ${filter === s.filter ? s.color + "44" : "var(--border)"}`, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 900, color: s.color, fontFamily: "'Bebas Neue',sans-serif" } }, enrichedMatches.filter((m) => s.filter === "all" || m.status === s.filter).length), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 8, color: "var(--text-faint)", letterSpacing: 1 } }, s.label.toUpperCase())))), myId && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 10 } }, [{ v: true, l: "My Matches" }, { v: false, l: "All Matches" }].map((o) => /* @__PURE__ */ React.createElement("button", { key: String(o.v), onClick: () => setShowMine(o.v), style: { background: showMine === o.v ? "color-mix(in srgb, var(--primary) 13%, transparent)" : "var(--surface)", border: `1px solid ${showMine === o.v ? "color-mix(in srgb, var(--primary) 27%, transparent)" : "var(--border)"}`, borderRadius: 7, padding: "6px 14px", fontSize: 10, fontWeight: 700, color: showMine === o.v ? "var(--primary)" : "var(--text-faint)", cursor: "pointer", fontFamily: "inherit" } }, o.l))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 14 } }, ["all", "doubles"].map((t) => /* @__PURE__ */ React.createElement("button", { key: t, onClick: () => setTypeFilter(t), style: { background: typeFilter === t ? "var(--border)" : "var(--surface)", border: `1px solid ${typeFilter === t ? "var(--border-strong)" : "var(--border)"}`, borderRadius: 7, padding: "6px 12px", fontSize: 10, fontWeight: 700, color: typeFilter === t ? "var(--text)" : "var(--text-faint)", cursor: "pointer", letterSpacing: 1, textTransform: "uppercase", fontFamily: "inherit" } }, t))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, filtered.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "40px 20px", color: "var(--text-faint)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 36, marginBottom: 10 } }, "📋"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text-dim)" } }, "No matches yet"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-faint)", marginTop: 4 } }, "Submit your first match to see history")) : filtered.map((m) => {
    var _a, _b, _c, _d, _e, _f;
    const t = TIERS.find((x) => x.id === m.tier);
    const mSets = (() => { try { return Array.isArray(m.sets) ? m.sets : JSON.parse(m.sets || "[]"); } catch(e) { return []; } })();
    const sWA = mSets.filter((s) => s.a > s.b).length;
    const sWB = mSets.filter((s) => s.b > s.a).length;
    return /* @__PURE__ */ React.createElement("div", { key: m.id, style: { background: "var(--surface)", borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { height: 2, background: `linear-gradient(90deg,${(t == null ? void 0 : t.color) || "var(--border-strong)"},transparent)` } }), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } }, /* @__PURE__ */ React.createElement(TierBadge, { tier: m.tier }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-faint)" } }, m.type, " \xB7 ", m.date), m.interClub && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, background: "color-mix(in srgb, var(--warn) 13%, transparent)", color: "var(--warn)", padding: "1px 6px", borderRadius: 4, fontWeight: 700 } }, "INTER-CLUB"), m.submittedByDirector && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, background: "color-mix(in srgb, var(--primary) 13%, transparent)", color: "var(--primary)", padding: "1px 6px", borderRadius: 4, fontWeight: 700 } }, "DIRECTOR")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } }, /* @__PURE__ */ React.createElement(RatingImpactBadge, { match: m, playerId: currentUser == null ? void 0 : currentUser.id }), /* @__PURE__ */ React.createElement(StatusPill, { status: m.status }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7, marginBottom: 6 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: ((_a = m.playerA) == null ? void 0 : _a.avatar) || "?", size: 24, color: "var(--primary)", photo: (_b = m.playerA) == null ? void 0 : _b.photo }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: sWA > sWB ? "var(--primary)" : "var(--text-dim)" } }, ((_c = m.playerA) == null ? void 0 : _c.name) || "Unknown")), m.type === "doubles" && m.partnerA && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7, marginBottom: 6, paddingLeft: 4 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: m.partnerA.avatar, size: 20, color: "var(--primary)", photo: m.partnerA.photo }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: "var(--text)" } }, m.partnerA.name)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: ((_d = m.playerB) == null ? void 0 : _d.avatar) || "?", size: 24, color: "var(--purple)", photo: (_e = m.playerB) == null ? void 0 : _e.photo }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: sWB > sWA ? "var(--purple)" : "var(--text-dim)" } }, ((_f = m.playerB) == null ? void 0 : _f.name) || "Unknown")), m.type === "doubles" && m.partnerB && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7, paddingLeft: 4, marginTop: 4 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: m.partnerB.avatar, size: 20, color: "var(--purple)", photo: m.partnerB.photo }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: "var(--text)" } }, m.partnerB.name))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 3, justifyContent: "center", marginBottom: 3 } }, mSets.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i }, /* @__PURE__ */ React.createElement("div", { style: { background: "var(--border)", borderRadius: "3px 3px 0 0", padding: "2px 5px", fontSize: 10, fontWeight: 700, color: s.a > s.b ? "var(--primary)" : "var(--text-faint)" } }, s.a), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--sunken)", borderRadius: "0 0 3px 3px", padding: "2px 5px", fontSize: 10, fontWeight: 700, color: s.b > s.a ? "var(--purple)" : "var(--text-faint)" } }, s.b)))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--border-strong)" } }, sWA, "\u2013", sWB)))));
  }), filtered.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "40px 20px", color: "var(--text-faint)", fontSize: 13 } }, "No matches found")));
}
function CityAutocomplete({ value, onChange }) {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const timerRef = useRef(null);
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearTimeout(timerRef.current);
    };
  }, []);
  useEffect(() => {
    if (value !== query) setQuery(value || "");
  }, [value]);
  const handleInput = (v) => {
    setQuery(v);
    onChange(v);
    if (v.length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!mountedRef.current) return;
      setLoading(true);
      fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(v)}&featureType=city&format=json&limit=5&addressdetails=1`, {
        headers: { "Accept-Language": "en" }
      }).then((r) => r.json()).then((data) => {
        if (!mountedRef.current) return;
        setLoading(false);
        if (!Array.isArray(data)) return;
        const results = data.map((item) => {
          const a = item.address || {};
          const city = a.city || a.town || a.village || a.municipality || item.display_name.split(",")[0];
          const state = a.state || a.province || "";
          const country = a.country || "";
          return { display: [city, state, country].filter(Boolean).join(", ") };
        }).filter((x, i, arr) => arr.findIndex((y) => y.display === x.display) === i);
        if (!mountedRef.current) return;
        setSuggestions(results);
        setOpen(results.length > 0);
      }).catch(() => {
        if (mountedRef.current) setLoading(false);
      });
    }, 600);
  };
  const select = (item) => {
    setQuery(item.display);
    onChange(item.display);
    setSuggestions([]);
    setOpen(false);
  };
  const inp = {
    width: "100%",
    background: "var(--sunken)",
    border: "1.5px solid var(--border)",
    borderRadius: 10,
    padding: "11px 14px",
    color: "var(--text)",
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box"
  };
  return /* @__PURE__ */ React.createElement("div", { ref, style: { position: "relative", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 6 } }, "Location / City"), /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: query,
      onChange: (e) => handleInput(e.target.value),
      onBlur: () => setTimeout(() => {
        if (mountedRef.current) setOpen(false);
      }, 200),
      placeholder: "Type city name\u2026",
      style: inp,
      autoComplete: "off",
      spellCheck: "false"
    }
  ), loading && /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 11, color: "var(--text-faint)" } }, "searching\u2026")), open && suggestions.length > 0 && /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "var(--surface)",
    border: "1px solid var(--border-strong)",
    borderRadius: 10,
    zIndex: 999,
    marginTop: 4,
    overflow: "hidden",
    boxShadow: "0 8px 24px #00000088"
  } }, suggestions.map((item, i) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: i,
      onMouseDown: () => select(item),
      style: {
        padding: "10px 14px",
        cursor: "pointer",
        borderBottom: i < suggestions.length - 1 ? "1px solid var(--border)" : "none",
        display: "flex",
        alignItems: "center",
        gap: 8,
        transition: "background 0.1s"
      },
      onMouseEnter: (e) => e.currentTarget.style.background = "var(--border)",
      onMouseLeave: (e) => e.currentTarget.style.background = "transparent"
    },
    /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14 } }, "📍"),
    /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "var(--text)" } }, item.display)
  ))));
}
function DirectorRequestButton({ currentUser, myProfile, clubs = [] }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [showForm, setShowForm] = useState(false);
  const myClubId = (myProfile == null ? void 0 : myProfile.clubId) || (myProfile == null ? void 0 : myProfile.club_id);
  const myClub = clubs.find((c) => c.id === myClubId);
  useEffect(() => {
    const tok = smaashDB.auth.getToken();
    const uid = currentUser == null ? void 0 : currentUser.id;
    if (!tok || !uid) return;
    fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/director_requests?user_id=eq.${uid}&order=created_at.desc&limit=1`, {
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok }
    }).then((r) => r.json()).then((data) => {
      if (Array.isArray(data) && data.length > 0) setStatus(data[0].status);
    }).catch(() => {});
  }, [currentUser == null ? void 0 : currentUser.id]);
  const submit = () => {
    const tok = smaashDB.auth.getToken();
    const uid = currentUser == null ? void 0 : currentUser.id;
    if (!tok || !uid || !myClubId) return;
    setLoading(true);
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/director_requests", {
      method: "POST",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ user_id: uid, club_id: myClubId, full_name: (myProfile == null ? void 0 : myProfile.name) || "", reason: reason || "Requesting Club Director access" })
    }).then((r) => {
      setLoading(false);
      if (r.ok) { setStatus("pending"); setShowForm(false); }
    }).catch(() => setLoading(false));
  };
  if (!myClubId) return null;
  if (status === "approved") return null;
  return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } },
    status === "pending" ? /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb, var(--warn) 4%, transparent)", border: "1px solid color-mix(in srgb, var(--warn) 20%, transparent)", borderRadius: 10, padding: "12px 14px", fontSize: 12, color: "var(--warn)", fontWeight: 700, textAlign: "center" } },
      "\u23F3 Director request pending admin approval") :
    status === "rejected" ? /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb, var(--danger) 4%, transparent)", border: "1px solid color-mix(in srgb, var(--danger) 20%, transparent)", borderRadius: 10, padding: "12px 14px", fontSize: 12, color: "var(--danger)", textAlign: "center" } },
      "\u2715 Director request declined \xB7 Contact admin") :
    showForm ? /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", border: "1px solid color-mix(in srgb, var(--purple) 20%, transparent)", borderRadius: 12, padding: "14px" } },
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 4 } }, "Request Director Access"),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", marginBottom: 12 } }, "For ", myClub == null ? void 0 : myClub.name, " \xB7 Admin will review within 24hrs"),
      /* @__PURE__ */ React.createElement("textarea", { value: reason, onChange: (e) => setReason(e.target.value), placeholder: "Why should you be the Club Director? (optional)", style: { width: "100%", background: "var(--sunken)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 12px", color: "var(--text)", fontSize: 12, resize: "none", height: 72, outline: "none", fontFamily: "inherit", marginBottom: 10, boxSizing: "border-box" } }),
      /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } },
        /* @__PURE__ */ React.createElement("button", { onClick: () => setShowForm(false), style: { background: "var(--border)", border: "none", borderRadius: 8, padding: "10px", fontSize: 11, fontWeight: 700, color: "var(--text-dim)", cursor: "pointer", fontFamily: "inherit" } }, "Cancel"),
        /* @__PURE__ */ React.createElement("button", { onClick: submit, disabled: loading, style: { background: "linear-gradient(135deg,var(--purple),#7c3aed)", color: "#fff", border: "none", borderRadius: 8, padding: "10px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, loading ? "Sending..." : "Submit Request"))) :
    /* @__PURE__ */ React.createElement("button", { onClick: () => setShowForm(true), style: { width: "100%", background: "color-mix(in srgb, var(--purple) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--purple) 20%, transparent)", borderRadius: 10, padding: "12px", fontSize: 12, fontWeight: 700, color: "var(--purple)", cursor: "pointer", fontFamily: "inherit", marginBottom: 0 } }, "🛡 Request Club Director Access"));
}
function PlayerPortal({ clubs, appRole = "player", setAppRole, currentUser = null, myProfile = null, refetchProfiles = null }) {
  var _a;
  const [player, setPlayer] = useState(() => myProfile ? __spreadValues(__spreadValues({}, DEFAULT_USER), myProfile) : __spreadValues({}, DEFAULT_USER));
  useEffect(() => {
    if (myProfile == null ? void 0 : myProfile.id) {
      setPlayer((p) => __spreadProps(__spreadValues(__spreadValues({}, p), myProfile), {
        name: myProfile.name || p.name || "",
        clubId: myProfile.clubId || myProfile.club_id || p.clubId || null,
        playsSingles: myProfile.playsSingles === true,
        emailNotifications: myProfile.emailNotifications !== false,
        photo: myProfile.photo || myProfile.avatar_url || p.photo || null
      }));
    }
  }, [myProfile == null ? void 0 : myProfile.id, myProfile == null ? void 0 : myProfile.clubId, myProfile == null ? void 0 : myProfile.playsSingles, myProfile == null ? void 0 : myProfile.name, myProfile == null ? void 0 : myProfile.photo]);
  const [tab, setTab2] = useState(() => {
    try { return new URLSearchParams(window.location.search).get("tab") === "club" ? "club" : "profile"; } catch (e) { return "profile"; }
  });
  const [toast, setToast] = useState(null);
  const [joinRequested, setJoinRequested] = useState(player.clubId);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef();
  const showToast = (msg, c = "var(--success)") => {
    setToast({ msg, c });
    setTimeout(() => setToast(null), 2500);
  };
  const save = () => {
    setSaving(true);
    const tok = smaashDB.auth.getToken();
    if (!(currentUser == null ? void 0 : currentUser.id) || !tok) {
      setSaving(false);
      showToast("Not logged in", "var(--danger)");
      return;
    }
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/profiles?id=eq." + currentUser.id, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({
        full_name: player.name || "",
        bio: player.bio || "",
        location: player.location || "",
        plays_singles: !!player.playsSingles,
        email_notifications: player.emailNotifications !== false
      })
    }).then((r) => {
      setSaving(false);
      if (r.ok) {
        showToast("Profile saved! \u2713");
        if (refetchProfiles) refetchProfiles();
      } else {
        showToast("Save failed \u2014 try again", "var(--danger)");
      }
    }).catch(() => {
      setSaving(false);
      showToast("Save failed", "var(--danger)");
    });
  };
  const [uploading, setUploading] = useState(false);
  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      showToast("Image too large \u2014 max 3MB", "var(--danger)");
      return;
    }
    setUploading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX = 200;
        let w = img.width, h = img.height;
        if (w > h) {
          h = Math.round(h * MAX / w);
          w = MAX;
        } else {
          w = Math.round(w * MAX / h);
          h = MAX;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        const base64 = canvas.toDataURL("image/jpeg", 0.8);
        setPlayer((p) => __spreadProps(__spreadValues({}, p), { photo: base64 }));
        const tok = smaashDB.auth.getToken();
        if (!tok || !(currentUser == null ? void 0 : currentUser.id)) {
          setUploading(false);
          return;
        }
        fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/profiles?id=eq." + currentUser.id, {
          method: "PATCH",
          headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
          body: JSON.stringify({ avatar_url: base64 })
        }).then((r) => {
          setUploading(false);
          if (r.ok) {
            showToast("Photo saved! \u2713");
            if (refetchProfiles) refetchProfiles();
          } else {
            showToast("Save failed \u2014 try again", "var(--danger)");
          }
        }).catch(() => {
          setUploading(false);
          showToast("Error saving photo", "var(--danger)");
        });
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };
  const verifiedClubs = clubs.filter((c) => c.status === "verified");
  const myClub = clubs.find((c) => c.id === joinRequested);
  const tc = ((_a = TIERS.find((t) => t.id === player.tier)) == null ? void 0 : _a.color) || "var(--primary)";
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, toast && /* @__PURE__ */ React.createElement(Toast, { msg: toast.msg, color: toast.c }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, letterSpacing: 3, color: "var(--text)", lineHeight: 1 } }, "ME"), /* @__PURE__ */ React.createElement(ThemeToggle, null)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement(Avatar, { initials: player.avatar, size: 60, color: tc, photo: player.photo }), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => !uploading && fileRef.current.click(),
      style: {
        position: "absolute",
        bottom: -2,
        right: -2,
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: uploading ? "var(--warn)" : "var(--primary)",
        border: "2px solid var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: uploading ? "wait" : "pointer",
        fontSize: 11
      }
    },
    uploading ? "\u23F3" : "+"
  ), /* @__PURE__ */ React.createElement("input", { ref: fileRef, type: "file", accept: "image/*", onChange: handlePhoto, style: { display: "none" } }),
  (appRole === "club_director" || (myProfile && myProfile.role === "club_director")) && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: -5, left: -5, background: "linear-gradient(135deg,var(--purple),#7c3aed)", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, border: "2.5px solid var(--bg)", zIndex: 3, pointerEvents: "none" } }, "\uD83D\uDEE1")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 22, letterSpacing: 2, color: "var(--text)", lineHeight: 1 } }, player.name || "Your Profile"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", marginTop: 3 } }, "Tap + to upload photo"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 0, marginBottom: 18, background: "var(--surface)", borderRadius: 10, padding: 3, border: "1px solid var(--border)" } }, ["profile", "club"].map((t2) => /* @__PURE__ */ React.createElement("button", { key: t2, onClick: () => setTab2(t2), style: { flex: 1, background: tab === t2 ? "var(--border)" : "none", border: "none", borderRadius: 8, padding: "9px 0", fontSize: 10, fontWeight: 700, color: tab === t2 ? "var(--text)" : "var(--text-faint)", cursor: "pointer", letterSpacing: 0.5, textTransform: "uppercase", fontFamily: "inherit", transition: "all 0.2s" } }, t2 === "profile" ? "👤 Profile" : t2 === "club" ? "🏛 Club" : "\u2699 Settings"))), tab === "profile" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Input, { label: "Full Name", value: player.name, onChange: (v) => setPlayer((p) => __spreadProps(__spreadValues({}, p), { name: v })), placeholder: "Your full name" }), /* @__PURE__ */ React.createElement(
    CityAutocomplete,
    {
      value: player.location,
      onChange: (v) => setPlayer((p) => __spreadProps(__spreadValues({}, p), { location: v }))
    }
  ), /* @__PURE__ */ React.createElement(Textarea, { label: "Bio", value: player.bio, onChange: (v) => setPlayer((p) => __spreadProps(__spreadValues({}, p), { bio: v })), placeholder: "Tell other players about yourself \u2014 playing style, experience, goals\u2026", rows: 4 }), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, padding: "14px 16px", border: "1px solid var(--border)", marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 12 } }, "Your Ratings (read-only)"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: player.playsSingles ? "1fr 1fr 1fr 1fr" : "1fr 1fr 1fr", gap: 8 } }, (player.playsSingles ? [{ label: "Singles", value: fmt(player.rating), color: "var(--primary)" }, { label: "Doubles", value: fmt(player.doublesRating), color: "var(--purple)" }, { label: "Reliability", value: player.reliability || "0%", color: "var(--text-dim)" }, { label: "RD", value: Math.round(player.rd || 350), color: "var(--text-faint)" }] : [{ label: "Doubles", value: fmt(player.doublesRating), color: "var(--purple)" }, { label: "Reliability", value: player.reliability || "0%", color: "var(--text-dim)" }, { label: "RD", value: Math.round(player.rd || 350), color: "var(--text-faint)" }]).map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: "var(--sunken)", borderRadius: 9, padding: "10px 8px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 900, color: s.color, fontFamily: "'Bebas Neue',sans-serif" } }, s.value), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 2 } }, s.label)))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", marginTop: 10 } }, "Ratings are calculated automatically from match results and cannot be edited manually.")), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, padding: "12px 16px", border: "1px solid var(--border)", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text)" } }, "I play singles"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-faint)", marginTop: 2 } }, "Enable to see singles options")), /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick: () => setPlayer((p) => __spreadProps(__spreadValues({}, p), { playsSingles: !p.playsSingles })),
      style: { width: 44, height: 24, borderRadius: 12, background: player.playsSingles ? "var(--primary)" : "var(--border)", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }
    },
    /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 2, left: player.playsSingles ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left 0.2s" } })
  )), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, padding: "12px 16px", border: "1px solid var(--border)", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text)" } }, "Email notifications"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-faint)", marginTop: 2 } }, "Emails for reactions, comments & club posts")), /* @__PURE__ */ React.createElement("div", { onClick: () => setPlayer((p) => __spreadProps(__spreadValues({}, p), { emailNotifications: p.emailNotifications === false })), style: { width: 44, height: 24, borderRadius: 12, background: player.emailNotifications !== false ? "var(--primary)" : "var(--border)", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 2, left: player.emailNotifications !== false ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left 0.2s" } }))), /* @__PURE__ */ React.createElement(Btn, { full: true, color: "var(--primary)", onClick: save, disabled: saving }, saving ? "Saving..." : "Save Profile")), tab === "club" && /* @__PURE__ */ React.createElement("div", null, (() => {
    var _a2;
    const myClub2 = (clubs && clubs.length > 0 ? clubs : INIT_CLUBS).find((c) => c.id === player.clubId);
    return myClub2 ? /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 14, padding: "16px", border: `1px solid ${myClub2.logoColor || "var(--primary)"}33`, marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 10 } }, "Current Club"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 46, height: 46, borderRadius: 12, background: (myClub2.logoColor || "var(--primary)") + "22", border: `1px solid ${myClub2.logoColor || "var(--primary)"}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: myClub2.logoColor || "var(--primary)" } }, myClub2.logo || ((_a2 = myClub2.name) == null ? void 0 : _a2.slice(0, 4)) || "CLUB"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: "var(--text)", fontSize: 14 } }, myClub2.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", marginTop: 2 } }, "📍 ", myClub2.location)), /* @__PURE__ */ React.createElement(StatusPill, { status: "verified" }))) : /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, padding: "14px 16px", border: "1px solid var(--border)", marginBottom: 18, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24, marginBottom: 8 } }, "🏛"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text-dim)" } }, "Not in a club yet"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-faint)", marginTop: 4 } }, "Join a club below"));
  })(), (() => {
    const ac = (clubs && clubs.length > 0 ? clubs : INIT_CLUBS).find((c) => c.id === player.clubId);
    return ac && ac.announcement ? /* @__PURE__ */ React.createElement("div", { id: "club-announcement", style: { background: "color-mix(in srgb,var(--warn) 7%,transparent)", border: "1px solid color-mix(in srgb,var(--warn) 22%,transparent)", borderRadius: 12, padding: "13px 15px", marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, fontWeight: 700, letterSpacing: 2, color: "var(--warn)", textTransform: "uppercase", marginBottom: 6 } }, "📣 Club Announcement"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "var(--text)", lineHeight: 1.5, whiteSpace: "pre-wrap" } }, ac.announcement)) : null;
  })(), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 12 } }, "Verified Clubs"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, (clubs && clubs.length > 0 ? clubs : INIT_CLUBS).map((c) => {
    var _a2;
    const isCurrent = c.id === player.clubId;
    return /* @__PURE__ */ React.createElement("div", { key: c.id, style: { background: "var(--surface)", borderRadius: 12, padding: "14px 16px", border: `1px solid ${isCurrent ? (c.logoColor || "var(--primary)") + "44" : "var(--border)"}`, display: "flex", gap: 12, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 40, height: 40, borderRadius: 10, background: (c.logoColor || "var(--primary)") + "22", border: `1px solid ${c.logoColor || "var(--primary)"}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: c.logoColor || "var(--primary)", flexShrink: 0 } }, c.logo || ((_a2 = c.name) == null ? void 0 : _a2.slice(0, 4)) || "CLUB"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text)" } }, c.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", marginTop: 1 } }, "📍 ", c.location)), isCurrent ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, background: "color-mix(in srgb, var(--primary) 13%, transparent)", color: "var(--primary)", padding: "2px 8px", borderRadius: 4, fontWeight: 700 } }, "CURRENT"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setPlayer((p) => __spreadProps(__spreadValues({}, p), { clubId: null }));
      const tok = smaashDB.auth.getToken();
      if ((currentUser == null ? void 0 : currentUser.id) && tok) {
        fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/profiles?id=eq." + currentUser.id, {
          method: "PATCH",
          headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
          body: JSON.stringify({ club_id: null })
        }).then((r) => {
          if (r.ok && refetchProfiles) setTimeout(refetchProfiles, 500);
        });
      }
      showToast("Left club");
    }, style: { fontSize: 9, background: "color-mix(in srgb, var(--danger) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--danger) 20%, transparent)", borderRadius: 6, padding: "2px 8px", color: "var(--danger)", cursor: "pointer", fontFamily: "inherit" } }, "Leave")) : /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setPlayer((p) => __spreadProps(__spreadValues({}, p), { clubId: c.id }));
      const tok = smaashDB.auth.getToken();
      if ((currentUser == null ? void 0 : currentUser.id) && tok) {
        fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/profiles?id=eq." + currentUser.id, {
          method: "PATCH",
          headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
          body: JSON.stringify({ club_id: c.id })
        }).then((r) => {
          if (r.ok && refetchProfiles) setTimeout(refetchProfiles, 500);
          if (r.ok && c.status !== "verified") {
            setTimeout(() => {
              fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/profiles?club_id=eq." + c.id + "&select=id", {
                headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok }
              }).then((r2) => r2.json()).then((members) => {
                if (Array.isArray(members) && members.length >= 10) {
                  fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/clubs?id=eq." + c.id, {
                    method: "PATCH",
                    headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
                    body: JSON.stringify({ status: "verified" })
                  }).then((r3) => {
                    if (r3.ok) console.log("Club auto-verified at 10 members!");
                  });
                }
              });
            }, 1e3);
          }
        });
      }
      showToast(`Joined ${c.name}! \u2713`);
    }, style: { background: "color-mix(in srgb, var(--primary) 13%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 27%, transparent)", borderRadius: 8, padding: "6px 12px", fontSize: 10, fontWeight: 700, color: "var(--primary)", cursor: "pointer", fontFamily: "inherit", flexShrink: 0 } }, "Join"));
  }))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 24, paddingTop: 16, borderTop: "1px solid var(--border)" } },
    appRole === "player" && /* @__PURE__ */ React.createElement(DirectorRequestButton, { currentUser, myProfile, clubs }),
    /* @__PURE__ */ React.createElement(AddToHomeScreenButton, null),
    /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        smaashDB.auth.signOut();
        localStorage.clear();
        window.location.reload();
      },
      style: { width: "100%", background: "color-mix(in srgb, var(--danger) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--danger) 20%, transparent)", borderRadius: 10, padding: "13px", fontSize: 12, fontWeight: 700, color: "var(--danger)", cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 1 }
    },
    "🚪 Sign Out"
  )));
}
function ClubApplyScreen({ currentUser, onBack }) {
  const [form, setForm] = useState({ name: "", location: "", courts: 2, court_surface: "Synthetic", description: "" });
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(null);
  const showToast = function(msg, c) { setToast({ msg: msg, c: c || "var(--success)" }); setTimeout(function() { setToast(null); }, 2400); };
  const handleSubmit = function() {
    var _a;
    if (!form.name.trim()) return showToast("Club name required", "var(--danger)");
    var tok = smaashDB.auth.getToken();
    if (!tok) return showToast("Not logged in", "var(--danger)");
    var jcode = Math.random().toString(36).substring(2, 8).toUpperCase();
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/clubs", {
      method: "POST",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=representation" },
      body: JSON.stringify({ name: form.name.trim(), status: "pending", location: form.location.trim(), logo_initials: form.name.trim().slice(0, 4).toUpperCase(), logo_color: "var(--primary)", description: form.description.trim(), courts: form.courts || 0, court_surface: form.court_surface, applicant_id: currentUser && currentUser.id, director_name: ((_a = currentUser && currentUser.user_metadata) == null ? void 0 : _a.full_name) || "", director_email: (currentUser && currentUser.email) || "", join_code: jcode })
    }).then(function(r) { return r.json(); }).then(function(data) {
      if (Array.isArray(data) && data.length > 0) setSubmitted(true);
      else showToast("Submission failed", "var(--danger)");
    }).catch(function() { showToast("Network error", "var(--danger)"); });
  };
  if (submitted) return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease", textAlign: "center", padding: "40px 20px" } },
    /* @__PURE__ */ React.createElement("div", { style: { fontSize: 48, marginBottom: 16 } }, "\uD83C\uDFDB"),
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, letterSpacing: 3, color: "var(--text)", marginBottom: 8 } }, "APPLICATION SENT"),
    /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "var(--text-dim)", lineHeight: 1.8, marginBottom: 20 } }, "Your club application is under review. You will be notified once approved with a join code to share with members."),
    /* @__PURE__ */ React.createElement("button", { onClick: onBack, style: { background: "color-mix(in srgb, var(--primary) 13%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 27%, transparent)", borderRadius: 10, padding: "12px 24px", fontSize: 12, fontWeight: 700, color: "var(--primary)", cursor: "pointer", fontFamily: "inherit" } }, "Back to More"));
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } },
    toast && /* @__PURE__ */ React.createElement(Toast, { msg: toast.msg, color: toast.c }),
    /* @__PURE__ */ React.createElement("button", { onClick: onBack, style: { background: "none", border: "none", color: "var(--text-dim)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 16, padding: 0 } }, "\u2190 Back"),
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "CREATE A CLUB"),
    /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-faint)", marginBottom: 20, lineHeight: 1.7 } }, "Submit an application. Once approved you become Club Director and receive a join code to share with members."),
    /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 6 } }, "Club Name *"),
    /* @__PURE__ */ React.createElement("input", { value: form.name, onChange: function(e) { setForm(function(p) { return Object.assign({}, p, { name: e.target.value }); }); }, placeholder: "e.g. ICCO Badminton", style: { width: "100%", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 14px", color: "var(--text)", fontSize: 13, outline: "none", fontFamily: "inherit", marginBottom: 12, boxSizing: "border-box" } }),
    /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 6 } }, "City / Location"),
    /* @__PURE__ */ React.createElement("input", { value: form.location, onChange: function(e) { setForm(function(p) { return Object.assign({}, p, { location: e.target.value }); }); }, placeholder: "e.g. Mississauga, ON, Canada", style: { width: "100%", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 14px", color: "var(--text)", fontSize: 13, outline: "none", fontFamily: "inherit", marginBottom: 12, boxSizing: "border-box" } }),
    /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 6 } }, "Description"),
    /* @__PURE__ */ React.createElement("textarea", { value: form.description, onChange: function(e) { setForm(function(p) { return Object.assign({}, p, { description: e.target.value }); }); }, placeholder: "Brief description of your club...", rows: 3, style: { width: "100%", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 14px", color: "var(--text)", fontSize: 13, outline: "none", fontFamily: "inherit", marginBottom: 20, boxSizing: "border-box", resize: "none" } }),
    /* @__PURE__ */ React.createElement("button", { onClick: handleSubmit, disabled: !form.name.trim(), style: { width: "100%", background: form.name.trim() ? "linear-gradient(135deg,var(--primary),var(--primary-deep))" : "var(--border)", color: form.name.trim() ? "var(--bg)" : "var(--text-faint)", border: "none", borderRadius: 12, padding: "14px", fontSize: 13, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", cursor: form.name.trim() ? "pointer" : "default", fontFamily: "inherit" } }, "Submit Application"));
}
function JoinClubScreen({ currentUser, onBack, onJoined }) {
  const [code, setCode] = useState("");
  const [found, setFound] = useState(null);
  const [joining, setJoining] = useState(false);
  const [toast, setToast] = useState(null);
  const showToast = function(msg, c) { setToast({ msg: msg, c: c || "var(--success)" }); setTimeout(function() { setToast(null); }, 2400); };
  const lookup = function() {
    if (code.trim().length < 4) return;
    var tok = smaashDB.auth.getToken() || SUPABASE_ANON_KEY;
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/clubs?join_code=eq." + code.trim().toUpperCase() + "&status=eq.verified&select=id,name,location,logo_initials,logo_color,courts", {
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok }
    }).then(function(r) { return r.json(); }).then(function(data) {
      if (Array.isArray(data) && data.length > 0) setFound(data[0]);
      else showToast("No club found with that code", "var(--danger)");
    });
  };
  const joinClub = function() {
    if (!found || !currentUser) return;
    setJoining(true);
    var tok = smaashDB.auth.getToken();
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/profiles?id=eq." + currentUser.id, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ club_id: found.id })
    }).then(function(r) {
      setJoining(false);
      if (r.ok) { showToast("Joined " + found.name + "! \u2713"); setTimeout(function() { if (onJoined) onJoined(found.id); }, 1200); }
      else showToast("Join failed", "var(--danger)");
    });
  };
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } },
    toast && /* @__PURE__ */ React.createElement(Toast, { msg: toast.msg, color: toast.c }),
    /* @__PURE__ */ React.createElement("button", { onClick: onBack, style: { background: "none", border: "none", color: "var(--text-dim)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 16, padding: 0 } }, "\u2190 Back"),
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "JOIN A CLUB"),
    /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-faint)", marginBottom: 20 } }, "Enter the 6-character join code from your Club Director."),
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 16 } },
      /* @__PURE__ */ React.createElement("input", { value: code, onChange: function(e) { setCode(e.target.value.toUpperCase().slice(0, 6)); }, onKeyDown: function(e) { if (e.key === "Enter") lookup(); }, placeholder: "ABC123", maxLength: 6, style: { flex: 1, background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "13px 14px", color: "var(--text)", fontSize: 20, fontWeight: 800, letterSpacing: 6, outline: "none", fontFamily: "inherit", textTransform: "uppercase" } }),
      /* @__PURE__ */ React.createElement("button", { onClick: lookup, style: { background: "color-mix(in srgb, var(--primary) 13%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 27%, transparent)", borderRadius: 10, padding: "13px 20px", fontSize: 13, fontWeight: 700, color: "var(--primary)", cursor: "pointer", fontFamily: "inherit" } }, "Find")),
    found && /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 14, padding: 16, border: "1px solid color-mix(in srgb, var(--success) 20%, transparent)", marginBottom: 16 } },
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "center", marginBottom: 12 } },
        /* @__PURE__ */ React.createElement("div", { style: { width: 44, height: 44, borderRadius: 11, background: (found.logo_color || "var(--primary)") + "22", border: "1px solid " + (found.logo_color || "var(--primary)") + "44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: found.logo_color || "var(--primary)" } }, found.logo_initials || "??"),
        /* @__PURE__ */ React.createElement("div", null,
          /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "var(--text)" } }, found.name),
          /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-faint)", marginTop: 2 } }, found.location))),
      /* @__PURE__ */ React.createElement("button", { onClick: joinClub, disabled: joining, style: { width: "100%", background: "linear-gradient(135deg,var(--success),#16a34a)", color: "#fff", border: "none", borderRadius: 10, padding: "13px", fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" } }, joining ? "Joining..." : "Join " + found.name + " \u2192")));
}

function ClubDirectory({ clubs: propClubs, profiles: profiles2 = [], currentUser = null, appRole = "player", setAppRole = null, myProfile = null, refetchProfiles = null }) {
  const clubs = (propClubs == null ? void 0 : propClubs.length) > 0 ? propClubs : INIT_CLUBS;
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  // PIN modal state
  const [pinModal, setPinModal] = useState(null);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [toast, setToast] = useState(null);
  const showToast = function(msg, c) { setToast({ msg: msg, c: c || "var(--success)" }); setTimeout(function() { setToast(null); }, 2400); };
  const verified = clubs.filter((c) => (c.name || "").toLowerCase().includes(search.toLowerCase()) || (c.location || "").toLowerCase().includes(search.toLowerCase()));

  const doJoinClub = function(club) {
    const tok = smaashDB.auth.getToken();
    if (!tok || !currentUser) return;
    const currentClubId = myProfile && (myProfile.clubId || myProfile.club_id);
    const isDirector = appRole === "club_director";
    // Director switch warning
    if (isDirector && currentClubId && currentClubId !== club.id) {
      const currentClub = clubs.find(function(c) { return c.id === currentClubId; });
      const confirmed = window.confirm("⚠ Joining " + club.name + " will remove your Director status at " + ((currentClub && currentClub.name) || "your current club") + ". Do you wish to proceed?");
      if (!confirmed) return;
      // Clear director_id from old club
      fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/clubs?id=eq." + currentClubId, {
        method: "PATCH",
        headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
        body: JSON.stringify({ director_id: null, director_name: null })
      }).catch(function() {});
      // Reset role to player, join new club
      fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/profiles?id=eq." + currentUser.id, {
        method: "PATCH",
        headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
        body: JSON.stringify({ role: "player", club_id: club.id })
      }).then(function(r) {
        if (r.ok) {
          if (setAppRole) setAppRole("player");
          if (refetchProfiles) setTimeout(refetchProfiles, 600);
          showToast("Joined " + club.name + " \u2713 (Director status removed)");
        }
      });
      return;
    }
    // Normal join
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/profiles?id=eq." + currentUser.id, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ club_id: club.id })
    }).then(function(r) {
      if (r.ok) {
        if (refetchProfiles) setTimeout(refetchProfiles, 600);
        showToast("Joined " + club.name + " \u2713");
      } else showToast("Join failed", "var(--danger)");
    });
  };

  const handleJoinClick = function(club) {
    if (club.is_private && club.join_pin) {
      setPinModal(club);
      setPinInput("");
      setPinError(false);
    } else {
      doJoinClub(club);
    }
  };

  const submitPin = function() {
    if (!pinModal) return;
    if (pinInput === String(pinModal.join_pin)) {
      doJoinClub(pinModal);
      setPinModal(null);
    } else {
      setPinError(true);
    }
  };

  if (selected) {
    const club = clubs.find((c) => c.id === selected);
    const tc = club.logoColor;
    return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setSelected(null), style: { background: "none", border: "none", color: "var(--text-dim)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 16, padding: 0 } }, "\u2190 Back to Clubs"), /* @__PURE__ */ React.createElement("div", { style: { background: `linear-gradient(135deg,${tc}18,var(--surface))`, border: `1px solid ${tc}33`, borderRadius: 16, padding: "20px 18px", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, alignItems: "center", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 56, height: 56, borderRadius: 14, background: tc + "22", border: `1.5px solid ${tc}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: tc } }, club.logo), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 22, letterSpacing: 2, color: "var(--text)", lineHeight: 1 } }, club.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", marginTop: 3 } }, "📍 ", club.location, " \xB7 Est. ", club.founded), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6 } }, /* @__PURE__ */ React.createElement(StatusPill, { status: "verified" })))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text-dim)", lineHeight: 1.7, marginBottom: 14 } }, club.description), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 } }, [{ label: "Members", value: profiles2.filter((p) => p.clubId === club.id).length || club.memberCount, color: tc }, { label: "Courts", value: club.courts, color: "var(--primary)" }, { label: "Founded", value: club.founded, color: "var(--purple)" }].map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: "var(--sunken)", borderRadius: 10, padding: "10px 8px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 900, color: s.color, fontFamily: "'Bebas Neue',sans-serif" } }, s.value), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--text-faint)", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 2 } }, s.label))))), (() => {
      const members = profiles2.filter((p) => p.clubId === club.id).sort((a, b) => (b.doublesRating || b.rating || 500) - (a.doublesRating || a.rating || 500));
      const clubAvg = members.length > 0 ? Math.round(members.reduce((s, p) => s + (p.doublesRating || p.rating || 500), 0) / members.length) : 500;
      return /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, padding: "14px 16px", border: "1px solid var(--border)", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase" } }, "Members \u2014 Doubles Ranking"), members.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)" } }, "Club avg: ", /* @__PURE__ */ React.createElement("span", { style: { color: tc, fontWeight: 700 } }, toDisplayRating(clubAvg).toFixed(3).replace(",", ".")))), members.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "16px", fontSize: 12, color: "var(--text-faint)" } }, "No members yet") : members.map((p, i) => /* @__PURE__ */ React.createElement("div", { key: p.id, style: { display: "flex", alignItems: "center", gap: 10, paddingBottom: i < members.length - 1 ? 10 : 0, marginBottom: i < members.length - 1 ? 10 : 0, borderBottom: i < members.length - 1 ? "1px solid var(--border)" : "none" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: i === 0 ? "var(--warn)" : i === 1 ? "var(--text-muted)" : i === 2 ? "#fb923c" : "var(--text-faint)", width: 20, textAlign: "center" } }, i + 1), /* @__PURE__ */ React.createElement(Avatar, { initials: p.avatar, size: 30, color: tc }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--text)" } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)" } }, "Doubles")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: tc, fontFamily: "'Bebas Neue',sans-serif" } }, toDisplayRating(p.doublesRating || p.rating || 500).toFixed(3).replace(",", ".")))), members.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { background: "var(--sunken)", borderRadius: 8, padding: "8px 12px", marginTop: 12, display: "flex", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-faint)" } }, "Club Average"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 800, color: tc } }, toDisplayRating(clubAvg).toFixed(3).replace(",", "."))));
    })(), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, padding: "14px 16px", border: "1px solid var(--border)", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 12 } }, "Club Director"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: 9, background: tc + "22", border: `1px solid ${tc}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 } }, "👤"), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: "var(--text)", fontSize: 13 } }, club.directorName)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text-dim)", marginBottom: 4 } }, "\u2709 ", club.directorEmail), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text-dim)" } }, "📞 ", club.directorPhone)), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, padding: "14px 16px", border: "1px solid var(--border)", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 12 } }, "Courts & Facilities"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)", marginBottom: 8 } }, "🏸 ", club.courts, " courts \xB7 ", club.courtSurface, " surface"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } }, club.facilities.map((f) => /* @__PURE__ */ React.createElement("span", { key: f, style: { fontSize: 10, background: "var(--border)", color: "var(--text-muted)", padding: "4px 10px", borderRadius: 6 } }, f)))), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 12, padding: "14px 16px", border: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 12 } }, "Member Tier Breakdown"), TIERS.map((t) => {
      const count = (club.tierBreakdown || {})[t.id] || 0;
      const pct = club.memberCount > 0 ? Math.round(count / club.memberCount * 100) : 0;
      return count > 0 && /* @__PURE__ */ React.createElement("div", { key: t.id, style: { marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: t.color, fontWeight: 700 } }, "T", t.id), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "var(--text-dim)" } }, count, " players \xB7 ", pct, "%")), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--border)", borderRadius: 3, height: 5 } }, /* @__PURE__ */ React.createElement("div", { style: { width: pct + "%", height: "100%", background: t.color, borderRadius: 3 } })));
    })));
  }
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } },
    toast && /* @__PURE__ */ React.createElement(Toast, { msg: toast.msg, color: toast.c }),
    pinModal && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 } },
      /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg)", borderRadius: 16, padding: "24px 20px", width: 280, textAlign: "center", border: "1px solid var(--border-strong)" } },
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 28, marginBottom: 8 } }, "\uD83D\uDD12"),
        /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 15, color: "var(--text)", marginBottom: 4 } }, pinModal.name),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-faint)", marginBottom: 16 } }, "This club requires a PIN to join"),
        /* @__PURE__ */ React.createElement("input", { value: pinInput, onChange: function(e) { setPinInput(e.target.value.replace(/\D/g,"").slice(0,6)); setPinError(false); }, placeholder: "000000", maxLength: 6, style: { width: "100%", background: "var(--sunken)", border: "1.5px solid " + (pinError ? "var(--danger)" : "var(--border)"), borderRadius: 9, padding: "11px", textAlign: "center", fontSize: 22, letterSpacing: 8, color: "var(--text)", fontFamily: "inherit", marginBottom: 4, boxSizing: "border-box", outline: "none" } }),
        pinError && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--danger)", marginBottom: 10 } }, "Incorrect PIN — try again"),
        !pinError && /* @__PURE__ */ React.createElement("div", { style: { height: 18 } }),
        /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } },
          /* @__PURE__ */ React.createElement("button", { onClick: function() { setPinModal(null); }, style: { background: "var(--border)", border: "none", borderRadius: 8, padding: "10px", fontSize: 12, fontWeight: 700, color: "var(--text-dim)", cursor: "pointer", fontFamily: "inherit" } }, "Cancel"),
          /* @__PURE__ */ React.createElement("button", { onClick: submitPin, disabled: pinInput.length !== 6, style: { background: pinInput.length === 6 ? "linear-gradient(135deg,var(--purple),#7c3aed)" : "var(--border)", color: pinInput.length === 6 ? "#fff" : "var(--text-faint)", border: "none", borderRadius: 8, padding: "10px", fontSize: 12, fontWeight: 700, cursor: pinInput.length === 6 ? "pointer" : "default", fontFamily: "inherit" } }, "Join")))),
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 22, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "CLUB DIRECTORY"),
    /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 } }, "Verified clubs only"),
    /* @__PURE__ */ React.createElement("div", { style: { position: "relative", marginBottom: 16 } },
      /* @__PURE__ */ React.createElement("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search clubs or locations\u2026", style: { width: "100%", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 14px 11px 38px", color: "var(--text)", fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: "inherit" } }),
      /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-faint)", fontSize: 14 } }, "\u2315")),
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
      verified.map((club) => {
        const liveMembers = profiles2.filter(function(p) { return p.club_id === club.id || p.clubId === club.id; }).length;
        const myClubId = myProfile && (myProfile.clubId || myProfile.club_id);
        const isMine = myClubId === club.id;
        return /* @__PURE__ */ React.createElement("div", { key: club.id, style: { background: "var(--surface)", borderRadius: 14, overflow: "hidden", border: "1px solid " + (isMine ? "color-mix(in srgb,var(--primary) 30%,transparent)" : "var(--border)"), transition: "border-color 0.2s" } },
          /* @__PURE__ */ React.createElement("div", { style: { height: 2, background: "linear-gradient(90deg," + (club.logoColor || "var(--primary)") + ",transparent)" } }),
          /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" } },
            /* @__PURE__ */ React.createElement("div", { onClick: function() { setSelected(club.id); }, style: { width: 44, height: 44, borderRadius: 11, background: (club.logoColor || "var(--primary)") + "22", border: "1px solid " + (club.logoColor || "var(--primary)") + "44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: club.logoColor, flexShrink: 0, cursor: "pointer" } }, club.logo),
            /* @__PURE__ */ React.createElement("div", { onClick: function() { setSelected(club.id); }, style: { flex: 1, cursor: "pointer" } },
              /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } },
                /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: "var(--text)", fontSize: 14 } }, club.name),
                club.is_private && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, background: "color-mix(in srgb,var(--purple) 13%,transparent)", color: "var(--purple)", padding: "1px 6px", borderRadius: 4, fontWeight: 700 } }, "\uD83D\uDD12 PRIVATE")),
              /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", marginTop: 2 } }, "📍 ", club.location, " · 👥 ", liveMembers, " · 🏸 ", club.courts || 0, " courts"), (() => { const dp = club.director_id ? profiles2.find(function(p) { return p.id === club.director_id; }) : null; const dn = (dp && dp.name) || club.directorName; return dn ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--purple)", fontWeight: 600, marginTop: 3 } }, "\uD83D\uDEE1 ", dn) : null; })()),
            isMine
              ? /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, background: "color-mix(in srgb,var(--primary) 13%,transparent)", color: "var(--primary)", padding: "3px 9px", borderRadius: 5, fontWeight: 700, flexShrink: 0 } }, "MEMBER")
              : /* @__PURE__ */ React.createElement("button", { onClick: function(e) { e.stopPropagation(); handleJoinClick(club); }, style: { background: "color-mix(in srgb,var(--primary) 13%,transparent)", border: "1px solid color-mix(in srgb,var(--primary) 27%,transparent)", borderRadius: 8, padding: "6px 14px", fontSize: 10, fontWeight: 700, color: "var(--primary)", cursor: "pointer", fontFamily: "inherit", flexShrink: 0 } }, "Join")));
      }),
      verified.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "40px 20px", color: "var(--text-faint)", background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)" } },
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 36, marginBottom: 10 } }, "🏛"),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text-dim)", marginBottom: 6 } }, "No clubs yet"),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text-faint)", lineHeight: 1.7 } }, "Ask your Club Director to create a club and add you to it."))));
}
function MatchOversight({ matches = [], setMatches, profiles: profiles2 = [] }) {
  const findP = (id) => profiles2.find((p) => p.id === id) || { name: "Unknown", avatar: "?", id };
  const enriched = matches.map((m) => ({
    ...m,
    playerA: m.playerA || findP(m.player_a_id),
    playerB: m.playerB || findP(m.player_b_id),
    partnerA: m.partnerA || (m.partner_a_id ? findP(m.partner_a_id) : null),
    partnerB: m.partnerB || (m.partner_b_id ? findP(m.partner_b_id) : null),
    type: m.type || m.match_type || "doubles",
    date: m.date || m.played_at || "Today",
  }));
  const [overrideId, setOverrideId] = useState(null);
  const [reason, setReason] = useState("");
  const [filterStatus, setFilterStatus] = useState("pending");
  const [toast, setToast] = useState(null);
  const [auditLog, setAuditLog] = useState([]);
  const showToast = (msg, c = "var(--purple)") => {
    setToast({ msg, c });
    setTimeout(() => setToast(null), 2600);
  };
  const filtered = enriched.filter(
    (m) => filterStatus === "all" ? true : m.status === filterStatus
  );
  const doOverride = (id, action) => {
    if (!reason.trim()) return;
    const newStatus = action === "confirm" ? "admin_override" : "voided";
    if (setMatches) setMatches((p) => p.map((m) => m.id === id ? __spreadProps(__spreadValues({}, m), { status: newStatus, adminOverrideReason: reason, adminOverrideAt: (/* @__PURE__ */ new Date()).toISOString() }) : m));
    const match = matches.find((m) => m.id === id);
    setAuditLog((prev) => {
      var _a, _b;
      return [{
        id,
        action,
        reason,
        matchDesc: match ? `${(_a = match.playerA) == null ? void 0 : _a.name} vs ${(_b = match.playerB) == null ? void 0 : _b.name}` : id,
        at: (/* @__PURE__ */ new Date()).toLocaleString()
      }, ...prev];
    });
    setOverrideId(null);
    setReason("");
    showToast(action === "confirm" ? "\u2699 Match confirmed via Admin Override \u2014 logged." : "\u2699 Match voided via Admin Override \u2014 logged.");
  };
  return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 20, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "MATCH OVERSIGHT"), /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb, var(--purple) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--purple) 20%, transparent)", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 11, color: "var(--purple)", lineHeight: 1.7 } }, /* @__PURE__ */ React.createElement("strong", null, "Admin override is a last resort."), " Every action is permanently logged with your reason. Use only when a match is stuck pending due to an unresponsive player, a technical error, or an exceptional circumstance."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 12 } }, [{ v: "pending", label: "Pending", c: "var(--warn)" }, { v: "disputed", label: "Disputed", c: "var(--danger)" }, { v: "all", label: "All", c: "var(--text-dim)" }].map((f) => /* @__PURE__ */ React.createElement("button", { key: f.v, onClick: () => setFilterStatus(f.v), style: { background: filterStatus === f.v ? f.c + "22" : "var(--surface)", border: `1px solid ${filterStatus === f.v ? f.c + "55" : "var(--border)"}`, borderRadius: 7, padding: "5px 12px", fontSize: 10, fontWeight: 700, color: filterStatus === f.v ? f.c : "var(--text-faint)", cursor: "pointer", fontFamily: "inherit" } }, f.label, " ", filterStatus !== "all" && f.v !== "all" ? `(${matches.filter((m) => m.status === f.v).length})` : ""))), toast && /* @__PURE__ */ React.createElement(Toast, { msg: toast.msg, color: toast.c }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 } }, filtered.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "24px", color: "var(--text-faint)", background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 } }, "No ", filterStatus === "all" ? "" : filterStatus, " matches"), filtered.map((m) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    const mSets = (() => { try { return Array.isArray(m.sets) ? m.sets : JSON.parse(m.sets || "[]"); } catch(e) { return []; } })();
    const sWA = mSets.filter((s) => s.a > s.b).length;
    const sWB = mSets.filter((s) => s.b > s.a).length;
    const t = TIERS.find((x) => x.id === m.tier);
    const isOpen = overrideId === m.id;
    const canOverride = ["pending", "disputed"].includes(m.status);
    return /* @__PURE__ */ React.createElement("div", { key: m.id, style: { background: "var(--surface)", borderRadius: 12, overflow: "hidden", border: `1px solid ${isOpen ? "color-mix(in srgb, var(--purple) 27%, transparent)" : canOverride ? "color-mix(in srgb, var(--warn) 13%, transparent)" : "var(--border)"}` } }, /* @__PURE__ */ React.createElement("div", { style: { height: 2, background: `linear-gradient(90deg,${(t == null ? void 0 : t.color) || "var(--border-strong)"},transparent)` } }), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } }, /* @__PURE__ */ React.createElement(TierBadge, { tier: m.tier }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-faint)" } }, m.type, " \xB7 ", m.date)), /* @__PURE__ */ React.createElement(StatusPill, { status: m.status })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: canOverride ? 10 : 0 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7, marginBottom: 4 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: (_a = m.playerA) == null ? void 0 : _a.avatar, size: 22, color: "var(--primary)", photo: (_b = m.playerA) == null ? void 0 : _b.photo }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: sWA > sWB ? "var(--primary)" : "var(--text-dim)" } }, (_c = m.playerA) == null ? void 0 : _c.name)), m.type === "doubles" && m.partnerA && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7, paddingLeft: 4, marginBottom: 4 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: (_d = m.partnerA) == null ? void 0 : _d.avatar, size: 18, color: "var(--primary)", photo: (_e = m.partnerA) == null ? void 0 : _e.photo }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-dim)" } }, (_f = m.partnerA) == null ? void 0 : _f.name)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7, marginBottom: 4 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: (_g = m.playerB) == null ? void 0 : _g.avatar, size: 22, color: "var(--purple)", photo: (_h = m.playerB) == null ? void 0 : _h.photo }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: sWB > sWA ? "var(--purple)" : "var(--text-dim)" } }, (_i = m.playerB) == null ? void 0 : _i.name)), m.type === "doubles" && m.partnerB && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7, paddingLeft: 4 } }, /* @__PURE__ */ React.createElement(Avatar, { initials: (_j = m.partnerB) == null ? void 0 : _j.avatar, size: 18, color: "var(--purple)", photo: (_k = m.partnerB) == null ? void 0 : _k.photo }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-dim)" } }, (_l = m.partnerB) == null ? void 0 : _l.name))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 3, justifyContent: "center", marginBottom: 2 } }, mSets.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i }, /* @__PURE__ */ React.createElement("div", { style: { background: "var(--border)", borderRadius: "3px 3px 0 0", padding: "2px 5px", fontSize: 10, fontWeight: 700, color: s.a > s.b ? "var(--primary)" : "var(--text-faint)" } }, s.a), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--sunken)", borderRadius: "0 0 3px 3px", padding: "2px 5px", fontSize: 10, fontWeight: 700, color: s.b > s.a ? "var(--purple)" : "var(--text-faint)" } }, s.b)))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--border-strong)" } }, sWA, "\u2013", sWB))), m.adminOverrideReason && /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb, var(--purple) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--purple) 13%, transparent)", borderRadius: 8, padding: "7px 10px", marginTop: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: "var(--purple)", fontWeight: 700, letterSpacing: 1, marginBottom: 2 } }, "ADMIN OVERRIDE REASON"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)" } }, m.adminOverrideReason)), canOverride && (isOpen ? /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--purple)", fontWeight: 700, letterSpacing: 1, marginBottom: 6 } }, "OVERRIDE REASON ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--danger)" } }, "*"), " ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--text-faint)", fontWeight: 400 } }, "(required \u2014 this is logged permanently)")), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        value: reason,
        onChange: (e) => setReason(e.target.value),
        placeholder: "e.g. Player B unreachable for 5 days, match verified by Club Director in person\u2026",
        style: { width: "100%", background: "var(--sunken)", border: `1.5px solid ${reason.trim() ? "color-mix(in srgb, var(--purple) 33%, transparent)" : "var(--border)"}`, borderRadius: 9, padding: "10px 12px", color: "var(--text)", fontSize: 12, resize: "none", height: 80, outline: "none", fontFamily: "inherit", marginBottom: 10, boxSizing: "border-box" }
      }
    ), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setOverrideId(null);
      setReason("");
    }, style: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 0", fontSize: 10, fontWeight: 700, color: "var(--text-faint)", cursor: "pointer", fontFamily: "inherit" } }, "Cancel"), /* @__PURE__ */ React.createElement("button", { onClick: () => doOverride(m.id, "void"), disabled: !reason.trim(), style: { background: reason.trim() ? "color-mix(in srgb, var(--danger) 7%, transparent)" : "var(--surface)", border: `1px solid ${reason.trim() ? "color-mix(in srgb, var(--danger) 20%, transparent)" : "var(--border)"}`, borderRadius: 8, padding: "9px 0", fontSize: 10, fontWeight: 700, color: reason.trim() ? "var(--danger)" : "var(--border-strong)", cursor: reason.trim() ? "pointer" : "not-allowed", fontFamily: "inherit" } }, "\u2699 Void"), /* @__PURE__ */ React.createElement("button", { onClick: () => doOverride(m.id, "confirm"), disabled: !reason.trim(), style: { background: reason.trim() ? "color-mix(in srgb, var(--purple) 13%, transparent)" : "var(--surface)", border: `1px solid ${reason.trim() ? "color-mix(in srgb, var(--purple) 33%, transparent)" : "var(--border)"}`, borderRadius: 8, padding: "9px 0", fontSize: 10, fontWeight: 800, color: reason.trim() ? "var(--purple)" : "var(--border-strong)", cursor: reason.trim() ? "pointer" : "not-allowed", fontFamily: "inherit" } }, "\u2699 Confirm"))) : /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setOverrideId(m.id);
      setReason("");
    }, style: { width: "100%", marginTop: 10, background: "color-mix(in srgb, var(--purple) 4%, transparent)", border: "1px dashed color-mix(in srgb, var(--purple) 20%, transparent)", borderRadius: 8, padding: "8px 0", fontSize: 10, fontWeight: 700, color: "var(--text-dim)", cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5 } }, "\u2699 Admin Override\u2026"))));
  })), auditLog.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "var(--text-faint)", textTransform: "uppercase", marginBottom: 10 } }, "Override Audit Log"), auditLog.map((entry, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: "var(--surface)", borderRadius: 10, padding: "10px 14px", marginBottom: 6, border: "1px solid color-mix(in srgb, var(--purple) 13%, transparent)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, background: entry.action === "confirm" ? "color-mix(in srgb, var(--purple) 13%, transparent)" : "color-mix(in srgb, var(--danger) 13%, transparent)", color: entry.action === "confirm" ? "var(--purple)" : "var(--danger)", padding: "2px 7px", borderRadius: 4, fontWeight: 700 } }, "\u2699 ", entry.action === "confirm" ? "CONFIRMED" : "VOIDED"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, color: "var(--text-faint)" } }, entry.at)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)", marginBottom: 3 } }, entry.matchDesc), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)", fontStyle: "italic" } }, '"', entry.reason, '"')))));
}
function AdminPanel({ clubs, setClubs, matches = MOCK_MATCHES, setMatches, profiles: profiles2 = [], currentUser = null }) {
  const [toast, setToast] = useState(null);
  const [selected, setSelected] = useState(null);
  const [noteInput, setNoteInput] = useState("");
  const [dirRequests, setDirRequests] = useState([]);
  const [pendingClubs, setPendingClubs] = useState([]);
  const showToast = (msg, c = "var(--success)") => {
    setToast({ msg, c });
    setTimeout(() => setToast(null), 2600);
  };
  useEffect(() => {
    const tok = smaashDB.auth.getToken();
    if (!tok) return;
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/director_requests?status=eq.pending&order=created_at.asc", {
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok }
    }).then((r) => r.json()).then((data) => {
      console.log("Director requests:", data);
      if (Array.isArray(data)) setDirRequests(data);
    }).catch((e) => console.error("Director requests error:", e));
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/clubs?status=eq.pending&order=created_at.asc&select=*", {
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok }
    }).then(function(r) { return r.json(); }).then(function(data) {
      if (Array.isArray(data)) setPendingClubs(data);
    }).catch(function() {});
  }, []);
  const approveDirector = (req) => {
    const tok = smaashDB.auth.getToken();
    if (!tok) return;
    fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/director_requests?id=eq.${req.id}`, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ status: "approved" })
    }).then((r1) => {
      console.log("director_requests PATCH:", r1.status);
      return fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/profiles?id=eq.${req.user_id}`, {
        method: "PATCH",
        headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
        body: JSON.stringify({ role: "club_director", club_id: req.club_id })
      });
    }).then((r2) => {
      console.log("profiles PATCH:", r2.status);
      if (!r2.ok) r2.json().then((e) => console.error("profiles PATCH error:", e));
      return fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/clubs?id=eq.${req.club_id}`, {
        method: "PATCH",
        headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
        body: JSON.stringify({ director_id: req.user_id, director_name: req.full_name })
      });
    }).then((r3) => {
      console.log("clubs PATCH:", r3.status);
      setDirRequests((r) => r.filter((x) => x.id !== req.id));
      showToast(req.full_name + " is now Club Director \u2713");
    }).catch((e) => {
      console.error("approveDirector error:", e);
      showToast("Approval failed — check console", "var(--danger)");
    });
  };
  const approveClubApp = function(club) {
    var tok = smaashDB.auth.getToken();
    var jcode = club.join_code || Math.random().toString(36).substring(2, 8).toUpperCase();
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/clubs?id=eq." + club.id, {
      method: "PATCH", headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ status: "verified", join_code: jcode })
    }).then(function(r) {
      if (!r.ok) return showToast("Approval failed", "var(--danger)");
      if (club.applicant_id) {
        fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/profiles?id=eq." + club.applicant_id, {
          method: "PATCH", headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
          body: JSON.stringify({ role: "club_director", club_id: club.id })
        });
        fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/notifications", {
          method: "POST", headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
          body: JSON.stringify({ user_id: club.applicant_id, message: "Your club " + club.name + " is approved! Join code: " + jcode, is_read: false })
        });
      }
      setPendingClubs(function(p) { return p.filter(function(c) { return c.id !== club.id; }); });
      showToast(club.name + " approved! Code: " + jcode);
    });
  };
  const rejectClubApp = function(club) {
    var tok = smaashDB.auth.getToken();
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/clubs?id=eq." + club.id, {
      method: "PATCH", headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ status: "rejected" })
    }).then(function(r) {
      if (!r.ok) return showToast("Reject failed", "var(--danger)");
      if (club.applicant_id) {
        fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/notifications", {
          method: "POST", headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
          body: JSON.stringify({ user_id: club.applicant_id, message: "Your club application for " + club.name + " was not approved.", is_read: false })
        });
      }
      setPendingClubs(function(p) { return p.filter(function(c) { return c.id !== club.id; }); });
      showToast("Application rejected");
    });
  };
  const rejectDirector = (req) => {
    const tok = smaashDB.auth.getToken();
    if (!tok) return;
    fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/director_requests?id=eq.${req.id}`, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ status: "rejected" })
    }).then(() => {
      setDirRequests((r) => r.filter((x) => x.id !== req.id));
      showToast("Request declined", "var(--danger)");
    });
  };
  const pending = clubs.filter((c) => c.status === "pending");
  const verified = clubs.filter((c) => c.status === "verified");
  const rejected = clubs.filter((c) => c.status === "rejected");
  const approve = (id) => {
    setClubs((prev) => prev.map((c) => c.id === id ? __spreadProps(__spreadValues({}, c), { status: "verified", adminNote: noteInput }) : c));
    setSelected(null);
    setNoteInput("");
    showToast("Club approved and now live in directory.");
  };
  const reject = (id) => {
    setClubs((prev) => prev.map((c) => c.id === id ? __spreadProps(__spreadValues({}, c), { status: "rejected", adminNote: noteInput }) : c));
    setSelected(null);
    setNoteInput("");
    showToast("Club application rejected.", "var(--danger)");
  };
  return /* @__PURE__ */ React.createElement("div", { style: { animation: "fadeIn 0.3s ease" } }, toast && /* @__PURE__ */ React.createElement(Toast, { msg: toast.msg, color: toast.c }), /* @__PURE__ */ React.createElement("div", { style: { background: "linear-gradient(135deg,color-mix(in srgb, var(--warn) 9%, transparent),var(--surface))", border: "1px solid color-mix(in srgb, var(--warn) 20%, transparent)", borderRadius: 12, padding: "12px 16px", marginBottom: 20, display: "flex", gap: 12, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 38, height: 38, borderRadius: 9, background: "color-mix(in srgb, var(--warn) 13%, transparent)", border: "1px solid color-mix(in srgb, var(--warn) 27%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 } }, "\u2699\uFE0F"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: "var(--text)", fontSize: 14 } }, "SMAASH Super Admin"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--warn)" } }, "Full platform access \xB7 Club vetting \xB7 Match override authority"))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, marginBottom: 8 } }, [{ label: "Clubs Verified", value: verified.length, color: "var(--success)" }, { label: "Clubs Pending", value: pending.length, color: "var(--warn)" }, { label: "Clubs Rejected", value: rejected.length, color: "var(--danger)" }].map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: "var(--surface)", borderRadius: 10, padding: "10px 8px", textAlign: "center", border: `1px solid ${s.color}22` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 900, color: s.color, fontFamily: "'Bebas Neue',sans-serif" } }, s.value), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 8, color: "var(--text-faint)", letterSpacing: 1, textTransform: "uppercase", marginTop: 2 } }, s.label)))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, marginBottom: 20 } }, [{ label: "All Matches", value: matches.length, color: "var(--text-dim)" }, { label: "Pending", value: matches.filter((m) => m.status === "pending").length, color: "var(--warn)" }, { label: "Disputed", value: matches.filter((m) => m.status === "disputed").length, color: "var(--danger)" }].map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: "var(--surface)", borderRadius: 10, padding: "10px 8px", textAlign: "center", border: `1px solid ${s.color}22` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 900, color: s.color, fontFamily: "'Bebas Neue',sans-serif" } }, s.value), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 8, color: "var(--text-faint)", letterSpacing: 1, textTransform: "uppercase", marginTop: 2 } }, s.label)))),
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 20, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "CLUB APPLICATIONS"),
    /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, marginBottom: 14 } }, "New clubs awaiting approval"),
    pendingClubs.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "14px", color: "var(--text-faint)", background: "var(--surface)", borderRadius: 10, border: "1px solid var(--border)", marginBottom: 16, fontSize: 11 } }, "No pending club applications") : /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, pendingClubs.map(function(club) {
      return /* @__PURE__ */ React.createElement("div", { key: club.id, style: { background: "var(--surface)", borderRadius: 12, padding: "14px 16px", border: "1px solid color-mix(in srgb, var(--warn) 20%, transparent)", marginBottom: 10 } },
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 4 } }, club.name),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", marginBottom: 8 } }, club.location, " · by ", club.director_name || club.director_email || "Unknown"),
        club.description && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)", fontStyle: "italic", marginBottom: 10 } }, club.description),
        /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } },
          /* @__PURE__ */ React.createElement("button", { onClick: function() { rejectClubApp(club); }, style: { background: "color-mix(in srgb, var(--danger) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--danger) 20%, transparent)", borderRadius: 8, padding: "9px", fontSize: 11, fontWeight: 700, color: "var(--danger)", cursor: "pointer", fontFamily: "inherit" } }, "✕ Reject"),
          /* @__PURE__ */ React.createElement("button", { onClick: function() { approveClubApp(club); }, style: { background: "linear-gradient(135deg,var(--success),#16a34a)", color: "#fff", border: "none", borderRadius: 8, padding: "9px", fontSize: 11, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" } }, "✓ Approve")));
    })),
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 20, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "DIRECTOR REQUESTS"),
    /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, marginBottom: 14 } }, "Players requesting Club Director access"),
    dirRequests.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "16px", color: "var(--text-faint)", background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)", marginBottom: 20 } }, "No pending director requests") :
    /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } },
      dirRequests.map((req) => {
        const club = clubs.find((c) => c.id === req.club_id);
        return /* @__PURE__ */ React.createElement("div", { key: req.id, style: { background: "var(--surface)", borderRadius: 12, padding: "14px 16px", border: "1px solid color-mix(in srgb, var(--purple) 20%, transparent)", marginBottom: 10 } },
          /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center", marginBottom: 10 } },
            /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: 9, background: "color-mix(in srgb, var(--purple) 13%, transparent)", border: "1px solid color-mix(in srgb, var(--purple) 20%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 } }, "🛡"),
            /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } },
              /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text)" } }, req.full_name || "Player"),
              /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", marginTop: 2 } }, "Requesting director of ", (club == null ? void 0 : club.name) || "club"))),
          req.reason && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)", fontStyle: "italic", marginBottom: 10, padding: "8px 10px", background: "var(--sunken)", borderRadius: 7 } }, "\u201C", req.reason, "\u201D"),
          /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } },
            /* @__PURE__ */ React.createElement("button", { onClick: () => rejectDirector(req), style: { background: "color-mix(in srgb, var(--danger) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--danger) 20%, transparent)", borderRadius: 8, padding: "10px", fontSize: 11, fontWeight: 700, color: "var(--danger)", cursor: "pointer", fontFamily: "inherit" } }, "\u2715 Decline"),
            /* @__PURE__ */ React.createElement("button", { onClick: () => approveDirector(req), style: { background: "linear-gradient(135deg,var(--purple),#7c3aed)", color: "#fff", border: "none", borderRadius: 8, padding: "10px", fontSize: 11, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" } }, "\u2713 Approve")));
      })),
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 20, letterSpacing: 3, color: "var(--text)", marginBottom: 4 } }, "PENDING APPLICATIONS"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", letterSpacing: 2, marginBottom: 14 } }, "Club applications awaiting your review"), pending.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "30px 20px", color: "var(--text-faint)", background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 36, marginBottom: 8 } }, "\u2705"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text-dim)" } }, "No pending applications")), pending.map((club) => {
    const isOpen = selected === club.id;
    return /* @__PURE__ */ React.createElement("div", { key: club.id, style: { background: "var(--surface)", borderRadius: 14, overflow: "hidden", border: "1px solid color-mix(in srgb, var(--warn) 20%, transparent)", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb, var(--warn) 4%, transparent)", borderBottom: "1px solid color-mix(in srgb, var(--warn) 13%, transparent)", padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, background: "color-mix(in srgb, var(--warn) 13%, transparent)", color: "var(--warn)", padding: "2px 8px", borderRadius: 5, fontWeight: 800 } }, "\u23F3 PENDING REVIEW"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "var(--warn)" } }, club.location || "")), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "center", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 44, height: 44, borderRadius: 11, background: (club.logoColor || "var(--primary)") + "22", border: `1px solid ${club.logoColor || "var(--primary)"}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: club.logoColor } }, club.logo), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: "var(--text)", fontSize: 14 } }, club.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", marginTop: 1 } }, "\uD83D\uDCCD ", club.location))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text-dim)", lineHeight: 1.6, marginBottom: 12 } }, club.description), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--sunken)", borderRadius: 10, padding: "12px 14px", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 } }, "Application Details"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 4 } }, [{ l: "Director", v: club.directorName }, { l: "Email", v: club.directorEmail }, { l: "Courts", v: club.courts || 0 }].map((r, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-faint)", width: 60, flexShrink: 0 } }, r.l), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "var(--text-muted)" } }, r.v))))), isOpen ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 } }, "Admin Note (optional)"), /* @__PURE__ */ React.createElement("textarea", { value: noteInput, onChange: (e) => setNoteInput(e.target.value), placeholder: "Add notes about this decision\u2026", style: { width: "100%", background: "var(--sunken)", border: "1.5px solid var(--border)", borderRadius: 9, padding: "10px 12px", color: "var(--text)", fontSize: 12, resize: "none", height: 72, outline: "none", fontFamily: "inherit", marginBottom: 12, boxSizing: "border-box" } }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setSelected(null);
      setNoteInput("");
    }, style: { background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 9, padding: "10px 0", fontSize: 11, fontWeight: 700, color: "var(--text-faint)", cursor: "pointer", fontFamily: "inherit" } }, "Cancel"), /* @__PURE__ */ React.createElement("button", { onClick: () => reject(club.id), style: { background: "color-mix(in srgb, var(--danger) 7%, transparent)", border: "1.5px solid color-mix(in srgb, var(--danger) 20%, transparent)", borderRadius: 9, padding: "10px 0", fontSize: 11, fontWeight: 700, color: "var(--danger)", cursor: "pointer", fontFamily: "inherit" } }, "\u2715 Reject"), /* @__PURE__ */ React.createElement("button", { onClick: () => approve(club.id), style: { background: "linear-gradient(135deg,var(--success),#16a34a)", color: "#fff", border: "none", borderRadius: 9, padding: "10px 0", fontSize: 11, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" } }, "\u2713 Approve"))) : /* @__PURE__ */ React.createElement("button", { onClick: () => setSelected(club.id), style: { width: "100%", background: "color-mix(in srgb, var(--warn) 7%, transparent)", border: "1.5px solid color-mix(in srgb, var(--warn) 20%, transparent)", borderRadius: 10, padding: 11, fontSize: 12, fontWeight: 700, color: "var(--warn)", cursor: "pointer", fontFamily: "inherit" } }, "Review Application \u2192")));
  }), /* @__PURE__ */ React.createElement(MatchOversight, { matches, setMatches, profiles: profiles2 }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 20, letterSpacing: 3, color: "var(--text)", marginTop: 24, marginBottom: 12 } }, "VERIFIED CLUBS"), verified.map((club) => { const memberCount = profiles2.filter((p) => String(p.clubId) === String(club.id) || String(p.club_id) === String(club.id)).length; return /* @__PURE__ */ React.createElement("div", { key: club.id, style: { background: "var(--surface)", borderRadius: 12, padding: "12px 16px", marginBottom: 8, border: "1px solid color-mix(in srgb, var(--success) 13%, transparent)", display: "flex", gap: 12, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 38, height: 38, borderRadius: 9, background: club.logoColor + "22", border: `1px solid ${club.logoColor}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: club.logoColor || "var(--primary)" } }, club.logo), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: "var(--text)", fontSize: 13 } }, club.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)", marginTop: 1 } }, "\uD83D\uDCCD ", club.location, " \xB7 \uD83D\uDC65 ", memberCount)), /* @__PURE__ */ React.createElement(StatusPill, { status: "verified" })); }));
}
