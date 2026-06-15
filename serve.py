# SMAASH dev server — Python standard library only, with SPA fallback.
# Run:  python serve.py        (or: py serve.py)
# Custom port:  set PORT=4000 && python serve.py   (Windows)
import http.server, socketserver, os, urllib.parse

PORT = int(os.environ.get("PORT", "3000"))
ROOT = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=ROOT, **k)

    def send_head(self):
        # SPA fallback: any path that isn't a real file serves index.html
        # (so /more, /community, /t/<slug> all work on refresh).
        path = urllib.parse.urlparse(self.path).path
        candidate = os.path.join(ROOT, path.lstrip("/"))
        if path != "/" and not os.path.isfile(candidate):
            self.path = "/index.html"
        return super().send_head()

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("SMAASH running -> http://localhost:%d  (Ctrl+C to stop)" % PORT)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
