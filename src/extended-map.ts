import { differenceWithMap } from "./difference-with-map";
import { intersectionWithMap } from "./intersection-with-map";
import { isDisjointFromWithMap } from "./is-disjoint-from-with-map";
import { isSubsetOfWithMap } from "./is-subset-of-with-map";
import { isSupersetOfWithMap } from "./is-superset-of-with-map";
import { symmetricDifferenceWithMap } from "./symmetric-difference-with-map";
import { toObject } from "./to-object";
import type { ExtendedMapOptions, ObjectKey } from "./types";
import { unionWithMap } from "./union-with-map";
import { whereKey } from "./where-key";
import { whereValue } from "./where-value";

export class ExtendedMap<K, V> extends Map<K, V> {
  private defaultValue?: V;

  constructor(entries?: Iterable<readonly [K, V]> | null, options?: ExtendedMapOptions<V>) {
    super(entries);
    if (options?.default !== undefined) {
      this.defaultValue = options.default;
    }
  }

  get(key: K): V | undefined {
    const value = super.get(key);
    return value !== undefined ? value : this.defaultValue;
  }

  // Set operations
  intersectionWithMap(other: Map<K, V>): ExtendedMap<K, V> {
    return intersectionWithMap(this, other);
  }

  unionWithMap(other: Map<K, V>): ExtendedMap<K, V> {
    return unionWithMap(this, other);
  }

  differenceWithMap(other: Map<K, V>): ExtendedMap<K, V> {
    return differenceWithMap(this, other);
  }

  symmetricDifferenceWithMap(other: Map<K, V>): ExtendedMap<K, V> {
    return symmetricDifferenceWithMap(this, other);
  }

  isSubsetOfWithMap(other: Map<K, V>): boolean {
    return isSubsetOfWithMap(this, other);
  }

  isSupersetOfWithMap(other: Map<K, V>): boolean {
    return isSupersetOfWithMap(this, other);
  }

  isDisjointFromWithMap(other: Map<K, V>): boolean {
    return isDisjointFromWithMap(this, other);
  }

  // Additional methods
  toObject(this: ExtendedMap<K & ObjectKey, V>): Record<K & ObjectKey, V> {
    return toObject<K & ObjectKey, V>(this);
  }

  whereKey(predicate: (key: K) => boolean): ExtendedMap<K, V> {
    return whereKey(this, predicate);
  }

  whereValue(predicate: (value: V) => boolean): ExtendedMap<K, V> {
    return whereValue(this, predicate);
  }
}
