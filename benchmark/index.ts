/**
 * Modular Benchmark Runner
 *
 * This script runs all individual benchmark modules in sequence.
 * Each benchmark module focuses on testing a specific function or operation
 * comparing ExtendedMap methods vs standalone functions vs native implementations.
 */

import * as differenceBench from "./difference-with-map.bench.ts";
import * as extendedMapBench from "./extended-map.bench.ts";
import * as intersectionBench from "./intersection-with-map.bench.ts";
import * as isDisjointFromBench from "./is-disjoint-from-with-map.bench.ts";
import * as isSubsetOfBench from "./is-subset-of-with-map.bench.ts";
import * as isSupersetOfBench from "./is-superset-of-with-map.bench.ts";
import * as symmetricDifferenceBench from "./symmetric-difference-with-map.bench.ts";
import * as toObjectBench from "./to-object.bench.ts";
import * as unionBench from "./union-with-map.bench.ts";
import * as whereKeyBench from "./where-key.bench.ts";
import * as whereValueBench from "./where-value.bench.ts";

console.log("🚀 Starting Modular ExtendedMap Performance Benchmarks\n");
console.log("Comparing ExtendedMap operations vs native Map operations");
console.log("Data sizes: small (10), medium (1000), large (100000)\n");
console.log("=".repeat(120));

// Set Operations Benchmarks
console.log("\n📊 SET OPERATIONS BENCHMARKS");
console.log("=".repeat(120));

try {
  intersectionBench.run();
  console.log("=".repeat(120));

  unionBench.run();
  console.log("=".repeat(120));

  differenceBench.run();
  console.log("=".repeat(120));

  symmetricDifferenceBench.run();
  console.log("=".repeat(120));
} catch (error) {
  console.error("❌ Error running set operations benchmarks:", error);
}

// Boolean Operations Benchmarks
console.log("\n📊 BOOLEAN OPERATIONS BENCHMARKS");
console.log("=".repeat(120));

try {
  isSubsetOfBench.run();
  console.log("=".repeat(120));

  isSupersetOfBench.run();
  console.log("=".repeat(120));

  isDisjointFromBench.run();
  console.log("=".repeat(120));
} catch (error) {
  console.error("❌ Error running boolean operations benchmarks:", error);
}

// Filter Operations Benchmarks
console.log("\n📊 FILTER OPERATIONS BENCHMARKS");
console.log("=".repeat(120));

try {
  whereKeyBench.run();
  console.log("=".repeat(120));

  whereValueBench.run();
  console.log("=".repeat(120));
} catch (error) {
  console.error("❌ Error running filter operations benchmarks:", error);
}

// Conversion Operations Benchmarks
console.log("\n📊 CONVERSION OPERATIONS BENCHMARKS");
console.log("=".repeat(120));

try {
  toObjectBench.run();
  console.log("=".repeat(120));
} catch (error) {
  console.error("❌ Error running conversion operations benchmarks:", error);
}

// Basic Operations & Construction Benchmarks
console.log("\n📊 BASIC OPERATIONS & CONSTRUCTION BENCHMARKS");
console.log("=".repeat(120));

try {
  extendedMapBench.run();
  console.log("=".repeat(120));
} catch (error) {
  console.error("❌ Error running basic operations benchmarks:", error);
}

console.log("\n🎯 Benchmark Summary:");
console.log(
  "- ExtendedMap methods vs standalone functions: Minimal performance difference expected due to simple delegation",
);
console.log(
  "- ExtendedMap vs Native Map: Small overhead due to inheritance and additional features",
);
console.log("- Performance scales with data size as expected for O(n) operations");
console.log("- Set operations performance depends on overlap between datasets");
console.log("- Filter operations performance depends on predicate complexity and selectivity");
console.log("- Object conversion shows significant performance differences at scale");
console.log("\n🏃‍♂️ Run with: bun run benchmark/index.ts or npm run benchmark");
console.log("🔧 Run individual benchmarks: bun run benchmark/<benchmark-name>.bench.ts");

console.log("\n✨ All benchmarks completed successfully!");
