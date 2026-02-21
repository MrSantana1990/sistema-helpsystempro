function $(id) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element: ${id}`);
  return el;
}

function safeJsonParse(text) {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (error) {
    return { ok: false, error };
  }
}

function downloadText(filename, text, mime = "text/plain;charset=utf-8") {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
}

function b64UrlToUtf8(b64url) {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((b64url.length + 3) % 4);
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function utf8ToB64Url(text) {
  const bytes = new TextEncoder().encode(text);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function b64ToUtf8(b64) {
  const clean = String(b64 || "").trim().replace(/\s+/g, "");
  if (!clean) return "";
  const normalized = clean.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "===".slice((normalized.length + 3) % 4);
  const bin = atob(padded);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function tryParseXml(xmlText) {
  const text = String(xmlText || "").trim();
  if (!text) return { ok: false, error: new Error("XML vazio.") };
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "application/xml");
  const err = doc.getElementsByTagName("parsererror")[0];
  if (err) return { ok: false, error: new Error("XML inválido.") };
  return { ok: true, value: doc };
}

function isProbablyIpv4(ip) {
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(ip);
}

function reverseIpv4(ip) {
  return ip.split(".").reverse().join(".") + ".in-addr.arpa";
}

function msNow() {
  return (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
}

function toMbps(bytes, ms) {
  if (!bytes || !ms) return 0;
  return (bytes * 8) / (ms / 1000) / 1_000_000;
}

async function fetchText(url, opts = {}) {
  const res = await fetch(url, opts);
  const text = await res.text();
  return { res, text };
}
