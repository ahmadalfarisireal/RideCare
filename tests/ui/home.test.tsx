import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";
import {
  HomeSamplesView,
  TipBoxView,
} from "@/components/home/home-samples-panel";
import { getHomeSample, HOME_SAMPLES, HOME_TIPS } from "@/data/ui/home-samples";

describe("Beranda", () => {
  it("menampilkan hero, empat rute, dan tip bengkel", () => {
    const html = renderToStaticMarkup(<HomePage />);

    expect(html).toContain("Servis motor tanpa tebak-tebakan");
    expect(html).toContain("Pahami motormu");
    expect(html).toContain('href="/keluhan"');
    expect(html).toContain('href="/checklist"');
    expect(html).toContain("Mau mulai dari mana?");
    for (const title of ["Cek keluhan", "Kamus bengkel", "Tutorial", "Anti getok"]) {
      expect(html, `rute tidak tampil: ${title}`).toContain(title);
    }
    expect(html).toContain("Tip bengkel");
    expect(html).toContain(HOME_TIPS[0]);
    expect(html).toContain("Contoh singkat, bukan diagnosis");
    expect(html).toContain("bukan diagnosis pasti");
  });

  it("mengubah judul urgensi saat contoh dipilih", () => {
    expect(HOME_SAMPLES).toHaveLength(4);
    expect(getHomeSample(0).label).not.toBe(getHomeSample(3).label);

    const first = renderToStaticMarkup(<HomeSamplesView selectedIndex={0} />);
    const last = renderToStaticMarkup(<HomeSamplesView selectedIndex={3} />);

    expect(first).toContain("Perlu segera diperiksa");
    expect(last).toContain("Jangan dikendarai dulu");
    expect(first).not.toContain("Jangan dikendarai dulu");
    expect(first).toContain('aria-pressed="true"');
    expect(first).toContain("home-gauge-sweep");
  });

  it("mengganti tip sesuai indeks yang dipilih", () => {
    const first = renderToStaticMarkup(<TipBoxView tipIndex={0} />);
    const second = renderToStaticMarkup(<TipBoxView tipIndex={1} />);

    expect(first).toContain(HOME_TIPS[0]);
    expect(second).toContain(HOME_TIPS[1]);
    expect(second).not.toContain(HOME_TIPS[0]);
    expect(first).toContain("Tip lain");
  });
});
