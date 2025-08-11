// Re-export types

export { difference } from "./difference";
// Re-export ExtendedMap class
// Default export for convenience
export { ExtendedMap, ExtendedMap as default } from "./extended-map";
// Re-export standalone functions
export { intersection } from "./intersection";
export { isDisjointFrom } from "./is-disjoint-from";
export { isEmpty } from "./is-empty";
export { isSubsetOf } from "./is-subset-of";
export { isSupersetOf } from "./is-superset-of";
export { symmetricDifference } from "./symmetric-difference";
export { toObject } from "./to-object";
export type { ExtendedMapOptions, ObjectKey } from "./types";
export { union } from "./union";
export { whereKey } from "./where-key";
export { whereValue } from "./where-value";
