const state = {
  servings: 2,
  time: 30,
  mode: "omnivore",
  pantryFirst: true,
  leftovers: false,
  seedOffset: 0,
};

const library = {
  bases: [
    { name: "farro", item: "farro", amount: 0.5, unit: "cup", minutes: 25, cost: 3 },
    { name: "jasmine rice", item: "jasmine rice", amount: 0.5, unit: "cup", minutes: 18, cost: 2 },
    { name: "rice noodles", item: "rice noodles", amount: 2, unit: "oz", minutes: 12, cost: 3 },
    { name: "warm tortillas", item: "corn tortillas", amount: 3, unit: "each", minutes: 8, cost: 2 },
    { name: "crisp romaine", item: "romaine hearts", amount: 0.5, unit: "head", minutes: 5, cost: 3 },
  ],
  proteins: {
    omnivore: [
      { name: "seared chicken", item: "boneless chicken thighs", amount: 5, unit: "oz", minutes: 14, cost: 7 },
      { name: "turkey meatballs", item: "ground turkey", amount: 5, unit: "oz", minutes: 18, cost: 7 },
      { name: "jammy eggs", item: "large eggs", amount: 2, unit: "each", minutes: 9, cost: 2 },
    ],
    vegetarian: [
      { name: "crispy tofu", item: "extra-firm tofu", amount: 4, unit: "oz", minutes: 16, cost: 3 },
      { name: "chickpea patties", item: "canned chickpeas", amount: 0.5, unit: "can", minutes: 15, cost: 2 },
      { name: "halloumi", item: "halloumi", amount: 3, unit: "oz", minutes: 8, cost: 6 },
    ],
    pescatarian: [
      { name: "miso salmon", item: "salmon fillet", amount: 5, unit: "oz", minutes: 13, cost: 9 },
      { name: "garlic shrimp", item: "shrimp", amount: 5, unit: "oz", minutes: 8, cost: 8 },
      { name: "tuna cakes", item: "canned tuna", amount: 0.5, unit: "can", minutes: 14, cost: 4 },
    ],
  },
  produce: [
    { name: "broccoli + peppers", items: [["broccoli", 1, "cup"], ["red bell pepper", 0.5, "each"]], minutes: 12, cost: 5 },
    { name: "cucumber + snap peas", items: [["cucumber", 0.5, "each"], ["snap peas", 1, "cup"]], minutes: 6, cost: 5 },
    { name: "zucchini + tomatoes", items: [["zucchini", 0.5, "each"], ["cherry tomatoes", 0.75, "cup"]], minutes: 10, cost: 4 },
    { name: "cabbage + carrots", items: [["green cabbage", 1, "cup"], ["carrots", 1, "each"]], minutes: 8, cost: 3 },
    { name: "corn + poblanos", items: [["corn kernels", 0.75, "cup"], ["poblano pepper", 0.5, "each"]], minutes: 11, cost: 4 },
  ],
  sauces: [
    {
      name: "lemon tahini",
      items: [["tahini", 1.5, "tbsp"], ["lemon", 0.5, "each"], ["garlic", 1, "clove"]],
      flavor: "nutty, bright, and creamy",
      cost: 2,
    },
    {
      name: "ginger soy glaze",
      items: [["soy sauce", 1.5, "tbsp"], ["fresh ginger", 1, "tsp"], ["honey", 1, "tsp"]],
      flavor: "salty, glossy, and aromatic",
      cost: 2,
    },
    {
      name: "green herb yogurt",
      items: [["Greek yogurt", 2, "tbsp"], ["parsley", 0.25, "cup"], ["lime", 0.5, "each"]],
      flavor: "cool, herbal, and tangy",
      cost: 3,
    },
    {
      name: "smoky tomato vinaigrette",
      items: [["tomato paste", 1, "tbsp"], ["red wine vinegar", 1, "tbsp"], ["smoked paprika", 0.5, "tsp"]],
      flavor: "smoky, acidic, and savory",
      cost: 2,
    },
  ],
  accents: [
    ["cilantro", 0.25, "cup"],
    ["toasted seeds", 1, "tbsp"],
    ["pickled onions", 2, "tbsp"],
    ["feta", 1, "oz"],
    ["avocado", 0.25, "each"],
  ],
};

const visualStyles = {
  bases: {
    farro: ["#9f7545", "#c69c65", "#704f2e"],
    "jasmine rice": ["#f7f4e8", "#e7dcc5", "#d6c8a8"],
    "rice noodles": ["#f0e7d5", "#dfcfb5", "#fff8eb"],
    "warm tortillas": ["#d9a74f", "#f1d58c", "#a96931"],
    "crisp romaine": ["#6fb36f", "#d8edb7", "#2f7a4c"],
  },
  proteins: {
    "seared chicken": ["#c07a42", "#f0bf7d", "#7a3f24"],
    "turkey meatballs": ["#8c5738", "#c98b5b", "#5b3325"],
    "jammy eggs": ["#fff7e5", "#f3b43c", "#d6851f"],
    "crispy tofu": ["#e5c889", "#f7e4af", "#9d7837"],
    "chickpea patties": ["#bc8b42", "#e0b663", "#785324"],
    halloumi: ["#f0d78f", "#fff0b3", "#9d7731"],
    "miso salmon": ["#e87b53", "#ffb08b", "#9d3f2f"],
    "garlic shrimp": ["#f2a28c", "#ffd2bc", "#b85a4a"],
    "tuna cakes": ["#ad876a", "#d6b08c", "#6d4d3f"],
  },
  produce: {
    "broccoli + peppers": ["#2f7a4c", "#92bd3e", "#d54d3e"],
    "cucumber + snap peas": ["#5fae78", "#c9e5b0", "#1f7f55"],
    "zucchini + tomatoes": ["#5a9a54", "#e24e3b", "#f0b25d"],
    "cabbage + carrots": ["#d8e6bf", "#f08d36", "#6f9c62"],
    "corn + poblanos": ["#f1c955", "#315d42", "#d68a30"],
  },
  sauces: {
    "lemon tahini": ["#f4e6bd", "#fff8dd"],
    "ginger soy glaze": ["#6b3b27", "#c37b48"],
    "green herb yogurt": ["#dff0cf", "#65a762"],
    "smoky tomato vinaigrette": ["#b94432", "#f08a53"],
  },
  accents: {
    cilantro: ["#2d8b58", "#7fc271"],
    "toasted seeds": ["#d0a64a", "#7a5624"],
    "pickled onions": ["#d64b7c", "#f2a3bb"],
    feta: ["#fff8ed", "#d9d4c7"],
    avocado: ["#9dc869", "#3f7d49"],
  },
};

const macroData = {
  avocado: { unit: "each", calories: 320, protein: 4, carbs: 17, fat: 29 },
  "black pepper": { unit: "tsp", calories: 6, protein: 0, carbs: 1.5, fat: 0 },
  "boneless chicken thighs": { unit: "oz", calories: 50, protein: 5.8, carbs: 0, fat: 3 },
  broccoli: { unit: "cup", calories: 31, protein: 2.5, carbs: 6, fat: 0.3 },
  "canned chickpeas": { unit: "can", calories: 420, protein: 22, carbs: 70, fat: 8 },
  "canned tuna": { unit: "can", calories: 190, protein: 42, carbs: 0, fat: 2 },
  carrots: { unit: "each", calories: 25, protein: 0.6, carbs: 6, fat: 0.1 },
  "cherry tomatoes": { unit: "cup", calories: 30, protein: 1.5, carbs: 6, fat: 0.3 },
  cilantro: { unit: "cup", calories: 4, protein: 0.4, carbs: 0.6, fat: 0 },
  "corn kernels": { unit: "cup", calories: 143, protein: 5, carbs: 31, fat: 2 },
  "corn tortillas": { unit: "each", calories: 52, protein: 1.5, carbs: 11, fat: 0.7 },
  cucumber: { unit: "each", calories: 30, protein: 1.3, carbs: 7, fat: 0.2 },
  "extra-firm tofu": { unit: "oz", calories: 28, protein: 3, carbs: 0.7, fat: 1.7 },
  farro: { unit: "cup", calories: 680, protein: 24, carbs: 136, fat: 3 },
  feta: { unit: "oz", calories: 75, protein: 4, carbs: 1, fat: 6 },
  "fresh ginger": { unit: "tsp", calories: 2, protein: 0, carbs: 0.4, fat: 0 },
  garlic: { unit: "clove", calories: 4, protein: 0.2, carbs: 1, fat: 0 },
  "Greek yogurt": { unit: "tbsp", calories: 9, protein: 1.5, carbs: 0.7, fat: 0.2 },
  "green cabbage": { unit: "cup", calories: 22, protein: 1, carbs: 5, fat: 0.1 },
  "ground turkey": { unit: "oz", calories: 48, protein: 5.8, carbs: 0, fat: 2.8 },
  halloumi: { unit: "oz", calories: 90, protein: 6, carbs: 0.5, fat: 7 },
  honey: { unit: "tsp", calories: 21, protein: 0, carbs: 5.7, fat: 0 },
  "jasmine rice": { unit: "cup", calories: 676, protein: 13, carbs: 148, fat: 1 },
  "kosher salt": { unit: "tsp", calories: 0, protein: 0, carbs: 0, fat: 0 },
  "large eggs": { unit: "each", calories: 72, protein: 6.3, carbs: 0.4, fat: 5 },
  lemon: { unit: "each", calories: 12, protein: 0.5, carbs: 4, fat: 0.1 },
  lime: { unit: "each", calories: 20, protein: 0.5, carbs: 7, fat: 0.1 },
  "olive oil": { unit: "tbsp", calories: 119, protein: 0, carbs: 0, fat: 13.5 },
  parsley: { unit: "cup", calories: 22, protein: 1.8, carbs: 4, fat: 0.4 },
  "pickled onions": { unit: "tbsp", calories: 8, protein: 0, carbs: 1.5, fat: 0 },
  "poblano pepper": { unit: "each", calories: 26, protein: 1, carbs: 6, fat: 0.2 },
  "red bell pepper": { unit: "each", calories: 37, protein: 1.2, carbs: 9, fat: 0.3 },
  "red wine vinegar": { unit: "tbsp", calories: 3, protein: 0, carbs: 0, fat: 0 },
  "rice noodles": { unit: "oz", calories: 100, protein: 1.8, carbs: 22.5, fat: 0.2 },
  "romaine hearts": { unit: "head", calories: 80, protein: 6, carbs: 16, fat: 1 },
  salmon: { unit: "oz", calories: 56, protein: 6.2, carbs: 0, fat: 3.4 },
  "salmon fillet": { unit: "oz", calories: 56, protein: 6.2, carbs: 0, fat: 3.4 },
  shrimp: { unit: "oz", calories: 28, protein: 6.6, carbs: 0, fat: 0.2 },
  "smoked paprika": { unit: "tsp", calories: 6, protein: 0.3, carbs: 1, fat: 0.3 },
  "snap peas": { unit: "cup", calories: 41, protein: 2.7, carbs: 7, fat: 0.2 },
  "soy sauce": { unit: "tbsp", calories: 10, protein: 1.3, carbs: 1, fat: 0 },
  "storage containers": { unit: "set", calories: 0, protein: 0, carbs: 0, fat: 0 },
  tahini: { unit: "tbsp", calories: 90, protein: 3, carbs: 3, fat: 8 },
  "tomato paste": { unit: "tbsp", calories: 13, protein: 0.7, carbs: 3, fat: 0.1 },
  "toasted seeds": { unit: "tbsp", calories: 50, protein: 2, carbs: 2, fat: 4 },
  "zucchini": { unit: "each", calories: 33, protein: 2.4, carbs: 6, fat: 0.6 },
};

const ideaInput = document.querySelector("#ideaInput");
const likesInput = document.querySelector("#likesInput");
const dislikesInput = document.querySelector("#dislikesInput");
const allergyInput = document.querySelector("#allergyInput");
const hateInput = document.querySelector("#hateInput");
const carbLimitInput = document.querySelector("#carbLimitInput");
const proteinMinInput = document.querySelector("#proteinMinInput");
const calorieLimitInput = document.querySelector("#calorieLimitInput");
const fatLimitInput = document.querySelector("#fatLimitInput");
const timeRange = document.querySelector("#timeRange");
const timeOutput = document.querySelector("#timeOutput");
const pantryToggle = document.querySelector("#pantryToggle");
const batchToggle = document.querySelector("#batchToggle");
const buildBtn = document.querySelector("#buildBtn");
const randomBtn = document.querySelector("#randomBtn");
const copyBtn = document.querySelector("#copyBtn");
const downloadBtn = document.querySelector("#downloadBtn");
const photoDownloadBtn = document.querySelector("#photoDownloadBtn");
const grokGenerateBtn = document.querySelector("#grokGenerateBtn");

const targets = {
  photo: document.querySelector("#mealPhoto"),
  grokPhoto: document.querySelector("#grokPhoto"),
  photoMode: document.querySelector("#photoModeLabel"),
  grokStatus: document.querySelector("#grokStatus"),
  base: document.querySelector("#baseLabel"),
  protein: document.querySelector("#proteinLabel"),
  produce: document.querySelector("#produceLabel"),
  sauce: document.querySelector("#sauceLabel"),
  title: document.querySelector("#recipeTitle"),
  metricTime: document.querySelector("#metricTime"),
  metricServings: document.querySelector("#metricServings"),
  metricCost: document.querySelector("#metricCost"),
  flavor: document.querySelector("#flavorText"),
  risks: document.querySelector("#riskList"),
  macroCalories: document.querySelector("#macroCalories"),
  macroProtein: document.querySelector("#macroProtein"),
  macroCarbs: document.querySelector("#macroCarbs"),
  macroFat: document.querySelector("#macroFat"),
  macroStatus: document.querySelector("#macroStatus"),
  macroTweaks: document.querySelector("#macroTweakList"),
  preferences: document.querySelector("#preferenceList"),
  ingredients: document.querySelector("#ingredientList"),
  gear: document.querySelector("#gearList"),
  spend: document.querySelector("#spendEstimate"),
  prepLoad: document.querySelector("#prepLoad"),
  steps: document.querySelector("#prepSteps"),
};

let currentBlueprint;

function hashText(value) {
  return [...value].reduce((total, char) => total + char.charCodeAt(0), 0);
}

function stableHash(value) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(36);
}

function pick(items, seed) {
  return items[Math.abs(seed) % items.length];
}

function scaleAmount(amount) {
  return amount * state.servings;
}

function formatAmount(amount) {
  const rounded = Math.round(amount * 4) / 4;

  if (Number.isInteger(rounded)) {
    return String(rounded);
  }

  const whole = Math.floor(rounded);
  const fraction = rounded - whole;
  const fractions = {
    0.25: "1/4",
    0.5: "1/2",
    0.75: "3/4",
  };

  if (fractions[fraction]) {
    return whole ? `${whole} ${fractions[fraction]}` : fractions[fraction];
  }

  return rounded.toFixed(1);
}

function titleCase(value) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function keywordBias(text) {
  const lowered = text.toLowerCase();
  return {
    light: /salad|light|fresh|crisp|summer/.test(lowered),
    cozy: /cozy|warm|comfort|soup|stew/.test(lowered),
    spicy: /spicy|heat|chili|pepper|taco/.test(lowered),
    fast: /fast|quick|minute|weeknight|easy/.test(lowered),
    highProtein: /protein|gym|filling|hearty/.test(lowered),
  };
}

const preferenceAliases = {
  dairy: ["yogurt", "halloumi", "feta"],
  egg: ["egg", "eggs"],
  eggs: ["egg", "eggs"],
  fish: ["salmon", "tuna"],
  gluten: ["farro", "tortillas"],
  nuts: ["tahini"],
  seafood: ["salmon", "shrimp", "tuna"],
  sesame: ["tahini"],
  shellfish: ["shrimp"],
};

function splitTerms(value) {
  return value
    .toLowerCase()
    .split(/[,;\n]+/)
    .map((term) => term.trim())
    .filter(Boolean);
}

function parseHateEntries(value) {
  return value
    .split(/[\n;]+/)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((raw) => {
      const term = raw.split(/\s+(?:because|bc|due to)\s+|:|-/i)[0].trim().toLowerCase();
      return { raw, term: term || raw.toLowerCase() };
    });
}

function expandTerms(terms) {
  return [...new Set(terms.flatMap((term) => [term, ...(preferenceAliases[term] || [])]))];
}

function preferenceProfile() {
  const hateEntries = parseHateEntries(hateInput.value);

  return {
    likes: splitTerms(likesInput.value),
    dislikes: splitTerms(dislikesInput.value),
    allergies: expandTerms(splitTerms(allergyInput.value)),
    hateEntries,
    hates: expandTerms(hateEntries.map((entry) => entry.term)),
  };
}

function optionText(option) {
  if (Array.isArray(option)) {
    return option.join(" ").toLowerCase();
  }

  return [
    option.name,
    option.item,
    option.flavor,
    ...(option.items || []).flat(),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function containsAnyTerm(text, terms) {
  return terms.some((term) => text.includes(term));
}

function optionScore(option, profile) {
  const text = optionText(option);
  const hardBlocked = containsAnyTerm(text, profile.allergies) || containsAnyTerm(text, profile.hates);
  const disliked = containsAnyTerm(text, profile.dislikes);
  const liked = containsAnyTerm(text, profile.likes);

  return { hardBlocked, disliked, liked };
}

function pickProfiled(items, seed, profile) {
  const scored = items.map((item) => ({ item, score: optionScore(item, profile) }));
  const liked = scored.filter(({ score }) => !score.hardBlocked && !score.disliked && score.liked);
  const neutral = scored.filter(({ score }) => !score.hardBlocked && !score.disliked);
  const safe = scored.filter(({ score }) => !score.hardBlocked);
  const pool = liked.length ? liked : neutral.length ? neutral : safe.length ? safe : scored;

  return pick(pool.map(({ item }) => item), seed);
}

function preferenceNotesFor(profile) {
  const notes = [];

  if (profile.likes.length) {
    notes.push(`Biased toward: ${profile.likes.join(", ")}.`);
  }

  if (profile.dislikes.length) {
    notes.push(`Avoided when possible: ${profile.dislikes.join(", ")}.`);
  }

  if (splitTerms(allergyInput.value).length) {
    notes.push(`Hard exclusions: ${splitTerms(allergyInput.value).join(", ")}.`);
  }

  if (profile.hateEntries.length) {
    notes.push(`Absolutely hate: ${profile.hateEntries.map((entry) => entry.raw).join("; ")}.`);
  }

  return notes.length ? notes : ["No preference profile yet."];
}

function parseMacroTarget(input) {
  const value = Number(input.value);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function macroGoals() {
  return {
    maxCarbs: parseMacroTarget(carbLimitInput),
    minProtein: parseMacroTarget(proteinMinInput),
    maxCalories: parseMacroTarget(calorieLimitInput),
    maxFat: parseMacroTarget(fatLimitInput),
  };
}

function lowCarbTargetActive(goals) {
  return goals.maxCarbs && goals.maxCarbs <= 30;
}

function macroAwareBasePool(basePool, goals) {
  if (!lowCarbTargetActive(goals)) {
    return basePool;
  }

  const lowCarbBases = basePool.filter((base) => base.name === "crisp romaine");
  return lowCarbBases.length ? lowCarbBases : basePool;
}

function macroAwareProteinPool(proteinPool, goals) {
  if (!lowCarbTargetActive(goals)) {
    return proteinPool;
  }

  const lowerCarbProteins = proteinPool.filter((protein) => !/chickpea/.test(protein.name));
  return lowerCarbProteins.length ? lowerCarbProteins : proteinPool;
}

function macroAwareProducePool(producePool, goals) {
  if (!lowCarbTargetActive(goals)) {
    return producePool;
  }

  const lowerCarbProduce = goals.maxCarbs <= 21
    ? producePool.filter((produce) => ["zucchini + tomatoes", "broccoli + peppers", "cucumber + snap peas"].includes(produce.name))
    : producePool.filter((produce) => produce.name !== "corn + poblanos");
  return lowerCarbProduce.length ? lowerCarbProduce : producePool;
}

function macroAwareSaucePool(saucePool, goals) {
  if (!lowCarbTargetActive(goals)) {
    return saucePool;
  }

  const lowerCarbSauces = goals.maxCarbs <= 21
    ? saucePool.filter((sauce) => sauce.name === "smoky tomato vinaigrette")
    : saucePool.filter((sauce) => sauce.name !== "ginger soy glaze");
  return lowerCarbSauces.length ? lowerCarbSauces : saucePool;
}

function macroAwareAccentPool(accentPool, goals) {
  if (!lowCarbTargetActive(goals)) {
    return accentPool;
  }

  const lowerCarbAccents = goals.maxCarbs <= 21
    ? accentPool.filter(([name]) => ["cilantro", "toasted seeds"].includes(name))
    : accentPool.filter(([name]) => name !== "pickled onions");
  return lowerCarbAccents.length ? lowerCarbAccents : accentPool;
}

function buildBlueprint() {
  const idea = ideaInput.value.trim() || "fast dinner with vegetables";
  const profile = preferenceProfile();
  const goals = macroGoals();
  const seed = hashText(`${idea}-${likesInput.value}-${dislikesInput.value}-${allergyInput.value}-${hateInput.value}-${carbLimitInput.value}-${proteinMinInput.value}-${calorieLimitInput.value}-${fatLimitInput.value}-${state.mode}-${state.time}-${state.seedOffset}`);
  const bias = keywordBias(idea);

  const basePool = macroAwareBasePool(bias.light ? library.bases.slice(2) : library.bases, goals);
  const proteinPool = macroAwareProteinPool(library.proteins[state.mode], goals);
  const producePool = macroAwareProducePool(library.produce, goals);
  const saucePool = macroAwareSaucePool(library.sauces, goals);
  const accentPool = macroAwareAccentPool(library.accents, goals);
  const base = pickProfiled(basePool, seed + 2, profile);
  const protein = pickProfiled(proteinPool, seed + (bias.highProtein ? 4 : 1), profile);
  const produce = pickProfiled(producePool, seed + (bias.spicy ? 9 : 3), profile);
  const sauce = pickProfiled(saucePool, seed + (bias.cozy ? 5 : 7), profile);
  const accent = pickProfiled(accentPool, seed + 11, profile);

  const activeTime = Math.min(
    state.time,
    Math.max(18, Math.round(Math.max(base.minutes, protein.minutes) + produce.minutes * 0.45 + 6)),
  );
  const spend = Math.round((base.cost + protein.cost + produce.cost + sauce.cost + 2) * (state.servings / 2));
  const costBand = spend < 22 ? "$" : spend < 36 ? "$$" : "$$$";
  const prepLoad = activeTime <= 25 ? "Light" : activeTime <= 40 ? "Medium" : "Full";

  const ingredients = [
    [base.item, base.amount, base.unit],
    [protein.item, protein.amount, protein.unit],
    ...produce.items,
    ...sauce.items,
    accent,
  ];

  if (state.pantryFirst) {
    ingredients.push(["olive oil", 1, "tbsp"], ["kosher salt", 0.5, "tsp"], ["black pepper", 0.25, "tsp"]);
  }

  if (state.leftovers) {
    ingredients.push(["storage containers", 1, "set"]);
  }

  return {
    base,
    protein,
    produce,
    sauce,
    accent,
    activeTime,
    spend,
    costBand,
    prepLoad,
    title: `${titleCase(sauce.name)} ${titleCase(protein.name)} ${titleCase(base.name)} Bowls`,
    flavor: `${titleCase(base.name)} anchors ${protein.name}, ${produce.name}, ${accent[0]}, and a ${sauce.flavor} finish.`,
    ingredients,
    gear: gearFor(base, protein, produce),
    risks: risksFor({ base, protein, produce, activeTime, bias, profile }),
    preferenceNotes: preferenceNotesFor(profile),
    steps: stepsFor({ base, protein, produce, sauce, accent }),
  };
}

function gearFor(base, protein, produce) {
  const gear = ["chef knife", "cutting board", "mixing bowl"];

  if (base.minutes > 10) {
    gear.push("small saucepan");
  }

  if (/seared|crispy|shrimp|halloumi|patties|meatballs/.test(protein.name)) {
    gear.push("wide skillet");
  }

  if (/broccoli|zucchini|corn/.test(produce.name)) {
    gear.push("sheet pan");
  }

  return [...new Set(gear)];
}

function risksFor({ base, protein, produce, activeTime, bias, profile }) {
  const risks = [];

  if (activeTime >= state.time) {
    risks.push("Cook base first; the time box is tight.");
  }

  if (/chicken|salmon|shrimp|turkey/.test(protein.item)) {
    risks.push("Verify protein doneness before assembly.");
  }

  if (bias.spicy) {
    risks.push("Keep sauce mild, then add heat at the table.");
  }

  if (/cucumber|romaine|snap peas/.test(produce.name)) {
    risks.push("Dress crisp produce last.");
  }

  if (profile.allergies.length || profile.hates.length) {
    risks.push("Hard avoids were applied before choosing ingredients.");
  }

  return risks.length ? risks : ["No special constraints in this build."];
}

function stepsFor({ base, protein, produce, sauce, accent }) {
  return [
    {
      title: "Start the base",
      body: `Cook ${base.name} with salt, then spread it out so it stays loose.`,
    },
    {
      title: "Cook the protein",
      body: `Season and cook ${protein.name}; rest it while vegetables finish.`,
    },
    {
      title: "Shape the produce",
      body: `Prep ${produce.name} for contrast: one tender element and one crisp edge.`,
    },
    {
      title: "Finish the bowl",
      body: `Whisk ${sauce.name}, fold in ${accent[0]}, and assemble in warm layers.`,
    },
  ];
}

function randomFromSeed(seed) {
  let value = hashText(seed) || 13579;

  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function styleFor(group, name) {
  return visualStyles[group]?.[name] || ["#d7b983", "#f4e0b1", "#7d6042"];
}

function platePoint(plate, nx, ny) {
  return {
    x: plate.cx + nx * plate.rx,
    y: plate.cy + ny * plate.ry,
  };
}

function drawEllipse(ctx, x, y, rx, ry, color, rotation = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function roundRectPath(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);

  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawRotatedRect(ctx, x, y, width, height, radius, color, rotation, strokeColor) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  roundRectPath(ctx, -width / 2, -height / 2, width, height, radius);
  ctx.fillStyle = color;
  ctx.fill();

  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  ctx.restore();
}

function drawTable(ctx, width, height, random) {
  const table = ctx.createLinearGradient(0, 0, width, height);
  table.addColorStop(0, "#edf4ef");
  table.addColorStop(0.55, "#dce8e1");
  table.addColorStop(1, "#cbdad2");
  ctx.fillStyle = table;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = 0.42;
  for (let i = 0; i < 340; i += 1) {
    const dot = random() > 0.5 ? "#ffffff" : "#8aa197";
    drawEllipse(ctx, random() * width, random() * height, random() * 1.8 + 0.4, random() * 1.3 + 0.3, dot);
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.fillStyle = "#466f6b";
  roundRectPath(ctx, width * 0.7, height * 0.08, width * 0.24, height * 0.18, 26);
  ctx.fill();
  ctx.restore();
}

function drawPlate(ctx, width, height) {
  const plate = {
    cx: width * 0.52,
    cy: height * 0.55,
    rx: width * 0.32,
    ry: height * 0.35,
  };

  ctx.save();
  ctx.shadowColor = "rgba(20, 30, 26, 0.26)";
  ctx.shadowBlur = 34;
  ctx.shadowOffsetY = 20;
  drawEllipse(ctx, plate.cx, plate.cy + 8, plate.rx + 34, plate.ry + 26, "rgba(255, 255, 255, 0.96)");
  ctx.restore();

  const rim = ctx.createRadialGradient(plate.cx - 80, plate.cy - 70, 40, plate.cx, plate.cy, plate.rx + 60);
  rim.addColorStop(0, "#ffffff");
  rim.addColorStop(0.72, "#f7fbf8");
  rim.addColorStop(1, "#dbe7e0");
  drawEllipse(ctx, plate.cx, plate.cy, plate.rx + 18, plate.ry + 14, rim);

  const bowl = ctx.createRadialGradient(plate.cx - 120, plate.cy - 90, 30, plate.cx, plate.cy, plate.rx);
  bowl.addColorStop(0, "#f6fbf7");
  bowl.addColorStop(0.82, "#f0f6f1");
  bowl.addColorStop(1, "#d2dfd8");
  drawEllipse(ctx, plate.cx, plate.cy, plate.rx * 0.9, plate.ry * 0.84, bowl);

  return plate;
}

function drawBase(ctx, plate, name, colors, random) {
  ctx.save();
  ctx.globalAlpha = 0.95;

  if (name.includes("noodles")) {
    for (let i = 0; i < 44; i += 1) {
      const p = platePoint(plate, random() * 1.1 - 0.55, random() * 0.9 - 0.35);
      ctx.beginPath();
      ctx.strokeStyle = colors[i % colors.length];
      ctx.lineWidth = random() * 5 + 4;
      ctx.lineCap = "round";
      ctx.moveTo(p.x - 34, p.y + random() * 22 - 11);
      ctx.bezierCurveTo(p.x - 6, p.y - 28, p.x + 28, p.y + 28, p.x + 55, p.y - 8);
      ctx.stroke();
    }
  } else if (name.includes("romaine")) {
    for (let i = 0; i < 60; i += 1) {
      const p = platePoint(plate, random() * 1.1 - 0.55, random() * 0.95 - 0.45);
      drawEllipse(ctx, p.x, p.y, random() * 30 + 18, random() * 9 + 6, colors[i % colors.length], random() * Math.PI);
    }
  } else if (name.includes("tortillas")) {
    for (let i = 0; i < 12; i += 1) {
      const p = platePoint(plate, random() * 0.95 - 0.48, random() * 0.8 - 0.38);
      drawRotatedRect(ctx, p.x, p.y, 120, 46, 22, colors[i % colors.length], random() * Math.PI, "rgba(124, 79, 31, 0.22)");
    }
  } else {
    for (let i = 0; i < 190; i += 1) {
      const p = platePoint(plate, random() * 1.08 - 0.54, random() * 0.9 - 0.4);
      drawEllipse(ctx, p.x, p.y, random() * 9 + 4, random() * 7 + 3, colors[i % colors.length], random() * Math.PI);
    }
  }

  ctx.restore();
}

function drawProduce(ctx, plate, name, colors, random) {
  ctx.save();
  ctx.shadowColor = "rgba(40, 70, 45, 0.18)";
  ctx.shadowBlur = 8;

  for (let i = 0; i < 64; i += 1) {
    const zone = i % 2 === 0 ? -0.48 : 0.48;
    const p = platePoint(plate, zone + random() * 0.26 - 0.13, random() * 0.76 - 0.32);
    const color = colors[i % colors.length];

    if (name.includes("peppers") || name.includes("carrots") || name.includes("poblanos")) {
      drawRotatedRect(ctx, p.x, p.y, random() * 58 + 28, random() * 14 + 8, 8, color, random() * Math.PI);
    } else if (name.includes("tomatoes") || name.includes("corn")) {
      drawEllipse(ctx, p.x, p.y, random() * 15 + 8, random() * 13 + 7, color, random() * Math.PI);
      ctx.globalAlpha = 0.34;
      drawEllipse(ctx, p.x - 3, p.y - 3, 4, 3, "#ffffff");
      ctx.globalAlpha = 1;
    } else {
      drawEllipse(ctx, p.x, p.y, random() * 22 + 10, random() * 15 + 8, color, random() * Math.PI);
    }
  }

  ctx.restore();
}

function drawProtein(ctx, plate, name, colors, random) {
  ctx.save();
  ctx.shadowColor = "rgba(64, 40, 25, 0.24)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 5;

  const count = name.includes("eggs") ? 5 : name.includes("shrimp") ? 14 : name.includes("meatballs") || name.includes("patties") || name.includes("cakes") ? 14 : 10;

  for (let i = 0; i < count; i += 1) {
    const p = platePoint(plate, random() * 0.62 - 0.08, random() * 0.42 - 0.42);
    const color = colors[i % colors.length];

    if (name.includes("eggs")) {
      drawEllipse(ctx, p.x, p.y, 42, 28, colors[0], random() * Math.PI);
      drawEllipse(ctx, p.x + random() * 10 - 5, p.y + random() * 8 - 4, 14, 12, colors[1]);
    } else if (name.includes("shrimp")) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 18;
      ctx.lineCap = "round";
      ctx.arc(p.x, p.y, random() * 14 + 18, Math.PI * 0.2, Math.PI * 1.45);
      ctx.stroke();
    } else if (name.includes("meatballs") || name.includes("patties") || name.includes("cakes")) {
      drawEllipse(ctx, p.x, p.y, random() * 18 + 22, random() * 14 + 19, color, random() * Math.PI);
      ctx.globalAlpha = 0.28;
      drawEllipse(ctx, p.x - 6, p.y - 7, 7, 4, "#ffffff");
      ctx.globalAlpha = 1;
    } else {
      drawRotatedRect(ctx, p.x, p.y, random() * 58 + 74, random() * 20 + 32, 16, color, random() * Math.PI, colors[2]);
      ctx.globalAlpha = 0.32;
      drawRotatedRect(ctx, p.x - 4, p.y - 5, 48, 5, 3, "#fff3d2", random() * Math.PI);
      ctx.globalAlpha = 1;
    }
  }

  ctx.restore();
}

function drawSauce(ctx, plate, colors, random) {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.shadowColor = "rgba(50, 32, 20, 0.18)";
  ctx.shadowBlur = 9;

  for (let i = 0; i < 7; i += 1) {
    const start = platePoint(plate, -0.42 + random() * 0.28, -0.24 + random() * 0.26);
    const end = platePoint(plate, 0.38 - random() * 0.14, 0.24 - random() * 0.22);
    ctx.beginPath();
    ctx.strokeStyle = colors[i % colors.length];
    ctx.lineWidth = random() * 9 + 8;
    ctx.globalAlpha = 0.82;
    ctx.moveTo(start.x, start.y);
    ctx.bezierCurveTo(plate.cx - 70 + random() * 80, plate.cy - 110 + random() * 80, plate.cx + 80 - random() * 50, plate.cy + 70 - random() * 90, end.x, end.y);
    ctx.stroke();
  }

  for (let i = 0; i < 16; i += 1) {
    const p = platePoint(plate, random() * 0.9 - 0.45, random() * 0.72 - 0.3);
    ctx.globalAlpha = 0.75;
    drawEllipse(ctx, p.x, p.y, random() * 11 + 7, random() * 7 + 5, colors[i % colors.length], random() * Math.PI);
  }

  ctx.restore();
}

function drawAccent(ctx, plate, accent, colors, random) {
  ctx.save();
  for (let i = 0; i < 46; i += 1) {
    const p = platePoint(plate, random() * 0.94 - 0.47, random() * 0.72 - 0.32);
    const color = colors[i % colors.length];

    if (accent.includes("seeds")) {
      drawEllipse(ctx, p.x, p.y, random() * 5 + 3, random() * 3 + 2, color, random() * Math.PI);
    } else if (accent.includes("feta")) {
      drawRotatedRect(ctx, p.x, p.y, random() * 16 + 9, random() * 13 + 8, 3, color, random() * Math.PI);
    } else if (accent.includes("onions")) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 5;
      ctx.arc(p.x, p.y, random() * 10 + 8, Math.PI * 0.1, Math.PI * 1.5);
      ctx.stroke();
    } else {
      drawEllipse(ctx, p.x, p.y, random() * 16 + 9, random() * 7 + 4, color, random() * Math.PI);
    }
  }
  ctx.restore();
}

function drawPhotoFinish(ctx, width, height, random) {
  const vignette = ctx.createRadialGradient(width * 0.5, height * 0.5, width * 0.24, width * 0.5, height * 0.52, width * 0.74);
  vignette.addColorStop(0, "rgba(255,255,255,0)");
  vignette.addColorStop(1, "rgba(22,31,26,0.18)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = 0.12;
  for (let i = 0; i < 520; i += 1) {
    const shade = random() > 0.52 ? "#ffffff" : "#22322c";
    drawEllipse(ctx, random() * width, random() * height, random() * 1.3 + 0.4, random() * 1.2 + 0.4, shade);
  }
  ctx.restore();
}

function drawGeneratedPhoto(blueprint) {
  const canvas = targets.photo;

  if (!canvas || typeof canvas.getContext !== "function") {
    return;
  }

  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const random = randomFromSeed(`${blueprint.title}-${state.seedOffset}-${ideaInput.value}`);

  ctx.clearRect(0, 0, width, height);
  drawTable(ctx, width, height, random);
  const plate = drawPlate(ctx, width, height);
  drawBase(ctx, plate, blueprint.base.name, styleFor("bases", blueprint.base.name), random);
  drawProduce(ctx, plate, blueprint.produce.name, styleFor("produce", blueprint.produce.name), random);
  drawProtein(ctx, plate, blueprint.protein.name, styleFor("proteins", blueprint.protein.name), random);
  drawSauce(ctx, plate, styleFor("sauces", blueprint.sauce.name), random);
  drawAccent(ctx, plate, blueprint.accent[0], styleFor("accents", blueprint.accent[0]), random);
  drawPhotoFinish(ctx, width, height, random);

  canvas.setAttribute("aria-label", `Dynamically generated photo of ${blueprint.title}`);
}

function grokStorageKey(cacheKey) {
  return `mealbandit:grok-photo:${cacheKey}`;
}

function safeStorageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function grokPhotoRequest(blueprint) {
  const macro = blueprint.macroAssessment?.totals || emptyMacros();
  const signature = JSON.stringify({
    title: blueprint.title,
    base: blueprint.base.name,
    protein: blueprint.protein.name,
    produce: blueprint.produce.name,
    sauce: blueprint.sauce.name,
    accent: blueprint.accent[0],
    servings: state.servings,
    carbs: Math.round(macro.carbs),
    proteinGrams: Math.round(macro.protein),
  });
  const ingredients = blueprint.ingredients.map(([name]) => name).join(", ");

  return {
    cacheKey: `mealbandit-${stableHash(signature)}`,
    prompt: [
      "Photorealistic overhead editorial food photography of a finished meal bowl.",
      `Recipe: ${blueprint.title}.`,
      `Visible components: ${blueprint.base.name}, ${blueprint.protein.name}, ${blueprint.produce.name}, ${blueprint.sauce.name}, ${blueprint.accent[0]}.`,
      `Ingredient cues: ${ingredients}.`,
      "Natural daylight, appetizing texture, realistic plating, neutral kitchen table, 16:9 composition.",
      "No text, labels, packaging, watermarks, logos, hands, people, or extra dishes.",
    ].join(" "),
  };
}

function setGrokStatus(message) {
  if (targets.grokStatus) {
    targets.grokStatus.textContent = message;
  }
}

function showCanvasPhoto(message = "Canvas preview is free and instant.") {
  if (targets.grokPhoto) {
    targets.grokPhoto.hidden = true;
    targets.grokPhoto.removeAttribute("src");
    targets.grokPhoto.alt = "";
  }

  if (targets.photoMode) {
    targets.photoMode.textContent = "Canvas preview";
  }

  setGrokStatus(message);
}

function showGrokPhoto(src, message) {
  if (!targets.grokPhoto) {
    return;
  }

  targets.grokPhoto.src = src;
  targets.grokPhoto.hidden = false;
  targets.grokPhoto.alt = `Grok generated photo of ${currentBlueprint.title}`;

  if (targets.photoMode) {
    targets.photoMode.textContent = "Grok photo";
  }

  setGrokStatus(message);
}

function grokRuntime() {
  const hostname = window.location.hostname;

  if (window.location.protocol === "file:") {
    return "file";
  }

  if (["localhost", "127.0.0.1", "::1"].includes(hostname)) {
    return "local";
  }

  if (hostname === "mealbandit.netlify.app" || hostname.endsWith(".netlify.app") || hostname.endsWith(".netlify.live")) {
    return "netlify";
  }

  return "static";
}

function grokIdleMessage() {
  const runtime = grokRuntime();

  if (runtime === "file") {
    return "Grok photos need the live Netlify site because the xAI key stays server-side.";
  }

  if (runtime === "static") {
    return "Grok photos are available from the Netlify deployment.";
  }

  return "Grok is opt-in for the current recipe.";
}

function restoreCachedGrokPhoto(blueprint) {
  const { cacheKey } = grokPhotoRequest(blueprint);
  const cached = safeStorageGet(grokStorageKey(cacheKey));

  if (cached) {
    showGrokPhoto(cached, "Cached Grok photo reused. No new image spend.");
    return;
  }

  showCanvasPhoto(grokIdleMessage());
}

function grokApiEndpoints() {
  const runtime = grokRuntime();

  if (runtime === "netlify") {
    return ["/.netlify/functions/grok-image"];
  }

  if (runtime === "local") {
    return ["/api/grok-image", "/.netlify/functions/grok-image"];
  }

  return [];
}

async function postGrokImage(endpoint, body) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (response.status === 404) {
    return { unavailable: true };
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `Grok endpoint returned ${response.status}`);
  }

  return data;
}

async function generateGrokPhoto() {
  if (!currentBlueprint) {
    renderBlueprint();
  }

  const request = grokPhotoRequest(currentBlueprint);
  const storageKey = grokStorageKey(request.cacheKey);
  const cached = safeStorageGet(storageKey);

  if (cached) {
    showGrokPhoto(cached, "Cached Grok photo reused. No new image spend.");
    return;
  }

  const endpoints = grokApiEndpoints();

  if (!endpoints.length) {
    setGrokStatus(grokIdleMessage());
    showToast("Grok needs the Netlify site");
    return;
  }

  grokGenerateBtn.disabled = true;
  setGrokStatus("Generating one 1K Grok image for this recipe...");

  let lastError = null;

  try {
    for (const endpoint of endpoints) {
      try {
        const data = await postGrokImage(endpoint, request);

        if (data.unavailable) {
          continue;
        }

        const src = data.imageDataUrl || data.url;

        if (!src) {
          throw new Error("Grok response did not include an image.");
        }

        const stored = src.startsWith("data:") && src.length < 4_500_000
          ? safeStorageSet(storageKey, src)
          : false;
        const cacheNote = stored ? " Cached in this browser." : "";
        const costNote = data.cached ? "No new image spend." : "New 1K Grok image generated.";

        showGrokPhoto(src, `${costNote}${cacheNote}`);
        showToast(data.cached ? "Cached Grok photo loaded" : "Grok photo generated");
        return;
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error("No Grok endpoint is available.");
  } catch (error) {
    setGrokStatus(`${error.message} Canvas preview remains available.`);
    showToast("Grok photo unavailable");
  } finally {
    grokGenerateBtn.disabled = false;
  }
}

function emptyMacros() {
  return { calories: 0, protein: 0, carbs: 0, fat: 0 };
}

function addMacros(target, source) {
  target.calories += source.calories;
  target.protein += source.protein;
  target.carbs += source.carbs;
  target.fat += source.fat;
}

function macroForIngredient([name, amount, unit]) {
  const data = macroData[name];

  if (!data || data.unit !== unit) {
    return { macros: emptyMacros(), unknown: `${amount} ${unit} ${name}` };
  }

  const factor = amount;
  return {
    macros: {
      calories: data.calories * factor,
      protein: data.protein * factor,
      carbs: data.carbs * factor,
      fat: data.fat * factor,
    },
    unknown: null,
  };
}

function calculateMacros(ingredients) {
  const totals = emptyMacros();
  const unknowns = [];

  ingredients.forEach((ingredient) => {
    const result = macroForIngredient(ingredient);
    addMacros(totals, result.macros);

    if (result.unknown) {
      unknowns.push(result.unknown);
    }
  });

  return { totals, unknowns };
}

function roundedMacro(value) {
  return Math.round(value);
}

function formatMacro(value, unit) {
  const rounded = unit ? Math.round(value * 10) / 10 : Math.round(value);
  const display = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  return `${display}${unit}`;
}

function optionMacros(option) {
  if (!option) {
    return emptyMacros();
  }

  if (option.item) {
    return macroForIngredient([option.item, option.amount, option.unit]).macros;
  }

  if (option.items) {
    return calculateMacros(option.items).totals;
  }

  if (Array.isArray(option)) {
    return macroForIngredient(option).macros;
  }

  return emptyMacros();
}

function carbReductionText(currentMacros, nextMacros) {
  const reduction = Math.max(0, currentMacros.carbs - nextMacros.carbs);
  return reduction ? `cuts about ${roundedMacro(reduction)}g carbs` : "keeps carbs low";
}

function macroTweaksFor(blueprint, macros, goals) {
  const tweaks = [];

  if (!goals.maxCarbs && !goals.minProtein && !goals.maxCalories && !goals.maxFat) {
    return ["Add a macro target to see fit checks and recipe tweaks."];
  }

  if (goals.maxCarbs && macros.carbs > goals.maxCarbs) {
    const baseMacros = optionMacros(blueprint.base);
    const romaine = library.bases.find((base) => base.name === "crisp romaine");
    const romaineMacros = optionMacros(romaine);

    if (blueprint.base.name !== "crisp romaine") {
      tweaks.push(`Swap ${blueprint.base.name} for crisp romaine; ${carbReductionText(baseMacros, romaineMacros)} per person.`);
    } else {
      tweaks.push("Keep the romaine base and reduce higher-carb toppings before changing the protein.");
    }

    if (blueprint.base.name === "warm tortillas") {
      tweaks.push("Use 1 tortilla per person instead of 3 to save about 22g carbs.");
    }

    if (blueprint.produce.name === "corn + poblanos") {
      const currentProduce = optionMacros(blueprint.produce);
      const cucumberSnap = library.produce.find((produce) => produce.name === "cucumber + snap peas");
      tweaks.push(`Swap corn + poblanos for cucumber + snap peas; ${carbReductionText(currentProduce, optionMacros(cucumberSnap))}.`);
    }

    const sauceMacros = optionMacros(blueprint.sauce);
    const tomatoSauce = library.sauces.find((sauce) => sauce.name === "smoky tomato vinaigrette");
    const tomatoSauceMacros = optionMacros(tomatoSauce);

    if (blueprint.sauce.name !== "smoky tomato vinaigrette" && sauceMacros.carbs > tomatoSauceMacros.carbs) {
      tweaks.push(`Switch sauce to smoky tomato vinaigrette; ${carbReductionText(sauceMacros, tomatoSauceMacros)}.`);
    }

    const accentMacros = optionMacros(blueprint.accent);

    if (accentMacros.carbs >= 2) {
      tweaks.push(`Halve or skip ${blueprint.accent[0]} to save about ${roundedMacro(accentMacros.carbs / 2)}-${roundedMacro(accentMacros.carbs)}g carbs.`);
    }

    if (blueprint.protein.name.includes("chickpea")) {
      tweaks.push("Use crispy tofu, eggs, chicken, salmon, or shrimp instead of chickpea patties for a lower-carb protein.");
    }

    if (blueprint.sauce.name === "ginger soy glaze") {
      tweaks.push("Skip the honey in the ginger soy glaze to save about 6g carbs.");
    }
  }

  if (goals.minProtein && macros.protein < goals.minProtein) {
    if (/eggs/.test(blueprint.protein.name)) {
      tweaks.push("Add 1 egg per person for roughly 6g more protein.");
    } else if (/chickpea/.test(blueprint.protein.name)) {
      tweaks.push("Swap chickpea patties for tofu, chicken, salmon, shrimp, or tuna cakes to raise protein density.");
    } else {
      tweaks.push(`Add 2 oz ${blueprint.protein.item} per person for roughly 12g more protein.`);
    }
  }

  if ((goals.maxCalories && macros.calories > goals.maxCalories) || (goals.maxFat && macros.fat > goals.maxFat)) {
    if (state.pantryFirst) {
      tweaks.push("Use 1 tsp olive oil per person instead of 1 tbsp to save about 80 calories and 9g fat.");
    }

    if (blueprint.sauce.name === "lemon tahini") {
      tweaks.push("Thin the tahini sauce with lemon and water, or switch to smoky tomato vinaigrette for less fat.");
    }

    if (["avocado", "toasted seeds", "feta"].includes(blueprint.accent[0])) {
      tweaks.push(`Halve the ${blueprint.accent[0]} accent to reduce calories without changing the meal structure.`);
    }
  }

  return tweaks.length ? tweaks : ["Active macro targets fit this build."];
}

function macroStatusFor(macros, goals, unknowns) {
  const checks = [];

  if (goals.maxCarbs) {
    checks.push(macros.carbs <= goals.maxCarbs ? `carbs within ${goals.maxCarbs}g` : `carbs exceed ${goals.maxCarbs}g`);
  }

  if (goals.minProtein) {
    checks.push(macros.protein >= goals.minProtein ? `protein reaches ${goals.minProtein}g` : `protein below ${goals.minProtein}g`);
  }

  if (goals.maxCalories) {
    checks.push(macros.calories <= goals.maxCalories ? `calories within ${goals.maxCalories}` : `calories exceed ${goals.maxCalories}`);
  }

  if (goals.maxFat) {
    checks.push(macros.fat <= goals.maxFat ? `fat within ${goals.maxFat}g` : `fat exceeds ${goals.maxFat}g`);
  }

  const confidence = unknowns.length ? `Missing estimates: ${unknowns.join(", ")}.` : "Estimates are from the local ingredient table.";
  return `${checks.length ? `${checks.join("; ")}.` : "Estimated per person from the bill of materials."} ${confidence}`;
}

function assessMacros(blueprint) {
  const goals = macroGoals();
  const assessment = calculateMacros(blueprint.ingredients);

  return {
    goals,
    totals: assessment.totals,
    unknowns: assessment.unknowns,
    status: macroStatusFor(assessment.totals, goals, assessment.unknowns),
    tweaks: macroTweaksFor(blueprint, assessment.totals, goals),
  };
}

function renderMacroAssessment(assessment) {
  targets.macroCalories.textContent = formatMacro(assessment.totals.calories, "");
  targets.macroProtein.textContent = formatMacro(assessment.totals.protein, "g");
  targets.macroCarbs.textContent = formatMacro(assessment.totals.carbs, "g");
  targets.macroFat.textContent = formatMacro(assessment.totals.fat, "g");
  targets.macroStatus.textContent = assessment.status;
  renderList(targets.macroTweaks, assessment.tweaks, (tweak) => tweak);
}

function renderBlueprint() {
  currentBlueprint = buildBlueprint();
  currentBlueprint.macroAssessment = assessMacros(currentBlueprint);

  targets.base.textContent = currentBlueprint.base.name;
  targets.protein.textContent = currentBlueprint.protein.name;
  targets.produce.textContent = currentBlueprint.produce.name;
  targets.sauce.textContent = currentBlueprint.sauce.name;
  targets.title.textContent = currentBlueprint.title;
  targets.metricTime.textContent = `${currentBlueprint.activeTime} min`;
  targets.metricServings.textContent = `${state.servings} servings`;
  targets.metricCost.textContent = currentBlueprint.costBand;
  targets.flavor.textContent = currentBlueprint.flavor;
  targets.spend.textContent = `$${currentBlueprint.spend}-${currentBlueprint.spend + 8}`;
  targets.prepLoad.textContent = currentBlueprint.prepLoad;

  drawGeneratedPhoto(currentBlueprint);
  restoreCachedGrokPhoto(currentBlueprint);
  renderMacroAssessment(currentBlueprint.macroAssessment);
  renderList(targets.risks, currentBlueprint.risks, (risk) => risk);
  renderList(targets.preferences, currentBlueprint.preferenceNotes, (note) => note);
  renderList(targets.gear, currentBlueprint.gear, (gear) => gear);
  renderIngredients(currentBlueprint.ingredients);
  renderSteps(currentBlueprint.steps);
}

function renderList(node, items, mapItem) {
  node.replaceChildren(
    ...items.map((item) => {
      const li = document.createElement("li");
      li.textContent = mapItem(item);
      return li;
    }),
  );
}

function renderIngredients(items) {
  const nodes = items.map(([name, amount, unit]) => {
    const li = document.createElement("li");
    const quantity = document.createElement("strong");
    const ingredient = document.createElement("span");

    quantity.textContent = `${formatAmount(scaleAmount(amount))} ${unit}`;
    ingredient.textContent = name;
    li.append(quantity, ingredient);

    return li;
  });

  targets.ingredients.replaceChildren(...nodes);
}

function renderSteps(steps) {
  const nodes = steps.map((step) => {
    const li = document.createElement("li");
    const title = document.createElement("strong");
    const body = document.createElement("span");

    title.textContent = step.title;
    body.textContent = step.body;
    li.append(title, body);

    return li;
  });

  targets.steps.replaceChildren(...nodes);
}

function setActiveButton(buttons, activeButton) {
  buttons.forEach((button) => {
    const isActive = button === activeButton;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function materialsText() {
  const lines = [
    currentBlueprint.title,
    `${state.servings} servings | ${currentBlueprint.activeTime} min | ${currentBlueprint.costBand}`,
    "",
    "Ingredients",
    ...currentBlueprint.ingredients.map(([name, amount, unit]) => {
      return `- ${formatAmount(scaleAmount(amount))} ${unit} ${name}`;
    }),
    "",
    "Equipment",
    ...currentBlueprint.gear.map((item) => `- ${item}`),
    "",
    "Macronutrient assessment per person",
    `- Calories: ${formatMacro(currentBlueprint.macroAssessment.totals.calories, "")}`,
    `- Protein: ${formatMacro(currentBlueprint.macroAssessment.totals.protein, "g")}`,
    `- Carbs: ${formatMacro(currentBlueprint.macroAssessment.totals.carbs, "g")}`,
    `- Fat: ${formatMacro(currentBlueprint.macroAssessment.totals.fat, "g")}`,
    `- ${currentBlueprint.macroAssessment.status}`,
    "",
    "Macro tweaks",
    ...currentBlueprint.macroAssessment.tweaks.map((item) => `- ${item}`),
    "",
    "Preference signal",
    ...currentBlueprint.preferenceNotes.map((item) => `- ${item}`),
  ];

  return lines.join("\n");
}

async function copyMaterials() {
  const text = materialsText();

  try {
    await navigator.clipboard.writeText(text);
    showToast("Ingredients copied");
  } catch {
    showToast("Copy unavailable in this browser");
  }
}

function downloadMaterials() {
  const blob = new Blob([materialsText()], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "mealbandit-materials.txt";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "mealbandit-photo";
}

function downloadGeneratedPhoto() {
  if (targets.grokPhoto && !targets.grokPhoto.hidden && targets.grokPhoto.src) {
    const link = document.createElement("a");
    link.href = targets.grokPhoto.src;
    link.download = `${slugify(currentBlueprint.title)}-grok.png`;
    document.body.append(link);
    link.click();
    link.remove();
    showToast("Grok photo downloaded");
    return;
  }

  if (!targets.photo || typeof targets.photo.toDataURL !== "function") {
    showToast("Photo unavailable in this browser");
    return;
  }

  const link = document.createElement("a");
  link.href = targets.photo.toDataURL("image/png");
  link.download = `${slugify(currentBlueprint.title)}.png`;
  document.body.append(link);
  link.click();
  link.remove();
  showToast("Generated photo downloaded");
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.append(toast);

  requestAnimationFrame(() => toast.classList.add("is-visible"));
  window.setTimeout(() => {
    toast.classList.remove("is-visible");
    window.setTimeout(() => toast.remove(), 180);
  }, 2200);
}

let profileRenderTimer;

function scheduleProfileRender() {
  window.clearTimeout(profileRenderTimer);
  profileRenderTimer = window.setTimeout(renderBlueprint, 180);
}

document.querySelectorAll("[data-servings]").forEach((button) => {
  button.addEventListener("click", () => {
    state.servings = Number(button.dataset.servings);
    setActiveButton(document.querySelectorAll("[data-servings]"), button);
    renderBlueprint();
  });
});

document.querySelectorAll("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    state.mode = button.dataset.mode;
    setActiveButton(document.querySelectorAll("[data-mode]"), button);
    renderBlueprint();
  });
});

timeRange.addEventListener("input", () => {
  state.time = Number(timeRange.value);
  timeOutput.textContent = `${state.time} min`;
  renderBlueprint();
});

pantryToggle.addEventListener("change", () => {
  state.pantryFirst = pantryToggle.checked;
  renderBlueprint();
});

batchToggle.addEventListener("change", () => {
  state.leftovers = batchToggle.checked;
  renderBlueprint();
});

buildBtn.addEventListener("click", renderBlueprint);

randomBtn.addEventListener("click", () => {
  state.seedOffset += 17;
  renderBlueprint();
});

ideaInput.addEventListener("change", renderBlueprint);
[likesInput, dislikesInput, allergyInput, hateInput, carbLimitInput, proteinMinInput, calorieLimitInput, fatLimitInput].forEach((input) => {
  input.addEventListener("input", scheduleProfileRender);
  input.addEventListener("change", renderBlueprint);
});
copyBtn.addEventListener("click", copyMaterials);
downloadBtn.addEventListener("click", downloadMaterials);
photoDownloadBtn.addEventListener("click", downloadGeneratedPhoto);
grokGenerateBtn.addEventListener("click", generateGrokPhoto);

renderBlueprint();
