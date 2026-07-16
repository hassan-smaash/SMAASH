async function seedClubsToSupabase() {
  return;
}
function useClubs(userId) {
  const [clubs, setClubs] = useState([]);
  const fetchClubs = () => {
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/clubs?select=*&order=name", {
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + SUPABASE_ANON_KEY }
    }).then((r) => {
      if (!r.ok) {
        console.log("Clubs fetch error:", r.status);
        return null;
      }
      return r.json();
    }).then((data) => {
      if (!data) return;
      if (Array.isArray(data) && data.length > 0) {
        setClubs(data.map((c) => {
          var _a;
          return {
            id: c.id,
            name: c.name,
            status: c.status,
            location: c.location || "",
            logo: c.logo_initials || c.logo || ((_a = c.name) == null ? void 0 : _a.slice(0, 4)) || "CLUB",
            logoColor: c.logo_color || "var(--primary)",
            directorName: c.director_name || "",
            directorEmail: c.director_email || "",
            courts: c.courts || 0,
            courtSurface: c.court_surface || "",
            facilities: c.facilities || [],
            founded: c.founded || "",
            description: c.description || "",
            memberCount: c.member_count || 0,
            joinRequests: [],
            adminNote: "",
            join_code: c.join_code || null,
            is_private: c.is_private || false,
            join_pin: c.join_pin || null,
            announcement: c.announcement || null,
            director_id: c.director_id || null
          };
        }));
      }
    }).catch(() => {
    });
  };
  useEffect(() => {
    fetchClubs();
  }, [userId]);
  return { clubs, refetch: fetchClubs };
}
function useProfiles(userId) {
  const [profiles2, setProfiles] = useState([]);
  const profilesLoaded = useRef(false);
  const fetchProfiles = () => {
    const tok = smaashDB.auth.getToken() || SUPABASE_ANON_KEY;
    console.log("Fetching profiles, token:", tok ? "present" : "missing", "userId:", userId);
    fetch(
      "https://yqqezxyayndzmqahguac.supabase.co/rest/v1/profiles?select=id,full_name,role,singles_rating,doubles_rating,doubles_rd,doubles_volatility,singles_rd,singles_accuracy,tier,club_id,is_provisional,plays_singles,location,bio,avatar_url,email_notifications&order=doubles_rating.desc&limit=200",
      { headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok } }
    ).then((r) => r.json()).then((data) => {
      console.log("Profiles response:", Array.isArray(data) ? data.length + " players" : data);
      if (Array.isArray(data) && data.length > 0) {
        profilesLoaded.current = true;
        setProfiles(data.map((p) => ({
          id: p.id,
          name: p.full_name || "Unknown",
          role: p.role || "player",
          avatar: (p.full_name || "?").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
          rating: p.singles_rating || 500,
          doublesRating: p.doubles_rating || 500,
          photo: p.avatar_url || null,
          accuracy: p.doubles_accuracy || 0,
          rd: p.doubles_rd || 350,
          volatility: p.doubles_volatility || 0.06,
          reliability: (() => {
            const rd = p.doubles_rd || 350;
            if (rd < 150) return "Verified";
            if (rd < 300) return "Developing";
            return "Provisional";
          })(),
          tier: p.tier || 1,
          clubId: p.club_id,
          provisional: (p.doubles_rd || 350) >= 300,
          matches: 0,
          location: p.location || "",
          bio: p.bio || "",
          photo: p.avatar_url || null,
          playsSingles: p.plays_singles === true,
          emailNotifications: p.email_notifications !== false
        })));
      }
    }).catch((e) => console.error("Profiles fetch error:", e));
  };
  useEffect(() => {
    if (!userId) return;
    profilesLoaded.current = false;
    fetchProfiles();
    const t = setTimeout(() => { if (!profilesLoaded.current) fetchProfiles(); }, 1200);
    return () => clearTimeout(t);
  }, [userId]);
  return { profiles: profiles2, refetch: fetchProfiles };
}
function useMatches(userId) {
  const [matches, setMatches] = useState([]);
  const matchesLoaded = useRef(false);
  const fetchMatches = () => {
    const tok = smaashDB.auth.getToken() || SUPABASE_ANON_KEY;
    fetch(
      "https://yqqezxyayndzmqahguac.supabase.co/rest/v1/matches?select=id,player_a_id,player_b_id,partner_a_id,partner_b_id,tier,match_type,sets,sets_won_a,sets_won_b,winner_side,status,played_at,submitted_at,rating_change_a,rating_change_b,rating_change_pa,rating_change_parta,rating_change_pb,rating_change_partb&order=submitted_at.desc&limit=200",
      { headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok } }
    ).then((r) => r.json()).then((data) => {
      if (Array.isArray(data)) { matchesLoaded.current = true; setMatches(data); }
    }).catch((e) => console.error("Matches fetch error:", e));
  };
  useEffect(() => {
    if (!userId) return;
    matchesLoaded.current = false;
    fetchMatches();
    const t = setTimeout(() => { if (!matchesLoaded.current) fetchMatches(); }, 1200);
    return () => clearTimeout(t);
  }, [userId]);
  return { matches, refetch: fetchMatches };
}
const SCREEN_PATHS = {
  submit: "/play",
  leaderboard: "/ranks",
  feed: "/community",
  notifs_nav: "/alerts",
  more: "/more",
  portal: "/me",
  admin: "/admin"
};
const PATH_SCREENS = Object.fromEntries(Object.entries(SCREEN_PATHS).map(([s, p]) => [p, s]));
function screenToPath(screen2) { return SCREEN_PATHS[screen2] || "/play"; }
function pathToScreen(pathname) {
  const clean = (pathname || "/").replace(/\/+$/, "") || "/";
  return PATH_SCREENS[clean] || "submit";
}
function SMAASHApp() {
  const [screen, setScreenRaw] = useState(() => typeof window !== "undefined" ? pathToScreen(window.location.pathname) : "submit");
  const setScreen = useCallback((target) => {
    if (typeof target === "function") { setScreenRaw(target); return; }
    setScreenRaw(target);
    try { sessionStorage.removeItem("smaash_more_sub"); sessionStorage.removeItem("smaash_tourn"); } catch (e) {}
    const path = screenToPath(target);
    if (typeof window !== "undefined" && window.location.pathname !== path) {
      window.history.pushState({ screen: target }, "", path);
    }
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const initialPath = screenToPath(screen);
    if (window.location.pathname !== initialPath && !window.location.search && !window.location.hash && window.location.pathname.indexOf("/t/") !== 0) {
      window.history.replaceState({ screen }, "", initialPath);
    }
    const onPop = () => setScreenRaw(pathToScreen(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const [clubs, setClubs] = useState(INIT_CLUBS);
  const [appRole, setAppRole] = useState("player");
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [needsPlacement, setNeedsPlacement] = useState(false);
  const [startingRating, setStartingRating] = useState(null);
  const [unreadNotifs, setUnreadNotifs] = useState(0);
  const [focusMatchId, setFocusMatchId] = useState(() => {
    try { return new URLSearchParams(window.location.search).get("match"); } catch (e) { return null; }
  });
  const { profiles: profiles2, refetch: refetchProfiles } = useProfiles(currentUser == null ? void 0 : currentUser.id);
  const { matches, refetch: refetchMatches } = useMatches(currentUser == null ? void 0 : currentUser.id);
  const { clubs: dbClubs, refetch: refetchClubs } = useClubs(currentUser == null ? void 0 : currentUser.id);
  useEffect(() => {
    if (dbClubs.length > 0) window._smaashClubs = dbClubs;
  }, [dbClubs]);
  useEffect(() => {
    const uid = currentUser == null ? void 0 : currentUser.id;
    if (!uid) return;
    const fetchCount = () => {
      const tok = smaashDB.auth.getToken() || SUPABASE_ANON_KEY;
      fetch(`https://yqqezxyayndzmqahguac.supabase.co/rest/v1/notifications?user_id=eq.${uid}&is_read=eq.false&select=id`, {
        headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok }
      }).then((r) => r.json()).then((data) => {
        if (Array.isArray(data)) setUnreadNotifs(data.length);
      }).catch(() => {
      });
    };
    fetchCount();
    if (!smaashRealtime) {
      const interval = setInterval(fetchCount, 3e4);
      return () => clearInterval(interval);
    }
    const tok = smaashDB.auth.getToken();
    if (tok) smaashRealtime.realtime.setAuth(tok);
    let debounce = null;
    const onChange = () => {
      if (debounce) clearTimeout(debounce);
      debounce = setTimeout(fetchCount, 400);
    };
    const channel = smaashRealtime.channel("notif:" + uid).on(
      "postgres_changes",
      { event: "*", schema: "public", table: "notifications", filter: "user_id=eq." + uid },
      onChange
    ).subscribe();
    return () => {
      if (debounce) clearTimeout(debounce);
      smaashRealtime.removeChannel(channel);
    };
  }, [currentUser == null ? void 0 : currentUser.id]);
  useEffect(() => {
    if (!(currentUser == null ? void 0 : currentUser.id)) return;
    seedClubsToSupabase();
  }, [currentUser == null ? void 0 : currentUser.id]);
  useEffect(() => {
    if (!(currentUser == null ? void 0 : currentUser.id)) return;
    let count = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key == null ? void 0 : key.startsWith("smaash_notifs_")) {
        const notifs = JSON.parse(localStorage.getItem(key) || "[]");
        const unread = notifs.filter((n) => n.by !== currentUser.id);
        count += unread.length;
      }
    }
    if (count > 0) setUnreadNotifs(count);
  }, [currentUser == null ? void 0 : currentUser.id]);
  const myProfile = profiles2.find((p) => p.id === (currentUser == null ? void 0 : currentUser.id)) || DEFAULT_USER;
  useEffect(() => {
    if ((currentUser == null ? void 0 : currentUser.id) === "0fb7773b-85ca-4110-ad37-2bdf8bef2be2" && appRole === "player") {
      setAppRole("admin");
    }
  }, [currentUser == null ? void 0 : currentUser.id]);
  useEffect(() => {
    if (!myProfile || !myProfile.role) return;
    if (myProfile.id === "0fb7773b-85ca-4110-ad37-2bdf8bef2be2") return;
    if (myProfile.role === "club_director" && appRole === "player") setAppRole("club_director");
    if (myProfile.role === "admin" && appRole === "player") setAppRole("admin");
  }, [myProfile == null ? void 0 : myProfile.role]);
  const pendingConfirms = matches.filter(
    (m) => m.status === "pending" && [m.player_b_id, m.partner_b_id].includes(currentUser == null ? void 0 : currentUser.id)
  ).length;
  useEffect(() => {
    const timeout = setTimeout(() => setAuthChecked(true), 3000);
    smaashDB.auth.getUser().then(({ data }) => {
      if (data.user) setCurrentUser(data.user);
      setAuthChecked(true);
      clearTimeout(timeout);
    }).catch(() => setAuthChecked(true));
    return () => clearTimeout(timeout);
  }, []);
  const addMatch = () => {
    refetchMatches();
    setTimeout(() => refetchProfiles(), 1500);
  };
  if (typeof window !== "undefined" && window.location.pathname.indexOf("/t/") === 0) {
    return /* @__PURE__ */ React.createElement(PublicTournamentScreen, { slug: decodeURIComponent(window.location.pathname.slice(3)) });
  }
  if (!authChecked) return /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, letterSpacing: 4, color: "var(--primary)", animation: "pulse 1.5s infinite" } }, "SMAASH"));
  if (typeof window !== "undefined" && (window.location.search.includes("reset=1") || window.location.hash.includes("type=recovery"))) {
    return /* @__PURE__ */ React.createElement(ResetPasswordScreen, { onDone: () => { window.history.replaceState({}, "", "/"); } });
  }
  if (!currentUser) return /* @__PURE__ */ React.createElement(AuthScreen, { onAuth: (user, isNew = false) => {
    setCurrentUser(user);
    if (isNew) setNeedsPlacement(true);
  } });
  if (needsPlacement) return /* @__PURE__ */ React.createElement(PlacementQuiz, { onComplete: (displayRating, glickoRating, selectedClubId) => {
    setStartingRating({ display: displayRating, glicko: glickoRating, clubId: selectedClubId });
    const saveRating = (attempt) => {
      const uid = currentUser == null ? void 0 : currentUser.id;
      const tok = smaashDB.auth.getToken();
      const email = (currentUser == null ? void 0 : currentUser.email) || "";
      if (!uid || !tok) {
        if (attempt < 8) setTimeout(() => saveRating(attempt + 1), 1e3 * (attempt + 1));
        return;
      }
      fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/profiles?id=eq." + uid, {
        method: "PATCH",
        headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=representation" },
        body: JSON.stringify(__spreadValues({
          singles_rating: glickoRating,
          doubles_rating: glickoRating,
          singles_rd: 200,
          doubles_rd: 200,
          singles_volatility: 0.06,
          doubles_volatility: 0.06,
          placement_completed: true
        }, selectedClubId ? { club_id: selectedClubId } : {}))
      }).then(async (r) => {
        var _a;
        const body = await r.text();
        console.log("Quiz PATCH:", r.status, body);
        if (r.ok && body !== "[]" && body !== "") {
          console.log("Quiz rating saved via PATCH:", glickoRating);
          if (refetchProfiles) refetchProfiles();
        } else {
          fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/profiles", {
            method: "POST",
            headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "resolution=merge-duplicates,return=minimal" },
            body: JSON.stringify(__spreadValues({
              id: uid,
              email,
              full_name: ((_a = currentUser == null ? void 0 : currentUser.user_metadata) == null ? void 0 : _a.full_name) || "",
              singles_rating: glickoRating,
              doubles_rating: glickoRating,
              singles_rd: 200,
              doubles_rd: 200,
              singles_volatility: 0.06,
              doubles_volatility: 0.06,
              placement_completed: true
            }, selectedClubId ? { club_id: selectedClubId } : {}))
          }).then((r2) => {
            console.log("Quiz POST:", r2.status, "glicko:", glickoRating);
            if (!r2.ok && attempt < 5) setTimeout(() => saveRating(attempt + 1), 2e3);
            else if (refetchProfiles) refetchProfiles();
          });
        }
      }).catch(() => {
        if (attempt < 5) setTimeout(() => saveRating(attempt + 1), 2e3);
      });
    };
    setTimeout(() => saveRating(0), 2e3);
    setNeedsPlacement(false);
  } });
  if (profiles2.length === 0) return /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, letterSpacing: 4, color: "var(--primary)", animation: "pulse 1.5s infinite" } }, "SMAASH"));
  const screenMap = {
    submit: /* @__PURE__ */ React.createElement(MatchSubmitWrapper, { onSubmit: addMatch, userRole: appRole, currentUser, profiles: profiles2, matches, pendingConfirms, refetchMatches, refetchProfiles }),
    leaderboard: /* @__PURE__ */ React.createElement(LeaderboardScreen, { matches, profiles: profiles2, currentUser, myProfile, clubs }),
    feed: /* @__PURE__ */ React.createElement(SocialFeedScreen, { matches, profiles: profiles2, currentUser, focusMatchId }),
    notifs_nav: /* @__PURE__ */ React.createElement(NotificationsScreen, { matches, currentUser, setScreen, setUnreadNotifs, setFocusMatchId }),
    more: /* @__PURE__ */ React.createElement(MoreScreen, { clubs: dbClubs.length > 0 ? dbClubs : clubs, setClubs, matches, setMatches: null, profiles: profiles2, currentUser, myProfile, appRole, setAppRole, refetchMatches, refetchProfiles }),
    portal: /* @__PURE__ */ React.createElement(PlayerPortal, { clubs: dbClubs.length > 0 ? dbClubs : INIT_CLUBS, appRole, setAppRole, currentUser, myProfile, refetchProfiles }),
    admin: /* @__PURE__ */ React.createElement(MoreScreen, { clubs, setClubs, matches, setMatches: null, profiles: profiles2, currentUser, myProfile, appRole, setAppRole, refetchMatches, refetchProfiles })
  };
  return /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100vh", background: "var(--bg)", fontFamily: "'DM Sans','Segoe UI',sans-serif", color: "var(--text)" } }, /* @__PURE__ */ React.createElement("style", null, css), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 560, margin: "0 auto", padding: "20px 16px 96px" } }, screenMap[screen]), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 640, margin: "0 auto" } }, /* @__PURE__ */ React.createElement(Nav, { screen, setScreen, unreadNotifs, pendingConfirms })));
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(SMAASHApp));
