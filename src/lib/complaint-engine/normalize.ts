export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function keywordWeight(keyword: string): number {
  const words = normalizeText(keyword).split(" ").filter(Boolean).length;
  if (words <= 1) return 2;
  if (words === 2) return 3;
  return 4;
}

export function countKeywordMatches(normalizedComplaint: string, keywords: string[]): number {
  if (!normalizedComplaint) return 0;
  const haystack = ` ${normalizedComplaint} `;
  let score = 0;
  for (const keyword of keywords) {
    const normalizedKeyword = normalizeText(keyword);
    if (!normalizedKeyword) continue;
    const needle = ` ${normalizedKeyword} `;
    if (haystack.includes(needle)) {
      score += keywordWeight(normalizedKeyword);
    }
  }
  return score;
}
