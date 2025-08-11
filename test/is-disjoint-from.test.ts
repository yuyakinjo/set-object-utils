import { describe, expect, it } from "bun:test";
import { ExtendedMap, isDisjointFrom } from "../index";

describe("isDisjointFrom", () => {
  it("should return true when maps have no matching key-value pairs", () => {
    const map1 = new Map([
      ["a", 1],
      ["b", 2],
    ]);
    const map2 = new Map([
      ["c", 3],
      ["d", 4],
    ]);
    const result = isDisjointFrom(map1, map2);

    expect(result).toBe(true);
  });

  it("should return true when maps have same keys but different values", () => {
    const map1 = new Map([
      ["a", 1],
      ["b", 2],
    ]);
    const map2 = new Map([
      ["a", 2],
      ["b", 3],
    ]);
    const result = isDisjointFrom(map1, map2);

    expect(result).toBe(true);
  });

  it("should return false when maps have at least one matching key-value pair", () => {
    const map1 = new Map([
      ["a", 1],
      ["b", 2],
    ]);
    const map2 = new Map([
      ["a", 1],
      ["c", 3],
    ]);
    const result = isDisjointFrom(map1, map2);

    expect(result).toBe(false);
  });

  it("should work with ExtendedMap class method", () => {
    const map1 = new ExtendedMap([["a", 1]]);
    const map2 = new Map([["b", 2]]);
    const result = map1.isDisjointFrom(map2);

    expect(result).toBe(true);
  });
});
