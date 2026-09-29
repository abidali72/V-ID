# V-ID (LGPSM°) — Future Forward Fashion

> VØID is a futuristic fashion house built on the philosophy of radical minimalism. Stripping design to its purest essence, each collection explores the space between structure and emptiness — where garments become architecture and absence becomes statement.
> A pure white, minimal, futuristic fashion website interface built with React, TypeScript, Vite, and Tailwind CSS.

---

## ✨ Overview

**LGPSM°** is a sleek, modern fashion landing page featuring an ultra-minimal design language. It combines futuristic typography (Orbitron), smooth Framer Motion animations, interactive dual-image reveal backgrounds, a custom cursor follower, and slide-out side drawers — all wrapped in a crisp white-on-black aesthetic.

---

## 🖼️ Features

- **Hero Section** — Bold uppercase typography with staggered fade-up animations
- **Interactive Image Reveal** — Desktop dual-image canvas background that reacts to cursor position
- **Custom Cursor** — Minimal circular cursor follower for enhanced UX
- **Side Drawers** — Slide-out panels for Shop, Collections, Journal, and Cart
- **Shopping Cart** — Add/remove items with quantity tracking and checkout flow
- **Toast Notifications** — Non-intrusive feedback for user actions
- **Scroll Progress Bar** — Fixed top-of-page spring-animated progress indicator
- **Decorative SVGs** — Wireframe globe, checkerboard pattern, and corner bracket accents
- **Responsive Design** — Mobile-first layout with static image fallback for smaller screens
- **Tailwind CSS v4** — Utility-first styling with the Vite plugin

---

## 🛠️ Tech Stack

| Technology       | Purpose                        |
| ---------------- | ------------------------------ |
| **React 19**     | UI library                     |
| **TypeScript**   | Type safety                    |
| **Vite**         | Build tool & dev server        |
| **Tailwind CSS 4** | Utility-first styling        |
| **Framer Motion**| Animations & gestures          |
| **Lucide React** | Icon library                   |
| **Google GenAI** | Gemini API integration         |

---

## 📁 Project Structure

```
lgpsm-future-forward-fashion/
├── assets/                    # Static assets
├── src/
│   ├── components/
│   │   ├── CustomCursor.tsx        # Minimal circular cursor follower
│   │   ├── ImageRevealBackground.tsx # Dual-image interactive reveal
│   │   ├── SVGs.tsx                # Decorative SVG components
│   │   ├── SideDrawer.tsx          # Slide-out drawer (Shop/Collections/Journal/Cart)
│   │   └── Toast.tsx               # Toast notification system
│   ├── App.tsx                # Main application component
│   ├── data.ts                # Shop items, collections, journal entries
│   ├── index.css              # Global styles & CSS custom properties
│   ├── main.tsx               # React entry point
│   └── types.ts               # TypeScript type definitions
├── index.html                 # HTML entry point
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies & scripts
├── .env.example               # Environment variable template
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm** or **bun**

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/abidali72/V-ID.git
   cd V-ID
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your **Gemini API key**:

   ```env
   GEMINI_API_KEY="your_api_key_here"
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   The app will be available at **http://localhost:3000**

---

## 📜 Available Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start dev server on port 3000        |
| `npm run build`    | Build for production                 |
| `npm run preview`  | Preview the production build         |
| `npm run lint`     | Run TypeScript type checking         |
| `npm run clean`    | Remove `dist/` and `server.js`       |

---

## 🎨 Design Highlights

- **Font**: [Orbitron](https://fonts.google.com/specimen/Orbitron) for headlines, [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) for body text
- **Color Palette**: Pure white background with black typography — minimal and high-contrast
- **Animations**: Spring-based scroll progress, staggered hero entrance, smooth drawer transitions
- **Cursor**: Custom circular follower (desktop only) for a premium interactive feel

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request.

---

<div align="center">
  <strong>BEYOND TRENDS. BUILT FOR TOMORROW.</strong>
</div>
