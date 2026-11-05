// Rulează zilnic (vezi vercel.json) ca proiectul Supabase gratuit să nu intre în pauză.
const SUPABASE_URL = "https://huzurhvdpypruvuaidwp.supabase.co";
const SUPABASE_KEY = "sb_publishable_JRjoraFkCA5nNPO_X7rvog_rg8A451E";

module.exports = async (req, res) => {
  try {
    const r = await fetch(SUPABASE_URL + "/rest/v1/setari?select=id&limit=1", {
      headers: SUPABASE_KEY.startsWith("sb_") ? { apikey: SUPABASE_KEY } : { apikey: SUPABASE_KEY, Authorization: "Bearer " + SUPABASE_KEY }
    });
    // în fiecare lună apare singură contribuția pentru abonamentul ChatGPT
    let abonament = null;
    try {
      const a = await fetch(SUPABASE_URL + "/rest/v1/rpc/asigura_abonament", { method: "POST", headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" }, body: "{}" });
      abonament = a.ok ? await a.json() : a.status;
    } catch (e) {}
    res.status(r.ok ? 200 : 502).json({ ok: r.ok, status: r.status, abonament, la: new Date().toISOString() });
  } catch (e) {
    res.status(500).json({ ok: false, eroare: String(e) });
  }
};
