var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const { useState, useRef, useEffect, useCallback } = React;
const SUPABASE_URL = "https://yqqezxyayndzmqahguac.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxcWV6eHlheW5kem1xYWhndWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NTk3OTEsImV4cCI6MjA5MDMzNTc5MX0.kOZUQr1dG_EInbBWrnJsiV062WTz4XAL5KI70Zzr7I8";
// Shared Supabase client — used only for Realtime (websocket) subscriptions. Loaded via the CDN <script> in index.html.
// persistSession:false because the app manages its own auth tokens (smaashDB.auth); we don't want this client touching storage.
const smaashRealtime = (typeof supabase !== "undefined" && supabase.createClient)
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false, autoRefreshToken: false }, realtime: { params: { eventsPerSecond: 5 } } })
  : null;

// Director notification — fires when a Director voids or edits a match
