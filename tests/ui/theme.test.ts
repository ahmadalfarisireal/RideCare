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
const badge = readFileSync(
  new URL("../../src/components/ui/badge.tsx", import.meta.url),
  "utf8",
);
const gauge = readFileSync(
  new URL("../../src/components/result/urgency-gauge.tsx", import.meta.url),
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

function blend(foreground: string, background: string, alpha: number) {
  const fg = foreground
    .replace("#", "")
    .match(/.{2}/g)!
    .map((value) => parseInt(value, 16));
  const bg = background
    .replace("#", "")
    .match(/.{2}/g)!
    .map((value) => parseInt(value, 16));

  return `#${fg
    .map((value, index) =>
      Math.round(value * alpha + bg[index] * (1 - alpha))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
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

  it("memakai token teks badge yang lebih gelap di tema terang", () => {
    const light = block(css, ":root");

    expect(token(light, "--good-text")).toBe("#0E6B34");
    expect(token(light, "--warn-text")).toBe("#9E4400");
  });

  it("mempertahankan token teks badge terang di tema gelap", () => {
    const dark = block(css, ':root[data-theme="dark"]');

    expect(token(dark, "--good-text")).toBe("#38C978");
    expect(token(dark, "--warn-text")).toBe("#FF8A1F");
  });

  it("memakai token warna teks badge dari tema", () => {
    expect(css).toContain("--color-safe-text: var(--good-text);");
    expect(css).toContain("--color-warning-text: var(--warn-text);");
  });

  it("badge success dan warning memakai token teks yang lebih gelap", () => {
    expect(badge).toContain(
      'success: "border-safe/30 bg-safe/10 text-safe-text"',
    );
    expect(badge).toContain(
      'warning: "border-warning/30 bg-warning/10 text-warning-text"',
    );
  });

  it("label zona gauge memakai warna bukan opacity untuk redup/aktif", () => {
    expect(gauge).not.toContain("opacity-60");
    expect(gauge).toContain(
      'index === activeZone ? "font-bold text-foreground" : "text-muted"',
    );
  });

  it("menjaga kontras label zona gauge di tema terang", () => {
    const light = block(css, ":root");
    const surface = token(light, "--surface");
    const inactive = token(light, "--muted");
    const active = token(light, "--fg");
    const tones = ["--good", "--warn", "--bad"] as const;

    for (const tone of tones) {
      const background = blend(token(light, tone), surface, 0.1);

      expect(
        contrast(inactive, background),
        `zona tidak aktif (${tone})`,
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrast(active, background),
        `zona aktif (${tone})`,
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("menjaga kontras semua varian badge di tema terang", () => {
    const light = block(css, ":root");
    const surface = token(light, "--surface");
    const surface2 = token(light, "--surface-2");
    const variants: Array<[string, string, string]> = [
      ["default", token(light, "--fg"), surface2],
      [
        "accent",
        token(light, "--accent"),
        blend(token(light, "--accent"), surface, 0.1),
      ],
      [
        "danger",
        token(light, "--bad"),
        blend(token(light, "--bad"), surface, 0.1),
      ],
      [
        "warning",
        token(light, "--warn-text"),
        blend(token(light, "--warn"), surface, 0.1),
      ],
      [
        "success",
        token(light, "--good-text"),
        blend(token(light, "--good"), surface, 0.1),
      ],
      ["outline", token(light, "--muted"), surface],
    ];

    for (const [name, text, background] of variants) {
      expect(
        contrast(text, background),
        `badge ${name}`,
      ).toBeGreaterThanOrEqual(4.5);
    }

    expect(
      contrast(
        token(light, "--warn-text"),
        blend(token(light, "--warn"), surface2, 0.1),
      ),
      "badge warning di atas surface-2",
    ).toBeGreaterThanOrEqual(4.5);

    expect(
      contrast(
        token(light, "--good-text"),
        blend(token(light, "--good"), surface2, 0.1),
      ),
      "badge success di atas surface-2",
    ).toBeGreaterThanOrEqual(4.5);
  });
});
