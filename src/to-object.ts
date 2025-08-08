import type { ObjectKey } from "./types";

export function toObject<K extends ObjectKey, V>(map: Map<K, V>): Record<K, V> {
  const obj = {} as Record<K, V>;
  for (const [key, value] of map) {
    obj[key] = value;
  }
  return obj;
}
