/**
 * Shenoy Services – Shared JavaScript
 * Handles year stamp, language toggle, lightbox, gallery filters, contact form.
 */
(function () {
  "use strict";

  const WHATSAPP_NUMBER = "918421235663";

  /* ---------- Current year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Sticky header shadow (optional polish) ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Language panels (About page) ---------- */
  const langToggle = document.querySelector("[data-lang-toggle]");
  if (langToggle) {
    const buttons = langToggle.querySelectorAll("button[data-lang]");
    const panels = document.querySelectorAll("[data-lang-panel]");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const lang = btn.getAttribute("data-lang");
        buttons.forEach(function (b) {
          b.classList.toggle("active", b === btn);
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
        panels.forEach(function (panel) {
          const match = panel.getAttribute("data-lang-panel") === lang;
          panel.hidden = !match;
        });
      });
    });
  }

  /* ---------- Gallery filters ---------- */
  const filterBar = document.querySelector("[data-filter-bar]");
  if (filterBar) {
    const buttons = filterBar.querySelectorAll("[data-filter]");
    const items = document.querySelectorAll("[data-category]");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const filter = btn.getAttribute("data-filter");
        buttons.forEach(function (b) {
          b.classList.toggle("active", b === btn);
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
        items.forEach(function (item) {
          const cat = item.getAttribute("data-category");
          const show = filter === "all" || cat === filter;
          item.hidden = !show;
        });
      });
    });
  }

  /* ---------- Lightbox ---------- */
  const lightbox = document.querySelector("[data-lightbox]");
  if (lightbox) {
    const imgEl = lightbox.querySelector("[data-lightbox-img]");
    const captionEl = lightbox.querySelector("[data-lightbox-caption]");
    const closeBtn = lightbox.querySelector("[data-lightbox-close]");
    let lastFocus = null;

    function openLightbox(src, alt, caption) {
      lastFocus = document.activeElement;
      imgEl.src = src;
      imgEl.alt = alt || "";
      captionEl.textContent = caption || "";
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");
      imgEl.removeAttribute("src");
      if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus();
      }
    }

    document.querySelectorAll("[data-lightbox-trigger]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        const src = trigger.getAttribute("data-full") || trigger.querySelector("img")?.src;
        const img = trigger.querySelector("img");
        const alt = img ? img.alt : "";
        const caption =
          trigger.getAttribute("data-caption") ||
          trigger.closest(".gallery-item")?.querySelector(".gallery-caption h3")?.textContent ||
          "";
        if (src) openLightbox(src, alt, caption);
      });

      trigger.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          trigger.click();
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("open")) {
        closeLightbox();
      }
    });
  }

  /* ---------- Contact form → WhatsApp ---------- */
  const form = document.querySelector("[data-contact-form]");
  if (form) {
    const alertBox = document.querySelector("[data-form-alert]");
    const nameInput = form.querySelector("#contactName");
    const phoneInput = form.querySelector("#contactPhone");
    const serviceInput = form.querySelector("#contactService");
    const messageInput = form.querySelector("#contactMessage");

    function showAlert(type, text) {
      if (!alertBox) return;
      alertBox.className = "alert alert-" + type + " alert-form show";
      alertBox.textContent = text;
      alertBox.hidden = false;
    }

    function sanitize(str) {
      return String(str || "")
        .replace(/[<>]/g, "")
        .replace(/\s+/g, " ")
        .trim();
    }

    function isValidPhone(phone) {
      const digits = phone.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 13;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = sanitize(nameInput.value);
      const phone = sanitize(phoneInput.value);
      const service = sanitize(serviceInput.value);
      const message = sanitize(messageInput.value);

      form.querySelectorAll(".is-invalid").forEach(function (el) {
        el.classList.remove("is-invalid");
      });

      let valid = true;

      if (name.length < 2) {
        nameInput.classList.add("is-invalid");
        valid = false;
      }
      if (!isValidPhone(phone)) {
        phoneInput.classList.add("is-invalid");
        valid = false;
      }
      if (!service) {
        serviceInput.classList.add("is-invalid");
        valid = false;
      }
      if (message.length < 5) {
        messageInput.classList.add("is-invalid");
        valid = false;
      }

      if (!valid) {
        showAlert("danger", "Please fill all required fields with valid details.");
        return;
      }

      const text = [
        "Hello Shenoy Services,",
        "",
        "Name: " + name,
        "Phone: " + phone,
        "Service: " + service,
        "Message: " + message
      ].join("\n");

      showAlert(
        "success",
        "Thank you. WhatsApp will open with your enquiry. Please send the message to complete your request."
      );

      window.open(
        "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text),
        "_blank",
        "noopener,noreferrer"
      );
    });
  }
})();
