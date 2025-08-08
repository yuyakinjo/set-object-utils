import { isSubsetOfWithMap } from "./is-subset-of-with-map";

export function isSupersetOfWithMap<K, V>(map1: Map<K, V>, map2: Map<K, V>): boolean {
  return isSubsetOfWithMap(map2, map1);
}
