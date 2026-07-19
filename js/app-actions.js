/* ============================================================
   SoulSite footer app-actions (standard on every SoulSite).
   Two low-friction buttons, injected into the footer:

     "Download the app"  -> fires the PWA install prompt directly, so the visitor
                            never has to hunt through the browser menu. Hidden until
                            the browser reports the site is installable, and hidden
                            once it's already installed. On iOS (no programmatic
                            install) it shows the Share -> Add to Home Screen steps.

     "Get updates"       -> unregisters the service worker + clears the caches +
                            reloads, so a visitor on a stale cached build gets the
                            latest without knowing what a "hard refresh" is.

   Self-contained, no deps. Include once per page (after the footer):
     <script src="js/app-actions.js" defer></script>
   It appends to [data-app-actions], else #site-footer, else <footer>, else body.
   Icons are inline Lucide glyphs (download, refresh-cw) so no icon lib is needed.
   ============================================================ */
(function () {
  "use strict";

  function isStandalone(){ return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || window.navigator.standalone === true; }
  function isIOS(){ return /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream; }

  var installEvt = null, installed = isStandalone(), bar = null;

  // Capture the install prompt as early as possible (it can fire before DOM is ready).
  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); installEvt = e; refresh(); });
  window.addEventListener("appinstalled", function () { installed = true; installEvt = null; refresh(); });

  var ICON_DL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>';
  var ICON_RE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>';

  function css(){
    if (document.getElementById("ss-appactions-css")) return;
    var s = document.createElement("style"); s.id = "ss-appactions-css";
    s.textContent =
      ".ss-appbar{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;padding:12px 0;}"+
      ".ss-appbtn{display:inline-flex;align-items:center;gap:7px;font:600 .82rem system-ui,sans-serif;cursor:pointer;background:transparent;border:1px solid currentColor;color:inherit;opacity:.7;border-radius:8px;padding:7px 13px;}"+
      ".ss-appbtn:hover{opacity:1;} .ss-appbtn svg{width:15px;height:15px;flex:0 0 auto;}"+
      ".ss-iosmodal{position:fixed;inset:0;z-index:100000;background:rgba(6,10,20,.8);display:flex;align-items:center;justify-content:center;padding:20px;}"+
      ".ss-iosmodal__card{background:#12151d;color:#eef1f7;border:1px solid #e8c468;border-radius:14px;max-width:340px;padding:22px;font:400 14px/1.5 system-ui;text-align:center;}"+
      ".ss-iosmodal__card b{color:#e8c468;}";
    document.head.appendChild(s);
  }

  function build(){
    if (bar) return;
    css();
    bar = document.createElement("div"); bar.className = "ss-appbar";

    var dl = document.createElement("button"); dl.type = "button"; dl.className = "ss-appbtn ss-appbtn--install";
    dl.innerHTML = ICON_DL + "<span>Download the app</span>";
    dl.addEventListener("click", onInstall);

    var up = document.createElement("button"); up.type = "button"; up.className = "ss-appbtn ss-appbtn--update";
    up.innerHTML = ICON_RE + "<span>Get updates</span>";
    up.addEventListener("click", onUpdate);

    bar.appendChild(dl); bar.appendChild(up);
    var host = document.querySelector("[data-app-actions]") || document.getElementById("site-footer") || document.querySelector("footer") || document.body;
    host.appendChild(bar);
    refresh();
  }

  // Show the install button only when it can do something: installable (prompt captured) or iOS
  // (manual steps), and never once the app is already installed.
  function refresh(){
    if (!bar) return;
    var dl = bar.querySelector(".ss-appbtn--install");
    dl.style.display = (!installed && (installEvt || isIOS())) ? "" : "none";
  }

  function onInstall(){
    if (installEvt){ installEvt.prompt(); (installEvt.userChoice || Promise.resolve()).then(function(){ installEvt = null; refresh(); }); return; }
    if (isIOS()) iosHelp();
  }

  function iosHelp(){
    var m = document.createElement("div"); m.className = "ss-iosmodal";
    m.innerHTML = '<div class="ss-iosmodal__card"><p><b>Add to your Home Screen</b></p>'+
      '<p>Tap the <b>Share</b> button, then <b>Add to Home Screen</b>.</p>'+
      '<button class="ss-appbtn" type="button" style="margin-top:12px">Got it</button></div>';
    m.addEventListener("click", function(e){ if (e.target === m || e.target.tagName === "BUTTON") m.remove(); });
    document.body.appendChild(m);
  }

  function onUpdate(ev){
    var span = ev.currentTarget.querySelector("span"); if (span) span.textContent = "Updating…";
    Promise.resolve()
      .then(function(){ return ("serviceWorker" in navigator) ? navigator.serviceWorker.getRegistrations().then(function(rs){ return Promise.all(rs.map(function(r){ return r.unregister(); })); }) : null; })
      .then(function(){ return window.caches ? caches.keys().then(function(ks){ return Promise.all(ks.map(function(k){ return caches.delete(k); })); }) : null; })
      .catch(function(){})
      .then(function(){ location.reload(); });
  }

  (document.readyState === "loading") ? document.addEventListener("DOMContentLoaded", build) : build();
})();
