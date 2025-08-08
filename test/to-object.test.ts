import { describe, expect, it } from "bun:test";
import { ExtendedMap, toObject } from "../index";

describe("toObject", () => {
  it("should convert Map to plain object", () => {
    const map = new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
    const result = toObject(map);

    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("should handle empty map", () => {
    const map = new Map<string, number>();
    const result = toObject(map);

    expect(result).toEqual({});
  });

  it("should work with number keys", () => {
    const map = new Map([
      [1, "a"],
      [2, "b"],
    ]);
    const result = toObject(map);

    expect(result).toEqual({ 1: "a", 2: "b" });
  });

  it("should work with ExtendedMap class method", () => {
    const map = new ExtendedMap([
      ["x", 10],
      ["y", 20],
    ]);
    const result = map.toObject();

    expect(result).toEqual({ x: 10, y: 20 });
  });
});
