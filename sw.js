if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise((async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]}))},r=(r,s)=>{Promise.all(r.map(e)).then((e=>s(1===e.length?e[0]:e)))},s={require:Promise.resolve(r)};self.define=(r,n,i)=>{s[r]||(s[r]=Promise.resolve().then((()=>{let s={};const a={uri:location.origin+r.slice(1)};return Promise.all(n.map((r=>{switch(r){case"exports":return s;case"module":return a;default:return e(r)}}))).then((e=>{const r=i(...e);return s.default||(s.default=r),s}))})))}}define("./sw.js",["./workbox-a4daa126"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"index.html",revision:"224524127277b919d1b55c4335a309e0"},{url:"src.e382586c.css",revision:"376c54a8c85b282839be0b0b9d572178"},{url:"src.fa9e8d68.js",revision:"e3ea3e83b01ea2b65445208a4695c8e8"},{url:"transfer128.c7852c06.png",revision:"5d9987036509f8f81729090a495ff3d2"},{url:"transfer192.f27219e9.png",revision:"6664d4086d654caf31a991601e90beeb"},{url:"transfer24.4237128c.png",revision:"6d9f672ee21f69940b730d2a3094bf32"},{url:"transfer256.ea453af5.png",revision:"1a704d3ce7c653bf48fa1c10400801dc"},{url:"transfer32.7b0a8e83.png",revision:"b243882faa03ae34ba89b9536f1eae8d"},{url:"transfer512.f70e61ef.png",revision:"ac88d8fe056c96d916af8dbf558a514d"},{url:"transfer64.9c176f02.png",revision:"c2be155426a4ca72d62944cabf6d5e47"}],{}),e.cleanupOutdatedCaches()}));
//# sourceMappingURL=sw.js.map
