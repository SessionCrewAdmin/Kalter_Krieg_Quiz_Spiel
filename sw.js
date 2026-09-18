const CACHE_VERSION='kathleens-v21-pwa-1';
const CORE=[
  './','./index.html','./offline.html','./manifest.webmanifest',
  './assets/covers/cold-war.svg','./assets/covers/english-world.svg',
  './assets/icons/kathleen-180.png','./assets/icons/kathleen-192.png','./assets/icons/kathleen-512.png',
  './tools/english-world-quiz/index.html','./tools/english-world-quiz/bonus.html',
  './tools/kalter-krieg/index.html','./tools/kalter-krieg/lehrer.html',
  './lehrer.html','./kalter_krieg_lehrer.html'
];
const OPTIONAL=[
  'https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js',
  'https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js',
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json'
];
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE_VERSION);
    await cache.addAll(CORE);
    await Promise.allSettled(OPTIONAL.map(async url=>{
      const r=await fetch(url,{mode:'cors'});
      if(r.ok) await cache.put(url,r.clone());
    }));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k.startsWith('kathleens-')&&k!==CACHE_VERSION).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(url.hostname.endsWith('supabase.co')) return;
  const isNav=req.mode==='navigate';
  const cacheable=url.origin===self.location.origin || url.hostname==='cdn.jsdelivr.net';
  if(!cacheable) return;
  event.respondWith((async()=>{
    const cached=await caches.match(req,{ignoreSearch:isNav});
    if(cached) {
      if(!isNav) fetch(req).then(async r=>{if(r&&r.ok){const c=await caches.open(CACHE_VERSION);await c.put(req,r.clone())}}).catch(()=>{});
      return cached;
    }
    try{
      const r=await fetch(req);
      if(r&&r.ok){const c=await caches.open(CACHE_VERSION);await c.put(req,r.clone())}
      return r;
    }catch(err){
      if(isNav) return (await caches.match('./offline.html')) || Response.error();
      throw err;
    }
  })());
});
self.addEventListener('message',event=>{
  if(event.data==='SKIP_WAITING') self.skipWaiting();
});