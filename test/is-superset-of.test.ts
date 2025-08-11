import { describe, expect, it } from "bun:test";
import { ExtendedMap, isSupersetOf } from "../index";

describe("isSupersetOf", () => {
  it("should return true when map1 is a superset of map2", () => {
    const map1 = new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
    const map2 = new Map([
      ["a", 1],
      ["b", 2],
    ]);
    const result = isSupersetOf(map1, map2);

    expect(result).toBe(true);
  });

  it("should return false when map1 is missing keys from map2", () => {
    const map1 = new Map([["a", 1]]);
    const map2 = new Map([
      ["a", 1],
      ["b", 2],
    ]);
    const result = isSupersetOf(map1, map2);

    expect(result).toBe(false);
  });

  it("should work with ExtendedMap class method", () => {
    const map1 = new ExtendedMap([
      ["a", 1],
      ["b", 2],
    ]);
    const map2 = new Map([["a", 1]]);
    const result = map1.isSupersetOf(map2);

    expect(result).toBe(true);
  });
});
