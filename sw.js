// sw.js - versi aman
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
// JANGAN pake fetch dulu, biarin map load normal
