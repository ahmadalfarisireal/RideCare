import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { isTabActive } from "@/components/layout/header";
import { Logo } from "@/components/ui/logo";

describe("shell", () => {
  it("logo di header menautkan ke beranda", () => {
    const html = renderToStaticMarkup(<Logo />);

    expect(html).toContain('href="/"');
    expect(html).toContain('aria-label="RideCare — Beranda"');
  });

  it("tab aktif tetap benar pada rute utama dan turunannya", () => {
    const cases = [
      ["/", "/", true],
      ["/keluhan", "/", false],
      ["/keluhan", "/keluhan", true],
      ["/keluhan", "/hasil", true],
      ["/keluhan", "/pesan-mekanik", true],
      ["/kamus", "/kamus", true],
      ["/kamus", "/checklist", false],
      ["/checklist", "/checklist", true],
      ["/tutorial", "/tutorial", true],
      ["/tutorial", "/tutorial/ganti-oli-mesin", true],
      ["/tutorial", "/kamus", false],
      ["/kamus", null, false],
    ] as const;

    for (const [href, pathname, expected] of cases) {
      expect(isTabActive(href, pathname), `${href} @ ${pathname}`).toBe(expected);
    }
  });
});
