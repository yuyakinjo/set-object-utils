import { union } from "../index.ts";
import {
  type BenchmarkResult,
  benchmark,
  dataSizes,
  formatResults,
  generateTestData,
  nativeUnion,
} from "./utils.ts";

export function run(): void {
  console.log("🔄 Running Union Benchmarks\n");

  for (const { name, size, iterations } of dataSizes) {
    console.log(
      `📊 Benchmarking union with ${name} dataset (${size} items, ${iterations} iterations):`,
    );

    const testData = generateTestData(size);
    const { map1, map2, extMap1, extMap2 } = testData;

    const results: BenchmarkResult[] = [
      benchmark(
        "ExtendedMap.union (method)",
        () => {
          extMap1.union(extMap2);
        },
        iterations,
      ),
      benchmark(
        "union (function)",
        () => {
          union(extMap1, extMap2);
        },
        iterations,
      ),
      benchmark(
        "Native Map union",
        () => {
          nativeUnion(map1, map2);
        },
        iterations,
      ),
    ];

    formatResults(results);
    console.log(`\n✅ Completed union benchmarks for ${name} dataset\n`);
  }
}
