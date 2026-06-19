const { test, expect } = require("@playwright/test");

const liveBaseURL = (process.env.LIVE_BASE_URL || "https://mealbandit.netlify.app").replace(/\/+$/, "");
const liveHost = new URL(liveBaseURL).hostname;
const isNetlifyLive = liveHost === "mealbandit.netlify.app" || liveHost.endsWith(".netlify.app");

function liveUrl(hash = "builder") {
  const url = new URL(`${liveBaseURL}/`);
  url.hash = hash;
  return url.toString();
}

function collectBrowserFailures(page) {
  const failures = {
    pageErrors: [],
    failedRequests: [],
  };

  page.on("pageerror", (error) => {
    failures.pageErrors.push(error.message);
  });

  page.on("requestfailed", (request) => {
    const url = request.url();

    if (!/grok-image|api\/grok/.test(url)) {
      failures.failedRequests.push(`${request.method()} ${url} ${request.failure()?.errorText || ""}`);
    }
  });

  return failures;
}

test("live Build meal updates the recommendation and macro assessment", async ({ page }) => {
  const failures = collectBrowserFailures(page);

  await page.goto(liveUrl(), { waitUntil: "networkidle" });

  const title = page.locator("#recipeTitle");
  const titleBefore = await title.textContent();

  await page.getByLabel("Meal idea").fill("low carb chicken bowl with broccoli and a bright sauce");
  await page.getByLabel("Max carbs").fill("21");
  await page.getByRole("button", { name: "Build meal" }).click();

  await expect(title).not.toHaveText(titleBefore || "");
  await expect(page.locator("#macroStatus")).toContainText(/carbs (within|exceed) 21g/);
  await expect(page.locator("#ingredientList li")).toHaveCount(11);
  await expect(page.locator("#mealPhoto")).toBeVisible();
  expect(failures.pageErrors).toEqual([]);
  expect(failures.failedRequests).toEqual([]);
});

test("live Netlify Grok button sends the server-side image request", async ({ page }) => {
  test.skip(!isNetlifyLive, "The Grok image function is hosted on Netlify.");

  const failures = collectBrowserFailures(page);
  const grokRequests = [];
  const grokResponses = [];

  page.on("request", (request) => {
    if (request.url().includes("/.netlify/functions/grok-image")) {
      grokRequests.push(`${request.method()} ${request.url()}`);
    }
  });

  page.on("response", (response) => {
    if (response.url().includes("/.netlify/functions/grok-image")) {
      grokResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto(liveUrl(), { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Grok photo" }).click();

  await expect.poll(() => grokRequests.length).toBeGreaterThan(0);
  await expect.poll(() => grokResponses.length).toBeGreaterThan(0);
  await expect(page.locator("#grokStatus")).toContainText(/XAI_API_KEY|New 1K Grok image|Cached Grok photo|timed out|xAI returned/);
  expect(failures.pageErrors).toEqual([]);
  expect(failures.failedRequests).toEqual([]);
});

test("live static hosts do not call Netlify-only Grok endpoints", async ({ page }) => {
  test.skip(isNetlifyLive, "Netlify should call the deployed serverless function.");

  const failures = collectBrowserFailures(page);
  const grokRequests = [];

  page.on("request", (request) => {
    if (/grok-image|api\/grok/.test(request.url())) {
      grokRequests.push(`${request.method()} ${request.url()}`);
    }
  });

  await page.goto(liveUrl(), { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Grok photo" }).click();

  await expect(page.locator("#grokStatus")).toContainText("Grok photos are available from the Netlify deployment.");
  expect(grokRequests).toEqual([]);
  expect(failures.pageErrors).toEqual([]);
  expect(failures.failedRequests).toEqual([]);
});
