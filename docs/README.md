# Declan's Digital Aquarium

A beautiful, interactive digital aquarium featuring animated fish that share educational fun facts about themselves.

## Features

- **15+ Animated Fish** - Cute, hand-designed fish swimming in a virtual tank
- **Educational Facts** - Click any fish to learn fun facts sourced from FishBase, NOAA, and Encyclopedia of Life
- **Dynamic SVG Generation** - Parameterized template system that can generate fish from data
- **Diverse Selection** - Algorithm ensures visual variety in displayed fish
- **Responsive Design** - Works on desktop and mobile devices
- **Offline Ready** - All fish data stored locally as JSON

## Quick Start

```bash
# Install dependencies
npm install

# Start development server with SCSS watching
npm run dev

# Or run commands separately:
npm run scss:watch  # Watch and compile SCSS
npm run serve       # Start local server
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
Declans-Digital-Aquarium/
├── api/                    # Fish data (JSON API)
│   ├── index.json          # Lightweight fish index
│   ├── taxonomy.json       # Category definitions
│   ├── sources.json        # Data source attributions
│   └── fish/               # Individual fish data files
│       ├── clownfish.json
│       └── ...
│
├── assets/
│   └── fish/               # Static SVG fallbacks
│
├── src/
│   ├── js/
│   │   ├── components/     # UI components (Tank, Fish, SpeechBubble)
│   │   ├── services/       # Data services (FishAPI, FishSelector)
│   │   ├── templates/      # SVG generation templates
│   │   │   ├── shapes/     # Body shape templates
│   │   │   ├── patterns/   # Pattern overlays
│   │   │   └── components/ # Reusable SVG parts
│   │   ├── utils/          # Helper functions
│   │   ├── config.js       # App configuration
│   │   └── main.js         # Entry point
│   │
│   └── scss/
│       ├── _tokens.scss    # Design tokens
│       ├── _base.scss      # Base styles
│       ├── components/     # Component styles
│       └── main.scss       # Entry point
│
├── css/                    # Compiled CSS output
├── docs/                   # Documentation (you are here)
└── index.html              # Main HTML file
```

## Configuration

Edit `src/js/config.js` to customize the aquarium:

```javascript
export const config = {
  displayMode: "limited", // 'all' | 'limited' | 'rotate'
  maxFish: 8, // Fish shown at once
  rotateInterval: 30000, // Rotation interval (ms)
  shuffleOnLoad: true, // Randomize on page load
  enableDiverseSelection: true, // Ensure visual variety
};
```

## Documentation

- [Architecture](./architecture.md) - System design and data flow
- [Adding Fish](./adding-fish.md) - How to add new fish species
- [SVG Templates](./svg-templates.md) - Dynamic SVG generation system
- [API Reference](./api-reference.md) - Data schema documentation
- [Roadmap](./roadmap.md) - Future development plans

## Technology Stack

- **Vanilla JavaScript** (ES6 Modules)
- **SCSS** with design tokens
- **No build framework** - Simple, lightweight setup
- **Local JSON API** - Offline-capable data storage

## Credits

Fish facts sourced from:

- [FishBase](https://www.fishbase.org) - Global fish database
- [NOAA Fisheries](https://www.fisheries.noaa.gov) - Ocean science
- [Encyclopedia of Life](https://eol.org) - Biodiversity knowledge

## License

MIT License - Feel free to use and modify for your own projects!
