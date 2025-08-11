# ExtendedMap - Set Operations for JavaScript Map

![Build](https://github.com/yuyakinjo/set-object-utils/workflows/Build/badge.svg)
![Lint](https://github.com/yuyakinjo/set-object-utils/workflows/Lint/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)
![Bun](https://img.shields.io/badge/Bun-Compatible-orange.svg)

A TypeScript-implemented extension library that adds Set-like operations to Map objects. Provides high-performance set operations with a tree-shakeable design while avoiding circular dependencies.

## Features

- 🚀 **High Performance**: Extends native Map while maintaining performance
- 🎯 **Type Safe**: Strict type definitions with TypeScript
- 🌳 **Tree-shakeable**: Import only the features you need
- 🔧 **Flexible Usage**: Supports both class inheritance and standalone functions
- ⚡ **Bun Compatible**: Optimized for Bun runtime
- 🧪 **Fully Tested**: Comprehensive tests for all features

## Installation

```bash
# npm
npm install set-object-utils
```

## Usage

### Basic Usage

```typescript
import { ExtendedMap } from 'set-object-utils';

// Create an ExtendedMap
const map1 = new ExtendedMap([
  ['a', 1],
  ['b', 2],
  ['c', 3]
]);

const map2 = new ExtendedMap([
  ['b', 2],
  ['c', 3],
  ['d', 4]
]);

// Execute Set operations
const intersection = map1.intersection(map2);
console.log(intersection); // Map { 'b' => 2, 'c' => 3 }
```

### Using as Standalone Functions

```typescript
import { intersection } from 'set-object-utils';

const map1 = new Map([['a', 1], ['b', 2]]);
const map2 = new Map([['b', 2], ['c', 3]]);

const result = intersection(map1, map2);
console.log(result); // ExtendedMap { 'b' => 2 }
```

### Default Value Support

```typescript
const mapWithDefault = new ExtendedMap(null, { default: 0 });

mapWithDefault.set('exists', 42);
console.log(mapWithDefault.get('exists'));      // 42
console.log(mapWithDefault.get('not-exists'));  // 0 (default value)
```

## API Reference

### Set Operation Methods

#### `intersection(other: Map<K, V>): ExtendedMap<K, V>`

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

```typescript
const map1 = new ExtendedMap([['a', 1], ['b', 2], ['c', 3]]);
const map2 = new ExtendedMap([['b', 2], ['c', 4], ['d', 5]]);

const result = map1.intersection(map2);
// Result: Map { 'b' => 2 }
// Note: 'c' exists in both but has different values, so it's excluded
```

#### `union(other: Map<K, V>): ExtendedMap<K, V>`

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

```typescript
const map1 = new ExtendedMap([['a', 1], ['b', 2]]);
const map2 = new ExtendedMap([['b', 3], ['c', 4]]);

const result = map1.union(map2);
// Result: Map { 'a' => 1, 'b' => 3, 'c' => 4 }
// Note: 'b' value is overwritten by map2's value (3)
```

#### `difference(other: Map<K, V>): ExtendedMap<K, V>`

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

```typescript
const map1 = new ExtendedMap([['a', 1], ['b', 2], ['c', 3]]);
const map2 = new ExtendedMap([['b', 2], ['c', 4]]);

const result = map1.difference(map2);
// Result: Map { 'a' => 1, 'c' => 3 }
// Note: 'b' is excluded due to exact match, 'c' remains due to different value
```

#### `symmetricDifference(other: Map<K, V>): ExtendedMap<K, V>`

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

```typescript
const map1 = new ExtendedMap([['a', 1], ['b', 2]]);
const map2 = new ExtendedMap([['b', 2], ['c', 3]]);

const result = map1.symmetricDifference(map2);
// Result: Map { 'a' => 1, 'c' => 3 }
// Note: 'b' is excluded as it exists in both with the same value
```

#### `isSubsetOf(other: Map<K, V>): boolean`

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

```typescript
const map1 = new ExtendedMap([['a', 1], ['b', 2]]);
const map2 = new ExtendedMap([['a', 1], ['b', 2], ['c', 3]]);

console.log(map1.isSubsetOf(map2));  // true
console.log(map2.isSubsetOf(map1));  // false
```

#### `isSupersetOf(other: Map<K, V>): boolean`

Determines whether the current Map is a superset of the specified Map.

```typescript
const map1 = new ExtendedMap([['a', 1], ['b', 2], ['c', 3]]);
const map2 = new ExtendedMap([['a', 1], ['b', 2]]);

console.log(map1.isSupersetOf(map2));  // true
console.log(map2.isSupersetOf(map1));  // false
```

#### `isDisjointFrom(other: Map<K, V>): boolean`

Determines whether two Maps are disjoint (have no common elements).

```typescript
const map1 = new ExtendedMap([['a', 1], ['b', 2]]);
const map2 = new ExtendedMap([['c', 3], ['d', 4]]);
const map3 = new ExtendedMap([['a', 1], ['e', 5]]);

console.log(map1.isDisjointFrom(map2));  // true (no common elements)
console.log(map1.isDisjointFrom(map3));  // false ('a' => 1 is common)
```

### Utility Methods

#### `toObject(): Record<K, V>`

Converts a Map to a plain JavaScript object.

```typescript
const map = new ExtendedMap([
  ['name', 'Alice'],
  ['age', 30],
  ['city', 'Tokyo']
]);

const obj = map.toObject();
// Result: { name: 'Alice', age: 30, city: 'Tokyo' }
```

#### `whereKey(predicate: (key: K) => boolean): ExtendedMap<K, V>`

Returns a new Map containing only elements where the key satisfies the predicate.

```typescript
const map = new ExtendedMap([
  ['apple', 100],
  ['banana', 200],
  ['apricot', 300],
  ['grape', 400]
]);

const result = map.whereKey(key => key.startsWith('a'));
// Result: Map { 'apple' => 100, 'apricot' => 300 }
```

#### `whereValue(predicate: (value: V) => boolean): ExtendedMap<K, V>`

Returns a new Map containing only elements where the value satisfies the predicate.

```typescript
const map = new ExtendedMap([
  ['a', 10],
  ['b', 25],
  ['c', 30],
  ['d', 15]
]);

const result = map.whereValue(value => value > 20);
// Result: Map { 'b' => 25, 'c' => 30 }
```

## Advanced Usage Examples

### Method Chaining

```typescript
const map1 = new ExtendedMap([
  ['a', 1],
  ['b', 2],
  ['c', 3],
  ['d', 4]
]);

const map2 = new ExtendedMap([
  ['b', 2],
  ['d', 4],
  ['e', 5]
]);

const result = map1
  .union(map2)                           // Union
  .whereValue(value => value > 2)        // Elements with value > 2
  .difference(new Map([['e', 5]])); // Difference

console.log(result); // Map { 'c' => 3, 'd' => 4 }
```

### Using with Complex Data Types

```typescript
interface User {
  id: number;
  name: string;
  active: boolean;
}

const users = new ExtendedMap<string, User>([
  ['user1', { id: 1, name: 'Alice', active: true }],
  ['user2', { id: 2, name: 'Bob', active: false }],
  ['user3', { id: 3, name: 'Charlie', active: true }]
]);

// Extract active users only
const activeUsers = users.whereValue(user => user.active);

// Find users with specific IDs
const adminUsers = users.whereValue(user => user.id < 2);
```

### Performance Optimization

```typescript
// Usage with large datasets
const largeMap1 = new ExtendedMap(
  Array.from({ length: 100000 }, (_, i) => [`key${i}`, i])
);

const largeMap2 = new ExtendedMap(
  Array.from({ length: 100000 }, (_, i) => [`key${i + 50000}`, i])
);

// Efficient set operations
const intersection = largeMap1.intersection(largeMap2);
console.log(intersection.size); // 50000
```

## Type Definitions

```typescript
// Basic types
type ObjectKey = string | number | symbol;

// Option settings
interface ExtendedMapOptions<V> {
  default?: V;  // Default value
}

// ExtendedMap class
class ExtendedMap<K, V> extends Map<K, V> {
  constructor(
    entries?: Iterable<readonly [K, V]> | null,
    options?: ExtendedMapOptions<V>
  );
  // ... methods
}
```

## Benchmarks

Run performance tests:

```bash
# Run all benchmarks
bun run benchmark

# Benchmark specific features
bun run benchmark/intersection-with-map.bench.ts
```

### Performance Results Example

| Operation | Small (10 items) | Medium (1000 items) | Large (100000 items) |
|-----------|------------------|---------------------|----------------------|
| Intersection | ~900K ops/sec | ~35K ops/sec | ~150 ops/sec |
| Union | ~800K ops/sec | ~30K ops/sec | ~120 ops/sec |
| Difference | ~850K ops/sec | ~32K ops/sec | ~140 ops/sec |

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/set-object-utils.git
cd set-object-utils

# Install dependencies
bun install
```

### Testing

```bash
# Run all tests
bun test

# Test in watch mode
bun test:watch

# Run specific test file
bun test test/intersection-with-map.test.ts
```

### Build

```bash
# TypeScript type checking
bun run typecheck

# Linting
bun run lint

# Formatting
bun run format
```

## Project Structure

```
set-object-utils/
├── src/                  # Source code
│   ├── extended-map.ts   # Main class
│   ├── types.ts          # Type definitions
│   └── *.ts              # Feature implementations
├── test/                 # Test files
│   └── *.test.ts         # Feature tests
├── benchmark/            # Benchmarks
│   ├── utils.ts          # Common utilities
│   └── *.bench.ts        # Feature benchmarks
└── index.ts              # Entry point
```

## License

MIT

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## References

- [MDN - Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [MDN - Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)