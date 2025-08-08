import type { ExtendedMap as ExtendedMapType } from "./extended-map";

export function unionWithMap<K, V>(map1: Map<K, V>, map2: Map<K, V>): ExtendedMapType<K, V> {
  const { ExtendedMap } = require("./extended-map") as typeof import("./extended-map");
  const result = new ExtendedMap<K, V>(map1);
  for (const [key, value] of map2) {
    result.set(key, value);
  }
  return result;
}
