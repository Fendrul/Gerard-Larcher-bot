export function stringDetector(sentence: string, ...words: string[]): boolean {
  return words.some((word) => sentence.endsWith(word));
}