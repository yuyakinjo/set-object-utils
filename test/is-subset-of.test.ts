import { describe, expect, it } from "bun:test";
import { ExtendedMap, isSubsetOf } from "../index";

describe("isSubsetOf", () => {
  it("should return true when map1 is a subset of map2", () => {
    const map1 = new Map([
      ["a", 1],
      ["b", 2],
    ]);
    const map2 = new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
    const result = isSubsetOf(map1, map2);

    expect(result).toBe(true);
  });

  it("should return false when map1 has different values", () => {
    const map1 = new Map([
      ["a", 1],
      ["b", 3],
    ]);
    const map2 = new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
    const result = isSubsetOf(map1, map2);

    expect(result).toBe(false);
  });

  it("should return false when map1 has keys not in map2", () => {
    const map1 = new Map([
      ["a", 1],
      ["d", 4],
    ]);
    const map2 = new Map([
      ["a", 1],
      ["b", 2],
    ]);
    const result = isSubsetOf(map1, map2);

    expect(result).toBe(false);
  });

  it("should return true for empty map", () => {
    const map1 = new Map<string, number>();
    const map2 = new Map([["a", 1]]);
    const result = isSubsetOf(map1, map2);

    expect(result).toBe(true);
  });

  it("should work with ExtendedMap class method", () => {
    const map1 = new ExtendedMap([["a", 1]]);
    const map2 = new Map([
      ["a", 1],
      ["b", 2],
    ]);
    const result = map1.isSubsetOf(map2);

    expect(result).toBe(true);
  });
});
