import { describe, expect, it } from "bun:test";
import { differenceWithMap, ExtendedMap } from "../index";

describe("differenceWithMap", () => {
  it("should return elements in map1 that don't match map2", () => {
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
    const result = differenceWithMap(map1, map2);

    expect(result.size).toBe(2);
    expect(result.get("b")).toBe(2); // different value
    expect(result.get("c")).toBe(3); // not in map2
    expect(result.has("a")).toBe(false); // exact match, excluded
  });

  it("should return all elements when maps are disjoint", () => {
    const map1 = new Map([
      ["a", 1],
      ["b", 2],
    ]);
    const map2 = new Map([
      ["c", 3],
      ["d", 4],
    ]);
    const result = differenceWithMap(map1, map2);

    expect(result.size).toBe(2);
    expect(result.get("a")).toBe(1);
    expect(result.get("b")).toBe(2);
  });

  it("should work with ExtendedMap class method", () => {
    const map1 = new ExtendedMap([
      ["a", 1],
      ["b", 2],
    ]);
    const map2 = new Map([["a", 1]]);
    const result = map1.differenceWithMap(map2);

    expect(result.size).toBe(1);
    expect(result.get("b")).toBe(2);
  });
});
