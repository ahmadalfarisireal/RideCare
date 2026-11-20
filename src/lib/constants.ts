export const SITE = {
  name: "RideCare",
  tagline: "Pahami motormu, hindari digetok.",
  description:
    "RideCare membantu pemilik motor di Indonesia menyusun keluhan sebelum ke bengkel, memahami perawatan dasar, dan menghindari biaya servis yang tidak transparan.",
} as const;

export const DISCLAIMER =
  "RideCare membantu menyusun keluhan dan memberikan kemungkinan pemeriksaan awal. Hasil ini bukan diagnosis pasti. Untuk pemeriksaan, perbaikan, dan keputusan penggantian komponen, gunakan jasa teknisi atau bengkel yang kompeten. Jangan melakukan perbaikan yang berisiko jika kamu tidak yakin.";

export const SAFETY_CATEGORIES = [
  "Rem",
  "Kebocoran bahan bakar",
  "Kelistrikan utama",
  "Mesin",
  "Motor listrik",
] as const;

export const SAFETY_CATEGORIES_TEXT =
  "rem, kebocoran bahan bakar, kelistrikan utama, mesin, dan motor listrik";

export const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/tutorial", label: "Tutorial" },
  { href: "/kamus", label: "Kamus" },
  { href: "/tentang", label: "Tentang" },
] as const;

export const PRIMARY_TABS = [
  { href: "/keluhan", label: "Keluhan" },
  { href: "/kamus", label: "Kamus" },
  { href: "/tutorial", label: "Tutorial" },
  { href: "/checklist", label: "Anti Getok" },
] as const;

export const BOTTOM_NAV_ITEMS = [
  { href: "/", label: "Beranda" },
  { href: "/keluhan", label: "Keluhan" },
  { href: "/kamus", label: "Kamus" },
  { href: "/tutorial", label: "Tutorial" },
  { href: "/checklist", label: "Anti getok" },
] as const;
