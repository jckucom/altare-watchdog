// Altare watchdog — Ty's free-tier assets, watched from his Altare free app.
// The Altare app has no public address, so this does outbound checks only:
// every 10 minutes it fetches Ty's public free-tier endpoints to keep them
// warm and logs whether they answer. No secrets, no writes, no payments.
const http = require('http');

const TARGETS = [
  { name: 'uppcoder-hugo', url: 'https://w1vx4kgw-hugo-main.apps-1.websson.cloud' },
  { name: 'github-gist-restore', url: 'https://gist.githubusercontent.com/jckucom/e18b16c7292c4235cbb386bcc257e68a/raw/00-RESTORE.md' },
  { name: 'altare-console', url: 'https://console.altare.gg/apps' },
];

const state = { startedAt: new Date().toISOString(), checks: {} };

async function checkOne(t) {
  const started = Date.now();
  try {
    const res = await fetch(t.url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(20000) });
    await res.arrayBuffer().catch(() => null);
    state.checks[t.name] = { ok: res.status < 400, status: res.status, ms: Date.now() - started, at: new Date().toISOString() };
  } catch (e) {
    state.checks[t.name] = { ok: false, status: 0, ms: Date.now() - started, at: new Date().toISOString(), error: String((e && e.message) || e).slice(0, 120) };
  }
  console.log(`[watchdog] ${t.name}:`, JSON.stringify(state.checks[t.name]));
}

async function checkAll() {
  for (const t of TARGETS) await checkOne(t);
}

checkAll();
setInterval(checkAll, 10 * 60 * 1000);

const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(state, null, 2));
}).listen(port, () => console.log(`[watchdog] listening on ${port}`));
