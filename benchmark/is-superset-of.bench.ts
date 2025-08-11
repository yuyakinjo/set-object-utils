import { isSupersetOf } from "../index.ts";
import {
  type BenchmarkResult,
  benchmark,
  dataSizes,
  formatResults,
  generateTestData,
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
  console.log("🔄 Running Is Superset Of Benchmarks\n");

  for (const { name, size, iterations } of dataSizes) {
    console.log(
      `📊 Benchmarking isSupersetOf with ${name} dataset (${size} items, ${iterations} iterations):`,
    );

    const testData = generateTestData(size);
    const { map1, map2, extMap1, extMap2 } = testData;

    const results: BenchmarkResult[] = [
      benchmark(
        "ExtendedMap.isSupersetOf (method)",
        () => {
          extMap1.isSupersetOf(extMap2);
        },
        iterations,
      ),
      benchmark(
        "isSupersetOf (function)",
        () => {
          isSupersetOf(extMap1, extMap2);
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
    console.log(`\n✅ Completed isSupersetOf benchmarks for ${name} dataset\n`);
  }
}
