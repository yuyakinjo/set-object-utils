import { describe, expect, it } from "bun:test";
import { ExtendedMap, whereValue } from "../index";

describe("whereValue", () => {
  it("should filter map by value predicate", () => {
    const map = new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3],
      ["d", 2],
    ]);
    const result = whereValue(map, (value) => value > 1);

    expect(result.size).toBe(3);
    expect(result.get("b")).toBe(2);
    expect(result.get("c")).toBe(3);
    expect(result.get("d")).toBe(2);
    expect(result.has("a")).toBe(false);
  });

  it("should return empty map when no values match", () => {
    const map = new Map([
      ["a", 1],
      ["b", 2],
    ]);
    const result = whereValue(map, (value) => value > 10);

    expect(result.size).toBe(0);
  });

  it("should work with string values", () => {
    const map = new Map([
      ["a", "apple"],
      ["b", "banana"],
      ["c", "apricot"],
    ]);
    const result = whereValue(map, (value) => value.startsWith("a"));

    expect(result.size).toBe(2);
    expect(result.get("a")).toBe("apple");
    expect(result.get("c")).toBe("apricot");
  });

  it("should work with ExtendedMap class method", () => {
    const map = new ExtendedMap([
      ["low", 5],
      ["medium", 50],
      ["high", 500],
    ]);
    const result = map.whereValue((value) => value >= 50);

    expect(result.size).toBe(2);
    expect(result.get("medium")).toBe(50);
    expect(result.get("high")).toBe(500);
  });
});
