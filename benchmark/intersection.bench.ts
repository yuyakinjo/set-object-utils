import { intersection } from "../index.ts";
import {
  type BenchmarkResult,
  benchmark,
  dataSizes,
  formatResults,
  generateTestData,
  nativeIntersection,
} from "./utils.ts";

export function run(): void {
  console.log("🔄 Running Intersection Benchmarks\n");

  for (const { name, size, iterations } of dataSizes) {
    console.log(
      `📊 Benchmarking intersection with ${name} dataset (${size} items, ${iterations} iterations):`,
    );

    const testData = generateTestData(size);
    const { map1, map2, extMap1, extMap2 } = testData;

    const results: BenchmarkResult[] = [
      benchmark(
        "ExtendedMap.intersection (method)",
        () => {
          extMap1.intersection(extMap2);
        },
        iterations,
      ),
      benchmark(
        "intersection (function)",
        () => {
          intersection(extMap1, extMap2);
        },
        iterations,
      ),
      benchmark(
        "Native Map intersection",
        () => {
          nativeIntersection(map1, map2);
        },
        iterations,
      ),
    ];

    formatResults(results);
    console.log(`\n✅ Completed intersection benchmarks for ${name} dataset\n`);
  }
}
