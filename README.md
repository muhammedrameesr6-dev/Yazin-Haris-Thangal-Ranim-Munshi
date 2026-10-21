# Jisam & Fameedha — Wedding Invitation Website

A clone of [muslimweding.vercel.app](https://muslimweding.vercel.app), featuring Islamic wedding invitation styling, typography, interactive audio playback, falling petal animations, responsive navigation, countdown timer, venue details with Google Maps embed, and closing Dua.

## Features

- **Typography & Theme**:
  - Fonts: Cormorant Garamond (Serif), Jost (Sans-serif), Amiri (Arabic Calligraphy).
  - Color Palette: Burgundy (`#6e1728`), Deep Burgundy (`#4a0f1c`), Gold (`#b08a45`), Champagne (`#d8c39a`), Ivory (`#faf7f2`), and Warm White (`#fffdf9`).
  - Textures: Vintage paper texture and subtle geometric arabesque patterns.
- **Hero & Open Invitation**:
  - Double gold borders with floral corner ornaments.
  - Animated falling petals with variable speed, rotation, and drift.
  - "Open Invitation" button unveiling the ceremony sections and scrolling smoothly.
- **Audio Experience**:
  - Plays the authentic background music (`audio/anlatmam.mp3`) with gentle auto-play unlock on first user gesture.
  - Floating pill control to play/pause music at any time.
- **The Blessed Union**:
  - Elegant profile cards for the Bride (**Fameedha**) and Groom (**Jisam**) with family lineage.
- **Save the Date Countdown**:
  - Live interactive countdown timer to the wedding date (**26 December 2026, 4:00 PM / After Asar Prayer**).
- **Our Story**:
  - Romantic quote and reflection on faith and cherished beginnings.
- **Venue & Reception**:
  - Ceremony at **Puthiyangadi Jumath Masjid** (Puthiyangadi) with embedded interactive Google Map and directions link.
  - Reception details at the Groom's residence for 27 December 2026.
- **Footer Blessing**:
  - Traditional Quranic / Sunnah Dua in Arabic and English translation with illustrated background imagery (`images/children-final.png`).

## File Structure

```text
├── index.html                  # Main website HTML
├── style.css                   # Custom stylesheets, textures & keyframe animations
├── script.js                   # Countdown, audio controls, petals & scroll reveal logic
├── images/
│   ├── floral-corner.png       # Corner floral line-art ornament
│   ├── floral-branch.png       # Middle section floral divider
│   └── children-final.png      # Footer backdrop illustration
├── audio/
│   └── anlatmam.mp3            # Background wedding music
└── README.md                   # Documentation
```

## Running Locally

Open `index.html` directly in your web browser, or launch a quick local development server:

```bash
# Python 3
python3 -m http.server 3000

# Or using Node npx serve
npx serve .
```

Then visit `http://localhost:3000` in your browser.

## Deployment

This website is static (HTML, CSS, JS, images, audio). You can host it instantly for free on:
- **Vercel**: Run `vercel` or connect your GitHub repository.
- **GitHub Pages**: Push to repository and enable GitHub Pages under Settings > Pages.
- **Netlify**: Drag and drop the folder or connect Git.
