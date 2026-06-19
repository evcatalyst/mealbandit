# Nutrition Data Plan

This note captures a practical path for MealBandit to calculate recipe nutrition offline and eventually fit generated recipes to macro targets.

## Source Choice

Use USDA FoodData Central as the primary source of truth.

- License: FoodData Central data is public domain and published under CC0.
- Current release checked: April 2026.
- Useful data types:
  - Foundation Foods: best for common raw and minimally processed ingredients, with strong metadata.
  - SR Legacy: broad historic coverage, final release April 2018.
  - FNDDS: useful for prepared foods and household portions from dietary survey data.
  - Branded Foods: useful for UPC and packaged-product label data, but large and label-derived.

Use NutritionValue.org only as a reference UI, not as a data source. The site says its data comes from USDA, but its own terms restrict copying, reproducing, and commercial reuse of site content.

Treat Kaggle mirrors as exploratory only. They are convenient for notebooks but can be stale, incomplete, or unclear on provenance compared with direct USDA archives.

Consider Open Food Facts only if MealBandit needs barcode scans, ingredients text, international branded products, or community-maintained labels. It is open data under ODbL, which carries attribution and share-alike obligations. Keep it in a separate source namespace and do not blend it into a proprietary combined product database without a license review.

Use NIH Office of Dietary Supplements and National Academies DRI references for target ranges and recommendations, not for food composition.

## USDA Tables To Import

For FoodData Central CSV archives, the core normalized tables are:

- `food.csv`: food identity, data type, description, category, publication date.
- `nutrient.csv`: nutrient identity, name, unit, USDA nutrient number, rank.
- `food_nutrient.csv`: nutrient amount by food.
- `food_portion.csv`: household measures and gram weights.
- `measure_unit.csv`: unit labels for portions.
- `food_category.csv`: categories for Foundation and SR Legacy.
- `branded_food.csv`: brand, UPC, serving size, ingredients, and branded category, for Branded archives.
- `food_nutrient_conversion_factor.csv`, `food_calorie_conversion_factor.csv`, `food_protein_conversion_factor.csv`: conversion factors for energy and protein calculations.

For fast macro work, import all raw tables into staging, then project them into compact app tables.

## Macro Nutrients

Important USDA nutrient IDs from the April 2026 Foundation archive:

| Nutrient ID | Nutrient number | Name | Unit |
| --- | --- | --- | --- |
| 2047 | 957 | Energy (Atwater General Factors) | KCAL |
| 2048 | 958 | Energy (Atwater Specific Factors) | KCAL |
| 1008 | 208 | Energy | KCAL |
| 1003 | 203 | Protein | G |
| 1004 | 204 | Total lipid (fat) | G |
| 1005 | 205 | Carbohydrate, by difference | G |
| 1079 | 291 | Fiber, total dietary | G |
| 2000 | 269 | Total Sugars | G |
| 1235 | 539 | Sugars, added | G |
| 1258 | 606 | Fatty acids, total saturated | G |
| 1257 | 605 | Fatty acids, total trans | G |
| 1093 | 307 | Sodium, Na | MG |
| 1092 | 306 | Potassium, K | MG |
| 1087 | 301 | Calcium, Ca | MG |
| 1089 | 303 | Iron, Fe | MG |
| 1114 | 328 | Vitamin D (D2 + D3) | UG |

Prefer `2048` energy when present, then `2047`, then `1008`, then compute energy from macro grams only as a fallback. Store the energy source with each calculation.

## Offline Schema

Start with SQLite. It is simple, fast enough, portable, and can later run in-browser through SQLite WASM if MealBandit stays static.

```sql
source_release(
  id text primary key,
  source text not null,
  release_date text not null,
  license text not null,
  imported_at text not null
);

food(
  id integer primary key,
  fdc_id integer,
  source_release_id text not null,
  data_type text not null,
  description text not null,
  brand_owner text,
  gtin_upc text,
  category text,
  publication_date text,
  search_text text not null
);

nutrient(
  id integer primary key,
  fdc_nutrient_id integer not null,
  nutrient_number text,
  name text not null,
  unit text not null,
  macro_group text
);

food_nutrient(
  food_id integer not null,
  nutrient_id integer not null,
  amount_per_100g real,
  derivation_id integer,
  data_points integer,
  min_value real,
  max_value real,
  median_value real,
  primary key (food_id, nutrient_id)
);

portion(
  id integer primary key,
  food_id integer not null,
  amount real,
  unit text not null,
  gram_weight real not null,
  description text,
  data_points integer
);

food_alias(
  id integer primary key,
  food_id integer not null,
  term text not null,
  confidence real not null,
  source text not null
);
```

Add an FTS index over `food.search_text`, plus a curated alias table for recipe ingredient terms such as `boneless chicken thighs`, `corn tortillas`, `Greek yogurt`, and `olive oil`.

## Calculation Model

All recipe calculations should normalize to grams.

1. Parse each recipe line into `amount`, `unit`, and `ingredient term`.
2. Resolve the ingredient term to a canonical `food_id`.
3. Convert the quantity to grams:
   - Prefer `food_portion.gram_weight` for food-specific household measures.
   - Use direct mass units such as g and oz when supplied.
   - Use a curated density override only when FDC has no portion for the unit.
4. Calculate each nutrient:
   - `nutrient_amount = amount_per_100g * grams / 100`.
5. Sum nutrients across ingredients.
6. Divide by servings for per-serving nutrition.
7. Return confidence and warnings for weak ingredient matches, missing portions, missing nutrients, or raw/cooked ambiguity.

Do not silently convert missing nutrients to zero. Use null for unknown, especially for added sugar, micronutrients, and branded label gaps.

## Raw, Cooked, And Yield

Ingredient form matters more than the database engine.

- Dry rice and cooked rice are different foods.
- Raw chicken and cooked chicken are different foods.
- Oil absorbed during cooking is not always equal to oil listed in the ingredient bill.
- Pasta, grains, and legumes need dry-to-cooked yield handling.

For MealBandit, each library ingredient should eventually carry:

```js
{
  item: "boneless chicken thighs",
  fdcId: 123456,
  quantityBasis: "raw",
  defaultUnit: "oz",
  gramsPerDefaultUnit: 28.3495
}
```

## Nutrient Graph

Use a graph as a semantic layer, not as the primary summation engine.

Useful nodes:

- `Food`
- `Nutrient`
- `MacroGroup`
- `FoodCategory`
- `Portion`
- `IngredientTerm`
- `Recipe`
- `DietaryTarget`

Useful edges:

- `Food HAS_NUTRIENT Nutrient`
- `Food HAS_PORTION Portion`
- `Food BELONGS_TO FoodCategory`
- `IngredientTerm ALIAS_OF Food`
- `Food SUBSTITUTES_FOR Food`
- `Recipe CONTAINS Food`
- `DietaryTarget LIMITS Nutrient`

The graph helps with substitutions, explainability, and recommendations. The relational table still handles fast numeric aggregation.

## Macro Fitting

Start with deterministic scoring before adding an optimizer.

For each generated recipe candidate:

```text
score =
  protein_gap * protein_weight +
  calorie_gap * calorie_weight +
  carb_range_penalty * carb_weight +
  fat_range_penalty * fat_weight +
  sodium_penalty * sodium_weight +
  preference_penalty
```

Low-effort fitting operations:

- Scale protein portion up or down.
- Swap base: farro, rice, romaine, tortillas, noodles.
- Swap protein: chicken, tofu, chickpeas, eggs, salmon, shrimp.
- Change sauce fat source: tahini, yogurt, vinaigrette, soy glaze.
- Add or remove accent: avocado, seeds, feta.

For later versions, use a linear or mixed-integer optimizer when there is a backend. Keep the browser heuristic path for instant local generation.

## MealBandit Roadmap

1. Add a small hand-curated `data/foods.json` with 30 to 100 common ingredients used by the current recipe library.
2. Add `fdcId`, raw/cooked basis, and default gram conversion fields to the current `library` entries.
3. Add a pure JS nutrition calculator that sums calories, protein, carbs, fat, fiber, sugar, and sodium.
4. Add a compact macro panel to the recipe summary.
5. Build an offline import script that turns USDA CSV archives into SQLite plus a generated compact JSON subset.
6. Add fuzzy ingredient search and a curation UI for unresolved ingredient matches.
7. Add target macros and scoring to the blueprint generator.
8. Add branded products and barcode lookup only after the generic ingredient path is reliable.

## Operational Notes

- Keep raw source archives out of the static app bundle.
- Pin each generated database to a source release date.
- Store source attribution in the DB and UI.
- Keep USDA/FDC and Open Food Facts records source-separated.
- Ship a compact subset to the browser and keep the full Branded archive server-side.
- Rebuild on USDA release cadence: Foundation in April and October, Branded at least every FDC public release, and FNDDS every two years.
