// Notificări pentru administratoare. Nu memorează pagini (site-ul se încarcă mereu proaspăt).
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("push", e => {
  let d = {}; try { d = e.data ? e.data.json() : {}; } catch (x) { d = { body: e.data ? e.data.text() : "" }; }
  e.waitUntil(self.registration.showNotification(d.title || "Fluturașii", {
    body: d.body || "Ai o noutate în portal.", tag: d.tag || "fluturasii", data: { url: d.url || "/#activitate" },
    icon: "/icon-192.png", badge: "/icon-192.png"
  }));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || "/#activitate", self.location.origin).href;
  e.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of all) { if (c.url.startsWith(self.location.origin)) { await c.focus(); try { await c.navigate(url); } catch (x) { c.postMessage({ open: url }); } return; } }
    await self.clients.openWindow(url);
  })());
});
