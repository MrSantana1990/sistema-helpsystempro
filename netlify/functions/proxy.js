/**
 * Netlify Function: HTTP proxy for API/SOAP calls to avoid browser CORS limitations.
 *
 * Security model:
 * - Deny-by-default unless PROXY_ALLOWLIST is configured.
 * - Only allows http/https targets.
 * - Optional shared token via PROXY_TOKEN (header: x-hsp-proxy-token).
 *
 * Env vars:
 * - PROXY_ALLOWLIST: comma-separated hostnames (e.g. "jsonplaceholder.typicode.com,httpbin.org")
 * - PROXY_TOKEN: optional shared secret
 * - PROXY_MAX_BODY_BYTES: optional integer (default 1048576)
 */

const DEFAULT_MAX_BODY_BYTES = 1024 * 1024;

function corsHeaders() {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "content-type, x-hsp-proxy-token",
    "access-control-allow-methods": "POST, OPTIONS",
  };
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "content-type": "application/json; charset=utf-8", ...corsHeaders() },
    body: JSON.stringify(body),
  };
}

function parseAllowlist() {
  const raw = (process.env.PROXY_ALLOWLIST || "").trim();
  if (!raw) return null;
  const items = raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return new Set(items);
}

function isAllowedHost(allowlist, host) {
  if (!allowlist) return false;
  const h = String(host || "").toLowerCase();
  return allowlist.has(h);
}

function normalizeHeaders(input) {
  const out = {};
  if (!input || typeof input !== "object") return out;
  for (const [k, v] of Object.entries(input)) {
    if (v == null) continue;
    const key = String(k).toLowerCase();
    if (!key) continue;
    // Block hop-by-hop / dangerous headers
    if (
      [
        "host",
        "connection",
        "content-length",
        "transfer-encoding",
        "upgrade",
        "proxy-authorization",
        "proxy-authenticate",
        "te",
        "trailer",
        "keep-alive",
      ].includes(key)
    ) {
      continue;
    }
    out[key] = String(v);
  }
  return out;
}

function pickResponseHeaders(resHeaders) {
  const keep = new Set(["content-type", "date", "server", "cache-control", "etag"]);
  const out = {};
  for (const [k, v] of resHeaders.entries()) {
    const key = k.toLowerCase();
    if (keep.has(key)) out[key] = v;
  }
  return out;
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders(), body: "" };
  }

  if (event.httpMethod !== "POST") {
    return json(405, { ok: false, error: "Method not allowed" });
  }

  const allowlist = parseAllowlist();
  if (!allowlist) {
    return json(503, {
      ok: false,
      error: "Proxy não configurado (PROXY_ALLOWLIST).",
    });
  }

  const requiredToken = (process.env.PROXY_TOKEN || "").trim();
  if (requiredToken) {
    const got = (event.headers["x-hsp-proxy-token"] || event.headers["X-Hsp-Proxy-Token"] || "").trim();
    if (got !== requiredToken) {
      return json(401, { ok: false, error: "Token inválido." });
    }
  }

  const maxBodyBytes = Number(process.env.PROXY_MAX_BODY_BYTES || DEFAULT_MAX_BODY_BYTES);
  const rawBody = event.body || "";
  if (rawBody.length > maxBodyBytes * 1.2) {
    return json(413, { ok: false, error: "Body muito grande." });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return json(400, { ok: false, error: "JSON inválido." });
  }

  const url = String(payload.url || "").trim();
  const method = String(payload.method || "GET").toUpperCase();
  const headers = normalizeHeaders(payload.headers);
  const body = payload.body == null ? "" : String(payload.body);

  if (!url) return json(400, { ok: false, error: "URL é obrigatória." });
  if (!["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"].includes(method)) {
    return json(400, { ok: false, error: "Método inválido." });
  }

  let u;
  try {
    u = new URL(url);
  } catch {
    return json(400, { ok: false, error: "URL inválida." });
  }
  if (!["http:", "https:"].includes(u.protocol)) {
    return json(400, { ok: false, error: "Apenas http/https." });
  }
  if (!isAllowedHost(allowlist, u.hostname)) {
    return json(403, { ok: false, error: `Host não permitido: ${u.hostname}` });
  }

  const startedAt = Date.now();
  try {
    const res = await fetch(u.toString(), {
      method,
      headers,
      body: ["GET", "HEAD"].includes(method) ? undefined : body,
    });

    const text = await res.text();
    const ms = Date.now() - startedAt;

    return {
      statusCode: 200,
      headers: { "content-type": "application/json; charset=utf-8", ...corsHeaders() },
      body: JSON.stringify({
        ok: true,
        proxied: true,
        target: { url: u.toString(), method },
        response: {
          ok: res.ok,
          status: res.status,
          statusText: res.statusText,
          headers: pickResponseHeaders(res.headers),
          body: text,
        },
        timing: { ms },
      }),
    };
  } catch (error) {
    return json(502, { ok: false, error: String(error && error.message ? error.message : error) });
  }
};

