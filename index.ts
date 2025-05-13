const nums1 = [1, 2, 3, 4, 5];
const nums2 = [3, 4, 5];

const setObject1 = new Set(nums1);
setObject1.add(6);
const setObject2 = new Set(nums2);

const difference = setObject1.difference(setObject2);

console.log(difference);

// MapKeySet, MapValueSetクラスの実装
class MapKeySet {
  private _set: Set<unknown>;
  constructor(map: Map<unknown, unknown> | Iterable<unknown>) {
    if (map instanceof Map) {
      this._set = new Set(Array.from(map.keys()));
    } else {
      this._set = new Set(map);
    }
  }
  intersection(other: Iterable<unknown>): Set<unknown> {
    const otherSet = new Set(other);
    return new Set([...this._set].filter(x => otherSet.has(x)));
  }
  union(other: Iterable<unknown>): Set<unknown> {
    const otherSet = new Set(other);
    return new Set([...this._set, ...otherSet]);
  }
  difference(other: Iterable<unknown>): Set<unknown> {
    const otherSet = new Set(other);
    return new Set([...this._set].filter(x => !otherSet.has(x)));
  }
  symmetricDifference(other: Iterable<unknown>): Set<unknown> {
    const otherSet = new Set(other);
    const diff1 = [...this._set].filter(x => !otherSet.has(x));
    const diff2 = [...otherSet].filter(x => !this._set.has(x));
    return new Set([...diff1, ...diff2]);
  }
  isSubsetOf(other: Iterable<unknown>): boolean {
    const otherSet = new Set(other);
    return [...this._set].every(x => otherSet.has(x));
  }
  isSupersetOf(other: Iterable<unknown>): boolean {
    const otherSet = new Set(other);
    return [...otherSet].every(x => this._set.has(x));
  }
  isDisjointFrom(other: Iterable<unknown>): boolean {
    const otherSet = new Set(other);
    return ![...this._set].some(x => otherSet.has(x));
  }
}

class MapValueSet {
  private _set: Set<unknown>;
  constructor(map: Map<unknown, unknown> | Iterable<unknown>) {
    if (map instanceof Map) {
      this._set = new Set(Array.from(map.values()));
    } else {
      this._set = new Set(map);
    }
  }
  intersection(other: Iterable<unknown>): Set<unknown> {
    const otherSet = new Set(other);
    return new Set([...this._set].filter(x => otherSet.has(x)));
  }
  union(other: Iterable<unknown>): Set<unknown> {
    const otherSet = new Set(other);
    return new Set([...this._set, ...otherSet]);
  }
  difference(other: Iterable<unknown>): Set<unknown> {
    const otherSet = new Set(other);
    return new Set([...this._set].filter(x => !otherSet.has(x)));
  }
  symmetricDifference(other: Iterable<unknown>): Set<unknown> {
    const otherSet = new Set(other);
    const diff1 = [...this._set].filter(x => !otherSet.has(x));
    const diff2 = [...otherSet].filter(x => !this._set.has(x));
    return new Set([...diff1, ...diff2]);
  }
  isSubsetOf(other: Iterable<unknown>): boolean {
    const otherSet = new Set(other);
    return [...this._set].every(x => otherSet.has(x));
  }
  isSupersetOf(other: Iterable<unknown>): boolean {
    const otherSet = new Set(other);
    return [...otherSet].every(x => this._set.has(x));
  }
  isDisjointFrom(other: Iterable<unknown>): boolean {
    const otherSet = new Set(other);
    return ![...this._set].some(x => otherSet.has(x));
  }
}

Object.defineProperty(Map.prototype, 'key', {
  get() {
    return new MapKeySet(this);
  },
  configurable: true
});
Object.defineProperty(Map.prototype, 'value', {
  get() {
    return new MapValueSet(this);
  },
  configurable: true
});

// 型拡張: Map.prototype.key, Map.prototype.value をTypeScriptで認識させる
declare global {
  interface Map<K, V> {
    readonly key: MapKeySet;
    readonly value: MapValueSet;
  }
}

// サンプルコード
const map1 = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);
const map2 = new Map([
  ['b', 2],
  ['c', 4],
  ['d', 5],
]);

console.log('key.intersection:', map1.key.intersection(map2.keys())); // Set { 'b', 'c' }
console.log('value.intersection:', map1.value.intersection(map2.values())); // Set { 2, 3 }
console.log('key.union:', map1.key.union(map2.keys())); // Set { 'a', 'b', 'c', 'd' }
console.log('value.union:', map1.value.union(map2.values())); // Set { 1, 2, 3, 4, 5 }
console.log('key.difference:', map1.key.difference(map2.keys())); // Set { 'a' }
console.log('value.difference:', map1.value.difference(map2.values())); // Set { 1 }
console.log('key.symmetricDifference:', map1.key.symmetricDifference(map2.keys())); // Set { 'a', 'd' }
console.log('value.symmetricDifference:', map1.value.symmetricDifference(map2.values())); // Set { 1, 4, 5 }
console.log('key.isSubsetOf:', map1.key.isSubsetOf(map2.keys())); // false
console.log('value.isSubsetOf:', map1.value.isSubsetOf(map2.values())); // false
console.log('key.isSupersetOf:', map1.key.isSupersetOf(map2.keys())); // false
console.log('value.isSupersetOf:', map1.value.isSupersetOf(map2.values())); // false
console.log('key.isDisjointFrom:', map1.key.isDisjointFrom(map2.keys())); // false
console.log('value.isDisjointFrom:', map1.value.isDisjointFrom(map2.values())); // false
