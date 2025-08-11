import type { ExtendedMap as ExtendedMapType } from "./extended-map";

export function intersection<K, V>(map1: Map<K, V>, map2: Map<K, V>): ExtendedMapType<K, V> {
  const { ExtendedMap } = require("./extended-map") as typeof import("./extended-map");
  const result = new ExtendedMap<K, V>();
  for (const [key, value] of map1) {
    if (map2.has(key) && map2.get(key) === value) {
      result.set(key, value);
    }
  }
  return result;
}
