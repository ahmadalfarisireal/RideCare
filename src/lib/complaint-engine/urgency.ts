import { URGENCY_RANK, type Urgency } from "./types";

export function maxUrgency(urgencies: Urgency[]): Urgency {
  let max: Urgency = "aman_ditunda";
  for (const urgency of urgencies) {
    if (URGENCY_RANK[urgency] > URGENCY_RANK[max]) {
      max = urgency;
    }
  }
  return max;
}

export function clampUrgencyAtLeast(urgency: Urgency, minimum: Urgency): Urgency {
  return URGENCY_RANK[urgency] >= URGENCY_RANK[minimum] ? urgency : minimum;
}
