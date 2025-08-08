import defer * as ExtendedMapModule from "./extended-map";

export function differenceWithMap<K, V>(map1: Map<K, V>, map2: Map<K, V>): ExtendedMapModule.ExtendedMap<K, V> {
  const { ExtendedMap } = ExtendedMapModule;
  const result = new ExtendedMap();
  for (const [key, value] of map1) {
    if (!map2.has(key) || map2.get(key) !== value) {
      result.set(key, value);
    }
  }
  return result;
}
