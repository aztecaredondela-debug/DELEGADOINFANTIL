const C="delegado-v5";
const A=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png","https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>c.add(u).catch(()=>{})))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
// Con internet: siempre la versión más nueva. Sin internet: la copia guardada.
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
e.respondWith(fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp));return res}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("./index.html"))))});
