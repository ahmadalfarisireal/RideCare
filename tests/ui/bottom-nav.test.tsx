import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { BottomNavView } from "@/components/layout/bottom-nav";
import { BOTTOM_NAV_ITEMS } from "@/lib/constants";

describe("BottomNav", () => {
  it("menampilkan lima tautan dengan area sentuh minimal 44px", () => {
    const html = renderToStaticMarkup(<BottomNavView pathname="/" />);

    expect(BOTTOM_NAV_ITEMS).toHaveLength(5);
    expect(html).toContain("min-h-11");
    for (const item of BOTTOM_NAV_ITEMS) {
      expect(html).toContain(`href="${item.href}"`);
      expect(html).toContain(item.label);
    }
  });

  it("menandai halaman aktif dan turunannya", () => {
    const activeHref = (html: string) =>
      html.match(/<a[^>]*aria-current="page"[^>]*>/)?.[0] ?? "";
    const home = renderToStaticMarkup(<BottomNavView pathname="/" />);
    const tutorial = renderToStaticMarkup(
      <BottomNavView pathname="/tutorial/ganti-oli-mesin" />,
    );
    const hasil = renderToStaticMarkup(<BottomNavView pathname="/hasil" />);

    expect(home.match(/aria-current="page"/g)).toHaveLength(1);
    expect(activeHref(home)).toContain('href="/"');
    expect(activeHref(tutorial)).toContain('href="/tutorial"');
    expect(activeHref(hasil)).toContain('href="/keluhan"');
  });
});
