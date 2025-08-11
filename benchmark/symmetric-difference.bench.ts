import { symmetricDifference } from "../index.ts";
import {
  type BenchmarkResult,
  benchmark,
  dataSizes,
  formatResults,
  generateTestData,
} from "./utils.ts";

// Native symmetric difference implementation for comparison
function nativeSymmetricDifference<K, V>(map1: Map<K, V>, map2: Map<K, V>): Map<K, V> {
  const result = new Map<K, V>();

  // Add items from map1 that are not in map2 or have different values
  for (const [key, value] of map1) {
    if (!map2.has(key) || map2.get(key) !== value) {
      result.set(key, value);
    }
  }

  // Add items from map2 that are not in map1 or have different values
  for (const [key, value] of map2) {
    if (!map1.has(key) || map1.get(key) !== value) {
      result.set(key, value);
    }
  }

  return result;
}

export function run(): void {
  console.log("🔄 Running Symmetric Difference Benchmarks\n");

  for (const { name, size, iterations } of dataSizes) {
    console.log(
      `📊 Benchmarking symmetricDifference with ${name} dataset (${size} items, ${iterations} iterations):`,
    );

    const testData = generateTestData(size);
    const { map1, map2, extMap1, extMap2 } = testData;

    const results: BenchmarkResult[] = [
      benchmark(
        "ExtendedMap.symmetricDifference (method)",
        () => {
          extMap1.symmetricDifference(extMap2);
        },
        iterations,
      ),
      benchmark(
        "symmetricDifference (function)",
        () => {
          symmetricDifference(extMap1, extMap2);
        },
        iterations,
      ),
      benchmark(
        "Native Map symmetric difference",
        () => {
          nativeSymmetricDifference(map1, map2);
        },
        iterations,
      ),
    ];

    formatResults(results);
    console.log(`\n✅ Completed symmetricDifference benchmarks for ${name} dataset\n`);
  }
}
