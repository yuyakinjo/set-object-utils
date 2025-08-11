import { describe, expect, test } from "bun:test";
import { ExtendedMap } from "../src/extended-map";

describe("ExtendedMap getAsserted method", () => {
  test("getAsserted returns value when key exists", () => {
    const map = new ExtendedMap<string, number>([
      ["a", 1],
      ["b", 2],
    ]);

    const key = "a";

    if (map.has(key)) {
      const value = map.getAsserted(key);
      expect(value).toBe(1);

      const shouldBeNumber: number = value;
      expect(shouldBeNumber).toBe(1);
    }
  });

  test("getAsserted throws when key does not exist", () => {
    const map = new ExtendedMap<string, string>([
      ["foo", "bar"],
      ["baz", "qux"],
    ]);

    expect(() => map.getAsserted("nonexistent")).toThrow('Key "nonexistent" does not exist in map');
  });

  test("getAsserted works with unknown keys", () => {
    const map = new ExtendedMap<string, string>([
      ["foo", "bar"],
      ["baz", "qux"],
    ]);

    const unknownKey: string = "foo";

    if (map.has(unknownKey)) {
      const value = map.getAsserted(unknownKey);
      const uppercased = value.toUpperCase();
      expect(uppercased).toBe("BAR");
    }
  });

  test("getAsserted works even with default values", () => {
    const map = new ExtendedMap<string, number>([["exists", 42]], { default: 0 });

    const key = "exists";

    if (map.has(key)) {
      const value = map.getAsserted(key);
      const doubled: number = value * 2;
      expect(doubled).toBe(84);
    }
  });
});
