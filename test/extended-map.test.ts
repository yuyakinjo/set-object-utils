import { describe, expect, it } from "bun:test";
import { ExtendedMap } from "../index";

describe("ExtendedMap Constructor and Default Values", () => {
  it("should create empty ExtendedMap", () => {
    const map = new ExtendedMap<string, number>();

    expect(map.size).toBe(0);
    expect(map.get("nonexistent")).toBeUndefined();
  });

  it("should create ExtendedMap with initial entries", () => {
    const map = new ExtendedMap([
      ["a", 1],
      ["b", 2],
    ]);

    expect(map.size).toBe(2);
    expect(map.get("a")).toBe(1);
    expect(map.get("b")).toBe(2);
  });

  it("should create ExtendedMap with default value", () => {
    const map = new ExtendedMap<string, number>(null, { default: 0 });

    expect(map.get("nonexistent")).toBe(0);
    expect(map.get("alsoNonexistent")).toBe(0);
  });

  it("should create ExtendedMap with entries and default value", () => {
    const map = new ExtendedMap([["a", 1]], { default: 42 });

    expect(map.get("a")).toBe(1); // existing key returns actual value
    expect(map.get("nonexistent")).toBe(42); // missing key returns default
  });

  it("should return actual value over default when key exists", () => {
    const map = new ExtendedMap([["a", 0]], { default: 42 });

    expect(map.get("a")).toBe(0); // actual value (0) not default (42)
    expect(map.get("b")).toBe(42); // missing key returns default
  });

  it("should handle null/undefined default values", () => {
    const mapWithNull = new ExtendedMap<string, number | null>(null, { default: null });
    const mapWithUndefined = new ExtendedMap<string, number | undefined>(null, {
      default: undefined,
    });

    expect(mapWithNull.get("nonexistent")).toBeNull();
    expect(mapWithUndefined.get("nonexistent")).toBeUndefined();
  });
});

describe("Edge Cases and Type Testing", () => {
  it("should work with different key types", () => {
    // String keys
    const stringMap = new ExtendedMap([["key", "value"]]);
    expect(stringMap.get("key")).toBe("value");

    // Number keys
    const numberMap = new ExtendedMap([[42, "answer"]]);
    expect(numberMap.get(42)).toBe("answer");

    // Object keys
    const obj = { id: 1 };
    const objectMap = new ExtendedMap([[obj, "object-value"]]);
    expect(objectMap.get(obj)).toBe("object-value");
  });

  it("should work with different value types", () => {
    const map = new ExtendedMap<string, any>([
      ["string", "text"],
      ["number", 42],
      ["boolean", true],
      ["array", [1, 2, 3]],
      ["object", { key: "value" }],
      ["null", null],
      ["undefined", undefined],
    ]);

    expect(map.get("string")).toBe("text");
    expect(map.get("number")).toBe(42);
    expect(map.get("boolean")).toBe(true);
    expect(map.get("array")).toEqual([1, 2, 3]);
    expect(map.get("object")).toEqual({ key: "value" });
    expect(map.get("null")).toBeNull();
    expect(map.get("undefined")).toBeUndefined();
  });

  it("should handle operations with single element maps", () => {
    const map1 = new ExtendedMap([["a", 1]]);
    const map2 = new ExtendedMap([["a", 1]]);

    expect(map1.intersection(map2).size).toBe(1);
    expect(map1.union(map2).size).toBe(1);
    expect(map1.difference(map2).size).toBe(0);
    expect(map1.isSubsetOf(map2)).toBe(true);
    expect(map1.isSupersetOf(map2)).toBe(true);
    expect(map1.isDisjointFrom(map2)).toBe(false);
  });

  it("should handle operations with completely empty maps", () => {
    const empty1 = new ExtendedMap<string, number>();
    const empty2 = new ExtendedMap<string, number>();

    expect(empty1.intersection(empty2).size).toBe(0);
    expect(empty1.union(empty2).size).toBe(0);
    expect(empty1.difference(empty2).size).toBe(0);
    expect(empty1.isSubsetOf(empty2)).toBe(true);
    expect(empty1.isSupersetOf(empty2)).toBe(true);
    expect(empty1.isDisjointFrom(empty2)).toBe(true);
  });

  it("should maintain ExtendedMap type in chain operations", () => {
    const map1 = new ExtendedMap([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
    const map2 = new ExtendedMap([
      ["b", 2],
      ["d", 4],
    ]);

    const result = map1
      .union(map2)
      .whereValue((value) => value > 2)
      .difference(new Map([["c", 3]]));

    expect(result).toBeInstanceOf(ExtendedMap);
    expect(result.size).toBe(1);
    expect(result.get("d")).toBe(4);
  });
});

describe("Performance and Large Data Edge Cases", () => {
  it("should handle moderately large maps efficiently", () => {
    const size = 1000;
    const entries: [string, number][] = [];
    for (let i = 0; i < size; i++) {
      entries.push([`key${i}`, i]);
    }

    const map1 = new ExtendedMap(entries);
    const map2 = new ExtendedMap(entries.slice(500)); // second half

    const intersection = map1.intersection(map2);
    const union = map1.union(map2);

    expect(intersection.size).toBe(500);
    expect(union.size).toBe(1000);
    expect(map1.isSubsetOf(union)).toBe(true);
    expect(union.isSupersetOf(map2)).toBe(true);
  });

  it("should handle maps with duplicate values correctly", () => {
    const map1 = new ExtendedMap([
      ["a", 1],
      ["b", 1],
      ["c", 2],
    ]);
    const map2 = new ExtendedMap([
      ["d", 1],
      ["e", 1],
      ["f", 3],
    ]);

    const filtered = map1.whereValue((value) => value === 1);
    expect(filtered.size).toBe(2);
    expect(filtered.has("a")).toBe(true);
    expect(filtered.has("b")).toBe(true);

    const union = map1.union(map2);
    expect(union.size).toBe(6);
  });
});
