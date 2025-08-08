import { unionWithMap } from "../index.ts";
import {
  benchmark,
  dataSizes,
  formatResults,
  generateTestData,
  nativeUnion,
  type BenchmarkResult,
  type BenchmarkConfig,
} from "./utils.ts";

export function run(): void {
  console.log("🔄 Running Union With Map Benchmarks\n");

  for (const { name, size, iterations } of dataSizes) {
    console.log(`📊 Benchmarking unionWithMap with ${name} dataset (${size} items, ${iterations} iterations):`);

    const testData = generateTestData(size);
    const { map1, map2, extMap1, extMap2 } = testData;

    const results: BenchmarkResult[] = [
      benchmark(
        "ExtendedMap.unionWithMap (method)",
        () => {
          extMap1.unionWithMap(extMap2);
        },
        iterations,
      ),
      benchmark(
        "unionWithMap (function)",
        () => {
          unionWithMap(extMap1, extMap2);
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
    console.log(`\n✅ Completed unionWithMap benchmarks for ${name} dataset\n`);
  }
}