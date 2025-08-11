// Re-export types

export { difference } from "./src/difference";
// Re-export ExtendedMap class
// Default export for convenience
export { ExtendedMap, ExtendedMap as default } from "./src/extended-map";
// Re-export standalone functions
export { intersection } from "./src/intersection";
export { isDisjointFrom } from "./src/is-disjoint-from";
export { isEmpty } from "./src/is-empty";
export { isSubsetOf } from "./src/is-subset-of";
export { isSupersetOf } from "./src/is-superset-of";
export { symmetricDifference } from "./src/symmetric-difference";
export { toObject } from "./src/to-object";
export type { ExtendedMapOptions, ObjectKey } from "./src/types";
export { union } from "./src/union";
export { whereKey } from "./src/where-key";
export { whereValue } from "./src/where-value";
