import { difference } from "./difference";
import { intersection } from "./intersection";
import { isDisjointFrom } from "./is-disjoint-from";
import { isEmpty } from "./is-empty";
import { isSubsetOf } from "./is-subset-of";
import { isSupersetOf } from "./is-superset-of";
import { symmetricDifference } from "./symmetric-difference";
import { toObject } from "./to-object";
import type { ExtendedMapOptions, ObjectKey } from "./types";
import { union } from "./union";
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
  intersection(other: Map<K, V>): ExtendedMap<K, V> {
    return intersection(this, other);
  }

  union(other: Map<K, V>): ExtendedMap<K, V> {
    return union(this, other);
  }

  difference(other: Map<K, V>): ExtendedMap<K, V> {
    return difference(this, other);
  }

  symmetricDifference(other: Map<K, V>): ExtendedMap<K, V> {
    return symmetricDifference(this, other);
  }

  isSubsetOf(other: Map<K, V>): boolean {
    return isSubsetOf(this, other);
  }

  isSupersetOf(other: Map<K, V>): boolean {
    return isSupersetOf(this, other);
  }

  isDisjointFrom(other: Map<K, V>): boolean {
    return isDisjointFrom(this, other);
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

  isEmpty(): boolean {
    return isEmpty(this);
  }

  has(key: K): boolean {
    return super.has(key);
  }

  getAsserted(key: K): V {
    if (!this.has(key)) {
      throw new Error(`Key "${String(key)}" does not exist in map`);
    }
    return super.get(key) as V;
  }
}
