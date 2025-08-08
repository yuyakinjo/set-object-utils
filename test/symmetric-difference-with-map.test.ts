import { describe, expect, it } from "bun:test";
import { ExtendedMap, symmetricDifferenceWithMap } from "../index";

describe("symmetricDifferenceWithMap", () => {
  it("should return elements in either map but not in both", () => {
    const map1 = new Map([
      ["a", 1],
      ["b", 2],
    ]);
    const map2 = new Map([
      ["a", 1],
      ["c", 3],
    ]);
    const result = symmetricDifferenceWithMap(map1, map2);

    expect(result.size).toBe(2);
    expect(result.get("b")).toBe(2);
    expect(result.get("c")).toBe(3);
    expect(result.has("a")).toBe(false); // in both with same value
  });

  it("should include different values for same key from both maps", () => {
    const map1 = new Map([
      ["a", 1],
      ["b", 2],
    ]);
    const map2 = new Map([
      ["a", 2],
      ["c", 3],
    ]);
    const result = symmetricDifferenceWithMap(map1, map2);

    expect(result.size).toBe(3);
    expect(result.get("a")).toBe(2); // map2 value overrides
    expect(result.get("b")).toBe(2);
    expect(result.get("c")).toBe(3);
  });

  it("should work with ExtendedMap class method", () => {
    const map1 = new ExtendedMap([["a", 1]]);
    const map2 = new Map([["b", 2]]);
    const result = map1.symmetricDifferenceWithMap(map2);

    expect(result.size).toBe(2);
    expect(result.get("a")).toBe(1);
    expect(result.get("b")).toBe(2);
  });
});
