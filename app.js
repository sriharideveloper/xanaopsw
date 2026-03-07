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
      "a,button,.module-card,.cmd-card,.stack-card,.tier-card,.flow-item,.pill,.p-tag,.xana-built-badge,.orb-node,.orb-nav-btn,.share-btn";
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

  // ── PROMETHEUS ORB GALLERY ──
  function initOrbGallery() {
    var galleryData = [
      {
        module: "DASHBOARD",
        title: "PROMETHEUS DASHBOARD",
        src: "https://iili.io/qoOhZrB.md.png",
        desc: "The main command center. All modules, live feeds, and your AI assistant — one screen, zero cloud.",
      },
      {
        module: "GLOBE",
        title: "LIVE 3D GLOBE",
        src: "https://iili.io/qoOj2BR.md.png",
        desc: "Real aircraft transponders, vessel positions, and satellite tracks rendered on a live 3D globe. All free data, zero API keys.",
      },
      {
        module: "OSINT",
        title: "OSINT CENTER",
        src: "https://iili.io/qoOjzQf.md.png",
        desc: "World news, CVE feeds, IP/domain recon, crypto markets, and weather. Your open-source intelligence workstation.",
      },
      {
        module: "PHANTOM",
        title: "PHANTOM PROTOCOL",
        src: "https://iili.io/qoOhQ1V.md.png",
        desc: "Autonomous multi-source investigation. Give it a target. Walk away. Come back to a full briefing.",
      },
      {
        module: "ORACLE",
        title: "AI ORACLE CHAT",
        src: "https://iili.io/qoOhLqQ.md.png",
        desc: "Conversational AI with real memory. It retrieves relevant chunks from your entire history and reasons over them.",
      },
      {
        module: "NEURAL MAP",
        title: "NEURAL MAP",
        src: "https://iili.io/qoOhDdP.md.png",
        desc: "3D semantic topology of your conversation history. See your knowledge space as an explorable landscape.",
      },
      {
        module: "ARCHIVE",
        title: "MEMORY ARCHIVE",
        src: "https://iili.io/qoOjJLv.md.png",
        desc: "Raw semantic vector search. Query your memory directly — find conversations you forgot you had.",
      },
      {
        module: "DOSSIER",
        title: "DOSSIER MODULE",
        src: "https://iili.io/qoOjf2I.md.png",
        desc: "AI-generated intelligence profile compiled from your memory. It knows things about you that you've forgotten.",
      },
      {
        module: "CHRONOS",
        title: "CHRONOS TIMELINE",
        src: "https://iili.io/qoOjTB4.md.png",
        desc: "Temporal pattern analysis. Discover what you cared about — and when it shifted.",
      },
    ];

    var nodes = document.querySelectorAll(".orb-node");
    var navBtns = document.querySelectorAll(".orb-nav-btn");
    var viewerImg = document.querySelector(".orb-viewer-img");
    var viewerTitle = document.querySelector(".orb-viewer-title");
    var viewerModule = document.querySelector(".orb-viewer-module");
    var viewerDesc = document.querySelector(".orb-viewer-desc");

    if (!nodes.length || !viewerImg) return;

    function setActive(idx) {
      var data = galleryData[idx];
      if (!data) return;

      // update nodes
      nodes.forEach(function (n) {
        n.classList.remove("active");
      });
      if (nodes[idx]) nodes[idx].classList.add("active");

      // update nav dots
      navBtns.forEach(function (b) {
        b.classList.remove("active");
      });
      if (navBtns[idx]) navBtns[idx].classList.add("active");

      // animate viewer transition
      viewerImg.style.opacity = "0";
      setTimeout(function () {
        viewerImg.src = data.src;
        viewerImg.alt = data.title;
        viewerTitle.textContent = data.title;
        viewerModule.textContent = data.module;
        viewerDesc.textContent = data.desc;
        viewerImg.style.opacity = "1";
      }, 250);
    }

    // click handlers for orbital nodes
    nodes.forEach(function (node) {
      node.addEventListener("click", function () {
        setActive(+this.dataset.index);
      });
    });

    // click handlers for nav dots
    navBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setActive(+this.dataset.index);
      });
    });

    // auto-advance every 5 seconds
    var currentIdx = 0;
    var autoTimer = setInterval(function () {
      currentIdx = (currentIdx + 1) % galleryData.length;
      setActive(currentIdx);
    }, 5000);

    // pause auto-advance on user interaction
    var gallery = document.querySelector(".orb-gallery-section");
    if (gallery) {
      gallery.addEventListener("click", function () {
        clearInterval(autoTimer);
        // find current active
        nodes.forEach(function (n, i) {
          if (n.classList.contains("active")) currentIdx = i;
        });
      });
    }
  }

  // ── INIT ALL ──
  document.addEventListener("DOMContentLoaded", function () {
    initCursor();
    initTicker();
    initReveal();
    initCounters();
    initTerminal();
    initSmoothScroll();
    initOrbGallery();
  });
})();
