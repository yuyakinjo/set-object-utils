import { describe, expect, test } from "bun:test";
import { ExtendedMap } from "../src/extended-map";
import { tryGet } from "../src/try-get";

describe("ExtendedMap tryGet method", () => {
  test("returns [true, value] when key exists", () => {
    const map = new ExtendedMap<string, number>([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);

    const result = map.tryGet("b");

    if (result[0]) {
      // TypeScript knows result[1] is number here
      const value: number = result[1];
      expect(value).toBe(2);
    } else {
      throw new Error("Should have found the key");
    }
  });

  test("returns [false, undefined] when key does not exist", () => {
    const map = new ExtendedMap<string, string>([
      ["foo", "bar"],
      ["baz", "qux"],
    ]);

    const result = map.tryGet("nonexistent");

    expect(result[0]).toBe(false);
    expect(result[1]).toBeUndefined();
  });

  test("works with default values", () => {
    const map = new ExtendedMap<string, number>([["exists", 42]], { default: 0 });

    // Existing key
    const result1 = map.tryGet("exists");
    expect(result1[0]).toBe(true);
    if (result1[0]) {
      expect(result1[1]).toBe(42);
    }

    // Non-existing key - tryGet doesn't use default value
    const result2 = map.tryGet("nothere");
    expect(result2[0]).toBe(false);
    expect(result2[1]).toBeUndefined();
  });

  test("type safety with tryGet", () => {
    const map = new ExtendedMap<string, { id: number; name: string }>([
      ["user1", { id: 1, name: "Alice" }],
      ["user2", { id: 2, name: "Bob" }],
    ]);

    const result = map.tryGet("user1");

    if (result[0]) {
      // TypeScript knows result[1] is the object type
      const user = result[1];
      expect(user.id).toBe(1);
      expect(user.name).toBe("Alice");

      // Can access properties without type errors
      const uppercaseName = user.name.toUpperCase();
      expect(uppercaseName).toBe("ALICE");
    }
  });

  test("destructuring pattern", () => {
    const map = new ExtendedMap([["key", "value"]]);

    const [found, value] = map.tryGet("key");

    if (found) {
      // value is typed as string here
      expect(value).toBe("value");
      const upper: string = value.toUpperCase();
      expect(upper).toBe("VALUE");
    }
  });

  describe("tryGet with fallback value", () => {
    test("returns value when key exists", () => {
      const map = new ExtendedMap<string, number>([
        ["a", 1],
        ["b", 2],
        ["c", 3],
      ]);

      const result = map.tryGet("b", 999);
      expect(result).toBe(2);
    });

    test("returns fallback when key does not exist", () => {
      const map = new ExtendedMap<string, string>([
        ["foo", "bar"],
        ["baz", "qux"],
      ]);

      const result = map.tryGet("nonexistent", "default");
      expect(result).toBe("default");
    });

    test("works with complex types", () => {
      const map = new ExtendedMap<string, { id: number; name: string }>([
        ["user1", { id: 1, name: "Alice" }],
      ]);

      const fallback = { id: 0, name: "Unknown" };
      const result = map.tryGet("user2", fallback);
      expect(result).toBe(fallback);
      expect(result.id).toBe(0);
      expect(result.name).toBe("Unknown");
    });

    test("works with null and undefined values", () => {
      const map = new ExtendedMap<string, string | null>([
        ["nullValue", null],
        ["emptyString", ""],
      ]);

      // Existing null value should be returned
      expect(map.tryGet("nullValue", "fallback")).toBeNull();

      // Existing empty string should be returned
      expect(map.tryGet("emptyString", "fallback")).toBe("");

      // Non-existing key should return fallback
      expect(map.tryGet("missing", "fallback")).toBe("fallback");
    });

    test("respects default values from ExtendedMap constructor", () => {
      const map = new ExtendedMap<string, number>([["exists", 42]], { default: 0 });

      // tryGet with fallback ignores the map's default value
      expect(map.tryGet("missing", 999)).toBe(999);

      // But regular get still uses the default
      expect(map.get("missing")).toBe(0);
    });
  });
});

describe("tryGet standalone function", () => {
  test("returns value when key exists", () => {
    const map = new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);

    const result = tryGet(map, "b", 999);
    expect(result).toBe(2);
  });

  test("returns fallback when key does not exist", () => {
    const map = new Map([
      ["foo", "bar"],
      ["baz", "qux"],
    ]);

    const result = tryGet(map, "nonexistent", "default");
    expect(result).toBe("default");
  });

  test("works with regular Map instances", () => {
    const map = new Map<string, boolean>([
      ["enabled", true],
      ["disabled", false],
    ]);

    expect(tryGet(map, "enabled", false)).toBe(true);
    expect(tryGet(map, "disabled", true)).toBe(false);
    expect(tryGet(map, "missing", true)).toBe(true);
  });

  test("works with ExtendedMap instances", () => {
    const map = new ExtendedMap<string, number>([["key", 42]]);

    expect(tryGet(map, "key", 0)).toBe(42);
    expect(tryGet(map, "missing", 0)).toBe(0);
  });
});
