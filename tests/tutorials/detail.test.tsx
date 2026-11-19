import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { TutorialDetail } from "@/components/tutorial/tutorial-detail";
import { getTutorialBySlug } from "@/data/tutorials";

describe("TutorialDetail", () => {
  it("merender checklist, progres, dan konten baru untuk cek-tekanan-ban", () => {
    const tutorial = getTutorialBySlug("cek-tekanan-ban")!;
    const html = renderToStaticMarkup(<TutorialDetail tutorial={tutorial} />);

    expect(html).toContain("Progres langkah");
    expect(html).toContain("0 dari 6 langkah selesai");
    expect(html.match(/type="checkbox"/g)).toHaveLength(tutorial.steps.length);
    expect(html).toContain("Kenapa dan kapan dilakukan");
    expect(html).toContain("Kenapa ini perlu");
    expect(html).toContain("Tekanan ban yang tepat membuat motor stabil");
    expect(html).toContain(
      "Cek secara berkala dan sebelum perjalanan jauh. Ikuti anjuran jadwal di buku manual motormu.",
    );
    expect(html).not.toContain("Seminggu sekali");
    expect(html).toContain("Sebelum mulai");
    expect(html).toContain("Kenapa: Tiap motor berbeda, dan ban depan bisa berbeda dari ban belakang.");
    expect(html).toContain("Tandanya sudah benar");
    expect(html).toContain("Semua langkah selesai. Kalau angkanya sudah sesuai anjuran, kamu beres.");
    expect(html).toContain("Kapan harus berhenti dan ke bengkel");
    expect(html).toContain(
      "Ban terlihat kempis parah, sobek, benjol, atau ada benda menancap di ban.",
    );
    expect(html).toContain("Peringatan keselamatan");
    expect(html).toContain(
      "Gunakan tekanan angin sesuai anjuran pada stiker motor atau buku manual, bukan perkiraan.",
    );
    expect(html).toContain("Istilah yang sering muncul");
  });

  it("tetap merender checklist dan pengaman untuk tutorial tanpa field baru", () => {
    const tutorial = getTutorialBySlug("ganti-oli-mesin")!;
    const html = renderToStaticMarkup(<TutorialDetail tutorial={tutorial} />);

    expect(html).toContain("Progres langkah");
    expect(html).toContain(`0 dari ${tutorial.steps.length} langkah selesai`);
    expect(html.match(/type="checkbox"/g)).toHaveLength(tutorial.steps.length);
    expect(html).toContain(tutorial.steps[0]);
    expect(html).toContain("Kapan harus berhenti dan ke bengkel");
    expect(html).toContain("Peringatan keselamatan");
    expect(html).not.toContain("Kenapa ini perlu");
    expect(html).not.toContain("Tandanya sudah benar");
  });
});
