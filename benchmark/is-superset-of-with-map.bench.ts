import { isSupersetOfWithMap } from "../index.ts";
import {
  benchmark,
  dataSizes,
  formatResults,
  generateTestData,
  type BenchmarkResult,
  type BenchmarkConfig,
} from "./utils.ts";

// Native superset check implementation for comparison
function nativeIsSupersetOf<K, V>(map1: Map<K, V>, map2: Map<K, V>): boolean {
  for (const [key, value] of map2) {
    if (!map1.has(key) || map1.get(key) !== value) {
      return false;
    }
  }
  return true;
}

export function run(): void {
  console.log("🔄 Running Is Superset Of With Map Benchmarks\n");

  for (const { name, size, iterations } of dataSizes) {
    console.log(`📊 Benchmarking isSupersetOfWithMap with ${name} dataset (${size} items, ${iterations} iterations):`);

    const testData = generateTestData(size);
    const { map1, map2, extMap1, extMap2 } = testData;

    const results: BenchmarkResult[] = [
      benchmark(
        "ExtendedMap.isSupersetOfWithMap (method)",
        () => {
          extMap1.isSupersetOfWithMap(extMap2);
        },
        iterations,
      ),
      benchmark(
        "isSupersetOfWithMap (function)",
        () => {
          isSupersetOfWithMap(extMap1, extMap2);
        },
        iterations,
      ),
      benchmark(
        "Native Map superset check",
        () => {
          nativeIsSupersetOf(map1, map2);
        },
        iterations,
      ),
    ];

    formatResults(results);
    console.log(`\n✅ Completed isSupersetOfWithMap benchmarks for ${name} dataset\n`);
  }
}