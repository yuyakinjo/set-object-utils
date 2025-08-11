import { isSubsetOf } from "../index.ts";
import {
  type BenchmarkResult,
  benchmark,
  dataSizes,
  formatResults,
  generateTestData,
} from "./utils.ts";

// Native subset check implementation for comparison
function nativeIsSubsetOf<K, V>(map1: Map<K, V>, map2: Map<K, V>): boolean {
  for (const [key, value] of map1) {
    if (!map2.has(key) || map2.get(key) !== value) {
      return false;
    }
  }
  return true;
}

export function run(): void {
  console.log("🔄 Running Is Subset Of Benchmarks\n");

  for (const { name, size, iterations } of dataSizes) {
    console.log(
      `📊 Benchmarking isSubsetOf with ${name} dataset (${size} items, ${iterations} iterations):`,
    );

    const testData = generateTestData(size);
    const { map1, map2, extMap1, extMap2 } = testData;

    const results: BenchmarkResult[] = [
      benchmark(
        "ExtendedMap.isSubsetOf (method)",
        () => {
          extMap1.isSubsetOf(extMap2);
        },
        iterations,
      ),
      benchmark(
        "isSubsetOf (function)",
        () => {
          isSubsetOf(extMap1, extMap2);
        },
        iterations,
      ),
      benchmark(
        "Native Map subset check",
        () => {
          nativeIsSubsetOf(map1, map2);
        },
        iterations,
      ),
    ];

    formatResults(results);
    console.log(`\n✅ Completed isSubsetOf benchmarks for ${name} dataset\n`);
  }
}
