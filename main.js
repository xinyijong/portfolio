const fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Project cards ---------- */
const cards = document.getElementById("cards");
cards.innerHTML = PROJECTS.map((p, i) => `
  <a class="card" href="#projects" role="button" data-id="${p.id}" data-cats="${p.category.join("|")}" aria-haspopup="dialog">
    <div class="card-in">
      <div class="cover">
        <span class="num">0${i + 1}</span>
        <img src="${p.cover}" alt="${p.title}" onerror="this.remove()">
      </div>
      <div class="body">
        <h3>${p.title}</h3>
        <p>${p.summary}</p>
        <div class="tags">
          ${p.tags.map((t, j) => `<span class="tag ${j % 2 ? "alt" : ""}">${t}</span>`).join("")}
        </div>
      </div>
    </div>
  </a>`).join("");

/* ---------- Category filter ---------- */
const CATEGORIES = ["All", "Software Development", "UI Design", "Data Visualisation", "AI"];
const filters = document.getElementById("filters");
const noMatch = document.getElementById("noMatch");
filters.innerHTML = CATEGORIES.map((c, i) =>
  `<button type="button" class="chip ${i % 2 ? "alt" : ""}" data-cat="${c}" aria-pressed="${c === "All"}">${c}</button>`).join("");
function render() {
  let shown = 0;
  [...cards.children].forEach(c => {
    const match = cat === "All" || c.dataset.cats.split("|").includes(cat);
    c.hidden = !match;
    if (match) { shown++; c.classList.remove("pop"); void c.offsetWidth; c.classList.add("pop"); }
  });
  noMatch.hidden = shown > 0;
}
let cat = "All";
filters.addEventListener("click", e => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  filters.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c === chip));
  cat = chip.dataset.cat;
  render();
});

/* ---------- Project pop-up ---------- */
const modal = document.getElementById("modal");
let opener = null;


function openProject(p, from) {
  opener = from;
  document.getElementById("m-title").textContent = p.title;
  document.getElementById("m-tools").textContent = p.tools;
  document.getElementById("m-intro").innerHTML = (p.details || []).map(sec =>
    `<h4>${sec.title}</h4><ul>${sec.points.map(x => `<li>${x}</li>`).join("")}</ul>`).join("");
  document.getElementById("m-tags").innerHTML =
    p.tags.map((t, j) => `<span class="tag ${j % 2 ? "alt" : ""}">${t}</span>`).join("");

  // links row: only the ones that exist
  const links = document.getElementById("m-links");
  links.innerHTML = "";
  const EXT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4.5"/><path d="M14 4h6v6M20 4l-9 9"/></svg>';
  const DL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5"/><path d="M4 17v1.5A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V17"/></svg>';
  const GH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>';
  
  [
  ["demo", () => EXT + (p.demoLabel || "Live Project")],
  ["apk", () => DL + "Download APK"],
  ["github", () => GH + "GitHub"]
].forEach(([key, label]) => {
    if (!p[key]) return;
    const a = document.createElement("a");
    a.className = "m-link";
    a.href = p[key];
    a.target = "_blank";
    a.rel = "noopener";
    a.innerHTML = label();
    links.appendChild(a);
  });
  links.hidden = !links.children.length;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modal.querySelector(".m-x").focus();
}
function closeProject() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (opener) opener.focus({ preventScroll: true });
}

cards.addEventListener("click", e => {
  const card = e.target.closest(".card");
  if (!card) return;
  e.preventDefault(); // keep the page where it is
  openProject(PROJECTS.find(x => x.id === card.dataset.id), card);
});
modal.addEventListener("click", e => { if (e.target === modal || e.target.closest(".m-x")) closeProject(); });
addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("open")) closeProject(); });

/* 3D tilt + cursor light on cards */
if (fineHover && !reduced) {
  document.querySelectorAll(".card").forEach(card => {
    const inner = card.querySelector(".card-in");
    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      inner.classList.add("moving");
      inner.style.transform = `rotateX(${(0.5 - y) * 10}deg) rotateY(${(x - 0.5) * 12}deg) translateY(-8px)`;
      inner.style.setProperty("--mx", x * 100 + "%");
      inner.style.setProperty("--my", y * 100 + "%");
    });
    card.addEventListener("pointerleave", () => {
      inner.classList.remove("moving");
      inner.style.transform = "";
    });
  });
}

/* ---------- Hero: split name into letters ---------- */
document.querySelectorAll("[data-split]").forEach((word, w) => {
  const text = word.textContent;
  word.textContent = "";
  [...text].forEach((ch, i) => {
    const s = document.createElement("span");
    s.className = "ch";
    s.style.setProperty("--i", i + w * 4);
    if (ch === "i") { s.textContent = "\u0131"; s.classList.add("dotless"); } // dotless i, the dot is drawn as a diamond in CSS
    else s.textContent = ch === " " ? "\u00A0" : ch;
    word.appendChild(s);
  });
});

/* ---------- Hero: typing role ---------- */
const roleEl = document.getElementById("roleWord");
if (roleEl && !reduced) {
  const words = ["UI/UX designer", "visual thinker", "problem solver"];
  let w = 0, c = words[0].length, deleting = true;
  (function tick() {
    const word = words[w];
    c += deleting ? -1 : 1;
    roleEl.textContent = word.slice(0, c);
    let delay = deleting ? 40 : 90;
    if (!deleting && c === word.length) { delay = 1700; deleting = true; }
    else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 300; }
    setTimeout(tick, delay);
  })();
}

/* ---------- Interactive 3D ID card ---------- */
const flip = document.getElementById("flip");
const tilt = document.getElementById("tilt");
const stage = document.querySelector(".id-stage");

// Give the card real thickness: a stack of layers between the two faces
for (let z = -4; z <= 4; z++) {
  const edge = document.createElement("div");
  edge.className = "edge" + (z === -4 ? " shadow" : "");
  edge.style.transform = `translateZ(${z}px)`;
  flip.prepend(edge);
}

let kick = () => {}; // set by the lanyard physics below
let busy = false;     // true while the card is flipping, so cursor tilt pauses

// Drag to spin, click to flip
let rot = 0, startX = 0, startRot = 0, down = false, moved = false;
const setRot = v => { rot = v; flip.style.setProperty("--flip", v + "deg"); };
const snap = () => Math.round(rot / 180) * 180;

flip.addEventListener("pointerdown", e => {
  if (e.target.closest(".upload")) return;
  down = true; moved = false; startX = e.clientX; startRot = rot;
  flip.classList.add("dragging");
  flip.setPointerCapture(e.pointerId);
});
flip.addEventListener("pointermove", e => {
  if (!down) return;
  const dx = e.clientX - startX;
  if (Math.abs(dx) > 4) moved = true;
  if (moved) setRot(startRot + dx * 0.6);
});
const release = () => {
  if (!down) return;
  down = false;
  flip.classList.remove("dragging");
  busy = true; setTimeout(() => busy = false, 950);
  ["--ry", "--rx"].forEach(v => tilt.style.setProperty(v, "0deg"));
  setRot(moved ? snap() : snap() + 180);
  kick((Math.random() < .5 ? -1 : 1) * (moved ? 0.4 : 0.25)); // the lanyard sways when the card is handled
};
flip.addEventListener("pointerup", release);
flip.addEventListener("pointercancel", release);
flip.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setRot(snap() + 180); }
});

// Card tilts with the cursor
if (fineHover && !reduced) {
  stage.addEventListener("pointermove", e => {
    if (busy || down) return;
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    tilt.style.setProperty("--ry", (x - 0.5) * 16 + "deg");
    tilt.style.setProperty("--rx", -(y - 0.5) * 12 + "deg");
  });
  stage.addEventListener("pointerleave", () => {
    ["--ry", "--rx"].forEach(v => tilt.style.setProperty(v, "0deg"));
  });
}

// Photos: use assets/id-front.jpg and assets/id-back.jpg, or upload (saved in this browser)
["front", "back"].forEach(side => {
  const img = document.getElementById("img-" + side);
  const box = img.parentElement;
  const input = box.querySelector("input");
  const label = box.querySelector(".upload");

  img.addEventListener("load", () => box.classList.add("has-img"));
  img.addEventListener("error", () => box.classList.remove("has-img"));

  let saved = null;
  try { saved = localStorage.getItem("id-" + side); } catch (e) {}
  img.src = saved || `assets/id-${side}.jpg`;

  label.addEventListener("click", e => e.stopPropagation());
  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      img.src = reader.result;
      try { localStorage.setItem("id-" + side, reader.result); } catch (e) {}
    };
    reader.readAsDataURL(file);
  });
});

/* ---------- Lanyard: drops in, snaps taut, then swings like a pendulum and settles ---------- */
const swingEl = document.querySelector(".swing");
if (swingEl && !reduced) {
  const W = 2 * Math.PI / 1.05;   // swing period, about a second
  const ZETA = 0.24;              // damping: a few visible swings, then still
  const G = 1500;                 // fall acceleration (px/s^2)
  const drop = swingEl.offsetHeight + 260;
  let y = -drop, vy = 0;          // vertical: free fall, then the strap stretches and recoils
  let ang = -0.1, vel = 0.05;    // rotation (rad): tilted while falling
  let falling = true, running = false, last = 0, wait = 380;

  const draw = () => { swingEl.style.transform = `translateY(${y}px) rotate(${ang}rad)`; };
  const frame = t => {
    const dt = Math.min((t - last) / 1000 || 0.016, 0.034); last = t;
    if (wait > 0) { wait -= dt * 1000; draw(); return requestAnimationFrame(frame); }
    if (falling) {
      vy += G * dt; y += vy * dt; ang += vel * dt;
      if (y >= 0) {                       // strap goes taut: the card is whipped sideways
        y = 0; falling = false;
        vel = 1.0; vy *= 0.03;            // swing impulse + a little stretch
      }
    } else {
      const steps = 4, h = dt / steps;
      for (let i = 0; i < steps; i++) {
        vel += (-W * W * ang - 2 * ZETA * W * vel) * h; ang += vel * h;
        vy += (-900 * y - 26 * vy) * h;   y += vy * h;
      }
    }
    draw();
    if (!falling && Math.abs(ang) < 5e-4 && Math.abs(vel) < 4e-3 && Math.abs(y) < .05) {
      ang = 0; y = 0; vel = 0; vy = 0; running = false; swingEl.style.transform = ""; return;
    }
    requestAnimationFrame(frame);
  };
  const start = () => { if (!running) { running = true; last = performance.now(); requestAnimationFrame(frame); } };
  kick = v => { if (falling) return; vel += v; start(); };
  draw(); start();
}

