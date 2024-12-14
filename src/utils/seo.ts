export function generateTitle(pageTitle?: string): string {
  const baseName = "Masumi Hayashi Foundation";
  if (!pageTitle) return baseName;
  return `${pageTitle} | ${baseName}`;
}

export function generateDescription(desc?: string): string {
  return desc || "Explore the photographic legacy of Masumi Hayashi, featuring panoramic photo collages of Japanese American internment camps, EPA Superfund sites, and abandoned prisons.";
}
