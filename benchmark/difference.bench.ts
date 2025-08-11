import { difference } from "../index.ts";
import {
  type BenchmarkResult,
  benchmark,
  dataSizes,
  formatResults,
  generateTestData,
  nativeDifference,
} from "./utils.ts";

export function run(): void {
  console.log("🔄 Running Difference Benchmarks\n");

  for (const { name, size, iterations } of dataSizes) {
    console.log(
      `📊 Benchmarking difference with ${name} dataset (${size} items, ${iterations} iterations):`,
    );

    const testData = generateTestData(size);
    const { map1, map2, extMap1, extMap2 } = testData;

    const results: BenchmarkResult[] = [
      benchmark(
        "ExtendedMap.difference (method)",
        () => {
          extMap1.difference(extMap2);
        },
        iterations,
      ),
      benchmark(
        "difference (function)",
        () => {
          difference(extMap1, extMap2);
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
    console.log(`\n✅ Completed difference benchmarks for ${name} dataset\n`);
  }
}
