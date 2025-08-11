import { describe, expect, it } from "bun:test";
import { ExtendedMap, isEmpty } from "../index";

describe("isEmpty", () => {
  it("should return true for empty map", () => {
    const map = new Map();
    const result = isEmpty(map);

    expect(result).toBe(true);
  });

  it("should return false for map with entries", () => {
    const map = new Map([
      ["key1", "value1"],
      ["key2", "value2"],
    ]);
    const result = isEmpty(map);

    expect(result).toBe(false);
  });

  it("should return false for map with single entry", () => {
    const map = new Map([["key", "value"]]);
    const result = isEmpty(map);

    expect(result).toBe(false);
  });

  it("should return true after clearing a map", () => {
    const map = new Map([
      ["key1", "value1"],
      ["key2", "value2"],
    ]);
    map.clear();
    const result = isEmpty(map);

    expect(result).toBe(true);
  });

  it("should return true after deleting all entries", () => {
    const map = new Map([["key", "value"]]);
    map.delete("key");
    const result = isEmpty(map);

    expect(result).toBe(true);
  });

  it("should work with different key types", () => {
    const numberKeyMap = new Map<number, string>();
    const symbolKeyMap = new Map<symbol, string>();
    const objectKeyMap = new Map<object, string>();

    expect(isEmpty(numberKeyMap)).toBe(true);
    expect(isEmpty(symbolKeyMap)).toBe(true);
    expect(isEmpty(objectKeyMap)).toBe(true);

    numberKeyMap.set(1, "one");
    symbolKeyMap.set(Symbol("test"), "symbol");
    objectKeyMap.set({}, "object");

    expect(isEmpty(numberKeyMap)).toBe(false);
    expect(isEmpty(symbolKeyMap)).toBe(false);
    expect(isEmpty(objectKeyMap)).toBe(false);
  });

  it("should work with different value types including undefined and null", () => {
    const mapWithUndefined = new Map([["key", undefined]]);
    const mapWithNull = new Map([["key", null]]);
    const mapWithZero = new Map([["key", 0]]);
    const mapWithFalse = new Map([["key", false]]);
    const mapWithEmptyString = new Map([["key", ""]]);

    expect(isEmpty(mapWithUndefined)).toBe(false);
    expect(isEmpty(mapWithNull)).toBe(false);
    expect(isEmpty(mapWithZero)).toBe(false);
    expect(isEmpty(mapWithFalse)).toBe(false);
    expect(isEmpty(mapWithEmptyString)).toBe(false);
  });

  it("should work with ExtendedMap class method", () => {
    const emptyMap = new ExtendedMap();
    expect(emptyMap.isEmpty()).toBe(true);

    const nonEmptyMap = new ExtendedMap([
      ["key1", "value1"],
      ["key2", "value2"],
    ]);
    expect(nonEmptyMap.isEmpty()).toBe(false);
  });

  it("should work with ExtendedMap with default values", () => {
    const mapWithDefault = new ExtendedMap([], { default: "default" });
    expect(mapWithDefault.isEmpty()).toBe(true);

    mapWithDefault.set("key", "value");
    expect(mapWithDefault.isEmpty()).toBe(false);
  });

  it("should work correctly after operations that modify the map", () => {
    const map = new ExtendedMap([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
    expect(map.isEmpty()).toBe(false);

    // Test after filtering to empty
    const filtered = map.whereKey(() => false);
    expect(filtered.isEmpty()).toBe(true);

    // Test after union with empty map
    const unionWithEmpty = map.union(new Map());
    expect(unionWithEmpty.isEmpty()).toBe(false);

    // Test after difference that results in empty
    const difference = map.difference(map);
    expect(difference.isEmpty()).toBe(true);

    // Test after intersection that results in empty
    const intersection = map.intersection(new Map());
    expect(intersection.isEmpty()).toBe(true);
  });
});
