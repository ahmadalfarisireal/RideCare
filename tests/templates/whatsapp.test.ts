import { describe, expect, it } from "vitest";
import { buildMechanicMessage, buildWhatsAppLink } from "@/lib/templates/whatsapp";

describe("buildMechanicMessage", () => {
  it("membuat pesan sesuai kebutuhan bengkel tanpa harga", () => {
    const message = buildMechanicMessage({
      motorcycleType: "matik",
      complaint: "Susah hidup saat pagi dan kadang mati sendiri.",
      componentsToCheck: ["Aki", "Busi", "Sistem pengisian"],
    });

    expect(message).toContain("Halo, saya ingin servis motor matik.");
    expect(message).toContain("Keluhan:");
    expect(message).toContain("Susah hidup saat pagi");
    expect(message).toContain("Mohon periksa:");
    expect(message).toContain("- Aki");
    expect(message).toContain("Estimasi biaya jasa dan sparepart.");
    expect(message).toContain("Mohon konfirmasi terlebih dahulu sebelum penggantian komponen.");
    expect(message).not.toMatch(/\bRp\b|\d+\s?ribu|\d+\s?juta|estimasi\s+\d/i);
  });

  it("menekankan jangan dikendarai saat safety/urgensi bahaya", () => {
    const message = buildMechanicMessage({
      motorcycleType: "bebek",
      complaint: "Rem blong",
      componentsToCheck: ["Kampas rem"],
      urgency: "jangan_dikendarai",
      safetyLocked: true,
    });

    expect(message.toLowerCase()).toContain("tidak disarankan dikendarai");
  });

  it("membuat tautan wa.me tanpa nomor", () => {
    const link = buildWhatsAppLink("Halo tes");
    expect(link.startsWith("https://wa.me/?text=")).toBe(true);
    expect(link).toContain(encodeURIComponent("Halo tes"));
  });
});
