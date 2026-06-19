# Visual Rendering Roadmap

This note captures a future direction for MealBandit's dish preview system.

## Goal

Build a continually improving ingredient-level rendering model that can produce useful dish previews without depending on hosted LLM image generation for every render.

The current browser canvas preview should evolve into a compositional visual system where each ingredient has its own reusable visual asset, rendering metadata, and alternate appearances for different dish contexts.

## Ingredient Assets

Each ingredient should eventually have a small visual asset pack:

- A base SVG or canvas-drawable object.
- Alternate appearances for common preparations, such as raw, sliced, roasted, seared, shredded, sauced, or scattered.
- Color and texture variants tuned for different dish families.
- Placement rules for bowls, salads, wraps, trays, noodle dishes, and composed plates.
- Metadata for visual scale, layer order, density, and collision/overlap behavior.

The asset system should let MealBandit render the bill of materials as a composed food object, not just as a generic decorative preview.

## Composition Model

Given a target recipe, the renderer should synthesize a composite preview from the selected ingredients:

1. Resolve recipe ingredients to canonical visual assets.
2. Choose appearance variants based on dish type, prep steps, and sauce/flavor system.
3. Lay out ingredients with deterministic but slightly varied placement.
4. Generate a composite SVG or structured canvas scene.
5. Use the composite as the canonical visual representation for the recipe.

The composed output should be stable enough to cache, compare, and improve over time as ingredient assets get better.

## Server-Side Synthesis

Because MealBandit has server-side capability, a future renderer can synthesize composite SVGs on the server from the target ingredient list and recipe metadata.

Useful server responsibilities:

- Generate a normalized composite SVG from ingredient assets.
- Cache composites by recipe signature.
- Return the SVG directly for fast previews.
- Optionally forward the SVG or rendered bitmap into an image-refinement step.
- Keep the full recipe-to-visual trace for debugging and iterative asset improvement.

This creates a path where hosted image generation becomes an optional refinement layer rather than the primary dish-rendering dependency.

## Long-Term Direction

Over time, every new ingredient and recipe interaction should improve the local rendering model:

- Add missing ingredient SVGs as gaps are found.
- Add alternate appearances when dish combos look repetitive.
- Record which ingredient combinations need custom layout rules.
- Use generated/refined images as references for improving first-party SVG/canvas assets.
- Keep the default preview deterministic, low-cost, inspectable, and independent of hosted LLM calls.

The eventual target is a visual model where MealBandit can produce a credible ingredient-aware preview from structured recipe data, then use Grok or another model only for optional polish.
