export function isDisjointFromWithMap<K, V>(map1: Map<K, V>, map2: Map<K, V>): boolean {
  for (const [key, value] of map1) {
    if (map2.has(key) && map2.get(key) === value) {
      return false;
    }
  }
  return true;
}
