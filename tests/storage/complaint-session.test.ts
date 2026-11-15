import { afterEach, describe, expect, it, vi } from "vitest";
import {
  COMPLAINT_SESSION_KEY,
  COMPLAINT_SESSION_VERSION,
  clearComplaintInput,
  loadComplaintInput,
  saveComplaintInput,
} from "@/lib/storage/complaint-session";

const sampleInput = {
  motorcycleType: "matik" as const,
  complaint: "Motor susah hidup pagi",
  answers: { engineTemperature: "dingin" as const },
};

describe("complaint-session storage", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("menyimpan dan membaca input dengan versi skema", () => {
    const store = new Map<string, string>();
    vi.stubGlobal("window", {
      localStorage: {
        getItem: (key: string) => store.get(key) ?? null,
        setItem: (key: string, value: string) => {
          store.set(key, value);
        },
        removeItem: (key: string) => {
          store.delete(key);
        },
      },
    });

    expect(saveComplaintInput(sampleInput)).toBe(true);
    const raw = store.get(COMPLAINT_SESSION_KEY);
    expect(raw).toBeTruthy();
    expect(JSON.parse(raw!).version).toBe(COMPLAINT_SESSION_VERSION);
    expect(loadComplaintInput()).toEqual(sampleInput);
  });

  it("aman saat storage tidak tersedia (throw)", () => {
    vi.stubGlobal("window", {
      localStorage: {
        getItem: () => {
          throw new Error("blocked");
        },
        setItem: () => {
          throw new Error("blocked");
        },
        removeItem: () => {
          throw new Error("blocked");
        },
      },
    });

    expect(() => saveComplaintInput(sampleInput)).not.toThrow();
    expect(() => loadComplaintInput()).not.toThrow();
    expect(() => clearComplaintInput()).not.toThrow();
    expect(saveComplaintInput(sampleInput)).toBe(false);
    expect(loadComplaintInput()).toBeNull();
    expect(clearComplaintInput()).toBe(false);
  });

  it("menganggap kosong saat JSON rusak", () => {
    vi.stubGlobal("window", {
      localStorage: {
        getItem: () => "{rusak",
        setItem: () => undefined,
        removeItem: () => undefined,
      },
    });

    expect(loadComplaintInput()).toBeNull();
  });

  it("menganggap kosong saat versi tidak cocok atau data tidak valid", () => {
    const store = new Map<string, string>();
    vi.stubGlobal("window", {
      localStorage: {
        getItem: (key: string) => store.get(key) ?? null,
        setItem: (key: string, value: string) => {
          store.set(key, value);
        },
        removeItem: (key: string) => {
          store.delete(key);
        },
      },
    });

    store.set(COMPLAINT_SESSION_KEY, JSON.stringify({ version: 999, input: sampleInput }));
    expect(loadComplaintInput()).toBeNull();

    store.set(COMPLAINT_SESSION_KEY, JSON.stringify({ version: COMPLAINT_SESSION_VERSION, input: { nope: true } }));
    expect(loadComplaintInput()).toBeNull();
  });

  it("menghapus data dengan aman", () => {
    const store = new Map<string, string>();
    vi.stubGlobal("window", {
      localStorage: {
        getItem: (key: string) => store.get(key) ?? null,
        setItem: (key: string, value: string) => {
          store.set(key, value);
        },
        removeItem: (key: string) => {
          store.delete(key);
        },
      },
    });

    saveComplaintInput(sampleInput);
    expect(clearComplaintInput()).toBe(true);
    expect(loadComplaintInput()).toBeNull();
  });
});
