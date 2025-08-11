// Re-export types

export { differenceWithMap } from "./difference-with-map";
// Re-export ExtendedMap class
// Default export for convenience
export { ExtendedMap, ExtendedMap as default } from "./extended-map";
// Re-export standalone functions
export { intersectionWithMap } from "./intersection-with-map";
export { isDisjointFromWithMap } from "./is-disjoint-from-with-map";
export { isEmpty } from "./is-empty";
export { isSubsetOfWithMap } from "./is-subset-of-with-map";
export { isSupersetOfWithMap } from "./is-superset-of-with-map";
export { symmetricDifferenceWithMap } from "./symmetric-difference-with-map";
export { toObject } from "./to-object";
export type { ExtendedMapOptions, ObjectKey } from "./types";
export { unionWithMap } from "./union-with-map";
export { whereKey } from "./where-key";
export { whereValue } from "./where-value";
