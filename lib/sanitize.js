/**
 * Sanitizes user-provided string inputs before submission to prevent malicious
 * HTML, script injection, inline event handlers, and javascript-style URI payloads,
 * while safely preserving normal human punctuation, sentences, and formatting.
 *
 * @param {unknown} input - Raw input value
 * @returns {string} Sanitized string
 */
export function sanitizeInput(input) {
  if (input === null || input === undefined) {
    return "";
  }

  let value = typeof input === "string" ? input : String(input);

  // Strip script blocks and contents
  value = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

  // Strip dangerous tag blocks (style, iframe, object, embed, frame, frameset) and their contents
  value = value.replace(/<(style|iframe|object|embed|frame|frameset)\b[^<]*(?:(?!<\/\1>)<[^<]*)*<\/\1>/gi, "");

  // Strip javascript:, vbscript:, and dangerous data: URI protocols
  value = value.replace(/(?:javascript|vbscript|data\s*:\s*text\/html):[^\s"'>]*/gi, "");

  // Strip inline HTML tags (e.g. <img onerror=...>, <a>, <div onclick=...>, etc.)
  value = value.replace(/<[^>]+>/g, "");

  // Strip dangling inline event handlers if any escaped tag stripping (e.g. onload=..., onerror=...)
  value = value.replace(/\bon[a-z]+\s*=\s*(['"]).*?\1/gi, "");
  value = value.replace(/\bon[a-z]+\s*=\s*[^>\s]+/gi, "");

  return value.trim();
}
