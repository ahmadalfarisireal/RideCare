import type { CompanionAnswers, MotorType } from "@/lib/complaint-engine";

export const COMPLAINT_SESSION_KEY = "ridecare:complaint-session";
export const COMPLAINT_SESSION_VERSION = 1;

export interface StoredComplaintInput {
  motorcycleType: MotorType;
  complaint: string;
  answers: CompanionAnswers;
}

interface StoredPayloadV1 {
  version: 1;
  input: StoredComplaintInput;
}

export type StoredComplaintSession = StoredPayloadV1;

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

const MOTOR_TYPES: MotorType[] = ["bebek", "matik", "sport", "listrik"];

function isMotorType(value: unknown): value is MotorType {
  return typeof value === "string" && (MOTOR_TYPES as string[]).includes(value);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidInput(value: unknown): value is StoredComplaintInput {
  if (!isPlainObject(value)) return false;
  if (!isMotorType(value.motorcycleType)) return false;
  if (typeof value.complaint !== "string") return false;
  if (!isPlainObject(value.answers)) return false;
  return true;
}

export function saveComplaintInput(input: StoredComplaintInput): boolean {
  const storage = getStorage();
  if (!storage) return false;
  const payload: StoredPayloadV1 = {
    version: COMPLAINT_SESSION_VERSION,
    input,
  };
  try {
    storage.setItem(COMPLAINT_SESSION_KEY, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}

export function loadComplaintInput(): StoredComplaintInput | null {
  const storage = getStorage();
  if (!storage) return null;
  try {
    const raw = storage.getItem(COMPLAINT_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!isPlainObject(parsed)) return null;
    if (parsed.version !== COMPLAINT_SESSION_VERSION) return null;
    if (!isValidInput(parsed.input)) return null;
    return parsed.input;
  } catch {
    return null;
  }
}

export function clearComplaintInput(): boolean {
  const storage = getStorage();
  if (!storage) return false;
  try {
    storage.removeItem(COMPLAINT_SESSION_KEY);
    return true;
  } catch {
    return false;
  }
}
