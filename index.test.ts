import './index.js';
import { describe, it, expect } from 'bun:test';

// index.tsの拡張をimport（bunは自動でindex.tsを読み込むためimport不要）

describe('Map.prototype.key/value 拡張', () => {
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

  it('key.intersection: 共通キー', () => {
    expect(map1.key.intersection(map2.keys())).toEqual(new Set(['b', 'c']));
  });
  it('value.intersection: 共通値', () => {
    expect(map1.value.intersection(map2.values())).toEqual(new Set([2]));
  });
  it('key.union: キーの和集合', () => {
    expect(map1.key.union(map2.keys())).toEqual(new Set(['a', 'b', 'c', 'd']));
  });
  it('value.union: 値の和集合', () => {
    expect(map1.value.union(map2.values())).toEqual(new Set([1, 2, 3, 4, 5]));
  });
  it('key.difference: 差集合', () => {
    expect(map1.key.difference(map2.keys())).toEqual(new Set(['a']));
  });
  it('value.difference: 差集合', () => {
    expect(map1.value.difference(map2.values())).toEqual(new Set([1, 3]));
  });
  it('key.symmetricDifference: 対称差', () => {
    expect(map1.key.symmetricDifference(map2.keys())).toEqual(new Set(['a', 'd']));
  });
  it('value.symmetricDifference: 対称差', () => {
    expect(map1.value.symmetricDifference(map2.values())).toEqual(new Set([1, 3, 4, 5]));
  });
  it('key.isSubsetOf: 部分集合判定', () => {
    expect(map1.key.isSubsetOf(map2.keys())).toBe(false);
    expect(new Map([['b', 2]]).key.isSubsetOf(map2.keys())).toBe(true);
  });
  it('value.isSubsetOf: 部分集合判定', () => {
    expect(map1.value.isSubsetOf(map2.values())).toBe(false);
    expect(new Map([['b', 2]]).value.isSubsetOf(map2.values())).toBe(true);
  });
  it('key.isSupersetOf: 上位集合判定', () => {
    expect(map1.key.isSupersetOf(map2.keys())).toBe(false);
    expect(map2.key.isSupersetOf(new Map([['b', 2]]).keys())).toBe(true);
  });
  it('value.isSupersetOf: 上位集合判定', () => {
    expect(map1.value.isSupersetOf(map2.values())).toBe(false);
    expect(map2.value.isSupersetOf(new Map([['b', 2]]).values())).toBe(true);
  });
  it('key.isDisjointFrom: 互いに素', () => {
    expect(map1.key.isDisjointFrom(new Map([['x', 100]]).keys())).toBe(true);
    expect(map1.key.isDisjointFrom(map2.keys())).toBe(false);
  });
  it('value.isDisjointFrom: 互いに素', () => {
    expect(map1.value.isDisjointFrom(new Map([['x', 100]]).values())).toBe(true);
    expect(map1.value.isDisjointFrom(map2.values())).toBe(false);
  });
});