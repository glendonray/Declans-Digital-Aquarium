# SVG Template System

The aquarium uses a parameterized SVG template system to dynamically generate fish graphics at runtime. This allows thousands of unique fish to be rendered from just a handful of templates.

## How It Works

```
Fish Data ──► FishSVGGenerator ──► Inline SVG
                    │
         ┌─────────┴─────────┐
         ▼                   ▼
   Shape Template      Pattern Overlay
         │                   │
         └─────────┬─────────┘
                   ▼
            Composed SVG
```

1. `Fish.js` passes fish data to `FishSVGGenerator`
2. Generator selects shape template based on `appearance.bodyShape`
3. Generator selects pattern overlay based on `appearance.pattern`
4. Colors from `colors` object are applied to both
5. Final SVG is inserted inline into the DOM

## File Structure

```
src/js/templates/
├── shapes/           # Body shape templates
│   ├── oval.js       # Standard fish shape
│   ├── disc.js       # Tall circular fish
│   ├── round.js      # Spherical fish
│   ├── streamlined.js # Shark/torpedo shape
│   ├── unusual.js    # Seahorse and unique shapes
│   └── index.js      # Shape registry
│
├── patterns/         # Pattern overlays
│   ├── solid.js      # No pattern
│   ├── striped.js    # Vertical stripes
│   ├── spotted.js    # Circular spots
│   ├── banded.js     # Wide bands
│   ├── mottled.js    # Irregular patches
│   ├── gradient.js   # Color fade
│   ├── swirled.js    # Psychedelic waves
│   └── index.js      # Pattern registry
│
├── components/       # Reusable SVG parts
│   ├── eye.js        # Eyes with highlights
│   ├── mouth.js      # Various mouth styles
│   ├── blush.js      # Kawaii blush marks
│   ├── fins.js       # Dorsal, pectoral, tail
│   └── index.js      # Component exports
│
└── utils/
    └── color.js      # Color manipulation
```

## Shape Templates

### Available Shapes

| Shape         | ViewBox | Use For                  |
| ------------- | ------- | ------------------------ |
| `oval`        | 100x60  | Most standard fish       |
| `disc`        | 90x90   | Tall, round fish         |
| `round`       | 90x80   | Spherical/puffed fish    |
| `streamlined` | 140x60  | Sharks, fast swimmers    |
| `unusual`     | 60x100  | Seahorses, unique shapes |

### Shape Template Structure

Each shape template exports a function that returns an object:

```javascript
export function ovalShape(colors, options = {}) {
  const { primary, secondary, accent } = colors;
  const id = options.id || generateId("oval");

  return {
    viewBox: "0 0 100 60",
    width: 100,
    height: 60,

    defs: `
      <linearGradient id="${id}-body">...</linearGradient>
    `,

    tail: `<path d="..."/>`,
    body: `<ellipse cx="50" cy="30" rx="35" ry="22"/>`,
    fins: `<path d="..."/>`,
    face: createEye(70, 27) + createMouth(82, 32) + createBlush(72, 40),

    // Area where patterns are applied
    patternArea: { cx: 50, cy: 30, rx: 35, ry: 22 },
  };
}
```

### Creating a New Shape

1. Create a new file in `src/js/templates/shapes/`:

```javascript
// src/js/templates/shapes/eel.js
import { createEye } from "../components/eye.js";
import { lighten, darken, generateId } from "../utils/color.js";

export function eelShape(colors, options = {}) {
  const { primary, secondary, accent } = colors;
  const id = options.id || generateId("eel");

  return {
    viewBox: "0 0 150 40",
    width: 150,
    height: 40,

    defs: `
      <linearGradient id="${id}-body" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:${lighten(primary, 10)}"/>
        <stop offset="100%" style="stop-color:${primary}"/>
      </linearGradient>
    `,

    tail: "",

    body: `
      <path d="M10 20 Q50 10 100 20 Q130 25 140 20 
               Q130 30 100 25 Q50 35 10 20" 
            fill="url(#${id}-body)"/>
    `,

    fins: `
      <path d="M60 15 Q70 8 80 15" fill="url(#${id}-body)"/>
    `,

    face: createEye(130, 20, { size: "small", color: accent }),

    patternArea: { cx: 70, cy: 20, rx: 60, ry: 10 },
  };
}
```

2. Register it in `src/js/templates/shapes/index.js`:

```javascript
import { eelShape } from "./eel.js";

const shapeRegistry = {
  // ... existing shapes
  eel: eelShape,
};
```

## Pattern Templates

### Available Patterns

| Pattern    | Effect                                 |
| ---------- | -------------------------------------- |
| `solid`    | No overlay (uses base shape colors)    |
| `striped`  | Vertical stripes using secondary color |
| `spotted`  | Circular spots scattered on body       |
| `banded`   | Wide vertical bands with borders       |
| `mottled`  | Irregular patches of secondary color   |
| `gradient` | Additional gradient shimmer            |
| `swirled`  | Psychedelic wavy lines                 |

### Pattern Template Structure

Patterns receive colors, the pattern area from the shape, and options:

```javascript
export function stripedPattern(colors, patternArea, options = {}) {
  const { secondary, accent } = colors;
  const { cx, cy, rx, ry } = patternArea;
  const { stripeCount = 3 } = options;

  let stripes = "";
  const spacing = (rx * 2) / (stripeCount + 1);

  for (let i = 1; i <= stripeCount; i++) {
    const x = cx - rx + spacing * i;
    stripes += `
      <path d="M${x} ${cy - ry + 5} Q${x + 3} ${cy} ${x} ${cy + ry - 5}" 
            stroke="${secondary}" stroke-width="2" fill="none"/>
    `;
  }

  return stripes;
}
```

### Creating a New Pattern

1. Create a new file in `src/js/templates/patterns/`:

```javascript
// src/js/templates/patterns/chevron.js
export function chevronPattern(colors, patternArea, options = {}) {
  const { secondary } = colors;
  const { cx, cy, rx, ry } = patternArea;

  let chevrons = "";
  for (let i = 0; i < 3; i++) {
    const x = cx - rx * 0.5 + i * rx * 0.4;
    chevrons += `
      <path d="M${x} ${cy - ry * 0.3} L${x + 8} ${cy} L${x} ${cy + ry * 0.3}" 
            stroke="${secondary}" stroke-width="2" fill="none"/>
    `;
  }

  return chevrons;
}
```

2. Register it in `src/js/templates/patterns/index.js`:

```javascript
import { chevronPattern } from "./chevron.js";

const patternRegistry = {
  // ... existing patterns
  chevron: chevronPattern,
};
```

## Shared Components

### Eye Component

```javascript
import { createEye, createEyePair } from "../components/eye.js";

// Single eye
createEye(x, y, {
  size: "medium", // "tiny" | "small" | "medium" | "large"
  color: "#000", // Pupil color
  direction: "right", // "left" | "right"
});

// Pair of eyes (for front-facing fish)
createEyePair(leftX, rightX, y, options);
```

### Mouth Component

```javascript
import { createMouth } from "../components/mouth.js";

createMouth(x, y, {
  style: "smile", // "smile" | "o" | "pouty" | "line" | "wide"
  size: "medium", // "small" | "medium" | "large"
  color: "#000", // Stroke color
});
```

### Blush Component

```javascript
import { createBlush, createBlushPair } from "../components/blush.js";

createBlush(cx, cy, {
  baseColor: "#FF6B35", // Fish primary color (used to derive blush)
  size: "medium", // "small" | "medium" | "large"
  opacity: 0.5,
});
```

### Fin Components

```javascript
import {
  createDorsalFin,
  createPectoralFin,
  createTailFin,
  createAnalFin,
} from "../components/fins.js";

createDorsalFin(x, y, {
  fill: "#FFA500",
  stroke: "#000",
  style: "rounded", // "rounded" | "pointed" | "spiky" | "flowing"
  width: 20,
  height: 10,
});

createTailFin(x, y, {
  fill: "#FFA500",
  stroke: "#000",
  style: "forked", // "forked" | "rounded" | "fan" | "crescent"
  size: 15,
});
```

## Color Utilities

```javascript
import { lighten, darken, withAlpha, generateId } from "../utils/color.js";

lighten("#FF6B35", 20); // Lighten by 20%
darken("#FF6B35", 15); // Darken by 15%
withAlpha("#FF6B35", 0.5); // "rgba(255, 107, 53, 0.5)"
generateId("fish"); // "fish-a7x9k2m"
```

## Fallback Behavior

If a fish uses a shape or pattern that doesn't have a template, `FishSVGGenerator` falls back to the static SVG file:

```javascript
// In Fish.js
if (this.canUseTemplate()) {
  // Generate inline SVG
  const svgString = generateFishSVG(this.data);
  this.element.innerHTML = svgString;
} else {
  // Fall back to static image
  const img = document.createElement("img");
  img.src = this.data.image;
  this.element.appendChild(img);
}
```

## Tips for Template Development

1. **Use unique IDs** - Always use `generateId()` for gradient/filter IDs to avoid conflicts
2. **Test with multiple fish** - Ensure templates work when multiple instances exist
3. **Keep it simple** - Complex paths are hard to parameterize
4. **Use components** - Eyes, fins, etc. ensure consistent cute style
5. **Check flipping** - Fish flip horizontally when swimming left; ensure SVG looks good both ways
