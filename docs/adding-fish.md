# Adding Fish

This guide explains how to add new fish to the aquarium.

## Quick Start

Adding a new fish requires two steps:

1. Create a fish data file in `api/fish/`
2. Add an entry to `api/index.json`

No SVG file needed - fish are generated dynamically from templates!

## Quick Reference

### Required Fields Checklist

When creating a fish file, ensure you include:

- [ ] `id` - Unique identifier (matches filename)
- [ ] `name` - Display name
- [ ] `scientificName` - Scientific name
- [ ] `taxonomy.waterType` - One of: `freshwater`, `saltwater`, `brackish`
- [ ] `taxonomy.habitat` - One of: `reef`, `tropical`, `temperate`, `deep-sea`, `river`, `lake`, `pelagic`
- [ ] `taxonomy.region` - Geographic region
- [ ] `taxonomy.family` - Fish family name
- [ ] `appearance.bodyShape` - One of: `oval`, `disc`, `round`, `streamlined`, `unusual`, `elongated`, `flat`
- [ ] `appearance.sizeCategory` - One of: `tiny`, `small`, `medium`, `large`, `giant`
- [ ] `appearance.primaryColor` - One of: `red`, `orange`, `yellow`, `blue`, `green`, `purple`, `silver`, `black`, `pink`, `multi`
- [ ] `appearance.pattern` - One of: `solid`, `striped`, `spotted`, `mottled`, `gradient`, `banded`, `swirled`
- [ ] `colors.primary` - Hex color code
- [ ] `colors.secondary` - Hex color code
- [ ] `colors.accent` - Hex color code
- [ ] `facts` - Array with at least one fact object
- [ ] `profile.habitat` - Natural habitat description
- [ ] `profile.diet` - Diet description
- [ ] `profile.size` - Size description
- [ ] `profile.lifespan` - Lifespan description

### Common Body Shape → Pattern Combinations

| Body Shape    | Common Patterns               | Example Fish             |
| ------------- | ----------------------------- | ------------------------ |
| `oval`        | `banded`, `striped`, `solid`  | Clownfish, Goldfish      |
| `disc`        | `solid`, `striped`, `spotted` | Angelfish, Butterflyfish |
| `round`       | `spotted`, `mottled`, `solid` | Pufferfish, Boxfish      |
| `streamlined` | `solid`, `striped`            | Sharks, Tuna             |
| `unusual`     | `swirled`, `mottled`          | Seahorse, Mandarin       |
| `elongated`   | `striped`, `spotted`, `solid` | Eels, Needlefish         |
| `flat`        | `spotted`, `mottled`, `solid` | Rays, Flounder           |

### Color Hex Code Examples

Common color combinations for reference:

```json
// Orange/White/Black (Clownfish)
"colors": {
  "primary": "#FF6B35",
  "secondary": "#FFFFFF",
  "accent": "#000000"
}

// Yellow/Gold/White (Tang)
"colors": {
  "primary": "#FDE047",
  "secondary": "#FBBF24",
  "accent": "#FFFFFF"
}

// Purple/Yellow/Black (Royal Gramma)
"colors": {
  "primary": "#9333EA",
  "secondary": "#FACC15",
  "accent": "#1E293B"
}

// Blue/Silver/Black (Angelfish)
"colors": {
  "primary": "#3B82F6",
  "secondary": "#E5E7EB",
  "accent": "#000000"
}
```

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

### Automated Index Update (Recommended for Multiple Fish)

When adding multiple fish, you can automatically regenerate `api/index.json` from all fish files using `jq`. This ensures consistency and saves time.

**Prerequisites:** Install `jq` if you don't have it:

- macOS: `brew install jq`
- Linux: `sudo apt-get install jq` or `sudo yum install jq`
- Windows: Download from [jqlang.github.io/jq](https://jqlang.github.io/jq/)

**Command:**

```bash
cd /path/to/Declans-Digital-Aquarium && \
for f in api/fish/*.json; do \
  jq -c '{id: .id, name: .name, waterType: .taxonomy.waterType, habitat: .taxonomy.habitat, bodyShape: .appearance.bodyShape, primaryColor: .appearance.primaryColor, sizeCategory: .appearance.sizeCategory}' "$f" 2>/dev/null; \
done | \
jq -s '{totalFish: length, lastUpdated: now | strftime("%Y-%m-%d"), fish: .}' > api/index.json
```

**What this does:**

1. Iterates through all `*.json` files in `api/fish/`
2. Extracts the required summary fields from each fish file
3. Aggregates all summaries into a single array
4. Wraps the array with `totalFish` (calculated automatically) and `lastUpdated` (current date)
5. Overwrites `api/index.json` with the complete index

**Best Practice:** Create all your fish files first, then run this command once to update the index. This is much faster than manually editing the index for each fish.

## Choosing Body Shape

Pick the shape that best matches the fish's silhouette:

| Shape         | Description                             | Examples                         |
| ------------- | --------------------------------------- | -------------------------------- |
| `oval`        | Standard fish shape, horizontal ellipse | Clownfish, Goldfish, Betta       |
| `disc`        | Tall, nearly circular, compressed       | Angelfish, Discus, Butterflyfish |
| `round`       | Spherical, puffed out                   | Pufferfish, Boxfish              |
| `streamlined` | Torpedo-shaped, built for speed         | Sharks, Tuna, Barracuda          |
| `unusual`     | Unique shapes that don't fit others     | Seahorse, Pipefish               |
| `elongated`   | Long and thin                           | Eels, Needlefish                 |
| `flat`        | Flattened body                          | Rays, Flounder                   |

> **Note:** All 7 body shapes are now fully implemented and available for use.

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

## Workflow Examples

### Example 1: Adding a Single Fish

Let's add a "Blue Chromis" step by step:

1. **Create the fish file** `api/fish/blue-chromis.json`:

   ```json
   {
     "id": "blue-chromis",
     "name": "Blue Chromis",
     "scientificName": "Chromis cyanea",
     "taxonomy": {
       "waterType": "saltwater",
       "habitat": "reef",
       "region": "caribbean",
       "family": "Pomacentridae"
     },
     "appearance": {
       "bodyShape": "oval",
       "sizeCategory": "small",
       "primaryColor": "blue",
       "pattern": "solid"
     },
     "image": "assets/fish/blue-chromis.svg",
     "colors": {
       "primary": "#3B82F6",
       "secondary": "#60A5FA",
       "accent": "#1E40AF"
     },
     "facts": [
       {
         "text": "I'm bright blue like the ocean! My color helps me blend in with the water.",
         "category": "biology",
         "sourceId": "fishbase"
       }
     ],
     "profile": {
       "habitat": "Coral reefs in the Caribbean",
       "diet": "Zooplankton and small invertebrates",
       "size": "Up to 4 inches (10 cm)",
       "lifespan": "8-15 years"
     }
   }
   ```

2. **Manually add to index** - Edit `api/index.json`:

   - Add entry to the `fish` array
   - Increment `totalFish` by 1
   - Update `lastUpdated` date

3. **Test** - Run the app and verify the fish appears

### Example 2: Adding 5 Fish from a Category

Adding 5 new goby species:

1. **Create all 5 fish files:**

   - `api/fish/yellow-watchman-goby.json`
   - `api/fish/diamond-goby.json`
   - `api/fish/firefish-goby.json`
   - `api/fish/purple-firefish-goby.json`
   - `api/fish/neon-goby.json`

2. **Update index automatically:**

   ```bash
   cd /path/to/Declans-Digital-Aquarium && \
   for f in api/fish/*.json; do \
     jq -c '{id: .id, name: .name, waterType: .taxonomy.waterType, habitat: .taxonomy.habitat, bodyShape: .appearance.bodyShape, primaryColor: .appearance.primaryColor, sizeCategory: .appearance.sizeCategory}' "$f" 2>/dev/null; \
   done | \
   jq -s '{totalFish: length, lastUpdated: now | strftime("%Y-%m-%d"), fish: .}' > api/index.json
   ```

3. **Verify:**
   ```bash
   jq '.totalFish' api/index.json  # Should show updated count
   ```

### Example 3: Batch Adding 20+ Fish

When adding many fish (like the 344 saltwater fish added previously):

1. **Organize by category** - Group fish by family or type:

   - Clownfish (15 species + 20 designer variants)
   - Tangs (30 species)
   - Angelfish (40 species)
   - etc.

2. **Create files systematically:**

   - Work through one category at a time
   - Use consistent naming patterns
   - Validate JSON syntax as you go

3. **Update index once at the end:**

   - After all files are created, run the automated index update command
   - This is much faster than manual updates
   - Ensures `totalFish` count is accurate

4. **Test in batches:**
   - Test after each major category
   - Catch issues early before adding more fish

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

When adding multiple fish (5+), follow this workflow for efficiency:

### Step-by-Step Batch Workflow

1. **Prepare your fish list** - Create a list of fish names, scientific names, and key details
2. **Create all fish files first** - Add all individual `api/fish/{id}.json` files
3. **Update index once** - Use the automated index update command (see above) instead of manually editing
4. **Test** - Verify all fish appear correctly in the app

### Example: Adding 10 Fish from a Category

Let's say you want to add 10 new angelfish species:

1. **Create fish files:**

   ```bash
   # Create each file individually
   api/fish/blueface-angelfish.json
   api/fish/emperor-angelfish.json
   api/fish/queen-angelfish.json
   # ... etc for all 10 fish
   ```

2. **After all files are created, update the index:**

   ```bash
   # Run the automated command once
   cd /path/to/Declans-Digital-Aquarium && \
   for f in api/fish/*.json; do \
     jq -c '{id: .id, name: .name, waterType: .taxonomy.waterType, habitat: .taxonomy.habitat, bodyShape: .appearance.bodyShape, primaryColor: .appearance.primaryColor, sizeCategory: .appearance.sizeCategory}' "$f" 2>/dev/null; \
   done | \
   jq -s '{totalFish: length, lastUpdated: now | strftime("%Y-%m-%d"), fish: .}' > api/index.json
   ```

3. **Verify:**
   ```bash
   # Check the total count
   jq '.totalFish' api/index.json
   ```

### Best Practices for Batch Adding

- **Create files in batches** - Group by category (e.g., all clownfish, then all tangs)
- **Use consistent naming** - Follow the `kebab-case` convention for IDs
- **Validate JSON** - Use a JSON validator or `jq` to check syntax before committing
- **Test incrementally** - After adding 10-20 fish, test the app to catch issues early
- **Update index once** - Don't manually edit `index.json` when adding many fish; use the automated command

### Current Fish Count

As of the latest update, the aquarium contains **344 fish** across all categories. The index is automatically maintained when using the batch update command.
