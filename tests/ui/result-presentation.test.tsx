import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { DangerBanner } from "@/components/result/danger-banner";
import { MechanicQuestions } from "@/components/result/mechanic-questions";
import { WhatsAppPanel } from "@/components/result/whatsapp-panel";

describe("DangerBanner", () => {
  it("menampilkan label tegas dan tiga langkah keselamatan", () => {
    const html = renderToStaticMarkup(
      <DangerBanner urgency="jangan_dikendarai" />,
    );

    expect(html).toContain("Berhenti dan ke bengkel kalau");
    expect(html).toContain("Apa yang bisa kamu lakukan sekarang");
    expect(html).toContain("Jangan kendarai motor sampai diperiksa.");
    expect(html).toContain("Bawa motor ke bengkel atau teknisi yang kompeten.");
    expect(html).toContain("Jangan bongkar komponen sendiri.");
  });

  it("tidak melonggarkan judul dan isi SafetyAlert lama", () => {
    const jangan = renderToStaticMarkup(
      <DangerBanner urgency="jangan_dikendarai" />,
    );
    const perlu = renderToStaticMarkup(
      <DangerBanner urgency="perlu_segera_diperiksa" />,
    );

    expect(jangan).toContain("Jangan dikendarai dulu");
    expect(jangan).toContain(
      "Keluhan ini bisa berisiko. Jangan kendarai motor sampai diperiksa.",
    );
    expect(perlu).toContain("Perlu perhatian keselamatan");
    expect(perlu).toContain(
      "Ada kemungkinan masalah yang perlu segera diperiksa.",
    );
  });
});

describe("Syarat tampil SafetyAlert", () => {
  it("masih memakai syarat yang sama persis", () => {
    const source = readFileSync(
      new URL("../../src/components/result/result-view.tsx", import.meta.url),
      "utf8",
    );

    expect(source).toContain(
      'const showSafety = view.safetyLocked || view.urgency === "jangan_dikendarai";',
    );
    expect(source).toContain(
      "{showSafety ? <DangerBanner urgency={view.urgency} /> : null}",
    );
  });
});

describe("Skala urgensi", () => {
  it("mengambil label dari sumber URGENCY_COPY", () => {
    const source = readFileSync(
      new URL("../../src/components/result/result-view.tsx", import.meta.url),
      "utf8",
    );

    expect(source).toContain("Object.values(URGENCY_COPY)");
    expect(source).toContain("Skala urgensi: {URGENCY_SCALE_LABELS}");
    expect(source).not.toContain("2 perlu cek");
    expect(source).not.toContain("3 jangan jalan");
  });
});

describe("Tampilan hasil pendukung", () => {
  it("menyimpan pertanyaan mekanik dalam bagian yang bisa dibuka", () => {
    const html = renderToStaticMarkup(
      <MechanicQuestions questions={["Apa yang perlu dicek?"]} />,
    );

    expect(html).toContain("<details");
    expect(html).toContain("Pertanyaan untuk mekanik");
    expect(html).toContain("Salin daftar");
    expect(html).toContain("Apa yang perlu dicek?");
  });

  it("menyediakan tombol salin pesan yang menempel di ponsel", () => {
    const html = renderToStaticMarkup(
      <WhatsAppPanel
        message="pesan untuk mekanik"
        link="https://wa.me/?text=halo"
      />,
    );

    expect(html).toContain("Salin pesan ke mekanik");
    expect(html).toContain("fixed inset-x-0 bottom-16");
    expect(html).toContain("sm:hidden");
    expect(html).toContain("pesan untuk mekanik");
  });
});
