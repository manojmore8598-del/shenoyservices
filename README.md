# Shenoy Services – Static Website

Professional, responsive, multipage static website for **Shenoy Services**, a Maha e-Seva Kendra in Virar West, Palghar, Maharashtra.

## Tech Stack

- HTML5
- CSS3 (`assets/css/style.css`)
- Bootstrap 5.3 (CDN)
- Bootstrap Icons (CDN)
- Vanilla JavaScript (`assets/js/main.js`)
- Google Fonts: Poppins + Noto Sans Devanagari

No PHP, Node backend, database, or admin panel.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home |
| `about.html` | About Us (Marathi / English toggle) |
| `services.html` | Full service directory |
| `certificates.html` | Certificates & achievements + lightbox |
| `gallery.html` | Photo gallery with filters + lightbox |
| `contact.html` | Contact details, map, WhatsApp enquiry form |

## Folder Structure

```
shenoyservices/
├── index.html
├── about.html
├── services.html
├── certificates.html
├── gallery.html
├── contact.html
├── README.md
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── images/
        ├── logo/
        ├── office/          (add office photos here when available)
        ├── certificates/
        ├── awards/
        ├── gallery/
        └── README.md
```

## How to Run Locally

1. Open the project folder in VS Code.
2. Install the **Live Server** extension (optional but recommended).
3. Right-click `index.html` → **Open with Live Server**.

Or open `index.html` directly in a browser (some features work better via a local server).

Any static server works, for example:

```bash
npx serve .
```

## Business Details Used

- **Phone:** 8421235663
- **Alternate:** 7767849222
- **WhatsApp:** https://wa.me/918421235663
- **Email:** shenoyservices2010@gmail.com
- **GSTIN:** 27AAXCA1985A1ZF
- **Instagram:** https://www.instagram.com/shenoyservices2010/
- **Maps:** coordinates from the supplied Google Maps URL (`19.45413219, 72.81114152`)

## Customisation Tips

1. **Images** – Place new photos in the matching `assets/images/` subfolder and update HTML `src` attributes. Prefer meaningful filenames.
2. **Office gallery** – Add real office photos to `assets/images/office/` and reference them on `gallery.html` / the home preview.
3. **Domain / SEO** – When you have a production domain, add canonical URLs and absolute Open Graph image URLs.
4. **Colours** – Edit CSS variables in `:root` inside `assets/css/style.css`.
5. **Contact form** – Submits by opening WhatsApp with a pre-filled message (no server storage).

## Features Checklist

- Sticky responsive navigation with active page highlight
- Floating Call + WhatsApp buttons
- Marathi / English toggle on About page
- Certificate & gallery lightbox (close via button, Escape, backdrop)
- Gallery category filters
- Contact form validation + WhatsApp message generation
- Footer year set automatically via JavaScript
- LocalBusiness JSON-LD on Home and Contact (verified details only)

## Notes

- Approvals, fees and timelines depend on government departments — the site does not promise guarantees.
- Only genuine supplied Shenoy Services images are used (logo, certificates, award photos).
- The `office/` folder is ready for future photos; it is intentionally empty until real office images are added.
