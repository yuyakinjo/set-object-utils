/**
 * Returns the value for the given key if it exists, otherwise returns the fallback value.
 *
 * @param map - The Map to query
 * @param key - The key to look up
 * @param fallback - The value to return if the key doesn't exist
 * @returns The value associated with the key, or the fallback value
 */
export function tryGet<K, V>(map: Map<K, V>, key: K, fallback: V): V {
  return map.has(key) ? (map.get(key) as V) : fallback;
}
