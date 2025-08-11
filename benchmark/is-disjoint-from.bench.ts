import { isDisjointFrom } from "../index.ts";
import {
  type BenchmarkResult,
  benchmark,
  dataSizes,
  formatResults,
  generateTestData,
} from "./utils.ts";

// Native disjoint check implementation for comparison
function nativeIsDisjointFrom<K, V>(map1: Map<K, V>, map2: Map<K, V>): boolean {
  for (const [key, value] of map1) {
    if (map2.has(key) && map2.get(key) === value) {
      return false;
    }
  }
  return true;
}

export function run(): void {
  console.log("🔄 Running Is Disjoint From Benchmarks\n");

  for (const { name, size, iterations } of dataSizes) {
    console.log(
      `📊 Benchmarking isDisjointFrom with ${name} dataset (${size} items, ${iterations} iterations):`,
    );

    const testData = generateTestData(size);
    const { map1, map2, extMap1, extMap2 } = testData;

    const results: BenchmarkResult[] = [
      benchmark(
        "ExtendedMap.isDisjointFrom (method)",
        () => {
          extMap1.isDisjointFrom(extMap2);
        },
        iterations,
      ),
      benchmark(
        "isDisjointFrom (function)",
        () => {
          isDisjointFrom(extMap1, extMap2);
        },
        iterations,
      ),
      benchmark(
        "Native Map disjoint check",
        () => {
          nativeIsDisjointFrom(map1, map2);
        },
        iterations,
      ),
    ];

    formatResults(results);
    console.log(`\n✅ Completed isDisjointFrom benchmarks for ${name} dataset\n`);
  }
}
