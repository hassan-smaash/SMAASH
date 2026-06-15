function sendDirectorMatchNotification(matchId, action, directorName, playerIds, tok) {
  const shortId = String(matchId).slice(0, 8);
  const message = "Match " + shortId + " has been " + action + " by Director " + directorName + ".";
  const unique = [...new Set(playerIds.filter(Boolean))];
  unique.forEach(function(uid) {
    fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/notifications", {
      method: "POST",
      headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ user_id: uid, type: "director_action", message: message, is_read: false })
    }).catch(function() {});
  });
}

// Director activity log — permanent audit trail
function logDirectorAction(directorId, clubId, action, opts, tok) {
  // opts: { matchId, targetUserId, note }
  fetch("https://yqqezxyayndzmqahguac.supabase.co/rest/v1/director_activity_log", {
    method: "POST",
    headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + tok, "Content-Type": "application/json", "Prefer": "return=minimal" },
    body: JSON.stringify({ director_id: directorId, club_id: clubId, action: action, match_id: opts.matchId || null, target_user_id: opts.targetUserId || null, note: opts.note || null })
  }).catch(function() {});
}
const CITIES = [
  // Canada
  "Mississauga, Ontario, Canada",
  "Toronto, Ontario, Canada",
  "Brampton, Ontario, Canada",
  "Vancouver, British Columbia, Canada",
  "Richmond, British Columbia, Canada",
  "Burnaby, British Columbia, Canada",
  "Calgary, Alberta, Canada",
  "Edmonton, Alberta, Canada",
  "Ottawa, Ontario, Canada",
  "Montreal, Quebec, Canada",
  "Markham, Ontario, Canada",
  "Richmond Hill, Ontario, Canada",
  "Scarborough, Ontario, Canada",
  "North York, Ontario, Canada",
  "Oakville, Ontario, Canada",
  "Burlington, Ontario, Canada",
  "Hamilton, Ontario, Canada",
  "Waterloo, Ontario, Canada",
  "Kitchener, Ontario, Canada",
  "London, Ontario, Canada",
  "Windsor, Ontario, Canada",
  // USA
  "New York, NY, USA",
  "Los Angeles, CA, USA",
  "Chicago, IL, USA",
  "Houston, TX, USA",
  "San Jose, CA, USA",
  "Seattle, WA, USA",
  "San Francisco, CA, USA",
  "Boston, MA, USA",
  "Washington, DC, USA",
  "Atlanta, GA, USA",
  "Dallas, TX, USA",
  "Miami, FL, USA",
  "Minneapolis, MN, USA",
  "Denver, CO, USA",
  "Phoenix, AZ, USA",
  "Portland, OR, USA",
  "Philadelphia, PA, USA",
  "Las Vegas, NV, USA",
  "San Diego, CA, USA",
  "Austin, TX, USA",
  // UK
  "London, England, UK",
  "Birmingham, England, UK",
  "Manchester, England, UK",
  "Glasgow, Scotland, UK",
  "Edinburgh, Scotland, UK",
  "Leeds, England, UK",
  // Asia
  "Singapore, Singapore",
  "Kuala Lumpur, Malaysia",
  "Jakarta, Indonesia",
  "Bangkok, Thailand",
  "Manila, Philippines",
  "Hong Kong, China",
  "Shanghai, China",
  "Beijing, China",
  "Guangzhou, China",
  "Shenzhen, China",
  "Mumbai, India",
  "Delhi, India",
  "Bangalore, India",
  "Chennai, India",
  "Hyderabad, India",
  "Kolkata, India",
  "Pune, India",
  "Ahmedabad, India",
  "Tokyo, Japan",
  "Osaka, Japan",
  "Seoul, South Korea",
  "Taipei, Taiwan",
  // Middle East
  "Dubai, UAE",
  "Abu Dhabi, UAE",
  "Riyadh, Saudi Arabia",
  "Doha, Qatar",
  // Australia/NZ
  "Sydney, NSW, Australia",
  "Melbourne, VIC, Australia",
  "Brisbane, QLD, Australia",
  "Perth, WA, Australia",
  "Auckland, New Zealand",
  // Europe
  "Amsterdam, Netherlands",
  "Paris, France",
  "Berlin, Germany",
  "Madrid, Spain",
  "Copenhagen, Denmark",
  "Stockholm, Sweden",
  "Oslo, Norway",
  "Helsinki, Finland",
  // Other
  "Colombo, Sri Lanka",
  "Dhaka, Bangladesh",
  "Karachi, Pakistan",
  "Lahore, Pakistan",
  "Islamabad, Pakistan",
  "Cape Town, South Africa",
  "Lagos, Nigeria",
  "Nairobi, Kenya"
];
const smaashDB = {
  _token: null,
  _refreshToken: null,
  _user: null,
  _init() {
    this._token = localStorage.getItem("smaash_token");
    this._refreshToken = localStorage.getItem("smaash_refresh");
  },
  _save(access, refresh) {
    this._token = access;
    if (refresh) this._refreshToken = refresh;
    if (access) localStorage.setItem("smaash_token", access);
    if (refresh) localStorage.setItem("smaash_refresh", refresh);
  },
  async _refreshIfNeeded() {
    if (!this._refreshToken) return false;
    try {
      const res = await fetch("https://yqqezxyayndzmqahguac.supabase.co/auth/v1/token?grant_type=refresh_token", {
        method: "POST",
        headers: { "apikey": SUPABASE_ANON_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: this._refreshToken })
      });
      if (!res.ok) return false;
      const data = await res.json();
      if (data.access_token) {
        this._save(data.access_token, data.refresh_token);
        console.log("Token refreshed successfully");
        return true;
      }
    } catch (e) {
    }
    return false;
  },
  async _fetch(url, opts = {}) {
    const headers = __spreadValues({
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": "Bearer " + (this._token || SUPABASE_ANON_KEY),
      "Content-Type": "application/json"
    }, opts.headers || {});
    let res = await fetch(url, __spreadProps(__spreadValues({}, opts), { headers }));
    if (res.status === 401) {
      const refreshed = await this._refreshIfNeeded();
      if (refreshed) {
        headers["Authorization"] = "Bearer " + this._token;
        res = await fetch(url, __spreadProps(__spreadValues({}, opts), { headers }));
      }
    }
    return res;
  },
  auth: {
    getToken() {
      return smaashDB._token;
    },
    onAuthStateChange(cb) {
      if (smaashDB._user) cb("SIGNED_IN", { user: smaashDB._user });
      else cb("SIGNED_OUT", null);
      return { data: { subscription: { unsubscribe: () => {
      } } } };
    },
    async signUp({ email, password, options }) {
      const res = await fetch("https://yqqezxyayndzmqahguac.supabase.co/auth/v1/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY },
        body: JSON.stringify({ email, password, data: (options == null ? void 0 : options.data) || {} })
      });
      const data = await res.json();
      if (data.access_token) {
        smaashDB._save(data.access_token, data.refresh_token);
        smaashDB._user = data.user;
      }
      return { data, error: data.error_description ? { message: data.error_description } : null };
    },
    async signInWithPassword({ email, password }) {
      const res = await fetch("https://yqqezxyayndzmqahguac.supabase.co/auth/v1/token?grant_type=password", {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.access_token) {
        smaashDB._save(data.access_token, data.refresh_token);
        smaashDB._user = data.user;
      }
      const error = data.error_description || data.msg || data.error;
      return { data: { user: data.user || null }, error: error ? { message: error } : null };
    },
    async signOut() {
      await fetch("https://yqqezxyayndzmqahguac.supabase.co/auth/v1/logout", {
        method: "POST",
        headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + smaashDB._token }
      });
      smaashDB._token = null;
      smaashDB._user = null;
      smaashDB._refreshToken = null;
      localStorage.removeItem("smaash_token");
      localStorage.removeItem("smaash_refresh");
    },
    async getUser() {
      if (!smaashDB._token) {
        smaashDB._token = localStorage.getItem("smaash_token");
        smaashDB._refreshToken = localStorage.getItem("smaash_refresh");
      }
      if (!smaashDB._token && !smaashDB._refreshToken) return { data: { user: null }, error: null };
      if (!smaashDB._token && smaashDB._refreshToken) {
        await smaashDB._refreshIfNeeded();
      }
      if (!smaashDB._token) return { data: { user: null }, error: null };
      const res = await smaashDB._fetch("https://yqqezxyayndzmqahguac.supabase.co/auth/v1/user");
      if (!res.ok) {
        const refreshed = await smaashDB._refreshIfNeeded();
        if (!refreshed) return { data: { user: null }, error: null };
        const res2 = await smaashDB._fetch("https://yqqezxyayndzmqahguac.supabase.co/auth/v1/user");
        if (!res2.ok) return { data: { user: null }, error: null };
        const data2 = await res2.json();
        if (data2.id) smaashDB._user = data2;
        return { data: { user: data2.id ? data2 : null }, error: null };
      }
      const data = await res.json();
      if (data.id) smaashDB._user = data;
      return { data: { user: data.id ? data : null }, error: null };
    },
    async resetPasswordForEmail(email, options) {
      const body = { email };
      if (options && options.redirectTo) body.redirect_to = options.redirectTo;
      const res = await fetch("https://yqqezxyayndzmqahguac.supabase.co/auth/v1/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        let msg = "Failed to send reset email";
        try { const d = await res.json(); msg = d.error_description || d.msg || d.error || msg; } catch (e) {}
        return { data: null, error: { message: msg } };
      }
      return { data: {}, error: null };
    },
    async updateUser({ password }) {
      // Recovery tokens arrive in URL hash (#access_token=...). Capture them on first call.
      if (typeof window !== "undefined" && window.location.hash.includes("access_token")) {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const at = params.get("access_token");
        const rt = params.get("refresh_token");
        if (at) smaashDB._save(at, rt || null);
      }
      if (!smaashDB._token) return { data: null, error: { message: "Reset link expired or invalid. Please request a new password reset email." } };
      const res = await fetch("https://yqqezxyayndzmqahguac.supabase.co/auth/v1/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + smaashDB._token },
        body: JSON.stringify({ password })
      });
      if (!res.ok) {
        let msg = "Failed to update password";
        try { const d = await res.json(); msg = d.error_description || d.msg || d.error || msg; } catch (e) {}
        return { data: null, error: { message: msg } };
      }
      const data = await res.json();
      return { data: { user: data }, error: null };
    }
  },
  from(table) {
    const base = "https://yqqezxyayndzmqahguac.supabase.co/rest/v1/" + table;
    let _filters = [];
    const q = {
      eq(col, val) {
        _filters.push(col + "=eq." + val);
        return q;
      },
      async update(data) {
        const params = _filters.length ? "?" + _filters.join("&") : "";
        const res = await smaashDB._fetch(base + params, {
          method: "PATCH",
          headers: { "Prefer": "return=representation" },
          body: JSON.stringify(data)
        });
        const json = await res.json().catch(() => ({}));
        return { data: json, error: res.ok ? null : json };
      },
      async insert(data) {
        const res = await smaashDB._fetch(base, {
          method: "POST",
          headers: { "Prefer": "return=representation" },
          body: JSON.stringify(data)
        });
        const json = await res.json().catch(() => ({}));
        return { data: json, error: res.ok ? null : json };
      }
    };
    return q;
  }
};
smaashDB._init();
