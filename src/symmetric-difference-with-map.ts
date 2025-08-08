export function symmetricDifferenceWithMap<K, V>(map1: Map<K, V>, map2: Map<K, V>): any {
  // Import ExtendedMap dynamically to avoid circular dependency
  const { ExtendedMap } = require("./extended-map");
  const result = new ExtendedMap();

  for (const [key, value] of map1) {
    if (!map2.has(key) || map2.get(key) !== value) {
      result.set(key, value);
    }
  }

  for (const [key, value] of map2) {
    if (!map1.has(key) || map1.get(key) !== value) {
      result.set(key, value);
    }
  }

  return result;
}
