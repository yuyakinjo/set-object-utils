import { whereKey } from "../index.ts";
import {
  benchmark,
  dataSizes,
  formatResults,
  generateTestData,
  nativeWhereKey,
  type BenchmarkResult,
  type BenchmarkConfig,
} from "./utils.ts";

export function run(): void {
  console.log("🔄 Running Where Key Benchmarks\n");

  for (const { name, size, iterations } of dataSizes) {
    console.log(`📊 Benchmarking whereKey with ${name} dataset (${size} items, ${iterations} iterations):`);

    const testData = generateTestData(size);
    const { map1, extMap1 } = testData;
    
    // Test predicate that filters keys containing "1"
    const keyPredicate = (key: string) => key.includes("1");

    const results: BenchmarkResult[] = [
      benchmark(
        "ExtendedMap.whereKey (method)",
        () => {
          extMap1.whereKey(keyPredicate);
        },
        iterations,
      ),
      benchmark(
        "whereKey (function)",
        () => {
          whereKey(extMap1, keyPredicate);
        },
        iterations,
      ),
      benchmark(
        "Native Map whereKey equivalent",
        () => {
          nativeWhereKey(map1, keyPredicate);
        },
        iterations,
      ),
    ];

    formatResults(results);
    console.log(`\n✅ Completed whereKey benchmarks for ${name} dataset\n`);
  }
}