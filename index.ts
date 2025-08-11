// Re-export types

export { difference } from "./src/difference";
// Re-export ExtendedMap class
// Default export for convenience
export { ExtendedMap, ExtendedMap as default } from "./src/extended-map";
// Re-export standalone functions
export { intersectionWithMap } from "./src/intersection-with-map";
export { isDisjointFromWithMap } from "./src/is-disjoint-from-with-map";
export { isEmpty } from "./src/is-empty";
export { isSubsetOfWithMap } from "./src/is-subset-of-with-map";
export { isSupersetOfWithMap } from "./src/is-superset-of-with-map";
export { symmetricDifferenceWithMap } from "./src/symmetric-difference-with-map";
export { toObject } from "./src/to-object";
export type { ExtendedMapOptions, ObjectKey } from "./src/types";
export { unionWithMap } from "./src/union-with-map";
export { whereKey } from "./src/where-key";
export { whereValue } from "./src/where-value";
