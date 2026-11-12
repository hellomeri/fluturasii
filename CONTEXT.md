# CONTEXT — 🦋 Fluturașii — portalul părinților

> Citește-l la începutul fiecărui chat despre acest repo; actualizează-l la final.

## Ce e
Portalul părinților pentru grupa mică B „Fluturașii” (Grădinița 246): evenimente, lista de necesare a grupei, plăți (hrană, dans, engleză etc.) și fondul grupei, administrat de Adelina. Include și pagina mos-craciun.html.

- **Adresă:** https://fluturasii.vercel.app
- **Repo:** proiecteade/fluturasii (branch main) — mutat din hellomeri/fluturasii pe 12 noiembrie 2026

## Structură
`index.html` (aplicația, PWA), `mos-craciun.html`, `api/` (funcții Vercel: `push.js` pentru notificări web-push, `keepalive.js`), `img/`, `manifest.webmanifest`, `sw.js`, `vercel.json` (cron zilnic /api/keepalive la 06:00 UTC), iconițe.

## Unde stau datele
Toate datele sunt în Supabase (citite direct din index.html cu supabase-js). Cheile secrete pentru notificări stau în variabilele de mediu din Vercel, nu în repo.

## Cum se publică
Vercel publică automat din branch-ul main. Hellomeri.go.ro nu e implicat (pagina /gradinita vine din repo-ul separat proiecteade/gradinita).

## Unde sunt cheile (fără valori)
- Cheile Supabase și cheile pentru notificări (web-push / VAPID): în Vercel → proiectul fluturasii → Settings → Environment Variables; unele sunt și în tabelul `secrete` din Supabase (exclus intenționat din backup).
- Parola bazei de date Supabase: în Supabase → proiectul fluturasii → Settings → Database.
- Tokenul serverului (Hermes, read-only pe proiecteade, expiră 27 oct 2027): pe server, `~/.config/proiecteade/token`.
- Recomandare: toate cheile de mai sus și parolele conturilor (GitHub, Vercel, Supabase) într-un manager de parole.

## Backup
- Baza de date Supabase: săptămânal, în repo-ul privat `proiecteade/backup` (`supabase/fluturasii/`).

## Cum lucrăm
- Proiectul Claude: **🦋 Fluturașii** — chatul 🛠 Features pentru cod/design, chatul 📝 Conținut doar pentru date.
- Claude face tot git-ul (commit, push) și verifică pagina live după publicare. Adelina nu urcă nimic manual.
- La finalul fiecărei sesiuni, Claude adaugă o linie în „Jurnal” mai jos.

## Jurnal
- 2026-11-12: repo mutat în organizația proiecteade; creat CONTEXT.md și HERMES.md.
- 2026-11-12: decis — fără copie pe hellomeri.go.ro/fluturasii (doar Vercel).
- 2026-11-12: adăugat „Unde sunt cheile” și „Backup”.
