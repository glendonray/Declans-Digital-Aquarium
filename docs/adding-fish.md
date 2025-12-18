# Adding Fish

This guide explains how to add new fish to the aquarium.

## Quick Start

Adding a new fish requires two steps:

1. Create a fish data file in `api/fish/`
2. Add an entry to `api/index.json`

No SVG file needed - fish are generated dynamically from templates!

## Step 1: Create Fish Data File

Create a new JSON file in `api/fish/` with the fish ID as the filename:

```bash
api/fish/royal-gramma.json
```

### Complete Fish Data Example

```json
{
  "id": "royal-gramma",
  "name": "Royal Gramma",
  "scientificName": "Gramma loreto",
  "taxonomy": {
    "waterType": "saltwater",
    "habitat": "reef",
    "region": "caribbean",
    "family": "Grammatidae"
  },
  "appearance": {
    "bodyShape": "oval",
    "sizeCategory": "small",
    "primaryColor": "purple",
    "pattern": "gradient"
  },
  "image": "assets/fish/royal-gramma.svg",
  "colors": {
    "primary": "#9333EA",
    "secondary": "#FACC15",
    "accent": "#1E293B"
  },
  "facts": [
    {
      "text": "I start out purple at the front and fade to yellow at my tail! This cool gradient helps me hide in coral shadows.",
      "category": "biology",
      "sourceId": "fishbase"
    },
    {
      "text": "I'm a cleaner fish! Bigger fish visit me so I can eat parasites off their skin.",
      "category": "behavior",
      "sourceId": "fishbase"
    },
    {
      "text": "I like to swim upside down under ledges! It confuses predators about which way is up.",
      "category": "behavior",
      "sourceId": "eol"
    }
  ],
  "profile": {
    "habitat": "Coral reefs in the Caribbean",
    "diet": "Zooplankton and parasites",
    "size": "Up to 3 inches (8 cm)",
    "lifespan": "5-6 years"
  }
}
```

## Step 2: Add to Index

Add a lightweight entry to `api/index.json`:

```json
{
  "id": "royal-gramma",
  "name": "Royal Gramma",
  "waterType": "saltwater",
  "habitat": "reef",
  "bodyShape": "oval",
  "primaryColor": "purple",
  "sizeCategory": "small"
}
```

Also update the `totalFish` count at the top of the file.

## Choosing Body Shape

Pick the shape that best matches the fish's silhouette:

| Shape         | Description                             | Examples                         |
| ------------- | --------------------------------------- | -------------------------------- |
| `oval`        | Standard fish shape, horizontal ellipse | Clownfish, Goldfish, Betta       |
| `disc`        | Tall, nearly circular, compressed       | Angelfish, Discus, Butterflyfish |
| `round`       | Spherical, puffed out                   | Pufferfish, Boxfish              |
| `streamlined` | Torpedo-shaped, built for speed         | Sharks, Tuna, Barracuda          |
| `unusual`     | Unique shapes that don't fit others     | Seahorse, Pipefish               |
| `elongated`   | Long and thin (coming soon)             | Eels, Needlefish                 |
| `flat`        | Flattened body (coming soon)            | Rays, Flounder                   |

## Choosing Pattern

Select the pattern that matches the fish's markings:

| Pattern    | Description                      | Examples                      |
| ---------- | -------------------------------- | ----------------------------- |
| `solid`    | Single color, no markings        | Many tropical fish            |
| `striped`  | Vertical stripes                 | Neon Tetra, some Angelfish    |
| `spotted`  | Circular spots                   | Whale Shark, Trout            |
| `banded`   | Wide vertical bands with borders | Clownfish                     |
| `mottled`  | Irregular patches                | Oscar, some Groupers          |
| `gradient` | Color fades from one to another  | Royal Gramma, Flame Angelfish |
| `swirled`  | Psychedelic wavy patterns        | Mandarin Dragonet             |

## Color Guidelines

### Primary Color

The main body color. Choose from the taxonomy:

- `red`, `orange`, `yellow`, `blue`, `green`, `purple`, `silver`, `black`, `pink`, `multi`

### Colors Object

Provide hex codes for rendering:

```json
"colors": {
  "primary": "#FF6B35",   // Main body color
  "secondary": "#FFFFFF", // Stripes, spots, belly
  "accent": "#000000"     // Outlines, eye color
}
```

### Tips for Choosing Colors

1. **Primary** - The dominant color when you look at the fish
2. **Secondary** - The contrasting color (stripes, belly, markings)
3. **Accent** - Usually dark (black/navy) for outlines and eyes

## Writing Fun Facts

Facts should be:

- **First person** - "I can puff up twice my size!"
- **Kid-friendly** - Simple language, exciting tone
- **Educational** - Include real scientific facts
- **Sourced** - Reference `fishbase`, `noaa`, or `eol`

### Fact Categories

- `biology` - Physical features, anatomy
- `behavior` - How the fish acts
- `habitat` - Where it lives
- `diet` - What it eats
- `defense` - How it protects itself
- `ecology` - Role in ecosystem
- `reproduction` - Mating, babies

## Adding a Source

If you need a new source, add it to `api/sources.json`:

```json
{
  "sources": {
    "fishbase": {
      "name": "FishBase",
      "url": "https://www.fishbase.org",
      "description": "Global species database"
    },
    "your-source": {
      "name": "Your Source Name",
      "url": "https://example.com",
      "description": "Description of the source"
    }
  }
}
```

## Testing Your Fish

1. Run `npm run dev`
2. Open the browser
3. Click "Meet New Fish" until your fish appears
4. Click the fish to verify facts display correctly

## Troubleshooting

### Fish doesn't appear

- Check that `id` in the fish file matches the filename
- Verify the entry exists in `index.json`
- Check browser console for JSON parsing errors

### Fish looks wrong

- Verify `bodyShape` is a valid option
- Check that `colors.primary` is a valid hex code
- Try a different `pattern` if markings look off

### Facts don't show

- Ensure `facts` array is not empty
- Verify `sourceId` matches a key in `sources.json`
- Check that fact objects have `text`, `category`, and `sourceId`

## Batch Adding Fish

For adding many fish at once, see the [Roadmap](./roadmap.md) for planned import tools and FishBase API integration.
