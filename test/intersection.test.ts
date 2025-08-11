import { describe, expect, it } from "bun:test";
import { ExtendedMap, intersection } from "../index";

describe("intersection", () => {
  it("should return intersection of two maps with matching key-value pairs", () => {
    const map1 = new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
    const map2 = new Map([
      ["a", 1],
      ["b", 3],
      ["d", 4],
    ]);
    const result = intersection(map1, map2);

    expect(result.size).toBe(1);
    expect(result.get("a")).toBe(1);
    expect(result.has("b")).toBe(false);
  });

  it("should return empty map when no key-value pairs match", () => {
    const map1 = new Map([
      ["a", 1],
      ["b", 2],
    ]);
    const map2 = new Map([
      ["a", 2],
      ["c", 3],
    ]);
    const result = intersection(map1, map2);

    expect(result.size).toBe(0);
  });

  it("should handle empty maps", () => {
    const map1 = new Map<string, number>();
    const map2 = new Map([["a", 1]]);
    const result = intersection(map1, map2);

    expect(result.size).toBe(0);
  });

  it("should work with ExtendedMap class method", () => {
    const map1 = new ExtendedMap([
      ["a", 1],
      ["b", 2],
    ]);
    const map2 = new Map([
      ["a", 1],
      ["c", 3],
    ]);
    const result = map1.intersection(map2);

    expect(result.size).toBe(1);
    expect(result.get("a")).toBe(1);
  });
});
