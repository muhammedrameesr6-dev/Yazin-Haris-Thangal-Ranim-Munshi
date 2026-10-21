// Wedding site data & state
const weddingConfig = {
  groom: {
    name: "Yazin",
    fullName: "Yazin Haris Thangal",
    father: "Mr. Haris Jasin Thangal",
    mother: "Mrs. Shahana Haris",
    residence: "Raihan, Ziyarat Nagar-81, Mangad P.O, Kollam",
    grandparents: "Grandson of Mr. Sayyid Jasin Thangal & Mrs. Fathima J Thangal and Mr. Sulaiman Kunju & Mrs. Raheena Beevi"
  },
  bride: {
    name: "Ranim",
    fullName: "Ranim Munshi",
    father: "Mr. Mohamed Irfan Munshi",
    mother: "Mrs. Maria Irfan",
    residence: "RCHS, Raheja Complex, Versova, Mumbai"
  },
  compliments: "Descendants of Raihan",
  date: "2026-12-21T17:00:00",
  dateLabel: "21 • DECEMBER • 2026",
  timeLabel: "Arrive by – 5:00 PM",
  venue: {
    name: "Vismaya Convention Center",
    address: "Kollam - Elampalloor Rd, Kundara",
    city: "Kollam, Kerala 691501",
    maps: "https://maps.google.com/?q=Vismaya+Convention+Centre+Kundara+Kollam"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initAudio();
  initPetals(12);
  initHeaderScroll();
  initMobileMenu();
  initInvitationUnlock();
  initCountdown();
  initScrollReveals();
  initRSVPForm();
  initScratchCard();
});

/* ================= Audio Player ================= */
function initAudio() {
  const audio = document.getElementById("weddingAudio");
  const musicToggle = document.getElementById("musicToggle");
  if (!audio) return;

  audio.volume = 0.3;

  function attemptPlay() {
    audio.play().then(() => {
      if (musicToggle) {
        musicToggle.classList.remove("paused");
        musicToggle.classList.add("playing");
        const statusText = musicToggle.querySelector(".music-status");
        if (statusText) statusText.textContent = "Music On";
      }
      removeListeners();
    }).catch(() => {
      // Autoplay blocked until gesture
    });
  }

  function onUserGesture() {
    attemptPlay();
  }

  function removeListeners() {
    window.removeEventListener("pointerdown", onUserGesture);
    window.removeEventListener("touchstart", onUserGesture);
    window.removeEventListener("keydown", onUserGesture);
  }

  window.addEventListener("pointerdown", onUserGesture);
  window.addEventListener("touchstart", onUserGesture);
  window.addEventListener("keydown", onUserGesture);

  // Attempt initial play
  attemptPlay();

  if (musicToggle) {
    musicToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      removeListeners();
      if (audio.paused) {
        audio.play().then(() => {
          musicToggle.classList.remove("paused");
          musicToggle.classList.add("playing");
          const statusText = musicToggle.querySelector(".music-status");
          if (statusText) statusText.textContent = "Music On";
        });
      } else {
        audio.pause();
        musicToggle.classList.remove("playing");
        musicToggle.classList.add("paused");
        const statusText = musicToggle.querySelector(".music-status");
        if (statusText) statusText.textContent = "Music Off";
      }
    });
  }
}

/* ================= Petals Animation ================= */
function initPetals(count = 12) {
  const container = document.getElementById("petalContainer");
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    const left = Math.random() * 100;
    const size = 8 + Math.random() * 10;
    const duration = 12 + Math.random() * 12;
    const delay = -(Math.random() * 20);
    const drift = `${(Math.random() - 0.5) * 160}px`;
    const opacity = 0.25 + Math.random() * 0.4;

    petal.style.left = `${left}%`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;
    petal.style.setProperty("--petal-drift", drift);
    petal.style.setProperty("--petal-opacity", opacity);

    container.appendChild(petal);
  }
}

/* ================= Header on Scroll ================= */
function initHeaderScroll() {
  const header = document.getElementById("mainHeader");
  if (!header) return;

  function update() {
    if (window.scrollY > 40) {
      header.classList.add("border-gold/20", "bg-ivory/85", "backdrop-blur-md");
      header.classList.remove("border-transparent");
    } else {
      header.classList.remove("border-gold/20", "bg-ivory/85", "backdrop-blur-md");
      header.classList.add("border-transparent");
    }
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
}

/* ================= Mobile Menu ================= */
function initMobileMenu() {
  const openBtn = document.getElementById("openMenuBtn");
  const closeBtn = document.getElementById("closeMenuBtn");
  const menu = document.getElementById("mobileMenu");
  const menuLinks = menu ? menu.querySelectorAll("a") : [];

  function openMenu() {
    if (!menu) return;
    menu.classList.remove("pointer-events-none", "opacity-0");
    menu.classList.add("pointer-events-auto", "opacity-100");
    document.body.style.overflow = "hidden";
    if (openBtn) openBtn.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("pointer-events-auto", "opacity-100");
    menu.classList.add("pointer-events-none", "opacity-0");
    document.body.style.overflow = "";
    if (openBtn) openBtn.setAttribute("aria-expanded", "false");
  }

  if (openBtn) openBtn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
      unlockInvitation();
    });
  });
}

/* ================= Invitation Unveil ================= */
let isUnlocked = false;

function unlockInvitation() {
  if (isUnlocked) return;
  isUnlocked = true;
  const sections = document.getElementById("invitationSections");
  if (sections) {
    sections.classList.remove("hidden");
  }
  // Re-observe newly visible reveal items
  initScrollReveals();
  setTimeout(() => {
    initScratchCard();
  }, 100);

  const audio = document.getElementById("weddingAudio");
  if (audio && audio.paused) {
    audio.play().catch(() => {});
  }
}

function initInvitationUnlock() {
  const btn = document.getElementById("openInvitationBtn");
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      unlockInvitation();
      const target = document.getElementById("invitation");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  // Also check if any nav link is clicked or URL has hash
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href !== "#home") {
        unlockInvitation();
      }
    });
  });

  if (window.location.hash && window.location.hash !== "#home") {
    unlockInvitation();
  }
}

/* ================= Countdown Timer ================= */
function initCountdown() {
  const targetDate = new Date(weddingConfig.date).getTime();

  function calc() {
    const diff = Math.max(0, targetDate - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  }

  function update() {
    const c = calc();
    const dEl = document.getElementById("cd-days");
    const hEl = document.getElementById("cd-hours");
    const mEl = document.getElementById("cd-minutes");
    const sEl = document.getElementById("cd-seconds");

    if (dEl) dEl.textContent = String(c.days).padStart(2, "0");
    if (hEl) hEl.textContent = String(c.hours).padStart(2, "0");
    if (mEl) mEl.textContent = String(c.minutes).padStart(2, "0");
    if (sEl) sEl.textContent = String(c.seconds).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

/* ================= Scroll Reveals ================= */
let observer;

function initScrollReveals() {
  if (observer) {
    observer.disconnect();
  }

  const reveals = document.querySelectorAll(".reveal:not(.is-visible)");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ================= RSVP Form Handler ================= */
function initRSVPForm() {
  const form = document.getElementById("rsvpForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("rsvpName")?.value.trim() || "";
    const contact = document.getElementById("rsvpContact")?.value.trim() || "Not provided";
    const attendance = form.querySelector('input[name="attendance"]:checked')?.value || "Joyfully Accepts";
    const guests = document.getElementById("rsvpGuests")?.value || "2 People";
    const message = document.getElementById("rsvpMessage")?.value.trim() || "None";

    const targetEmail = "Yazinranimwedding@gmail.com";
    const subject = encodeURIComponent(`Wedding RSVP: ${attendance} - ${name}`);
    const bodyText = 
`Wedding RSVP for Yazin Haris Thangal & Ranim Munshi
====================================================
Guest Name: ${name}
Attendance: ${attendance}
Number of Guests: ${guests}
Contact (Phone/Email): ${contact}
Wishes / Message: ${message}

Date of Wedding: 21st December 2026, 5:00 PM
Venue: Vismaya Convention Center, Kundara, Kollam
====================================================`;

    const body = encodeURIComponent(bodyText);
    const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

    const successEl = document.getElementById("rsvpSuccess");
    if (successEl) {
      successEl.classList.remove("hidden");
    }

    // Trigger email client
    window.location.href = mailtoUrl;
  });
}

/* ================= Scratch Card Implementation ================= */
let scratchInitialized = false;

function initScratchCard() {
  const canvas = document.getElementById("scratchCanvas");
  const wrapper = document.getElementById("scratchCardWrapper");
  const instructions = document.getElementById("scratchInstructions");
  const autoRevealBtn = document.getElementById("autoRevealBtn");
  if (!canvas || !wrapper) return;

  const rect = canvas.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;

  const dpr = window.devicePixelRatio || 1;
  const width = Math.round(rect.width);
  const height = Math.round(rect.height);

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.scale(dpr, dpr);

  drawFoilLayer(ctx, width, height);

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let strokeCount = 0;
  let isFullyRevealed = false;

  function getPos(e) {
    const cRect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - cRect.left,
      y: clientY - cRect.top
    };
  }

  function startScratch(e) {
    if (isFullyRevealed) return;
    isDrawing = true;
    const pos = getPos(e);
    lastX = pos.x;
    lastY = pos.y;
    scratch(pos.x, pos.y);
  }

  function scratch(x, y) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = Math.max(34, width * 0.1);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastX = x;
    lastY = y;

    strokeCount++;
    if (strokeCount % 12 === 0) {
      checkScratchPercentage();
    }
  }

  function moveScratch(e) {
    if (!isDrawing || isFullyRevealed) return;
    if (e.cancelable) e.preventDefault();
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  }

  function stopScratch() {
    if (!isDrawing) return;
    isDrawing = false;
    checkScratchPercentage();
  }

  function checkScratchPercentage() {
    if (isFullyRevealed) return;

    // Sample pixels across grid
    const sampleCols = 25;
    const sampleRows = 16;
    let transparentCount = 0;
    const totalSamples = sampleCols * sampleRows;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    const stepX = Math.floor(canvas.width / sampleCols);
    const stepY = Math.floor(canvas.height / sampleRows);

    for (let r = 0; r < sampleRows; r++) {
      for (let c = 0; c < sampleCols; c++) {
        const px = c * stepX + Math.floor(stepX / 2);
        const py = r * stepY + Math.floor(stepY / 2);
        const idx = (py * canvas.width + px) * 4 + 3;
        if (data[idx] < 128) {
          transparentCount++;
        }
      }
    }

    const percent = transparentCount / totalSamples;
    if (percent > 0.45) {
      revealCardFully();
    }
  }

  function revealCardFully() {
    if (isFullyRevealed) return;
    isFullyRevealed = true;

    canvas.style.opacity = "0";
    canvas.style.pointerEvents = "none";
    wrapper.classList.add("revealed");

    if (instructions) {
      instructions.innerHTML = "✨ <strong>Date Revealed!</strong> We look forward to celebrating with you. ✨";
      instructions.classList.add("text-burgundy");
    }

    if (autoRevealBtn) {
      autoRevealBtn.style.display = "none";
    }

    createConfettiSparkles();
  }

  function createConfettiSparkles() {
    const rect = wrapper.getBoundingClientRect();
    const container = document.body;

    for (let i = 0; i < 30; i++) {
      const sparkle = document.createElement("span");
      sparkle.style.position = "fixed";
      sparkle.style.left = `${rect.left + rect.width / 2}px`;
      sparkle.style.top = `${rect.top + rect.height / 2}px`;
      sparkle.style.width = `${4 + Math.random() * 6}px`;
      sparkle.style.height = `${4 + Math.random() * 6}px`;
      sparkle.style.backgroundColor = Math.random() > 0.5 ? "#b08a45" : "#6e1728";
      sparkle.style.borderRadius = "50%";
      sparkle.style.pointerEvents = "none";
      sparkle.style.zIndex = "999";
      sparkle.style.transition = "all 0.9s cubic-bezier(0.25, 1, 0.5, 1)";
      container.appendChild(sparkle);

      const angle = Math.random() * Math.PI * 2;
      const dist = 50 + Math.random() * 120;
      const destX = Math.cos(angle) * dist;
      const destY = Math.sin(angle) * dist;

      requestAnimationFrame(() => {
        sparkle.style.transform = `translate(${destX}px, ${destY}px) scale(0)`;
        sparkle.style.opacity = "0";
      });

      setTimeout(() => sparkle.remove(), 1000);
    }
  }

  // Event Listeners
  canvas.addEventListener("mousedown", startScratch);
  window.addEventListener("mousemove", moveScratch);
  window.addEventListener("mouseup", stopScratch);

  canvas.addEventListener("touchstart", startScratch, { passive: false });
  canvas.addEventListener("touchmove", moveScratch, { passive: false });
  window.addEventListener("touchend", stopScratch);

  if (autoRevealBtn) {
    autoRevealBtn.addEventListener("click", () => {
      revealCardFully();
    });
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    if (!isFullyRevealed) {
      initScratchCard();
    }
  });
}

function drawFoilLayer(ctx, w, h) {
  ctx.save();

  // 1. Base metallic gold gradient
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, "#c9a45e");
  grad.addColorStop(0.25, "#f7ebc8");
  grad.addColorStop(0.5, "#af812c");
  grad.addColorStop(0.75, "#faedcd");
  grad.addColorStop(1, "#8e651e");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // 2. High-gloss specular reflection diagonal band
  const specular = ctx.createLinearGradient(w * 0.15, 0, w * 0.85, h);
  specular.addColorStop(0.35, "rgba(255, 255, 255, 0)");
  specular.addColorStop(0.5, "rgba(255, 255, 255, 0.45)");
  specular.addColorStop(0.65, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = specular;
  ctx.fillRect(0, 0, w, h);

  // 3. Guilloche security wavy curves (from reference screenshot)
  ctx.strokeStyle = "rgba(100, 65, 15, 0.16)";
  ctx.lineWidth = 0.9;
  for (let i = 0; i < 16; i++) {
    ctx.beginPath();
    const yBase = (h / 16) * i;
    for (let x = 0; x <= w; x += 4) {
      const y = yBase + Math.sin((x / w) * Math.PI * 3.5 + i * 0.45) * (h * 0.22);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // 4. Subtle golden foil border & corner brackets
  ctx.strokeStyle = "rgba(255, 255, 255, 0.65)";
  ctx.lineWidth = 1.6;
  const bSize = Math.min(22, w * 0.08);
  const pad = 12;

  // Top-Left
  ctx.beginPath();
  ctx.moveTo(pad, pad + bSize);
  ctx.lineTo(pad, pad);
  ctx.lineTo(pad + bSize, pad);
  ctx.stroke();

  // Top-Right
  ctx.beginPath();
  ctx.moveTo(w - pad - bSize, pad);
  ctx.lineTo(w - pad, pad);
  ctx.lineTo(w - pad, pad + bSize);
  ctx.stroke();

  // Bottom-Left
  ctx.beginPath();
  ctx.moveTo(pad, h - pad - bSize);
  ctx.lineTo(pad, h - pad);
  ctx.lineTo(pad + bSize, h - pad);
  ctx.stroke();

  // Bottom-Right
  ctx.beginPath();
  ctx.moveTo(w - pad - bSize, h - pad);
  ctx.lineTo(w - pad, h - pad);
  ctx.lineTo(w - pad, h - pad - bSize);
  ctx.stroke();

  // 5. Center Ornament (matches screenshot Image 1)
  const cx = w / 2;
  const cy = h / 2 - 14;

  // Horizontal wings
  ctx.strokeStyle = "rgba(75, 45, 10, 0.55)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(cx - 72, cy);
  ctx.lineTo(cx - 18, cy);
  ctx.moveTo(cx + 18, cy);
  ctx.lineTo(cx + 72, cy);
  ctx.stroke();

  // Central ornate clock/sunburst circle
  ctx.beginPath();
  ctx.arc(cx, cy, 11, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, 7.5, 0, Math.PI * 2);
  ctx.stroke();

  // Clock tick marks
  for (let a = 0; a < 12; a++) {
    const ang = (a / 12) * Math.PI * 2;
    const px = cx + Math.cos(ang) * 9.2;
    const py = cy + Math.sin(ang) * 9.2;
    ctx.fillStyle = "rgba(75, 45, 10, 0.75)";
    ctx.fillRect(px - 0.75, py - 0.75, 1.5, 1.5);
  }

  // 6. Text: "SCRATCH HERE" & "to reveal the day"
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillStyle = "#3e2400";
  ctx.font = `600 ${Math.max(12, Math.round(w * 0.038))}px 'Jost', sans-serif`;
  ctx.fillText("SCRATCH HERE", cx, cy + 24);

  ctx.fillStyle = "#553200";
  ctx.font = `italic ${Math.max(11, Math.round(w * 0.033))}px 'Cormorant Garamond', serif`;
  ctx.fillText("to reveal the day", cx, cy + 42);

  ctx.restore();
}
