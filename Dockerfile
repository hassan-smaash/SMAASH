# SMAASH — static SPA served by nginx (production-style, with SPA fallback).
# The app is client-only: it talks to your hosted Supabase from the browser and
# loads React / supabase-js / Google Fonts from their CDNs at runtime (needs internet).
FROM nginx:1.27-alpine

# SPA-aware server config (replaces nginx's default site).
COPY nginx.conf /etc/nginx/conf.d/default.conf

# App files. .dockerignore keeps everything non-app (sql, backups, docs, dev scripts) out.
COPY . /usr/share/nginx/html

# nginx.conf is copied above into conf.d — don't leave a copy in the web root.
RUN rm -f /usr/share/nginx/html/nginx.conf

EXPOSE 80
# Base image already runs: nginx -g 'daemon off;'
