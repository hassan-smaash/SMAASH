function calcPlacementRating(answers) {
  let score = 0;
  const yearsMap = { "0": 0, "1": 5, "2-3": 12, "4-6": 20, "7-10": 26, "10+": 30 };
  score += yearsMap[answers.years] || 0;
  const tourneyMap = { never: 0, once: 6, "few": 12, regularly: 20 };
  score += tourneyMap[answers.tournaments] || 0;
  const rallyMap = { struggle: 0, "10-15": 5, "20-30": 10, "30+": 15 };
  score += rallyMap[answers.rally] || 0;
  const shotsMap = { basic: 0, some: 7, most: 14, all: 20 };
  score += shotsMap[answers.shots] || 0;
  const selfMap = { beginner: 0, intermediate: 5, advanced: 10, competitive: 15 };
  score += selfMap[answers.self] || 0;
  const ratio = Math.min(score, 100) / 100;
  const display = 2.5 + ratio * 1;
  return Math.round(display * 1e3) / 1e3;
}
function displayToGlicko(displayRating) {
  return Math.round((displayRating - 2) / 6 * 2400 + 100);
}
function PlacementQuiz({ onComplete }) {
  var _a;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [clubPick, setClubPick] = useState(null);
  const questions = [
    {
      id: "years",
      question: "How many years have you been playing badminton?",
      emoji: "📅",
      options: [
        { value: "0", label: "Just starting out" },
        { value: "1", label: "About 1 year" },
        { value: "2-3", label: "2\u20133 years" },
        { value: "4-6", label: "4\u20136 years" },
        { value: "7-10", label: "7\u201310 years" },
        { value: "10+", label: "10+ years" }
      ]
    },
    {
      id: "tournaments",
      question: "Have you played in organised tournaments or leagues?",
      emoji: "🏆",
      options: [
        { value: "never", label: "Never \u2014 just casual play" },
        { value: "once", label: "Once or twice" },
        { value: "few", label: "A handful of times" },
        { value: "regularly", label: "Regularly / competitive player" }
      ]
    },
    {
      id: "rally",
      question: "How many shots can you sustain in a rally consistently?",
      emoji: "🏸",
      options: [
        { value: "struggle", label: "Still working on basics" },
        { value: "10-15", label: "10\u201315 shots" },
        { value: "20-30", label: "20\u201330 shots" },
        { value: "30+", label: "30+ shots comfortably" }
      ]
    },
    {
      id: "shots",
      question: "Which shots do you have in your game?",
      emoji: "\u26A1",
      options: [
        { value: "basic", label: "Basic clears and smashes" },
        { value: "some", label: "Drops, lifts, basic net play" },
        { value: "most", label: "Most shots including deceptive play" },
        { value: "all", label: "Full repertoire \u2014 drives, slices, spins" }
      ]
    },
    {
      id: "self",
      question: "Honestly, how would you rate your own level?",
      emoji: "🎯",
      options: [
        { value: "beginner", label: "Beginner \u2014 learning the game" },
        { value: "intermediate", label: "Intermediate \u2014 can hold my own" },
        { value: "advanced", label: "Advanced \u2014 beat most club players" },
        { value: "competitive", label: "Competitive \u2014 played at high level" }
      ]
    }
  ];
  const currentQ = questions[step];
  const totalSteps = questions.length;
  const progress = step / totalSteps * 100;
  const selectAnswer = (value) => {
    const newAnswers = __spreadProps(__spreadValues({}, answers), { [currentQ.id]: value });
    setAnswers(newAnswers);
    if (step < totalSteps - 1) {
      setTimeout(() => setStep((s) => s + 1), 280);
    } else {
      const rating = calcPlacementRating(newAnswers);
      setResult(rating);
    }
  };
  if (result !== null) {
    const glicko = displayToGlicko(result);
    const descriptor = result >= 3.3 ? "Experienced player \u2014 strong foundation" : result >= 2.9 ? "Developing player \u2014 solid basics" : "New to competitive play \u2014 plenty of room to grow";
    return /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans','Segoe UI',sans-serif", padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: 400 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 32 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 52, letterSpacing: 4, color: "var(--text)", lineHeight: 1 } }, "SMAASH")), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 20, padding: 28, border: "1px solid var(--border)", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 40, marginBottom: 12 } }, "🎯"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 6 } }, "Your Starting Rating"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 72, fontWeight: 900, color: "var(--primary)", fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 2, lineHeight: 1, marginBottom: 8 } }, result.toFixed(3).replace(",", ".")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text-dim)", marginBottom: 20, lineHeight: 1.7 } }, descriptor), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--sunken)", borderRadius: 12, padding: "14px 16px", marginBottom: 20, textAlign: "left" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-faint)", textTransform: "uppercase", marginBottom: 10 } }, "What this means"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)", lineHeight: 1.8 } }, "Your rating will adjust automatically after each confirmed match. Win against stronger players and it climbs fast. The more you play, the more accurate it becomes.")), /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb, var(--primary) 4%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 13%, transparent)", borderRadius: 10, padding: "10px 14px", marginBottom: 20, fontSize: 11, color: "var(--primary)", lineHeight: 1.7 } }, "Play 5 matches to unlock the leaderboard and get your Verified rating."), !clubPick ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--text)", marginBottom: 10 } }, "Which club are you with?"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 } }, (window._smaashClubs && window._smaashClubs.length > 0 ? window._smaashClubs : INIT_CLUBS).filter((c) => c.status === "verified").map((c) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: c.id,
        onClick: () => setClubPick(c.id),
        style: { background: "var(--sunken)", border: "1.5px solid var(--border)", borderRadius: 11, padding: "12px 14px", cursor: "pointer", fontFamily: "inherit", display: "flex", gap: 12, alignItems: "center", textAlign: "left", transition: "all 0.15s" },
        onMouseOver: (e) => {
          e.currentTarget.style.borderColor = "color-mix(in srgb, var(--primary) 33%, transparent)";
          e.currentTarget.style.background = "color-mix(in srgb, var(--primary) 3%, transparent)";
        },
        onMouseOut: (e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.background = "var(--sunken)";
        }
      },
      /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: 9, background: c.logoColor + "22", border: `1px solid ${c.logoColor}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: c.logoColor, flexShrink: 0 } }, c.logo),
      /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--text)" } }, c.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", marginTop: 2 } }, "📍 ", c.location))
    )), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setClubPick("none"),
        style: { background: "var(--sunken)", border: "1.5px dashed var(--border-strong)", borderRadius: 11, padding: "12px 14px", cursor: "pointer", fontFamily: "inherit", fontSize: 12, color: "var(--text-faint)", fontWeight: 600 }
      },
      "Not affiliated with a club yet"
    ))) : /* @__PURE__ */ React.createElement("div", null, clubPick !== "none" && /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb, var(--primary) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)", borderRadius: 10, padding: "10px 14px", marginBottom: 12, display: "flex", gap: 10, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16 } }, "🏛"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--primary)" } }, (_a = (window._smaashClubs || INIT_CLUBS).find((c) => c.id === clubPick)) == null ? void 0 : _a.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", marginTop: 1 } }, "Your join request will be sent to the Club Director")), /* @__PURE__ */ React.createElement("button", { onClick: () => setClubPick(null), style: { marginLeft: "auto", background: "none", border: "none", color: "var(--text-faint)", cursor: "pointer", fontSize: 12 } }, "\u2715")), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => onComplete(result, glicko, clubPick !== "none" ? clubPick : null),
        style: { width: "100%", background: "linear-gradient(135deg,var(--primary),var(--primary-deep))", color: "var(--bg)", border: "none", borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }
      },
      "Let's Play \u2192"
    )))));
  }
  return /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans','Segoe UI',sans-serif", padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: 400 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 28 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 36, letterSpacing: 4, color: "var(--text)", lineHeight: 1 } }, "SMAASH"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text-faint)", letterSpacing: 2, marginTop: 4, textTransform: "uppercase" } }, "Quick Rating Placement")), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--text-faint)" } }, "Question ", step + 1, " of ", totalSteps), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: "var(--primary)", fontWeight: 700 } }, Math.round((step + 1) / totalSteps * 100), "%")), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--border)", borderRadius: 4, height: 4 } }, /* @__PURE__ */ React.createElement("div", { style: { width: `${(step + 1) / totalSteps * 100}%`, height: "100%", background: "linear-gradient(90deg,var(--primary),var(--primary-deep))", borderRadius: 4, transition: "width 0.4s ease" } }))), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 16, padding: 24, border: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 36, marginBottom: 10 } }, currentQ.emoji), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: "var(--text)", lineHeight: 1.5 } }, currentQ.question)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, currentQ.options.map((opt) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: opt.value,
      onClick: () => selectAnswer(opt.value),
      style: { background: answers[currentQ.id] === opt.value ? "color-mix(in srgb, var(--primary) 13%, transparent)" : "var(--sunken)", border: `1.5px solid ${answers[currentQ.id] === opt.value ? "color-mix(in srgb, var(--primary) 33%, transparent)" : "var(--border)"}`, borderRadius: 11, padding: "13px 16px", cursor: "pointer", textAlign: "left", fontFamily: "inherit", fontSize: 13, fontWeight: 600, color: answers[currentQ.id] === opt.value ? "var(--primary)" : "var(--text-muted)", transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "space-between" }
    },
    opt.label,
    answers[currentQ.id] === opt.value && /* @__PURE__ */ React.createElement("span", { style: { color: "var(--primary)" } }, "\u2713")
  )))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginTop: 16 } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setResult(3);
      },
      style: { background: "none", border: "none", fontSize: 11, color: "var(--border-strong)", cursor: "pointer", fontFamily: "inherit" }
    },
    "Skip questionnaire \u2014 start at 3.000"
  ))));
}
function ResetPasswordScreen({ onDone }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const submit = async () => {
    setError(null); setSuccess(null);
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (password !== confirm) { setError("Passwords don't match"); return; }
    setLoading(true);
    try {
      const { error: err } = await smaashDB.auth.updateUser({ password });
      if (err) setError(err.message);
      else {
        setSuccess("Password updated! Redirecting to sign in...");
        setTimeout(() => { 
          window.location.replace(window.location.origin + "/"); 
        }, 1500);
      }
    } catch (e) {
      setError("Network error \u2014 " + e.message);
    }
    setLoading(false);
  };
  const inp = { width: "100%", background: "var(--sunken)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 14px", color: "var(--text)", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" };
  return /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans','Segoe UI',sans-serif", padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: 400 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 32 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 52, letterSpacing: 4, color: "var(--text)", lineHeight: 1 } }, "SMAASH"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--primary)", letterSpacing: 3, marginTop: 6, textTransform: "uppercase", fontWeight: 700 } }, "Reset Password")), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 16, padding: 24, border: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)", marginBottom: 16, lineHeight: 1.6 } }, "Enter a new password for your account."), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 6 } }, "New Password"), /* @__PURE__ */ React.createElement("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Min 6 characters", style: inp })), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 6 } }, "Confirm Password"), /* @__PURE__ */ React.createElement("input", { type: "password", value: confirm, onChange: (e) => setConfirm(e.target.value), placeholder: "Re-enter password", style: inp })), error && /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb, var(--danger) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--danger) 20%, transparent)", borderRadius: 9, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: "var(--danger)" } }, error), success && /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb, var(--success) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--success) 20%, transparent)", borderRadius: 9, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: "var(--success)" } }, success), /* @__PURE__ */ React.createElement("button", { onClick: submit, disabled: loading || !password || !confirm, style: { width: "100%", background: loading || !password || !confirm ? "var(--border)" : "linear-gradient(135deg,var(--primary),var(--primary-deep))", color: loading || !password || !confirm ? "var(--border-strong)" : "var(--bg)", border: "none", borderRadius: 10, padding: "13px", fontSize: 13, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", cursor: loading || !password || !confirm ? "not-allowed" : "pointer", fontFamily: "inherit" } }, loading ? "Please wait..." : "Update Password"))));
}
function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [showGlicko, setShowGlicko2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [forgotMode, setForgotMode] = useState(false);
  const sendReset = async () => {
    if (!email) { setError("Enter your email first"); return; }
    setLoading(true); setError(null); setSuccess(null);
    try {
      const redirectTo = window.location.origin + "/?reset=1";
      const { error: err } = await smaashDB.auth.resetPasswordForEmail(email, { redirectTo });
      if (err) setError(err.message);
      else setSuccess("Password reset email sent! Check your inbox.");
    } catch (e) {
      setError("Network error \u2014 " + e.message);
    }
    setLoading(false);
  };
  const submit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (mode === "signin") {
        const { data, error: error2 } = await smaashDB.auth.signInWithPassword({ email, password });
        if (error2) {
          setError(error2.message);
          setLoading(false);
          return;
        }
        if (!data || !data.user) {
          setError("Sign in failed \u2014 no user returned. Check your credentials.");
          setLoading(false);
          return;
        }
        // Check if this user has already completed the placement quiz.
        // Fresh users have default rating 533 and no matches — show quiz.
        let needsQuiz = false;
        try {
          const tok = smaashDB.auth.getToken();
          const resp = await fetch(
            "https://yqqezxyayndzmqahguac.supabase.co/rest/v1/profiles?id=eq." + data.user.id + "&select=doubles_rating,singles_rating,placement_completed",
            { headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok } }
          );
          const arr = await resp.json();
          if (Array.isArray(arr) && arr.length > 0) {
            const p = arr[0];
            // Flag as needing quiz if placement_completed is false/null AND rating is still default
            if (!p.placement_completed && (p.doubles_rating === 533 || p.doubles_rating === null)) {
              needsQuiz = true;
            }
          } else {
            needsQuiz = true;  // no profile row yet
          }
        } catch (e) { /* silent fallback */ }
        onAuth(data.user, needsQuiz);
      } else {
        const { data, error: error2 } = await smaashDB.auth.signUp({ email, password, options: { data: { full_name: name, location } } });
        if (error2) {
          setError(error2.message);
          setLoading(false);
          return;
        }
        if (data && data.user && data.user.id) {
          // If signUp returned an access_token, user is already signed in (email confirm OFF)
          if (data.access_token) {
            const { data: signInData } = await smaashDB.auth.signInWithPassword({ email, password });
            if (signInData && signInData.user) {
              onAuth(signInData.user, true);
            } else {
              onAuth(data.user, true);
            }
          } else {
            // Email confirmation is ON — user must verify before signing in
            setSuccess("Account created! Please check your email (including spam folder) and click the confirmation link to activate your account. Then come back here to sign in.");
            setMode("signin");
            setPassword("");
          }
        } else {
          setSuccess("Account created! Please check your email to confirm, then sign in.");
          setMode("signin");
          setPassword("");
        }
      }
    } catch (e) {
      setError("Network error \u2014 " + e.message + ". Check your connection.");
    }
    setLoading(false);
  };
  const inp = { width: "100%", background: "var(--sunken)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 14px", color: "var(--text)", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" };
  return /* @__PURE__ */ React.createElement("div", { onClick: () => setShowGlicko2(false), style: { minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans','Segoe UI',sans-serif", padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: 400 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 32 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 52, letterSpacing: 4, color: "var(--text)", lineHeight: 1 } }, "SMAASH"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--primary)", letterSpacing: 3, marginTop: 6, textTransform: "uppercase", fontWeight: 700 } }, "Global Badminton Rating Platform"), /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { fontSize: 12, color: "var(--text-dim)", marginTop: 12, lineHeight: 1.75, textAlign: "center" },
      onClick: () => setShowGlicko2(false)
    },
    "Know exactly where you stand. SMAASH rates every player using the world-renowned\xA0",
    /* @__PURE__ */ React.createElement("span", { style: { position: "relative", display: "inline-block" } }, /* @__PURE__ */ React.createElement(
      "span",
      {
        style: { color: "var(--purple)", fontWeight: 700, cursor: "pointer", borderBottom: "1px dashed color-mix(in srgb, var(--purple) 33%, transparent)" },
        onClick: (e) => {
          e.stopPropagation();
          setShowGlicko2((g) => !g);
        }
      },
      "Glicko-2 algorithm"
    ), showGlicko && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: "50%", transform: "translateX(-50%)", top: "calc(100% + 8px)", width: 260, background: "var(--surface)", border: "1px solid color-mix(in srgb, var(--purple) 27%, transparent)", borderRadius: 12, padding: "12px 14px", zIndex: 100, textAlign: "left", boxShadow: "0 8px 32px #00000088" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "var(--purple)", marginBottom: 6, letterSpacing: 1 } }, "GLICKO-2 ALGORITHM"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)", lineHeight: 1.7 } }, "Improves on Elo by tracking ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--text)", fontWeight: 700 } }, "Rating Deviation"), " (confidence in your rating) and ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--text)", fontWeight: 700 } }, "volatility"), " (how consistent your results are)."), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", marginTop: 8, lineHeight: 1.6 } }, "Used in video games (CS:GO, Splatoon 2), chess platforms (Lichess), and team sport athlete rankings worldwide (e.g. Pickleball, Volleyball)."), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", marginTop: 8, borderTop: "1px solid var(--border)", paddingTop: 8 } }, "Tap anywhere to close"))),
    " \u2014 accounting for wins, score margin, and quality of opponents. Your rating updates live after every match."
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "center", gap: 20, marginTop: 12, marginBottom: 4 } }, [["🏆", "Opponent Strength"], ["📊", "Score Margin"], ["🌐", "Inter-Club Bonus"]].map(([icon, label]) => /* @__PURE__ */ React.createElement("div", { key: label, style: { fontSize: 10, color: "var(--text-faint)", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, marginBottom: 2 } }, icon), label)))), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--surface)", borderRadius: 16, padding: 24, border: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", marginBottom: 20, background: "var(--sunken)", borderRadius: 10, padding: 3 } }, ["signin", "signup"].map((m) => /* @__PURE__ */ React.createElement("button", { key: m, onClick: () => setMode(m), style: { flex: 1, background: mode === m ? "var(--border)" : "none", border: "none", borderRadius: 8, padding: "9px 0", fontSize: 11, fontWeight: 700, color: mode === m ? "var(--text)" : "var(--text-faint)", cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 1 } }, m === "signin" ? "Sign In" : "Create Account"))), mode === "signup" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 6 } }, "Full Name"), /* @__PURE__ */ React.createElement("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "Your full name", style: inp })), /* @__PURE__ */ React.createElement(CityAutocomplete, { value: location, onChange: setLocation })), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 6 } }, "Email"), /* @__PURE__ */ React.createElement("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com", style: inp })), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 6 } }, "Password"), /* @__PURE__ */ React.createElement("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Min 6 characters", style: inp })), error && /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb, var(--danger) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--danger) 20%, transparent)", borderRadius: 9, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: "var(--danger)" } }, error), success && /* @__PURE__ */ React.createElement("div", { style: { background: "color-mix(in srgb, var(--success) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--success) 20%, transparent)", borderRadius: 9, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: "var(--success)" } }, success), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: submit,
      disabled: loading || !email || !password,
      style: { width: "100%", background: loading || !email || !password ? "var(--border)" : "linear-gradient(135deg,var(--primary),var(--primary-deep))", color: loading || !email || !password ? "var(--border-strong)" : "var(--bg)", border: "none", borderRadius: 10, padding: "13px", fontSize: 13, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", cursor: loading || !email || !password ? "not-allowed" : "pointer", fontFamily: "inherit" }
    },
    loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"
  ), mode === "signin" && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginTop: 14 } }, /* @__PURE__ */ React.createElement("button", { onClick: sendReset, disabled: loading, style: { background: "none", border: "none", color: "var(--primary)", fontSize: 11, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", textDecoration: "underline", padding: 0 } }, "Forgot password?")), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginTop: 16, fontSize: 11, color: "var(--border-strong)" } }, "SMAASH \u2014 Pilot Beta \xB7 By invite only"))));
}
const TIERS = [
  { id: 1, label: "Tier 1", sublabel: "Recreational", k: 12, color: "var(--text-muted)", badge: "REC" },
  { id: 2, label: "Tier 2", sublabel: "Club", k: 20, color: "var(--primary)", badge: "CLB" },
  { id: 3, label: "Tier 3", sublabel: "Regional", k: 32, color: "var(--purple)", badge: "REG" },
  { id: 4, label: "Tier 4", sublabel: "National", k: 45, color: "#fb923c", badge: "NAT" },
  { id: 5, label: "Tier 5", sublabel: "Elite", k: 60, color: "var(--warn)", badge: "ELT" }
];
const BADMINTON_FEDERATIONS = {
  // -- CANADA ------------------------------------------------------
  "Canada": {
    national: "Badminton Canada",
    regions: {
      "Ontario": ["Badminton Ontario"],
      "Quebec": ["Badminton Quebec"],
      "British Columbia": ["Badminton BC"],
      "Alberta": ["Badminton Alberta"],
      "Manitoba": ["Badminton Manitoba"],
      "Saskatchewan": ["Badminton Saskatchewan"],
      "Nova Scotia": ["Badminton Nova Scotia"],
      "New Brunswick": ["Badminton New Brunswick"]
    }
  },
  // -- UNITED STATES -----------------------------------------------
  "United States": {
    national: "USA Badminton (USAB)",
    regions: {
      "New York": ["New York Badminton Association"],
      "California": ["Southern California Badminton Association", "NorCal Badminton"],
      "Texas": ["Texas Badminton Association"],
      "Florida": ["Florida Badminton Association"],
      "Illinois": ["Midwest Badminton Federation"],
      "Washington": ["Washington Badminton Association"]
    }
  },
  // -- UNITED KINGDOM ----------------------------------------------
  "United Kingdom": {
    national: "Badminton England / Badminton World Federation",
    regions: {
      "England": ["Badminton England"],
      "Scotland": ["Badminton Scotland"],
      "Wales": ["Badminton Wales"],
      "London": ["Badminton England \u2014 London Region"]
    }
  },
  // -- INDIA --------------------------------------------------------
  "India": {
    national: "Badminton Association of India (BAI)",
    regions: {
      "Maharashtra": ["Maharashtra Badminton Association"],
      "Karnataka": ["Karnataka Badminton Association"],
      "Tamil Nadu": ["Tamil Nadu Badminton Association"],
      "Delhi": ["Delhi Badminton Association"],
      "Telangana": ["Telangana Badminton Association"],
      "Punjab": ["Punjab Badminton Association"]
    }
  },
  // -- PAKISTAN ----------------------------------------------------
  "Pakistan": {
    national: "Badminton Federation of Pakistan (BFP)",
    regions: {
      "Punjab": ["Punjab Badminton Association"],
      "Sindh": ["Sindh Badminton Association"],
      "KPK": ["KPK Badminton Association"],
      "Islamabad": ["Islamabad Badminton Association"]
    }
  },
  // -- MALAYSIA ----------------------------------------------------
  "Malaysia": {
    national: "Badminton Association of Malaysia (BAM)",
    regions: {
      "Selangor": ["Selangor Badminton Association"],
      "Kuala Lumpur": ["KL Badminton Association"],
      "Johor": ["Johor Badminton Association"],
      "Penang": ["Penang Badminton Association"],
      "Sabah": ["Sabah Badminton Association"]
    }
  },
  // -- INDONESIA ---------------------------------------------------
  "Indonesia": {
    national: "Persatuan Bulutangkis Seluruh Indonesia (PBSI)",
    regions: {}
  },
  // -- CHINA -------------------------------------------------------
  "China": {
    national: "Badminton Association of China (BAC) / Chinese Badminton Association",
    regions: {}
  },
  // -- SINGAPORE ---------------------------------------------------
  "Singapore": {
    national: "Singapore Badminton Association (SBA)",
    regions: {}
  },
  // -- AUSTRALIA ---------------------------------------------------
  "Australia": {
    national: "Badminton Australia",
    regions: {
      "New South Wales": ["Badminton NSW"],
      "Victoria": ["Badminton Victoria"],
      "Queensland": ["Badminton Queensland"],
      "Western Australia": ["Badminton WA"],
      "South Australia": ["Badminton SA"],
      "Sydney": ["Badminton NSW"]
    }
  },
  // -- UAE / DUBAI -------------------------------------------------
  "UAE": {
    national: "UAE Badminton Federation",
    regions: {
      "Dubai": ["Dubai Sports Council \u2014 Badminton"],
      "Abu Dhabi": ["Abu Dhabi Badminton Association"]
    }
  },
  // -- SOUTH AFRICA ------------------------------------------------
  "South Africa": {
    national: "Badminton South Africa",
    regions: {
      "Western Cape": ["Western Province Badminton"],
      "Gauteng": ["Gauteng Badminton"]
    }
  },
  // -- DENMARK -----------------------------------------------------
  "Denmark": {
    national: "Badminton Danmark",
    regions: {}
  },
  // -- GERMANY -----------------------------------------------------
  "Germany": {
    national: "Deutscher Badminton-Verband (DBV)",
    regions: {}
  },
  // -- FRANCE ------------------------------------------------------
  "France": {
    national: "F\xE9d\xE9ration Fran\xE7aise de Badminton (FFBad)",
    regions: {}
  },
  // -- JAPAN -------------------------------------------------------
  "Japan": {
    national: "Badminton Association of Japan (BAJ)",
    regions: {}
  },
  // -- SOUTH KOREA -------------------------------------------------
  "South Korea": {
    national: "Badminton Korea Association (BKA)",
    regions: {}
  },
  // -- THAILAND ----------------------------------------------------
  "Thailand": {
    national: "Badminton Association of Thailand (BAT)",
    regions: {}
  },
  // -- SPAIN -------------------------------------------------------
  "Spain": {
    national: "Federaci\xF3n Espa\xF1ola de B\xE1dminton (FESBA)",
    regions: {
      "Madrid": ["Federaci\xF3n Madrile\xF1a de B\xE1dminton"],
      "Catalunya": ["Federaci\xF3 Catalana de B\xE1dminton"],
      "Andaluc\xEDa": ["Federaci\xF3n Andaluza de B\xE1dminton"]
    }
  },
  // -- IRELAND -----------------------------------------------------
  "Ireland": {
    national: "Badminton Ireland",
    regions: {}
  }
};
function getFederationsForLocation(location) {
  if (!location) return ["your national badminton federation", "your regional body"];
  const loc = location.toLowerCase();
  for (const [country, data] of Object.entries(BADMINTON_FEDERATIONS)) {
    if (loc.includes(country.toLowerCase())) {
      const bodies = [data.national];
      for (const [region, orgs] of Object.entries(data.regions)) {
        if (loc.includes(region.toLowerCase())) bodies.push(...orgs);
      }
      return [...new Set(bodies)];
    }
  }
  for (const [country, data] of Object.entries(BADMINTON_FEDERATIONS)) {
    for (const [region, orgs] of Object.entries(data.regions)) {
      if (loc.includes(region.toLowerCase())) {
        return [data.national, ...orgs];
      }
    }
  }
  return ["your national badminton federation"];
}
const TIER_ACCESS = {
  player: [1],
  club_director: [1, 2],
  tournament_director: [1, 2, 3],
  admin: [1, 2, 3, 4]
};
function getTierLockedReason(tierId, playerLocation) {
  if (tierId === 2) return "Club Directors only \u2014 submitted in bulk, auto-confirmed";
  if (tierId === 3) return "Tournament Directors only \u2014 requires approved TD status";
  if (tierId === 4) {
    const feds = getFederationsForLocation(playerLocation);
    if (feds.length === 1) return `Reserved for ${feds[0]} sanctioned events`;
    return `Reserved for ${feds[0]} and ${feds.slice(1).join(" / ")} sanctioned events`;
  }
  if (tierId === 5) return "Frozen \u2014 Phase 3 BWF auto-sync only";
  return "Locked";
}
const BASE_PLAYERS = [];
const DEFAULT_USER = {
  id: "me",
  name: "You",
  email: "",
  avatar: "ME",
  rating: 500,
  doublesRating: 500,
  accuracy: 0,
  tier: 1,
  matches: 0,
  wins: 0,
  provisional: true,
  dob: null,
  gender: null,
  location: "Mississauga, Canada",
  bio: "",
  clubId: 1,
  photo: null
};
const INIT_CLUBS = [
  { id: 1, name: "ICCO Badminton", status: "verified", location: "Mississauga, Ontario, Canada", logo: "ICCO", logoColor: "var(--primary)", directorName: "Hassan Muhammad", directorEmail: "hassan.ut@gmail.com", directorPhone: "", memberCount: 0, tierBreakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, courts: 4, courtSurface: "Synthetic", facilities: ["Changing Rooms", "Prayer Space"], founded: "2026", description: "ICCO mosque badminton club \u2014 Mississauga, ON. Pilot Club #1 for SMAASH.", joinRequests: [], adminNote: "Pilot Club #1" },
  { id: 2, name: "MNN Badminton", status: "pending", location: "Mississauga, Ontario, Canada", logo: "MNN", logoColor: "var(--purple)", directorName: "TBD", directorEmail: "", directorPhone: "", memberCount: 0, tierBreakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, courts: 0, courtSurface: "", facilities: [], founded: "2026", description: "MNN badminton club \u2014 Mississauga. Pilot Club #2.", joinRequests: [], adminNote: "Pending approval" },
  { id: 3, name: "TSC Badminton", status: "pending", location: "Ontario, Canada", logo: "TSC", logoColor: "var(--warn)", directorName: "TBD", directorEmail: "", directorPhone: "", memberCount: 0, tierBreakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, courts: 0, courtSurface: "", facilities: [], founded: "2026", description: "TSC badminton club. Pilot Club #3.", joinRequests: [], adminNote: "Pending approval" },
  { id: 4, name: "BIC Badminton", status: "pending", location: "Ontario, Canada", logo: "BIC", logoColor: "var(--success)", directorName: "TBD", directorEmail: "", directorPhone: "", memberCount: 0, tierBreakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, courts: 0, courtSurface: "", facilities: [], founded: "2026", description: "BIC badminton club. Pilot Club #4.", joinRequests: [], adminNote: "Pending approval" }
];
const MOCK_MATCHES = [];
const MOCK_NOTIFICATIONS = [];
const MOCK_FEED = [];
const MOCK_CHALLENGES = [];
const MOCK_EVENTS = [];
function isValidBadmintonScore(a, b) {
  const na = Number(a), nb = Number(b);
  if (isNaN(na) || isNaN(nb) || na < 0 || nb < 0) return { valid: false, error: "Scores must be 0 or higher" };
  if (na === nb) return { valid: false, error: "A set can't end in a tie" };
  const hi = Math.max(na, nb), lo = Math.min(na, nb);
  if (hi > 30) return { valid: false, error: "Max score is 30" };
  if (hi < 21) return { valid: false, error: "Winner must reach at least 21" };
  // At 30, loser must have at least 28 (win by 2, max 30-28 or 30-29)
  if (hi === 30 && lo < 28) return { valid: false, error: "At 30, score must be 30-28 or 30-29" };
  // In deuce (21+), must win by 2 unless at 30
  if (hi < 30 && hi > 21 && hi - lo !== 2) return { valid: false, error: "Must win by 2 in deuce (e.g. 22-20, 23-21)" };
  if (hi === 21 && lo === 20) return { valid: false, error: "21-20 is invalid — must play deuce (22-20 etc.)" };
  return { valid: true, error: null };
}
