// Trimite notificări pe telefonul administratoarei.
// O apelează baza de date (Supabase) când apare o noutate; cheile vin din baza de date, nu stau aici.
const webpush = require("web-push");
const crypto = require("crypto");
const TOKEN_HASH = "a48e25ac60c91a57f435f34a1663b4fb7a5ac397f8f54adfe225999ef9435658";
const SUPABASE_URL = "https://huzurhvdpypruvuaidwp.supabase.co";
const SUPABASE_KEY = "sb_publishable_JRjoraFkCA5nNPO_X7rvog_rg8A451E";

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  let b = req.body;
  if (typeof b === "string") { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  b = b || {};
  const hash = crypto.createHash("sha256").update(String(b.token || "")).digest("hex");
  if (hash !== TOKEN_HASH) return res.status(403).json({ ok: false });
  const v = b.vapid || {}, subs = Array.isArray(b.subs) ? b.subs : [];
  try { webpush.setVapidDetails("https://fluturasii.vercel.app", v.public, v.private); }
  catch (e) { return res.status(500).json({ ok: false, eroare: "vapid" }); }
  const payload = JSON.stringify(b.payload || {});
  const gone = []; let sent = 0;
  await Promise.all(subs.map(async s => {
    try { await webpush.sendNotification(s, payload, { TTL: 86400, urgency: "normal" }); sent++; }
    catch (e) { if (e && (e.statusCode === 404 || e.statusCode === 410)) gone.push(s.endpoint); }
  }));
  if (gone.length) {
    try {
      await fetch(SUPABASE_URL + "/rest/v1/rpc/push_curata", {
        method: "POST",
        headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ p_token: b.token, p_endpoints: gone })
      });
    } catch (e) {}
  }
  res.status(200).json({ ok: true, trimise: sent, expirate: gone.length });
};
