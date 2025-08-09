import { ExtendedMap } from "../index.ts";
import {
  type BenchmarkResult,
  benchmark,
  dataSizes,
  formatResults,
  generateTestData,
} from "./utils.ts";

export function run(): void {
  console.log("🔄 Running ExtendedMap Basic Operations Benchmarks\n");

  for (const { name, size, iterations } of dataSizes) {
    console.log(
      `📊 Benchmarking ExtendedMap basic operations with ${name} dataset (${size} items, ${iterations} iterations):`,
    );

    const testData = generateTestData(size);
    const { map1, extMap1 } = testData;

    // Basic Operations benchmarks
    console.log(`\n⚡ Basic Operations - ${name} (${size} items):`);
    const basicOperationResults: BenchmarkResult[] = [
      benchmark(
        "ExtendedMap.get (100 operations)",
        () => {
          for (let i = 0; i < Math.min(100, size); i++) {
            extMap1.get(`key${i}`);
          }
        },
        Math.max(100, iterations / 10),
      ),
      benchmark(
        "Native Map.get (100 operations)",
        () => {
          for (let i = 0; i < Math.min(100, size); i++) {
            map1.get(`key${i}`);
          }
        },
        Math.max(100, iterations / 10),
      ),
      benchmark(
        "ExtendedMap.set (100 operations)",
        () => {
          const tempMap = new ExtendedMap<string, number>();
          for (let i = 0; i < Math.min(100, size); i++) {
            tempMap.set(`temp${i}`, i);
          }
        },
        Math.max(100, iterations / 10),
      ),
      benchmark(
        "Native Map.set (100 operations)",
        () => {
          const tempMap = new Map<string, number>();
          for (let i = 0; i < Math.min(100, size); i++) {
            tempMap.set(`temp${i}`, i);
          }
        },
        Math.max(100, iterations / 10),
      ),
      benchmark(
        "ExtendedMap.has (100 operations)",
        () => {
          for (let i = 0; i < Math.min(100, size); i++) {
            extMap1.has(`key${i}`);
          }
        },
        Math.max(100, iterations / 10),
      ),
      benchmark(
        "Native Map.has (100 operations)",
        () => {
          for (let i = 0; i < Math.min(100, size); i++) {
            map1.has(`key${i}`);
          }
        },
        Math.max(100, iterations / 10),
      ),
    ];
    formatResults(basicOperationResults);

    // Construction Performance benchmarks
    console.log(`\n🏗️ Construction Performance - ${name} (${Math.min(1000, size)} items):`);
    const entries: [string, number][] = Array.from({ length: Math.min(1000, size) }, (_, i) => [
      `key${i}`,
      i,
    ]);

    const constructionResults: BenchmarkResult[] = [
      benchmark(
        "ExtendedMap construction from entries",
        () => {
          new ExtendedMap(entries);
        },
        Math.max(100, iterations / 5),
      ),
      benchmark(
        "Native Map construction from entries",
        () => {
          new Map(entries);
        },
        Math.max(100, iterations / 5),
      ),
      benchmark(
        "ExtendedMap construction from Map",
        () => {
          new ExtendedMap(map1);
        },
        Math.max(100, iterations / 5),
      ),
      benchmark(
        "ExtendedMap empty construction",
        () => {
          new ExtendedMap<string, number>();
        },
        Math.max(1000, iterations),
      ),
      benchmark(
        "Native Map empty construction",
        () => {
          new Map<string, number>();
        },
        Math.max(1000, iterations),
      ),
    ];
    formatResults(constructionResults);

    console.log(`\n✅ Completed ExtendedMap basic operations benchmarks for ${name} dataset\n`);
  }
}
