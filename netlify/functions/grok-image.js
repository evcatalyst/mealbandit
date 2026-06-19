const XAI_IMAGE_ENDPOINT = "https://api.x.ai/v1/images/generations";
const MODEL = "grok-imagine-image";
const MAX_PROMPT_LENGTH = 2400;
const MAX_CACHE_ENTRIES = 40;
const memoryCache = new Map();

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS, POST",
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(body),
  };
}

function remember(cacheKey, value) {
  if (!cacheKey) {
    return;
  }

  memoryCache.set(cacheKey, value);

  if (memoryCache.size > MAX_CACHE_ENTRIES) {
    memoryCache.delete(memoryCache.keys().next().value);
  }
}

function mediaTypeFromBase64(value) {
  const sample = Buffer.from(value.slice(0, 40), "base64");

  if (sample[0] === 0xff && sample[1] === 0xd8) {
    return "image/jpeg";
  }

  if (sample[0] === 0x89 && sample[1] === 0x50 && sample[2] === 0x4e && sample[3] === 0x47) {
    return "image/png";
  }

  if (sample.slice(0, 4).toString("ascii") === "RIFF" && sample.slice(8, 12).toString("ascii") === "WEBP") {
    return "image/webp";
  }

  return "image/jpeg";
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return json(204, {});
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Use POST to generate a Grok image." });
  }

  const apiKey = process.env.XAI_API_KEY;

  if (!apiKey) {
    return json(503, { error: "XAI_API_KEY is not configured for this deployment." });
  }

  let payload;

  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Request body must be valid JSON." });
  }

  const prompt = String(payload.prompt || "").trim().slice(0, MAX_PROMPT_LENGTH);
  const cacheKey = String(payload.cacheKey || "").replace(/[^a-z0-9-]/gi, "").slice(0, 80);

  if (!prompt) {
    return json(400, { error: "A prompt is required." });
  }

  if (cacheKey && memoryCache.has(cacheKey)) {
    return json(200, {
      cached: true,
      imageDataUrl: memoryCache.get(cacheKey),
      model: MODEL,
      costHint: "$0 warm-cache reuse",
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120000);

  try {
    const response = await fetch(XAI_IMAGE_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        prompt,
        n: 1,
        response_format: "b64_json",
        aspect_ratio: "16:9",
        resolution: "1k",
      }),
      signal: controller.signal,
    });
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      return json(response.status, {
        error: data.error?.message || data.error || `xAI returned ${response.status}.`,
      });
    }

    const base64 = data.data?.[0]?.b64_json;

    if (!base64) {
      return json(502, { error: "xAI did not return a base64 image." });
    }

    const imageDataUrl = `data:${mediaTypeFromBase64(base64)};base64,${base64}`;
    remember(cacheKey, imageDataUrl);

    return json(200, {
      cached: false,
      imageDataUrl,
      model: data.model || MODEL,
      costHint: "~$0.02 new 1K image",
    });
  } catch (error) {
    return json(502, {
      error: error.name === "AbortError" ? "xAI image generation timed out." : error.message,
    });
  } finally {
    clearTimeout(timeout);
  }
};
