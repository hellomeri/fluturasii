// Rulează zilnic (vezi vercel.json) ca proiectul Supabase gratuit să nu intre în pauză.
const SUPABASE_URL = "__SUPABASE_URL__";
const SUPABASE_KEY = "__SUPABASE_KEY__";

module.exports = async (req, res) => {
  try {
    const r = await fetch(SUPABASE_URL + "/rest/v1/setari?select=id&limit=1", {
      headers: SUPABASE_KEY.startsWith("sb_") ? { apikey: SUPABASE_KEY } : { apikey: SUPABASE_KEY, Authorization: "Bearer " + SUPABASE_KEY }
    });
    res.status(r.ok ? 200 : 502).json({ ok: r.ok, status: r.status, la: new Date().toISOString() });
  } catch (e) {
    res.status(500).json({ ok: false, eroare: String(e) });
  }
};
