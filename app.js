/* ═══════════════════════════════════════════════════
   XANA OS — PROMETHEUS · APPLICATION SCRIPTS
   ═══════════════════════════════════════════════════ */

(function () {
  "use strict";

  // ── CURSOR ──
  function initCursor() {
    const cursor = document.getElementById("cursor");
    const trail = document.getElementById("cursor-trail");
    if (!cursor || !trail) return;

    let mx = 0,
      my = 0,
      tx = 0,
      ty = 0;

    document.addEventListener("mousemove", function (e) {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + "px";
      cursor.style.top = my + "px";
    });

    var hoverTargets =
      "a,button,.module-card,.cmd-card,.stack-card,.tier-card,.flow-item,.pill,.p-tag,.xana-built-badge";
    document.querySelectorAll(hoverTargets).forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        cursor.classList.add("big");
      });
      el.addEventListener("mouseleave", function () {
        cursor.classList.remove("big");
      });
    });

    function animTrail() {
      tx += (mx - tx) * 0.12;
      ty += (my - ty) * 0.12;
      trail.style.left = tx + "px";
      trail.style.top = ty + "px";
      requestAnimationFrame(animTrail);
    }
    animTrail();
  }

  // ── TICKER ──
  function initTicker() {
    var items = [
      "SYSTEM ONLINE",
      "ALL FEEDS NOMINAL",
      "VERSION PROMETHEUS",
      "LOCAL-FIRST",
      "NO CLOUD REQUIRED",
      "REAL AIRCRAFT",
      "LIVE VESSELS",
      "SATELLITE ORBITS",
      "MEMORY-LINKED AI",
      "OSINT CENTER",
      "ZERO API KEYS",
      "FULLY OFFLINE",
    ];
    var t = document.getElementById("ticker");
    if (!t) return;

    var sep = '<span class="ticker-sep"> ◆ </span>';
    var html = items
      .map(function (i) {
        return '<span class="ticker-item">' + i + "</span>" + sep;
      })
      .join("");
    t.innerHTML = html + html;
  }

  // ── SCROLL REVEAL ──
  function initReveal() {
    var revEls = document.querySelectorAll(".reveal,.reveal-left");
    if (!revEls.length) return;

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e, i) {
          if (e.isIntersecting) {
            setTimeout(function () {
              e.target.classList.add("visible");
            }, i * 60);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
    );

    revEls.forEach(function (el) {
      obs.observe(el);
    });
  }

  // ── COUNTER ANIMATION ──
  function animCount(el, target, fmt) {
    var dur = 1800;
    var start = performance.now();
    function step(now) {
      var t = Math.min((now - start) / dur, 1);
      var ease = 1 - Math.pow(1 - t, 3);
      var v = Math.round(ease * target);
      el.textContent =
        fmt === "k" ? (v / 1000).toFixed(1) + "K" : v.toLocaleString();
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    var counters = document.querySelectorAll("[data-target]");
    if (!counters.length) return;

    var cObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animCount(
              e.target,
              +e.target.dataset.target,
              e.target.dataset.format,
            );
            cObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach(function (c) {
      cObs.observe(c);
    });
  }

  // ── TERMINAL ANIMATION ──
  function initTerminal() {
    var tLines = [
      { cls: "t-p t-cmd", text: "XANA > phantom target=APT29" },
      { cls: "t-dim", text: "[ PHANTOM PROTOCOL INITIATED ]" },
      { cls: "t-dim", text: "» Scanning OSINT feeds..." },
      { cls: "t-dim", text: "» Cross-referencing memory DB..." },
      { cls: "t-hi", text: "→ 14 semantic matches found" },
      { cls: "t-dim", text: "» Building entity graph..." },
      { cls: "t-ok", text: "✓ Analysis complete" },
      { cls: "", text: "" },
      { cls: "t-p t-cmd", text: "XANA > ip 185.220.101.7" },
      { cls: "t-hi", text: "→ RU · Tor Exit Node · HIGH RISK" },
      { cls: "", text: "" },
      { cls: "t-p t-warn", text: "XANA > status" },
      { cls: "t-ok", text: "● All systems nominal" },
      { cls: "t-dim", text: "  feeds: LIVE · memory: 42,814 vectors" },
      { cls: "t-dim", text: "  model: llama3.2 · globe: ACTIVE" },
    ];

    var tb = document.getElementById("terminal-body");
    if (!tb) return;

    var li = 0;
    function addLine() {
      if (li >= tLines.length) {
        var d = document.createElement("div");
        d.innerHTML =
          '<span class="t-p">XANA &gt; </span><span class="cur"></span>';
        d.style.cssText = "opacity:0;animation:fadeIn 0.2s ease forwards";
        tb.appendChild(d);
        return;
      }
      var l = tLines[li++];
      var div = document.createElement("div");
      div.className = "t-line";
      div.style.animationDelay = li * 0.1 + "s";
      if (l.cls) {
        var sp = document.createElement("span");
        sp.className = l.cls;
        sp.textContent = l.text;
        div.appendChild(sp);
      } else {
        div.textContent = l.text;
      }
      tb.appendChild(div);
      setTimeout(addLine, 100);
    }

    var sec = document.getElementById("what");
    if (!sec) return;

    var tObs = new IntersectionObserver(
      function (e) {
        if (e[0].isIntersecting) {
          setTimeout(addLine, 400);
          tObs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    tObs.observe(sec);
  }

  // ── SMOOTH SCROLL FOR NAV ──
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var target = document.querySelector(this.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  // ── INIT ALL ──
  document.addEventListener("DOMContentLoaded", function () {
    initCursor();
    initTicker();
    initReveal();
    initCounters();
    initTerminal();
    initSmoothScroll();
  });
})();
