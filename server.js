const fs = require("node:fs");
const fsp = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const { handler: grokImageHandler } = require("./netlify/functions/grok-image");

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 5173);
const GROK_ROUTES = new Set(["/api/grok-image", "/.netlify/functions/grok-image"]);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
};

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(body));
}

async function readBody(req) {
  const chunks = [];
  let size = 0;

  for await (const chunk of req) {
    size += chunk.length;

    if (size > 100_000) {
      throw new Error("Request body is too large.");
    }

    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString("utf8");
}

async function handleGrok(req, res) {
  try {
    const body = await readBody(req);
    const response = await grokImageHandler({
      httpMethod: req.method,
      headers: req.headers,
      body,
    });

    res.writeHead(response.statusCode, response.headers);
    res.end(response.body);
  } catch (error) {
    sendJson(res, 400, { error: error.message });
  }
}

function safeFilePath(urlPath) {
  const decoded = decodeURIComponent(urlPath);
  const normalized = path.normalize(decoded === "/" ? "/index.html" : decoded);
  const filePath = path.join(ROOT, normalized);

  if (!filePath.startsWith(ROOT)) {
    return null;
  }

  return filePath;
}

async function serveStatic(req, res, url) {
  const filePath = safeFilePath(url.pathname);

  if (!filePath) {
    sendJson(res, 403, { error: "Forbidden" });
    return;
  }

  try {
    const stat = await fsp.stat(filePath);

    if (!stat.isFile()) {
      sendJson(res, 404, { error: "Not found" });
      return;
    }

    const contentType = mimeTypes[path.extname(filePath)] || "application/octet-stream";
    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": contentType.startsWith("text/html") ? "no-store" : "public, max-age=300",
    });
    fs.createReadStream(filePath).pipe(res);
  } catch {
    sendJson(res, 404, { error: "Not found" });
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (GROK_ROUTES.has(url.pathname)) {
    handleGrok(req, res);
    return;
  }

  if (url.pathname === "/healthz") {
    sendJson(res, 200, { ok: true });
    return;
  }

  serveStatic(req, res, url);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`MealBandit running at http://127.0.0.1:${PORT}`);
});
