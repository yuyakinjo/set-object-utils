import { intersectionWithMap } from "../index.ts";
import {
  type BenchmarkResult,
  benchmark,
  dataSizes,
  formatResults,
  generateTestData,
  nativeIntersection,
} from "./utils.ts";

export function run(): void {
  console.log("🔄 Running Intersection With Map Benchmarks\n");

  for (const { name, size, iterations } of dataSizes) {
    console.log(
      `📊 Benchmarking intersectionWithMap with ${name} dataset (${size} items, ${iterations} iterations):`,
    );

    const testData = generateTestData(size);
    const { map1, map2, extMap1, extMap2 } = testData;

    const results: BenchmarkResult[] = [
      benchmark(
        "ExtendedMap.intersectionWithMap (method)",
        () => {
          extMap1.intersectionWithMap(extMap2);
        },
        iterations,
      ),
      benchmark(
        "intersectionWithMap (function)",
        () => {
          intersectionWithMap(extMap1, extMap2);
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
    console.log(`\n✅ Completed intersectionWithMap benchmarks for ${name} dataset\n`);
  }
}
