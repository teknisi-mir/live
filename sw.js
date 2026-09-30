self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => self.clients.claim());

self.addEventListener('fetch', e => {
  // 1. Baypass/Abaikan request file GeoTIFF (.tif) atau folder /maps/
  // Agar browser menangani request ini secara langsung tanpa interupsi Service Worker
  if (e.request.url.includes('/maps/') || e.request.url.endsWith('.tif')) {
    return;
  }

  // 2. Coba fetch dari jaringan terlebih dahulu
  e.respondWith(
    fetch(e.request)
      .then(response => {
        // Validasi jika response valid
        if (!response || response.status !== 200) {
          return response;
        }
        return response;
      })
      .catch(async () => {
        // Cek apakah resource ada di cache
        const cachedResponse = await caches.match(e.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        // Jika tidak ada di cache, kembalikan Response Error resmi (bukan undefined)
        return new Response('Network error occurred', {
          status: 408,
          headers: { 'Content-Type': 'text/plain' }
        });
      })
  );
});
