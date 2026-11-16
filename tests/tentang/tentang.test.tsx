import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import TentangPage from "@/app/tentang/page";
import { DISCLAIMER, NAV_LINKS, SAFETY_CATEGORIES } from "@/lib/constants";

const EXPECTED_DISCLAIMER =
  "RideCare membantu menyusun keluhan dan memberikan kemungkinan pemeriksaan awal. Hasil ini bukan diagnosis pasti. Untuk pemeriksaan, perbaikan, dan keputusan penggantian komponen, gunakan jasa teknisi atau bengkel yang kompeten. Jangan melakukan perbaikan yang berisiko jika kamu tidak yakin.";

describe("halaman Tentang dan Keselamatan", () => {
  it("menampilkan disclaimer wajib persis seperti di brief", () => {
    expect(DISCLAIMER).toBe(EXPECTED_DISCLAIMER);
    expect(renderToStaticMarkup(<TentangPage />)).toContain(EXPECTED_DISCLAIMER);
  });

  it("menjelaskan cara kerja dan cara memakai RideCare", () => {
    const html = renderToStaticMarkup(<TentangPage />);

    expect(html).toContain("mesin aturan");
    expect(html).toContain("bukan diagnosis pasti");
    expect(html).toContain("tanpa login");
    expect(html).toContain("AI berbayar");
    expect(html).toContain("Cara memakai RideCare");
    expect(html).toContain("Pilih jenis motor");
    expect(html).toContain("Ceritakan keluhan");
    expect(html).toContain("Baca hasil awal");
    expect(html).toContain("Bawa checklist dan pesan ke mekanik");
  });

  it("menampilkan kelima kategori keselamatan", () => {
    const html = renderToStaticMarkup(<TentangPage />);

    for (const category of SAFETY_CATEGORIES) {
      expect(html, `kategori keselamatan tidak tampil: ${category}`).toContain(
        category,
      );
    }
  });

  it("menautkan halaman Tentang di navigasi dan footer", () => {
    expect(
      NAV_LINKS.some(
        (link) => link.href === "/tentang" && link.label === "Tentang",
      ),
    ).toBe(true);
    expect(renderToStaticMarkup(<Header />)).toContain('href="/tentang"');
    expect(renderToStaticMarkup(<Footer />)).toContain('href="/tentang"');
  });
});
