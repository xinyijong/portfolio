if (location.search.includes("edit")) document.body.classList.add("owner");

/* Shared effects: used on every page */
const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Scroll progress bar + nav hide/show */
const bar = document.createElement("div");
bar.className = "progress";
document.body.appendChild(bar);
const nav = document.querySelector(".nav");
let lastY = 0;
addEventListener("scroll", () => {
  const y = scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  if (nav) nav.classList.toggle("hide", y > lastY + 4 && y > 240);
  if (y < lastY - 4) nav && nav.classList.remove("hide");
  lastY = y;
}, { passive: true });

/* Fade in on scroll */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* Highlight the nav link of the section in view */
const links = [...document.querySelectorAll('.nav ul a[href^="#"]')];
if (links.length) {
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  links.forEach(a => { const s = document.querySelector(a.getAttribute("href")); if (s) spy.observe(s); });
}

/* Smooth fade between pages */
document.addEventListener("click", e => {
  const a = e.target.closest("a[href]");
  if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
  const href = a.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || /^https?:/.test(href)) return;
  e.preventDefault();
  document.body.classList.add("leaving");
  setTimeout(() => { location.href = href; }, 350);
});
addEventListener("pageshow", () => document.body.classList.remove("leaving"));

/* Buttons: click ripple */
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", e => {
    const r = btn.getBoundingClientRect();
    const clip = document.createElement("span");
    clip.className = "ripple-clip";
    const s = document.createElement("span");
    s.className = "ripple";
    s.style.left = e.clientX - r.left - 5 + "px";
    s.style.top = e.clientY - r.top - 5 + "px";
    clip.appendChild(s);
    btn.appendChild(clip);
    setTimeout(() => clip.remove(), 650);
  });
});

/* Sections: stagger their content in when scrolled into view */
const STAGGER = "h2.title, .filters, .about > p, .about > h3, .about > ul, .about > .btn, .skills h3, .skills li, .cards .card, .contact p, .contact .mail, .contact .socials";
const secIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const sec = e.target, items = sec._items;
    sec.classList.add("in");
    secIO.unobserve(sec);
    // drop the delay afterwards so hover effects stay instant
    setTimeout(() => items.forEach(el => el.classList.remove("st")), 400 + items.length * 120 + 900);
  });
}, { threshold: 0.2 });
document.querySelectorAll(".hero ~ section").forEach(sec => {
  const items = [...sec.querySelectorAll(STAGGER)];
  // set the hidden starting state instantly (no transition), so scrolling in starts from fully invisible
  items.forEach((el, i) => { el.style.transition = "none"; el.classList.add("st"); el.style.setProperty("--i", i); });
  void sec.offsetHeight;
  items.forEach(el => { el.style.transition = ""; });
  sec._items = items;
  secIO.observe(sec);
});
