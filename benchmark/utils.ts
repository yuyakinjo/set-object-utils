import { ExtendedMap } from "../index.ts";

// Simple benchmark function using Bun's performance API
export function benchmark(
  name: string,
  fn: () => void,
  iterations: number = 1000,
): { name: string; avgTime: number; totalTime: number; opsPerSec: number } {
  // Warm up
  for (let i = 0; i < Math.min(10, iterations); i++) {
    fn();
  }

  const start = Bun.nanoseconds();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = Bun.nanoseconds();

  const totalTime = (end - start) / 1_000_000; // Convert to milliseconds
  const avgTime = totalTime / iterations;
  const opsPerSec = 1000 / avgTime;

  return { name, avgTime, totalTime, opsPerSec };
}

// Test data generators
export function generateTestData(size: number): {
  map1: Map<string, number>;
  map2: Map<string, number>;
  extMap1: ExtendedMap<string, number>;
  extMap2: ExtendedMap<string, number>;
} {
  const map1 = new Map<string, number>();
  const map2 = new Map<string, number>();

  // Create overlapping data sets for meaningful set operations
  for (let i = 0; i < size; i++) {
    map1.set(`key${i}`, i);
    if (i < size * 0.7) {
      // 70% overlap
      map2.set(`key${i}`, i);
    }
    if (i >= size * 0.5) {
      // Additional unique keys in map2
      map2.set(`unique${i}`, i + size);
    }
  }

  const extMap1 = new ExtendedMap(map1);
  const extMap2 = new ExtendedMap(map2);

  return { map1, map2, extMap1, extMap2 };
}

// Native Map implementations for comparison
export function nativeIntersection<K, V>(map1: Map<K, V>, map2: Map<K, V>): Map<K, V> {
  const result = new Map<K, V>();
  for (const [key, value] of map1) {
    if (map2.has(key) && map2.get(key) === value) {
      result.set(key, value);
    }
  }
  return result;
}

export function nativeUnion<K, V>(map1: Map<K, V>, map2: Map<K, V>): Map<K, V> {
  const result = new Map(map1);
  for (const [key, value] of map2) {
    result.set(key, value);
  }
  return result;
}

export function nativeDifference<K, V>(map1: Map<K, V>, map2: Map<K, V>): Map<K, V> {
  const result = new Map<K, V>();
  for (const [key, value] of map1) {
    if (!map2.has(key) || map2.get(key) !== value) {
      result.set(key, value);
    }
  }
  return result;
}

export function nativeWhereKey<K, V>(map: Map<K, V>, predicate: (key: K) => boolean): Map<K, V> {
  const result = new Map<K, V>();
  for (const [key, value] of map) {
    if (predicate(key)) {
      result.set(key, value);
    }
  }
  return result;
}

export function nativeWhereValue<K, V>(map: Map<K, V>, predicate: (value: V) => boolean): Map<K, V> {
  const result = new Map<K, V>();
  for (const [key, value] of map) {
    if (predicate(value)) {
      result.set(key, value);
    }
  }
  return result;
}

export function nativeToObject<K extends string | number | symbol, V>(map: Map<K, V>): Record<K, V> {
  const obj = {} as Record<K, V>;
  for (const [key, value] of map) {
    obj[key] = value;
  }
  return obj;
}

// Function to format benchmark results nicely
export function formatResults(
  results: Array<{ name: string; avgTime: number; totalTime: number; opsPerSec: number }>,
): void {
  console.log(
    "\n┌─────────────────────────────────────────────────────┬───────────────┬─────────────────┬─────────────────┐",
  );
  console.log(
    "│ Operation                                           │ Avg Time (ms) │ Total Time (ms) │ Ops/sec         │",
  );
  console.log(
    "├─────────────────────────────────────────────────────┼───────────────┼─────────────────┼─────────────────┤",
  );

  results.forEach((result) => {
    const name = result.name.padEnd(51);
    const avgTime = result.avgTime.toFixed(4).padStart(13);
    const totalTime = result.totalTime.toFixed(2).padStart(15);
    const opsPerSec = Math.round(result.opsPerSec).toLocaleString().padStart(15);
    console.log(`│ ${name} │ ${avgTime} │ ${totalTime} │ ${opsPerSec} │`);
  });

  console.log(
    "└─────────────────────────────────────────────────────┴───────────────┴─────────────────┴─────────────────┘",
  );
}

// Benchmark configurations
export const dataSizes = [
  { name: "small", size: 10, iterations: 10000 },
  { name: "medium", size: 1000, iterations: 1000 },
  { name: "large", size: 100000, iterations: 100 },
];

// Export types for consistency
export interface BenchmarkConfig {
  name: string;
  size: number;
  iterations: number;
}

export interface BenchmarkResult {
  name: string;
  avgTime: number;
  totalTime: number;
  opsPerSec: number;
}

export interface TestData {
  map1: Map<string, number>;
  map2: Map<string, number>;
  extMap1: ExtendedMap<string, number>;
  extMap2: ExtendedMap<string, number>;
}