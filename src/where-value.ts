import type { ExtendedMap as ExtendedMapType } from "./extended-map";

export function whereValue<K, V>(map: Map<K, V>, predicate: (value: V) => boolean): ExtendedMapType<K, V> {
  const { ExtendedMap } = require("./extended-map") as typeof import("./extended-map");
  const result = new ExtendedMap<K, V>();
  for (const [key, value] of map) {
    if (predicate(value)) {
      result.set(key, value);
    }
  }
  return result;
}
