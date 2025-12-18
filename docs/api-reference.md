# API Reference

This document describes the data schemas used in Declan's Digital Aquarium.

## Overview

All data is stored as local JSON files in the `api/` directory:

```
api/
├── index.json      # Lightweight fish index (always loaded)
├── taxonomy.json   # Valid category values
├── sources.json    # Fact source attributions
└── fish/           # Individual fish data files
    ├── clownfish.json
    ├── betta.json
    └── ...
```

## Index Schema

`api/index.json` - Lightweight index loaded on startup for filtering and selection.

```json
{
  "version": "2.0",
  "totalFish": 15,
  "fish": [
    {
      "id": "clownfish",
      "name": "Clownfish",
      "waterType": "saltwater",
      "habitat": "reef",
      "bodyShape": "oval",
      "primaryColor": "orange",
      "sizeCategory": "small"
    }
  ]
}
```

### Index Entry Fields

| Field          | Type   | Required | Description                         |
| -------------- | ------ | -------- | ----------------------------------- |
| `id`           | string | Yes      | Unique identifier, matches filename |
| `name`         | string | Yes      | Display name                        |
| `waterType`    | string | Yes      | Water type (see taxonomy)           |
| `habitat`      | string | Yes      | Habitat type (see taxonomy)         |
| `bodyShape`    | string | Yes      | Body shape for SVG generation       |
| `primaryColor` | string | Yes      | Primary color category              |
| `sizeCategory` | string | Yes      | Size category                       |

## Fish Data Schema

`api/fish/{id}.json` - Full fish data, loaded on demand.

```json
{
  "id": "clownfish",
  "name": "Clownfish",
  "scientificName": "Amphiprion ocellaris",

  "taxonomy": {
    "waterType": "saltwater",
    "habitat": "reef",
    "region": "indo-pacific",
    "family": "Pomacentridae"
  },

  "appearance": {
    "bodyShape": "oval",
    "sizeCategory": "small",
    "primaryColor": "orange",
    "pattern": "banded"
  },

  "image": "assets/fish/clownfish.svg",

  "colors": {
    "primary": "#FF6B35",
    "secondary": "#FFFFFF",
    "accent": "#000000"
  },

  "facts": [
    {
      "text": "I'm born as a boy, but I can become a girl!",
      "category": "biology",
      "sourceId": "fishbase"
    }
  ],

  "profile": {
    "habitat": "Coral reefs in the Indo-Pacific Ocean",
    "diet": "Zooplankton, small invertebrates, and algae",
    "size": "Up to 4.3 inches (11 cm)",
    "lifespan": "6-10 years"
  }
}
```

### Fish Data Fields

#### Root Fields

| Field            | Type   | Required | Description                   |
| ---------------- | ------ | -------- | ----------------------------- |
| `id`             | string | Yes      | Unique identifier             |
| `name`           | string | Yes      | Common name                   |
| `scientificName` | string | Yes      | Scientific/Latin name         |
| `taxonomy`       | object | Yes      | Classification data           |
| `appearance`     | object | Yes      | Visual characteristics        |
| `image`          | string | No       | Path to fallback SVG          |
| `colors`         | object | Yes      | Hex color codes for rendering |
| `facts`          | array  | Yes      | Educational facts             |
| `profile`        | object | Yes      | Quick reference info          |

#### Taxonomy Object

| Field       | Type   | Required | Description                              |
| ----------- | ------ | -------- | ---------------------------------------- |
| `waterType` | string | Yes      | `freshwater`, `saltwater`, or `brackish` |
| `habitat`   | string | Yes      | Primary habitat type                     |
| `region`    | string | No       | Geographic region                        |
| `family`    | string | No       | Scientific family name                   |

#### Appearance Object

| Field          | Type   | Required | Description            |
| -------------- | ------ | -------- | ---------------------- |
| `bodyShape`    | string | Yes      | Shape template to use  |
| `sizeCategory` | string | Yes      | Size category          |
| `primaryColor` | string | Yes      | Primary color name     |
| `pattern`      | string | Yes      | Pattern overlay to use |

#### Colors Object

| Field       | Type   | Required | Description                  |
| ----------- | ------ | -------- | ---------------------------- |
| `primary`   | string | Yes      | Main body color (hex)        |
| `secondary` | string | Yes      | Stripes/markings color (hex) |
| `accent`    | string | Yes      | Outlines/details color (hex) |

#### Fact Object

| Field      | Type   | Required | Description                  |
| ---------- | ------ | -------- | ---------------------------- |
| `text`     | string | Yes      | The fact text (first person) |
| `category` | string | Yes      | Fact category                |
| `sourceId` | string | Yes      | Reference to sources.json    |

#### Profile Object

| Field      | Type   | Required | Description                 |
| ---------- | ------ | -------- | --------------------------- |
| `habitat`  | string | Yes      | Natural habitat description |
| `diet`     | string | Yes      | What the fish eats          |
| `size`     | string | Yes      | Adult size range            |
| `lifespan` | string | Yes      | Expected lifespan           |

## Taxonomy Schema

`api/taxonomy.json` - Valid values for taxonomy fields.

```json
{
  "waterType": ["freshwater", "saltwater", "brackish"],

  "habitat": [
    "reef",
    "tropical",
    "temperate",
    "deep-sea",
    "river",
    "lake",
    "pelagic"
  ],

  "bodyShape": [
    "oval",
    "disc",
    "elongated",
    "round",
    "flat",
    "unusual",
    "streamlined"
  ],

  "sizeCategory": ["tiny", "small", "medium", "large", "giant"],

  "primaryColor": [
    "red",
    "orange",
    "yellow",
    "blue",
    "green",
    "purple",
    "silver",
    "black",
    "pink",
    "multi"
  ],

  "pattern": [
    "solid",
    "striped",
    "spotted",
    "mottled",
    "gradient",
    "banded",
    "swirled"
  ]
}
```

### Taxonomy Definitions

#### Water Types

| Value        | Description             |
| ------------ | ----------------------- |
| `freshwater` | Rivers, lakes, ponds    |
| `saltwater`  | Oceans, seas            |
| `brackish`   | Estuaries, river mouths |

#### Habitats

| Value       | Description                    |
| ----------- | ------------------------------ |
| `reef`      | Coral reef environments        |
| `tropical`  | Warm freshwater (Amazon, etc.) |
| `temperate` | Moderate temperature waters    |
| `deep-sea`  | Deep ocean zones               |
| `river`     | Flowing freshwater             |
| `lake`      | Still freshwater bodies        |
| `pelagic`   | Open ocean                     |

#### Body Shapes

| Value         | Description              | Template Status |
| ------------- | ------------------------ | --------------- |
| `oval`        | Standard horizontal fish | Available       |
| `disc`        | Tall, compressed fish    | Available       |
| `round`       | Spherical body           | Available       |
| `streamlined` | Torpedo/shark shape      | Available       |
| `unusual`     | Unique shapes (seahorse) | Available       |
| `elongated`   | Long, thin body (eel)    | Planned         |
| `flat`        | Flattened body (ray)     | Planned         |

#### Size Categories

| Value    | Typical Size |
| -------- | ------------ |
| `tiny`   | < 2 inches   |
| `small`  | 2-6 inches   |
| `medium` | 6-12 inches  |
| `large`  | 1-3 feet     |
| `giant`  | > 3 feet     |

## Sources Schema

`api/sources.json` - Attribution data for fact sources.

```json
{
  "sources": {
    "fishbase": {
      "name": "FishBase",
      "url": "https://www.fishbase.org",
      "description": "Global species database for fish"
    },
    "noaa": {
      "name": "NOAA Fisheries",
      "url": "https://www.fisheries.noaa.gov",
      "description": "National Oceanic and Atmospheric Administration"
    },
    "eol": {
      "name": "Encyclopedia of Life",
      "url": "https://eol.org",
      "description": "Global access to knowledge about life on Earth"
    }
  }
}
```

### Source Fields

| Field         | Type   | Required | Description            |
| ------------- | ------ | -------- | ---------------------- |
| `name`        | string | Yes      | Display name of source |
| `url`         | string | Yes      | Website URL            |
| `description` | string | No       | Brief description      |

## Fact Categories

Valid values for `facts[].category`:

| Category       | Description                            |
| -------------- | -------------------------------------- |
| `biology`      | Physical features, anatomy, life cycle |
| `behavior`     | Actions, habits, social behavior       |
| `habitat`      | Where the fish lives                   |
| `diet`         | Eating habits, food sources            |
| `defense`      | Protection mechanisms                  |
| `ecology`      | Role in ecosystem                      |
| `reproduction` | Mating, breeding, parenting            |
| `history`      | Historical/cultural significance       |
| `culture`      | Human interaction, aquarium keeping    |

## FishAPI Service Methods

The `FishAPI` service provides these methods for accessing data:

```javascript
// Load the lightweight index
await fishAPI.loadIndex();

// Load source attributions
await fishAPI.loadSources();

// Get full data for a single fish (lazy loaded, cached)
const fish = await fishAPI.getFishById("clownfish");

// Get full data for multiple fish
const fishes = await fishAPI.getMultipleFish(["clownfish", "betta"]);

// Get a random fact from a fish
const fact = fishAPI.getRandomFact(fish);

// Get a specific fact by index
const fact = fishAPI.getFact(fish, 2);

// Access the loaded index
const allFishSummaries = fishAPI.index;

// Clear the cache (for memory management)
fishAPI.clearCache();
```

## FishSelector Service Methods

The `FishSelector` service provides fish selection with diversity:

```javascript
import {
  selectDiverseFish,
  selectByWaterType,
  selectByHabitat,
  selectNewFish,
} from "./services/FishSelector.js";

// Select diverse fish (varied shapes and colors)
const selected = selectDiverseFish(index, 8);

// Select fish of a specific water type
const saltwater = selectByWaterType(index, "saltwater", 8);

// Select fish from a specific habitat
const reefFish = selectByHabitat(index, "reef", 8);

// Select new fish excluding current ones
const newFish = selectNewFish(index, currentIds, 8);
```
