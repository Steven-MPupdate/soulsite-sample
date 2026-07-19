/* Shared SoulSite footer + mobile nav toggle. Edit the config below per client. */
(function () {
  var BRAND = "The Open Page";
  var MISSION = " · Every Idea Deserves a Page";
  var LINKS = [
    { label: "Home", url: "index.html" },
    { label: "Soul Insight", url: "soul-insight.html" },
    { label: "Links", url: "links.html" },
    { label: "Books", url: "products.html" }
  ];

  var el = document.getElementById("site-footer");
  if (el) {
    var year = new Date().getFullYear();
    el.className = "footer";
    el.innerHTML =
      '<div class="container footer__inner">' +
        '<div class="footer__brand">' + BRAND + '<p class="footer__mission">' + MISSION + '</p></div>' +
        '<ul class="footer__links">' + LINKS.map(function (l) {
          return '<li><a href="' + l.url + '">' + l.label + '</a></li>';
        }).join("") + '</ul>' +
      '</div>' +
      '<div class="footer__legal container">© ' + year + ' ' + BRAND + '. <span class="mp-credit"><a href="https://mp-update.com" target="_blank" rel="noopener">Built with Mirror Path SoulSites</a></span></div>';
  }

  /* Mobile nav toggle (hamburger) */
  var nav = document.querySelector(".nav");
  if (nav && !nav.querySelector(".nav__toggle")) {
    var btn = document.createElement("button");
    btn.className = "nav__toggle"; btn.setAttribute("aria-label", "Menu"); btn.innerHTML = "☰";
    btn.onclick = function () { var open = nav.classList.toggle("open"); btn.innerHTML = open ? "✕" : "☰"; };
    var inner = nav.querySelector(".nav__inner"); if (inner) inner.appendChild(btn);
  }
})();


/* ---- Footer app-actions: "Download the app" (PWA install) + "Get updates" ---- */
(function () {
  if (window.__ssAppActions) return; window.__ssAppActions = 1;
  var s = document.createElement("script"); s.src = "js/app-actions.js"; s.defer = true;
  document.body.appendChild(s);
})();
