# Getting Started

This guide will help you get started with ExtendedMap and understand its core concepts.

## Installation

Install ExtendedMap from npm:

```bash
npm install set-object-utils
```

## Basic Usage

### Using ExtendedMap Class

ExtendedMap extends the native JavaScript Map class with additional set operations:

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

You can also use individual functions without extending Map:

```typescript
import { intersection, union, tryGet } from 'set-object-utils';

const map1 = new Map([['a', 1], ['b', 2]]);
const map2 = new Map([['b', 2], ['c', 3]]);

const result = intersection(map1, map2);
console.log(result); // ExtendedMap { 'b' => 2 }

// Using tryGet with regular Map instances
const config = new Map([['theme', 'dark'], ['debug', true]]);
const theme = tryGet(config, 'theme', 'light');
const timeout = tryGet(config, 'timeout', 5000);
console.log(theme);   // 'dark'
console.log(timeout); // 5000
```

### Default Value Support

ExtendedMap supports default values for missing keys:

```typescript
const mapWithDefault = new ExtendedMap(null, { default: 0 });

mapWithDefault.set('exists', 42);
console.log(mapWithDefault.get('exists'));      // 42
console.log(mapWithDefault.get('not-exists'));  // 0 (default value)
```

## Core Concepts

### Set Operations

ExtendedMap provides mathematical set operations:

- **Intersection**: Elements that exist in both maps with the same values
- **Union**: All elements from both maps (second map values overwrite first for duplicates)
- **Difference**: Elements from the first map that don't have exact matches in the second
- **Symmetric Difference**: Elements that exist in either map but not both

### Type Safety

ExtendedMap is fully typed with TypeScript:

```typescript
// Type-safe operations
const stringToNumber = new ExtendedMap<string, number>([
  ['a', 1],
  ['b', 2]
]);

// Compile-time type checking
const value: number = stringToNumber.get('a') ?? 0;
```

### Tree Shaking

Import only the functions you need:

```typescript
// Import specific functions
import { intersection, union } from 'set-object-utils';

// Or import the class
import { ExtendedMap } from 'set-object-utils';
```

## Next Steps

Now that you understand the basics, explore:

- [Set Operations API](./api/set-operations) - Detailed documentation for all set operations
- [Utility Methods API](./api/utility-methods) - Helper methods for working with maps
- [Advanced Examples](./examples/advanced-usage) - Complex patterns and use cases
