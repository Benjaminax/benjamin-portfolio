# Benjamin Acheampong — Personal Portfolio

A modern, high-performance personal portfolio built for a creative developer & designer. Built with React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, and GSAP ScrollTrigger.

---

## 🌟 Key Features & Sections

### 1. Hero / Introduction
- **Interactive 3D Globe**: Custom Canvas-rendered 3D interactive globe badge.
- **Apple-Style Live Ghana Clock**: Live GMT clock capsule displaying local time in Ghana.
- **Bidirectional GSAP Marquee**: Infinite running marquee (`Benjamin Acheampong —`) with scroll-velocity acceleration and direction switching.
- **Call To Actions**: Magnetic buttons for "View My Work" and "Contact Me".

### 2. About Me & Capabilities
- **Masked Line-by-Line Reveal**: Editorial typography text animation that cascades smoothly as you scroll into view.
- **Capabilities & Services**: Grid layout displaying design, development, and full-package services with interactive 3D perspective hover cards.

### 3. Selected Projects
- **Interactive Project Showcase**: List of flagship digital projects (*Aura Spatial Engine*, *Monolith Architecture*, *Kroma Studio Editorial*, *Velox Kinetic Studio*).
- **Hover Preview Card**: Framed dark slate preview card with video previews (1.5× playback speed, 2s intro skip, seamless looping).
- **Floating "View" Badge**: Circular blue badge following cursor movement over project rows.

### 4. Horizontal Scroll Gallery
- **GSAP ScrollTrigger Pinning**: Section pins vertically to the screen as you scroll down, translating cards sideways across the viewport.
- **Interactive Cards**: High-resolution project cards with metadata, categories, and tags.

### 5. Career Experience
- **Timeline Breakdown**: Detailed career journey featuring roles at *Studio Elevate*, *Apex Digital Agency*, *Craft & Code Co.*, and *TechSphere Labs*.
- **Interactive Cards**: Micro-animations with magnetic arrow triggers and skill highlights.

### 6. Contact Section
- **Headshot Avatar**: Circular portrait photo next to "Let's work together".
- **Giant Magnetic CTA**: Contact button with magnetic spring cursor attraction.
- **Direct Contacts & Socials**: Email & phone pill capsules along with links to GitHub, LinkedIn, Twitter, and Instagram.

---

## 🛠️ Tech Stack

- **Core**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Animation & Motion**: Framer Motion, GSAP (GreenSock), GSAP ScrollTrigger
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```
├── public/
│   └── profile.png          # Headshot portrait asset
├── src/
│   ├── components/
│   │   ├── About.tsx               # About section & services
│   │   ├── Experience.tsx          # Career timeline & roles
│   │   ├── FloatingHamburger.tsx   # Floating menu toggle button
│   │   ├── Footer.tsx              # Contact section & footer
│   │   ├── Globe3D.tsx             # Canvas 3D globe component
│   │   ├── Hero.tsx                # Hero section & marquee
│   │   ├── HorizontalShowcase.tsx  # GSAP ScrollTrigger side-scroll gallery
│   │   ├── Magnetic.tsx            # Magnetic spring physics wrapper
│   │   ├── NavOverlay.tsx          # Side menu overlay with curved SVG path
│   │   ├── Navbar.tsx              # Top navigation header
│   │   ├── Preloader.tsx           # Multilingual splash screen
│   │   ├── Projects.tsx            # Selected projects list with video hover
│   │   └── WordRotate.tsx          # Vertical word rotation transition
│   ├── App.tsx                     # Main application layout
│   ├── main.tsx                    # React DOM root entry
│   └── index.css                   # Global Tailwind & typography styles
├── index.html
├── package.json
└── vite.config.ts
```

---

## 📄 License

Created by **Benjamin Acheampong**. All rights reserved.
