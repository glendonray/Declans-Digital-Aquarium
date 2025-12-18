# Roadmap

This document outlines planned features and next steps for scaling Declan's Digital Aquarium.

## Current State

### Completed Features

- [x] 15 hand-crafted fish with educational facts
- [x] Parameterized SVG template system (5 shapes, 7 patterns)
- [x] Lazy loading fish data architecture
- [x] Diverse selection algorithm
- [x] "Meet New Fish" swap functionality
- [x] Responsive tank design
- [x] Design token system (SCSS)

### Current Limitations

- Only 15 fish available
- 2 body shapes not yet implemented (elongated, flat)
- Manual process to add new fish
- No search or filtering UI
- No persistence (favorites, history)

## Phase 1: Complete Template Coverage

### Add Missing Shape Templates

| Shape       | Priority | Example Fish                |
| ----------- | -------- | --------------------------- |
| `elongated` | High     | Eels, Needlefish, Barracuda |
| `flat`      | Medium   | Rays, Flounder, Sole        |

### Implementation

```
src/js/templates/shapes/
├── elongated.js   # Long, snake-like body
└── flat.js        # Horizontally flattened
```

### Estimated Effort

- 2-3 hours per shape template
- Testing with 3-5 fish per shape

## Phase 2: Batch Import Tools

### FishBase API Integration

Create a Node.js script to fetch fish data from the [FishBase API](https://fishbase.ropensci.org):

```javascript
// scripts/import-from-fishbase.js

async function importFish(genus, species) {
  // Fetch species data
  const speciesData = await fetch(
    `https://fishbase.ropensci.org/species?genus=${genus}&species=${species}`
  );

  // Fetch ecology data
  const ecology = await fetch(
    `https://fishbase.ropensci.org/ecology?SpecCode=${speciesData.SpecCode}`
  );

  // Map to our schema
  return {
    id: slugify(`${genus}-${species}`),
    name: speciesData.FBname,
    scientificName: `${genus} ${species}`,
    taxonomy: {
      waterType: ecology.Saltwater ? "saltwater" : "freshwater",
      habitat: mapHabitat(ecology.DemersPelag),
      family: speciesData.Family,
    },
    appearance: {
      bodyShape: mapBodyShape(speciesData.BodyShapeI),
      pattern: "solid", // Default, refine manually
      // ...
    },
    // ...
  };
}
```

### FishBase Field Mappings

| FishBase Field        | Our Field         | Notes                         |
| --------------------- | ----------------- | ----------------------------- |
| `BodyShapeI`          | `bodyShape`       | Map "fusiform" → "oval", etc. |
| `Saltwater` / `Fresh` | `waterType`       | Boolean to enum               |
| `DemersPelag`         | `habitat`         | "reef-associated" → "reef"    |
| `FBname`              | `name`            | Common name                   |
| `Family`              | `taxonomy.family` | Scientific family             |

### Batch Import Script

```bash
# Import a list of species
node scripts/import-fish.js --input species-list.csv --output api/fish/

# Validate imported data
node scripts/validate-fish.js api/fish/
```

### CSV Input Format

```csv
genus,species,bodyShape,pattern,primaryColor,secondaryColor
Amphiprion,ocellaris,oval,banded,orange,white
Pterois,volitans,oval,striped,red,white
```

## Phase 3: Scale to 1000+ Fish

### Performance Optimizations

1. **Virtual scrolling** for fish selection UI
2. **Image sprites** for static SVG fallbacks
3. **Web Workers** for SVG generation (if needed)
4. **IndexedDB caching** for offline persistence

### Index Optimization

Split index by category for faster loading:

```
api/
├── index.json           # Master index (IDs only)
├── index-saltwater.json # Saltwater fish subset
├── index-freshwater.json
└── fish/
```

### Memory Management

```javascript
// Limit cache size
const MAX_CACHE_SIZE = 100;

if (Object.keys(this.fishCache).length > MAX_CACHE_SIZE) {
  // Remove oldest entries
  const oldestKeys = Object.keys(this.fishCache).slice(0, 20);
  oldestKeys.forEach((key) => delete this.fishCache[key]);
}
```

## Phase 4: UI Enhancements

### Filter & Search

Add a filter panel to find specific fish:

```
┌─────────────────────────────────┐
│ 🔍 Search fish...               │
├─────────────────────────────────┤
│ Water Type:  ○ All ● Salt ○ Fresh │
│ Habitat:     [Reef ▼]           │
│ Size:        [Any ▼]            │
│ Color:       🟠 🔵 🟣 ⬜ ⬛       │
└─────────────────────────────────┘
```

### Favorites System

Allow users to save favorite fish:

```javascript
// localStorage persistence
const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

function toggleFavorite(fishId) {
  const index = favorites.indexOf(fishId);
  if (index === -1) {
    favorites.push(fishId);
  } else {
    favorites.splice(index, 1);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
```

### Fish Detail Modal

Full-screen modal with complete fish information:

- Large SVG preview
- All facts (paginated)
- Profile information
- "Add to favorites" button
- Share button

### Collection Progress

Track which fish the user has "discovered":

```
┌─────────────────────────────────┐
│ 🐠 Your Collection: 47/500      │
│ ████████░░░░░░░░░░░░░ 9%        │
└─────────────────────────────────┘
```

## Phase 5: Advanced Features

### AI-Generated Facts

Use an LLM to generate kid-friendly facts from scientific data:

```javascript
const prompt = `
Generate 3 fun facts about ${fish.name} (${fish.scientificName}) 
for a children's educational app. Write in first person as if the 
fish is speaking. Keep facts accurate and cite sources.
`;
```

### Color Analysis for Patterns

Analyze reference images to automatically determine:

- Primary/secondary colors (extract dominant colors)
- Pattern type (image classification)
- Body shape (edge detection)

### Multiplayer / Social

- Share your aquarium with friends
- Trade fish discoveries
- Community-sourced facts

## Technical Debt

### Code Quality

- [ ] Add TypeScript types
- [ ] Add unit tests for services
- [ ] Add E2E tests for user flows
- [ ] Set up ESLint/Prettier

### Documentation

- [ ] JSDoc comments on all functions
- [ ] Storybook for SVG components
- [ ] API documentation (OpenAPI spec)

### Infrastructure

- [ ] CI/CD pipeline
- [ ] Automated deployment
- [ ] Error tracking (Sentry)
- [ ] Analytics (privacy-respecting)

## Contributing

Want to help expand the aquarium? Here's how:

1. **Add fish data** - Follow the [Adding Fish](./adding-fish.md) guide
2. **Create templates** - See [SVG Templates](./svg-templates.md)
3. **Write facts** - Research and write kid-friendly facts
4. **Report bugs** - Open GitHub issues
5. **Suggest features** - Discuss in GitHub discussions

## Version History

| Version | Date     | Changes                           |
| ------- | -------- | --------------------------------- |
| 1.0.0   | Dec 2024 | Initial release with 15 fish      |
| 2.0.0   | Dec 2024 | SVG template system, lazy loading |

## Questions?

Open an issue on GitHub or check the other documentation:

- [Architecture](./architecture.md)
- [Adding Fish](./adding-fish.md)
- [SVG Templates](./svg-templates.md)
- [API Reference](./api-reference.md)
