export function whereKey<K, V>(map: Map<K, V>, predicate: (key: K) => boolean): any {
  // Import ExtendedMap dynamically to avoid circular dependency
  const { ExtendedMap } = require("./extended-map");
  const result = new ExtendedMap();
  for (const [key, value] of map) {
    if (predicate(key)) {
      result.set(key, value);
    }
  }
  return result;
}
