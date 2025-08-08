import { differenceWithMap } from "../index.ts";
import {
  benchmark,
  dataSizes,
  formatResults,
  generateTestData,
  nativeDifference,
  type BenchmarkResult,
  type BenchmarkConfig,
} from "./utils.ts";

export function run(): void {
  console.log("🔄 Running Difference With Map Benchmarks\n");

  for (const { name, size, iterations } of dataSizes) {
    console.log(`📊 Benchmarking differenceWithMap with ${name} dataset (${size} items, ${iterations} iterations):`);

    const testData = generateTestData(size);
    const { map1, map2, extMap1, extMap2 } = testData;

    const results: BenchmarkResult[] = [
      benchmark(
        "ExtendedMap.differenceWithMap (method)",
        () => {
          extMap1.differenceWithMap(extMap2);
        },
        iterations,
      ),
      benchmark(
        "differenceWithMap (function)",
        () => {
          differenceWithMap(extMap1, extMap2);
        },
        iterations,
      ),
      benchmark(
        "Native Map difference",
        () => {
          nativeDifference(map1, map2);
        },
        iterations,
      ),
    ];

    formatResults(results);
    console.log(`\n✅ Completed differenceWithMap benchmarks for ${name} dataset\n`);
  }
}