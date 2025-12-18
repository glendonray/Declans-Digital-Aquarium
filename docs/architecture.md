# Architecture

This document describes the technical architecture of Declan's Digital Aquarium.

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser                                  │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                     index.html                            │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │                    Tank Container                    │ │   │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────────┐  │ │   │
│  │  │  │  Fish   │ │  Fish   │ │ Bubbles │ │  Speech   │  │ │   │
│  │  │  │ (SVG)   │ │ (SVG)   │ │         │ │  Bubble   │  │ │   │
│  │  │  └─────────┘ └─────────┘ └─────────┘ └───────────┘  │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                      JavaScript Modules                          │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────────┐     │
│  │   main.js  │──│   Tank.js    │──│   FishSVGGenerator   │     │
│  └────────────┘  └──────────────┘  └──────────────────────┘     │
│         │              │                     │                   │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────────┐     │
│  │  config.js │  │   Fish.js    │  │  Shape + Pattern     │     │
│  └────────────┘  │ Bubbles.js   │  │     Templates        │     │
│                  │ SpeechBubble │  └──────────────────────┘     │
│                  └──────────────┘                                │
├─────────────────────────────────────────────────────────────────┤
│                       Data Layer                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐      │
│  │ FishAPI.js  │──│ FishSelector│  │  api/*.json files   │      │
│  └─────────────┘  └─────────────┘  └─────────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Initialization

```
main.js
   │
   ▼
Tank.js ──► FishAPI.loadIndex() ──► api/index.json
   │
   ▼
FishSelector.selectDiverseFish()
   │
   ▼
FishAPI.getMultipleFish(ids) ──► api/fish/*.json (lazy loaded)
   │
   ▼
Tank.addFish() ──► Fish.js ──► FishSVGGenerator
```

### 2. Fish Rendering

```
Fish Data (JSON)
   │
   ├── appearance.bodyShape ──► getShapeTemplate() ──► oval.js / disc.js / etc.
   │
   ├── appearance.pattern ──► getPatternOverlay() ──► striped.js / spotted.js / etc.
   │
   └── colors ──► Applied to templates
   │
   ▼
composeSVG() ──► Inline SVG inserted into DOM
```

### 3. User Interaction

```
User clicks fish
   │
   ▼
Fish.onClick() ──► Pause animation
   │
   ▼
FishAPI.getRandomFact() ──► Get fact from fish data
   │
   ▼
SpeechBubble.show() ──► Display fact with source attribution
```

## Component Architecture

### UI Components (`src/js/components/`)

| Component         | Purpose                                                 |
| ----------------- | ------------------------------------------------------- |
| `Tank.js`         | Main container, manages fish collection, handles resize |
| `Fish.js`         | Individual fish, movement animation, click handling     |
| `SpeechBubble.js` | Displays facts, navigation between facts                |
| `Bubbles.js`      | Ambient bubble animation                                |

### Services (`src/js/services/`)

| Service               | Purpose                                         |
| --------------------- | ----------------------------------------------- |
| `FishAPI.js`          | Loads fish data, caches results, provides facts |
| `FishSelector.js`     | Selects diverse fish based on taxonomy          |
| `FishSVGGenerator.js` | Composes SVG from shape + pattern templates     |

### Templates (`src/js/templates/`)

| Directory     | Purpose                                           |
| ------------- | ------------------------------------------------- |
| `shapes/`     | Body shape templates (oval, disc, round, etc.)    |
| `patterns/`   | Pattern overlays (striped, spotted, banded, etc.) |
| `components/` | Reusable SVG parts (eye, mouth, fins, blush)      |
| `utils/`      | Color manipulation helpers                        |

## Design System

### Token-Based Styling

All design values flow from `src/scss/_tokens.scss`:

```scss
// _tokens.scss defines SCSS variables
$colors: (
  "water-light": #87ceeb,
  "water-dark": #1e3a5f,
  // ...
);

// Compiled to CSS custom properties
:root {
  --color-water-light: #87ceeb;
  --color-water-dark: #1e3a5f;
}
```

### SCSS Architecture

```
main.scss
   │
   ├── _tokens.scss     (Design tokens → CSS variables)
   ├── _base.scss       (Reset, body defaults)
   │
   └── components/
       ├── _tank.scss
       ├── _water.scss
       ├── _fish.scss
       ├── _speech-bubble.scss
       ├── _bubbles.scss
       ├── _sand.scss
       └── _swap-button.scss
```

## Data Architecture

### Lazy Loading Strategy

```
Initial Load:
   api/index.json (lightweight, ~5KB for 1000 fish)
   api/sources.json (attributions)

On Demand:
   api/fish/{id}.json (full data, loaded when needed)
```

### Caching

`FishAPI.js` maintains two caches:

```javascript
this.index = []; // Lightweight fish list (always loaded)
this.fishCache = {}; // Full fish data (lazy loaded, persisted)
```

## File Dependencies

```
main.js
├── components/Tank.js
│   ├── components/Fish.js
│   │   └── services/FishSVGGenerator.js
│   │       ├── templates/shapes/index.js
│   │       └── templates/patterns/index.js
│   ├── components/Bubbles.js
│   └── components/SpeechBubble.js
├── services/FishAPI.js
├── services/FishSelector.js
└── config.js
```

## Build Process

Simple build with npm scripts:

```bash
npm run scss        # Compile SCSS once
npm run scss:watch  # Watch mode
npm run serve       # Static file server
npm run dev         # Both in parallel
```

No bundler required - uses native ES6 modules with `type="module"` in HTML.
