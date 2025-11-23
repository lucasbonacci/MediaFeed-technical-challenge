function normalizeUrl(rawUrl?: string): string | null {
  if (!rawUrl) return null;

  try {
    const url = new URL(rawUrl);
    return url.toString();
  } catch {
    // Si falta protocolo, probamos con https://
    try {
      const fixed = new URL(`https://${rawUrl}`);
      return fixed.toString();
    } catch {
      return null;
    }
  }
}

export default normalizeUrl;
