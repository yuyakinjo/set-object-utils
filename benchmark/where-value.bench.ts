import { whereValue } from "../index.ts";
import {
  benchmark,
  dataSizes,
  formatResults,
  generateTestData,
  nativeWhereValue,
  type BenchmarkResult,
  type BenchmarkConfig,
} from "./utils.ts";

export function run(): void {
  console.log("🔄 Running Where Value Benchmarks\n");

  for (const { name, size, iterations } of dataSizes) {
    console.log(`📊 Benchmarking whereValue with ${name} dataset (${size} items, ${iterations} iterations):`);

    const testData = generateTestData(size);
    const { map1, extMap1 } = testData;
    
    // Test predicate that filters even values
    const valuePredicate = (value: number) => value % 2 === 0;

    const results: BenchmarkResult[] = [
      benchmark(
        "ExtendedMap.whereValue (method)",
        () => {
          extMap1.whereValue(valuePredicate);
        },
        iterations,
      ),
      benchmark(
        "whereValue (function)",
        () => {
          whereValue(extMap1, valuePredicate);
        },
        iterations,
      ),
      benchmark(
        "Native Map whereValue equivalent",
        () => {
          nativeWhereValue(map1, valuePredicate);
        },
        iterations,
      ),
    ];

    formatResults(results);
    console.log(`\n✅ Completed whereValue benchmarks for ${name} dataset\n`);
  }
}