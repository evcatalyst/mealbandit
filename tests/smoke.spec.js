const { test, expect } = require("@playwright/test");

async function canvasHasPixels(page) {
  return page.locator("#mealPhoto").evaluate((canvas) => {
    const context = canvas.getContext("2d");
    const sampleWidth = Math.min(240, canvas.width);
    const sampleHeight = Math.min(160, canvas.height);
    const { data } = context.getImageData(0, 0, sampleWidth, sampleHeight);

    for (let index = 0; index < data.length; index += 4) {
      const alpha = data[index + 3];
      const color = data[index] + data[index + 1] + data[index + 2];

      if (alpha > 0 && color > 0) {
        return true;
      }
    }

    return false;
  });
}

test("renders the recipe blueprint with a nonblank generated canvas", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Recipe blueprint" })).toBeVisible();
  await expect(page.locator("#recipeTitle")).toContainText(/Bowls/);
  await expect(page.locator("#ingredientList li")).toHaveCount(11);
  await expect.poll(() => canvasHasPixels(page)).toBe(true);
});

test("applies preferences and macro targets to the recommendation", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Likes").fill("crispy tofu, lemon");
  await page.getByLabel("Allergic to").fill("shellfish");
  await page.getByLabel("Absolutely hate and why").fill("cilantro: tastes soapy");
  await page.getByLabel("Max carbs").fill("21");
  await page.getByRole("button", { name: "Build meal" }).click();

  await expect(page.locator("#preferenceList")).toContainText("Biased toward: crispy tofu, lemon.");
  await expect(page.locator("#preferenceList")).toContainText("Hard exclusions: shellfish.");
  await expect(page.locator("#macroStatus")).toContainText(/carbs (within|exceed) 21g/);
  await expect(page.locator("#macroTweakList li").first()).toBeVisible();
});

test("keeps Grok photo generation opt-in and server-side", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("#grokPhoto")).toBeHidden();
  await page.getByRole("button", { name: "Grok photo" }).click();
  await expect(page.locator("#grokStatus")).toContainText(/XAI_API_KEY|Grok photo|Canvas preview/);
});

test("keeps primary controls visible on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(page.getByRole("button", { name: "Build meal" })).toBeVisible();
  await expect(page.locator("#mealPhoto")).toBeVisible();
  await expect(page.locator("#macroCalories")).toBeVisible();
});
