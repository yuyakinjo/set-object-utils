export function whereValue<K, V>(map: Map<K, V>, predicate: (value: V) => boolean): any {
  // Import ExtendedMap dynamically to avoid circular dependency
  const { ExtendedMap } = require("./extended-map");
  const result = new ExtendedMap();
  for (const [key, value] of map) {
    if (predicate(value)) {
      result.set(key, value);
    }
  }
  return result;
}
