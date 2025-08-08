import defer * as ExtendedMapModule from "./extended-map";

export function unionWithMap<K, V>(map1: Map<K, V>, map2: Map<K, V>): ExtendedMapModule.ExtendedMap<K, V> {
  const { ExtendedMap } = ExtendedMapModule;
  const result = new ExtendedMap(map1);
  for (const [key, value] of map2) {
    result.set(key, value);
  }
  return result;
}
