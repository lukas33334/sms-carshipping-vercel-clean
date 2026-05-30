import { Readable } from "node:stream";

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "host",
  "content-length",
  "accept-encoding",
]);

function normalizeOrigin(value) {
  if (!value) return "";
  return value.replace(/\/+$/, "");
}

function copyRequestHeaders(req) {
  const headers = {};
  for (const [key, value] of Object.entries(req.headers || {})) {
    const lower = key.toLowerCase();
    if (HOP_BY_HOP_HEADERS.has(lower)) continue;
    if (typeof value === "undefined") continue;
    headers[key] = Array.isArray(value) ? value.join(", ") : value;
  }
  return headers;
}

function applyResponseHeaders(upstreamResponse, res) {
  upstreamResponse.headers.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (HOP_BY_HOP_HEADERS.has(lower)) return;
    res.setHeader(key, value);
  });
}

async function readBody(req) {
  if (req.method === "GET" || req.method === "HEAD") return undefined;
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return chunks.length ? Buffer.concat(chunks) : undefined;
}

export async function proxyToUpstream(req, res, upstreamPath) {
  const upstreamOrigin = normalizeOrigin(process.env.UPSTREAM_ORIGIN);

  if (!upstreamOrigin) {
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Missing UPSTREAM_ORIGIN environment variable.");
    return;
  }

  const incomingUrl = new URL(req.url || "/", "https://internal.local");
  const targetUrl = new URL(`${upstreamOrigin}${upstreamPath}`);
  targetUrl.search = incomingUrl.search;

  try {
    const body = await readBody(req);
    const upstreamResponse = await fetch(targetUrl, {
      method: req.method,
      headers: copyRequestHeaders(req),
      body,
      redirect: "manual",
    });

    res.statusCode = upstreamResponse.status;
    applyResponseHeaders(upstreamResponse, res);

    if (!upstreamResponse.body) {
      res.end();
      return;
    }

    Readable.fromWeb(upstreamResponse.body).pipe(res);
  } catch (error) {
    res.statusCode = 502;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end(`Upstream proxy error: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
