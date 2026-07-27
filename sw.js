const CACHE = 'brainrot-v15';
const FILES = [
  './',
  './index.html',
  './characters.json',
  './manifest.json',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const charsRes = await fetch('characters.json', { cache: 'reload' });
    const chars = await charsRes.clone().json();
    const images = chars.map(c => c.image).filter(Boolean);
    await Promise.all(FILES.map(f =>
      f === './characters.json'
        ? cache.put(f, charsRes)
        : fetch(f, { cache: 'reload' }).then(res => cache.put(f, res))
    ));
    await Promise.all(images.map(f => fetch(f, { cache: 'reload' }).then(res => cache.put(f, res))));
  })());
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }))
  );
});
