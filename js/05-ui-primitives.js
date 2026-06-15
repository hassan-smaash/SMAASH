function PhotoModal({ src, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);
  return React.createElement('div', {
    onClick: onClose,
    style: { position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(4px)' }
  }, React.createElement('img', {
    src,
    alt: '',
    onClick: (e) => e.stopPropagation(),
    style: { maxWidth: '100%', maxHeight: '90vh', borderRadius: 16, objectFit: 'contain', boxShadow: '0 24px 64px rgba(0,0,0,0.6)' }
  }), React.createElement('button', {
    onClick: onClose,
    style: { position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 36, height: 36, color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
  }, '×'));
}
function Avatar({ initials, size = 40, color = "var(--primary)", photo = null }) {
  const [expanded, setExpanded] = useState(false);
  if (photo) return React.createElement(React.Fragment, null,
    expanded && React.createElement(PhotoModal, { src: photo, onClose: () => setExpanded(false) }),
    React.createElement("img", { src: photo, alt: "", onClick: () => setExpanded(true), style: { width: size, height: size, borderRadius: "50%", objectFit: "cover", border: `1.5px solid ${color}55`, flexShrink: 0, cursor: "pointer" } })
  );
  return /* @__PURE__ */ React.createElement("div", { style: { width: size, height: size, borderRadius: "50%", background: `linear-gradient(135deg,${color}33,${color}11)`, border: `1.5px solid ${color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.32, fontWeight: 700, color, letterSpacing: 1, flexShrink: 0 } }, initials);
}
function TierBadge({ tier, showLabel = false }) {
  const t = TIERS.find((x) => x.id === tier);
  if (!t) return null;
  if (!showLabel) return /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: t.color, flexShrink: 0, boxShadow: `0 0 4px ${t.color}88` }, title: `Tier ${t.id}` });
  return /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, background: t.color + "22", color: t.color, padding: "2px 7px", borderRadius: 5, fontWeight: 800, letterSpacing: 0.5 } }, "T", t.id);
}
function StatusPill({ status }) {
  const map = {
    pending: { color: "var(--warn)", bg: "color-mix(in srgb, var(--warn) 9%, transparent)", label: "\u23F3 Pending" },
    confirmed: { color: "var(--success)", bg: "color-mix(in srgb, var(--success) 9%, transparent)", label: "\u2713 Confirmed" },
    auto_confirmed: { color: "var(--success)", bg: "color-mix(in srgb, var(--success) 9%, transparent)", label: "\u2713 Confirmed" },
    disputed: { color: "var(--danger)", bg: "color-mix(in srgb, var(--danger) 9%, transparent)", label: "\u26A0 Disputed" },
    verified: { color: "var(--success)", bg: "color-mix(in srgb, var(--success) 9%, transparent)", label: "\u2713 Verified" },
    rejected: { color: "var(--danger)", bg: "color-mix(in srgb, var(--danger) 9%, transparent)", label: "\u2715 Rejected" },
    voided: { color: "var(--text-muted)", bg: "color-mix(in srgb, var(--text-muted) 9%, transparent)", label: "\u2715 Voided" },
    admin_override: { color: "var(--purple)", bg: "color-mix(in srgb, var(--purple) 9%, transparent)", label: "\u2699 Admin Override" }
  };
  const s = map[status] || { color: "var(--warn)", bg: "color-mix(in srgb, var(--warn) 9%, transparent)", label: status };
  return /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, background: s.bg, color: s.color, padding: "3px 8px", borderRadius: 5, fontWeight: 700 } }, s.label);
}
function ScoreDisplay({ sets, colorA = "var(--primary)", colorB = "var(--purple)" }) {
  const sWA = sets.filter((s) => Number(s.a) > Number(s.b)).length, sWB = sets.filter((s) => Number(s.b) > Number(s.a)).length;
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 20, fontWeight: 900, color: sWA > sWB ? colorA : "var(--text-faint)", fontFamily: "'Bebas Neue',sans-serif" } }, sWA), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 3 } }, sets.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i }, /* @__PURE__ */ React.createElement("div", { style: { background: "var(--border)", borderRadius: "3px 3px 0 0", padding: "2px 5px", fontSize: 10, fontWeight: 700, color: Number(s.a) > Number(s.b) ? colorA : "var(--text-faint)" } }, s.a), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--sunken)", borderRadius: "0 0 3px 3px", padding: "2px 5px", fontSize: 10, fontWeight: 700, color: Number(s.b) > Number(s.a) ? colorB : "var(--text-faint)" } }, s.b)))), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 20, fontWeight: 900, color: sWB > sWA ? colorB : "var(--text-faint)", fontFamily: "'Bebas Neue',sans-serif" } }, sWB));
}
function Toast({ msg, color = "var(--success)" }) {
  return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", background: color, color: "var(--bg)", padding: "10px 20px", borderRadius: 10, fontWeight: 700, fontSize: 13, zIndex: 999, boxShadow: "0 8px 24px #00000066", animation: "slideUp 0.3s ease", whiteSpace: "nowrap" } }, msg);
}
function Input({ label, value, onChange, type = "text", placeholder = "", hint = "" }) {
  return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 6 } }, label), /* @__PURE__ */ React.createElement(
    "input",
    {
      type,
      value,
      onChange: (e) => onChange(e.target.value),
      placeholder,
      style: { width: "100%", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 14px", color: "var(--text)", fontSize: 13, outline: "none", fontFamily: "inherit" }
    }
  ), hint && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-faint)", marginTop: 4 } }, hint));
}
function Textarea({ label, value, onChange, placeholder = "", rows = 4 }) {
  return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 6 } }, label), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value,
      onChange: (e) => onChange(e.target.value),
      placeholder,
      rows,
      style: { width: "100%", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 14px", color: "var(--text)", fontSize: 13, outline: "none", fontFamily: "inherit", resize: "none" }
    }
  ));
}
function Select({ label, value, onChange, options }) {
  return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--text-dim)", textTransform: "uppercase", display: "block", marginBottom: 6 } }, label), /* @__PURE__ */ React.createElement(
    "select",
    {
      value,
      onChange: (e) => onChange(e.target.value),
      style: { width: "100%", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 14px", color: "var(--text)", fontSize: 13, outline: "none", fontFamily: "inherit", appearance: "none" }
    },
    options.map((o) => /* @__PURE__ */ React.createElement("option", { key: o.value, value: o.value }, o.label))
  ));
}
function Btn({ children, onClick, disabled = false, color = "var(--primary)", outline = false, full = false, sm = false }) {
  const bg = outline ? "transparent" : disabled ? "var(--border)" : color;
  const fg = outline ? color : disabled ? "var(--border-strong)" : "var(--bg)";
  const border = outline ? `1.5px solid ${color}55` : "none";
  return /* @__PURE__ */ React.createElement("button", { onClick, disabled, style: { background: bg, color: fg, border, borderRadius: 10, padding: sm ? "8px 16px" : "12px 20px", fontSize: sm ? 11 : 12, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", cursor: disabled ? "not-allowed" : "pointer", fontFamily: "inherit", width: full ? "100%" : "auto", transition: "all 0.2s", opacity: disabled ? 0.5 : 1 } }, children);
}
function ThemeToggle() {
  const [theme, setTheme] = useState(() => window.smaashTheme.get());
  useEffect(() => window.smaashTheme.subscribe(setTheme), []);
  const light = theme === 'light';
  return React.createElement('div', {
    onClick: () => window.smaashTheme.set(light ? 'dark' : 'light'),
    style: {
      width: 56, height: 28, borderRadius: 14,
      background: light ? '#e4e6eb' : 'var(--surface)',
      border: '1px solid ' + (light ? '#cfd3da' : 'var(--border)'),
      position: 'relative', cursor: 'pointer',
      transition: 'background .25s, border-color .25s',
      display: 'inline-flex', alignItems: 'center', padding: '0 5px',
      justifyContent: 'space-between', fontSize: 11, flexShrink: 0,
    },
  },
    React.createElement('span', { style:{ opacity: light ? 1 : 0.3 } }, '☀'),
    React.createElement('span', { style:{ opacity: light ? 0.3 : 1 } }, '🌙'),
    React.createElement('div', { style: {
      position: 'absolute', top: 2, left: light ? 30 : 2,
      width: 22, height: 22, borderRadius: 11,
      background: light ? '#fff' : 'var(--primary)',
      boxShadow: light ? '0 1px 3px rgba(0,0,0,0.15)' : '0 0 10px rgba(34,211,238,.5)',
      transition: 'left .28s cubic-bezier(.5,.05,.3,1.3), background .25s',
    }}),
  );
}
function Nav({ screen, setScreen, unreadNotifs = 0, pendingConfirms = 0 }) {
  const items = [
    { id: "submit", icon: "🏸", label: "Play", badge: pendingConfirms },
    { id: "leaderboard", icon: "🏆", label: "Ranks" },
    { id: "feed", icon: "📣", label: "Community" },
    { id: "notifs_nav", icon: "🔔", label: "Alerts", badge: unreadNotifs },
    { id: "more", icon: "⚡", label: "More" },
    { id: "portal", icon: "👤", label: "Me" }
  ];
  return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200, background: "var(--bg)", borderTop: "1px solid var(--border)", overflowX: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-around", padding: "8px 4px 12px", minWidth: 320, maxWidth: 480, margin: "0 auto" } }, items.map((item) => /* @__PURE__ */ React.createElement("button", { key: item.id, onClick: () => setScreen(item.id), style: { background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "4px 6px", borderRadius: 10, opacity: screen === item.id ? 1 : 0.4, transition: "opacity 0.2s", flexShrink: 0, position: "relative" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16 } }, item.icon), item.badge > 0 && /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 0, right: 0, background: "var(--danger)", color: "#fff", fontSize: 8, fontWeight: 800, width: 14, height: 14, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" } }, item.badge > 9 ? "9+" : item.badge), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 8, color: screen === item.id ? "var(--primary)" : "var(--text-dim)", fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" } }, item.label), screen === item.id && /* @__PURE__ */ React.createElement("div", { style: { width: 14, height: 2, background: "var(--primary)", borderRadius: 2 } })))));
}
