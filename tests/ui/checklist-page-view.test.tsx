import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ChecklistGroupList } from "@/components/result/checklist-group-list";
import { PhraseList } from "@/components/result/phrase-list";
import {
  CHECKLIST_GROUPS,
  CHECKLIST_PHRASES,
  FALLBACK_CHECKLIST_REASON,
} from "@/data/ui/checklist-ui";
import { ANTI_RIPOFF_CHECKLIST } from "@/lib/complaint-engine/templates";

describe("komponen halaman Anti Getok", () => {
  it("menampilkan semua item engine dalam tiga kelompok dengan alasan", () => {
    const html = renderToStaticMarkup(
      <ChecklistGroupList items={ANTI_RIPOFF_CHECKLIST} />,
    );

    expect(html).toContain(`Siap 0 dari ${ANTI_RIPOFF_CHECKLIST.length}`);
    expect(html.match(/type="checkbox"/g)).toHaveLength(ANTI_RIPOFF_CHECKLIST.length);
    expect(html).toContain('role="progressbar"');
    expect(html).toContain('aria-valuenow="0"');

    for (const title of CHECKLIST_GROUPS) {
      expect(html).toContain(title);
    }

    for (const item of ANTI_RIPOFF_CHECKLIST) {
      expect(html, `item tidak tampil: ${item}`).toContain(item);
    }

    expect(html).toContain(
      "Kenapa: Mekanik yang tahu kapan dan bagaimana gejala muncul bisa langsung mempersempit penyebabnya.",
    );
    expect(html).toContain(`Kenapa: ${FALLBACK_CHECKLIST_REASON}`);
  });

  it("menampilkan kalimat siap salin dengan tombol salin", () => {
    const html = renderToStaticMarkup(<PhraseList />);

    expect(html).toContain("Kalimat siap pakai");
    for (const phrase of CHECKLIST_PHRASES) {
      expect(html).toContain(phrase);
    }
    expect(html.match(/Salin<\/button>/g)).toHaveLength(CHECKLIST_PHRASES.length);
  });
});
