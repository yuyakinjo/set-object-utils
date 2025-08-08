import { toObject } from "../index.ts";
import {
  benchmark,
  dataSizes,
  formatResults,
  generateTestData,
  nativeToObject,
  type BenchmarkResult,
  type BenchmarkConfig,
} from "./utils.ts";

export function run(): void {
  console.log("🔄 Running To Object Benchmarks\n");

  for (const { name, size, iterations } of dataSizes) {
    // Skip large dataset to avoid memory issues
    if (size > 1000) {
      console.log(`⏭️ Skipping toObject benchmark for ${name} dataset (${size} items) to avoid memory issues\n`);
      continue;
    }

    console.log(`📊 Benchmarking toObject with ${name} dataset (${size} items, ${iterations} iterations):`);

    const testData = generateTestData(size);
    const { map1, extMap1 } = testData;

    const results: BenchmarkResult[] = [
      benchmark(
        "ExtendedMap.toObject (method)",
        () => {
          extMap1.toObject();
        },
        iterations,
      ),
      benchmark(
        "toObject (function)",
        () => {
          toObject(extMap1);
        },
        iterations,
      ),
      benchmark(
        "Native Map toObject equivalent",
        () => {
          nativeToObject(map1);
        },
        iterations,
      ),
      benchmark(
        "Object.fromEntries",
        () => {
          Object.fromEntries(map1);
        },
        iterations,
      ),
    ];

    formatResults(results);
    console.log(`\n✅ Completed toObject benchmarks for ${name} dataset\n`);
  }
}