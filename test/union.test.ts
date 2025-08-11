import { describe, expect, it } from "bun:test";
import { ExtendedMap, union } from "../index";

describe("union", () => {
  it("should combine two maps, with map2 values overriding map1", () => {
    const map1 = new Map([
      ["a", 1],
      ["b", 2],
    ]);
    const map2 = new Map([
      ["b", 3],
      ["c", 4],
    ]);
    const result = union(map1, map2);

    expect(result.size).toBe(3);
    expect(result.get("a")).toBe(1);
    expect(result.get("b")).toBe(3); // map2 overrides map1
    expect(result.get("c")).toBe(4);
  });

  it("should handle empty maps", () => {
    const map1 = new Map([["a", 1]]);
    const map2 = new Map<string, number>();
    const result = union(map1, map2);

    expect(result.size).toBe(1);
    expect(result.get("a")).toBe(1);
  });

  it("should work with ExtendedMap class method", () => {
    const map1 = new ExtendedMap([["a", 1]]);
    const map2 = new Map([["b", 2]]);
    const result = map1.union(map2);

    expect(result.size).toBe(2);
    expect(result.get("a")).toBe(1);
    expect(result.get("b")).toBe(2);
  });
});
