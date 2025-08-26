# Set Operations

ExtendedMap provides mathematical set operations on Map objects. All operations compare both keys and values for exact matches.

## intersection(other: Map&lt;K, V&gt;): ExtendedMap&lt;K, V&gt;

Returns the intersection of two Maps. Contains only key-value pairs that exist in both Maps with the same values.

```
     Map A           Map B
   ┌─────────┐   ┌─────────┐
   │         │   │         │
   │    ┌────┼───┼────┐    │
   │    │****│***│****│    │
   │    │****│***│****│    │
   │    └────┼───┼────┘    │
   │         │   │         │
   └─────────┘   └─────────┘
        Result: *** (A ∩ B)
```

### Example

```typescript
const map1 = new ExtendedMap([['a', 1], ['b', 2], ['c', 3]]);
const map2 = new ExtendedMap([['b', 2], ['c', 4], ['d', 5]]);

const result = map1.intersection(map2);
// Result: Map { 'b' => 2 }
// Note: 'c' exists in both but has different values, so it's excluded
```

### Standalone Function

```typescript
import { intersection } from 'set-object-utils';

const map1 = new Map([['a', 1], ['b', 2]]);
const map2 = new Map([['b', 2], ['c', 3]]);
const result = intersection(map1, map2);
```

## union(other: Map&lt;K, V&gt;): ExtendedMap&lt;K, V&gt;

Returns the union of two Maps. For duplicate keys, values from the second Map overwrite the first.

```
     Map A           Map B
   ┌─────────┐   ┌─────────┐
   │*********│   │*********│
   │****┌────┼───┼────┐****│
   │****│****│***│****│****│
   │****│****│***│****│****│
   │****└────┼───┼────┘****│
   │*********│   │*********│
   └─────────┘   └─────────┘
     Result: ********* (A ∪ B)
```

### Example

```typescript
const map1 = new ExtendedMap([['a', 1], ['b', 2]]);
const map2 = new ExtendedMap([['b', 3], ['c', 4]]);

const result = map1.union(map2);
// Result: Map { 'a' => 1, 'b' => 3, 'c' => 4 }
// Note: 'b' value is overwritten by map2's value (3)
```

### Standalone Function

```typescript
import { union } from 'set-object-utils';

const result = union(map1, map2);
```

## difference(other: Map&lt;K, V&gt;): ExtendedMap&lt;K, V&gt;

Returns the difference of the first Map minus matching elements from the second Map.

```
     Map A           Map B
   ┌─────────┐   ┌─────────┐
   │*********│   │         │
   │****┌────┼───┼────┐    │
   │****│    │   │    │    │
   │****│    │   │    │    │
   │****└────┼───┼────┘    │
   │*********│   │         │
   └─────────┘   └─────────┘
     Result: **** (A - B)
```

### Example

```typescript
const map1 = new ExtendedMap([['a', 1], ['b', 2], ['c', 3]]);
const map2 = new ExtendedMap([['b', 2], ['c', 4]]);

const result = map1.difference(map2);
// Result: Map { 'a' => 1, 'c' => 3 }
// Note: 'b' is excluded due to exact match, 'c' remains due to different value
```

### Standalone Function

```typescript
import { difference } from 'set-object-utils';

const result = difference(map1, map2);
```

## symmetricDifference(other: Map&lt;K, V&gt;): ExtendedMap&lt;K, V&gt;

Returns the symmetric difference of two Maps. Contains elements that exist in either Map but not both.

```
     Map A           Map B
   ┌─────────┐   ┌─────────┐
   │*********│   │*********│
   │****┌────┼───┼────┐****│
   │****│    │   │    │****│
   │****│    │   │    │****│
   │****└────┼───┼────┘****│
   │*********│   │*********│
   └─────────┘   └─────────┘
     Result: ******** (A △ B)
```

### Example

```typescript
const map1 = new ExtendedMap([['a', 1], ['b', 2]]);
const map2 = new ExtendedMap([['b', 2], ['c', 3]]);

const result = map1.symmetricDifference(map2);
// Result: Map { 'a' => 1, 'c' => 3 }
// Note: 'b' is excluded as it exists in both with the same value
```

### Standalone Function

```typescript
import { symmetricDifference } from 'set-object-utils';

const result = symmetricDifference(map1, map2);
```

## Subset and Superset Operations

### isSubsetOf(other: Map&lt;K, V&gt;): boolean

Determines whether the current Map is a subset of the specified Map.

```
     Map A           Map B
   ┌─────────┐   ┌─────────┐
   │         │   │*********│
   │    ┌────┼───┼────┐****│
   │    │****│***│****│****│
   │    │****│***│****│****│
   │    └────┼───┼────┘****│
   │         │   │*********│
   └─────────┘   └─────────┘
     A ⊆ B: true (A is subset of B)
```

### Example

```typescript
const map1 = new ExtendedMap([['a', 1], ['b', 2]]);
const map2 = new ExtendedMap([['a', 1], ['b', 2], ['c', 3]]);

console.log(map1.isSubsetOf(map2));  // true
console.log(map2.isSubsetOf(map1));  // false
```

### isSupersetOf(other: Map&lt;K, V&gt;): boolean

Determines whether the current Map is a superset of the specified Map.

```
     Map A           Map B
   ┌─────────┐   ┌─────────┐
   │*********│   │         │
   │****┌────┼───┼────┐    │
   │****│****│***│****│    │
   │****│****│***│****│    │
   │****└────┼───┼────┘    │
   │*********│   │         │
   └─────────┘   └─────────┘
     A ⊇ B: true (A is superset of B)
```

### Example

```typescript
const map1 = new ExtendedMap([['a', 1], ['b', 2], ['c', 3]]);
const map2 = new ExtendedMap([['a', 1], ['b', 2]]);

console.log(map1.isSupersetOf(map2));  // true
console.log(map2.isSupersetOf(map1));  // false
```

### Standalone Functions

```typescript
import { isSubsetOf, isSupersetOf } from 'set-object-utils';

const isSubset = isSubsetOf(map1, map2);
const isSuperset = isSupersetOf(map1, map2);
```

## isDisjointFrom(other: Map&lt;K, V&gt;): boolean

Determines whether two Maps are disjoint (have no common elements).

```
     Map A           Map B
   ┌─────────┐   ┌─────────┐
   │*********│   │         │
   │*********│   │         │
   │*********│   │*********│
   │*********│   │*********│
   │*********│   │*********│
   │*********│   │*********│
   └─────────┘   └─────────┘
     A ∩ B = ∅ (Disjoint: true)
```

### Example

```typescript
const map1 = new ExtendedMap([['a', 1], ['b', 2]]);
const map2 = new ExtendedMap([['c', 3], ['d', 4]]);
const map3 = new ExtendedMap([['a', 1], ['e', 5]]);

console.log(map1.isDisjointFrom(map2));  // true (no common elements)
console.log(map1.isDisjointFrom(map3));  // false ('a' => 1 is common)
```

### Standalone Function

```typescript
import { isDisjointFrom } from 'set-object-utils';

const isDisjoint = isDisjointFrom(map1, map2);
```
