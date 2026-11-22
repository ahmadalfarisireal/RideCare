import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(
  new URL("../../src/app/globals.css", import.meta.url),
  "utf8",
);
const layout = readFileSync(
  new URL("../../src/app/layout.tsx", import.meta.url),
  "utf8",
);

function block(source: string, selector: string) {
  const start = source.indexOf(selector);

  expect(start, `selector tidak ditemukan: ${selector}`).toBeGreaterThanOrEqual(
    0,
  );

  const open = source.indexOf("{", start);
  const close = source.indexOf("}", open);

  return source.slice(open + 1, close);
}

function token(source: string, name: string) {
  const match = source.match(new RegExp(`${name}:\\s*([^;]+);`));

  expect(match, `token tidak ditemukan: ${name}`).not.toBeNull();

  return match![1].trim();
}

function luminance(hex: string) {
  const channels = hex
    .replace("#", "")
    .match(/.{2}/g)!
    .map((value) => parseInt(value, 16) / 255);
  const [r, g, b] = channels.map((value) =>
    value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  );

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string) {
  const [lighter, darker] = [luminance(a), luminance(b)].sort(
    (x, y) => y - x,
  );

  return (lighter + 0.05) / (darker + 0.05);
}

describe("Tema bawaan", () => {
  it("memakai palet terang sebagai nilai dasar :root", () => {
    const light = block(css, ":root");

    expect(token(light, "--bg")).toBe("#F7F4EF");
    expect(token(light, "--surface")).toBe("#FFFFFF");
    expect(token(light, "--surface-2")).toBe("#EFEBE4");
    expect(token(light, "--fg")).toBe("#1B1916");
    expect(token(light, "--muted")).toBe("#5D564D");
    expect(token(light, "--accent")).toBe("#0A6EA8");
    expect(token(light, "--on-sem")).toBe("#FFFFFF");
    expect(light).toContain("color-scheme: light;");
  });

  it("tidak mengikuti prefers-color-scheme", () => {
    expect(css).not.toContain("prefers-color-scheme");
  });

  it("hanya mengaktifkan palet gelap lewat data-theme=dark", () => {
    const dark = block(css, ':root[data-theme="dark"]');

    expect(token(dark, "--bg")).toBe("#0E0D0C");
    expect(token(dark, "--surface")).toBe("#181614");
    expect(token(dark, "--fg")).toBe("#F4F0EA");
    expect(token(dark, "--on-sem")).toBe("#0B0A09");
    expect(dark).toContain("color-scheme: dark;");
    expect(css).not.toContain(':root[data-theme="light"]');
  });

  it("memakai satu themeColor terang di layout", () => {
    expect(layout).toContain('themeColor: "#F7F4EF"');
    expect(layout).toContain('colorScheme: "light"');
    expect(layout).not.toContain("prefers-color-scheme");
  });

  it("menjaga kontras teks utama di tema terang", () => {
    const light = block(css, ":root");
    const pairs = [
      ["--fg", "--bg"],
      ["--muted", "--bg"],
      ["--muted", "--surface"],
      ["--accent", "--surface"],
      ["--on-sem", "--good"],
      ["--on-sem", "--warn"],
      ["--on-sem", "--bad"],
    ] as const;

    for (const [text, background] of pairs) {
      expect(
        contrast(token(light, text), token(light, background)),
        `${text} di atas ${background}`,
      ).toBeGreaterThanOrEqual(4.5);
    }
  });
});
