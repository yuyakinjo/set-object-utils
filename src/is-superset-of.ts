import { isSubsetOf } from "./is-subset-of";

export function isSupersetOf<K, V>(map1: Map<K, V>, map2: Map<K, V>): boolean {
  return isSubsetOf(map2, map1);
}
