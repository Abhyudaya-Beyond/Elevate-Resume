/**
 * Browser-compatible stub for sanitize-html
 * The actual sanitization should happen server-side
 */
export default function sanitizeHtml(html: string, _options?: unknown): string {
  // In browser, return HTML as-is
  // Sanitization should be done server-side before sending to client
  return html;
}

export type IOptions = Record<string, unknown>;

