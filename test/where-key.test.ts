import { describe, expect, it } from "bun:test";
import { ExtendedMap, whereKey } from "../index";

describe("whereKey", () => {
  it("should filter map by key predicate", () => {
    const map = new Map([
      ["apple", 1],
      ["banana", 2],
      ["apricot", 3],
    ]);
    const result = whereKey(map, (key) => key.startsWith("a"));

    expect(result.size).toBe(2);
    expect(result.get("apple")).toBe(1);
    expect(result.get("apricot")).toBe(3);
    expect(result.has("banana")).toBe(false);
  });

  it("should return empty map when no keys match", () => {
    const map = new Map([
      ["x", 1],
      ["y", 2],
    ]);
    const result = whereKey(map, (key) => key.startsWith("z"));

    expect(result.size).toBe(0);
  });

  it("should work with number keys", () => {
    const map = new Map([
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ]);
    const result = whereKey(map, (key) => key > 1);

    expect(result.size).toBe(2);
    expect(result.get(2)).toBe("b");
    expect(result.get(3)).toBe("c");
  });

  it("should work with ExtendedMap class method", () => {
    const map = new ExtendedMap([
      ["test1", 1],
      ["prod1", 2],
      ["test2", 3],
    ]);
    const result = map.whereKey((key) => key.includes("test"));

    expect(result.size).toBe(2);
    expect(result.get("test1")).toBe(1);
    expect(result.get("test2")).toBe(3);
  });
});
