# ExtendedMap - Set Operations for JavaScript Map

![Build](https://github.com/yuyakinjo/set-object-utils/workflows/Build/badge.svg)
![Lint](https://github.com/yuyakinjo/set-object-utils/workflows/Lint/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)
![Bun](https://img.shields.io/badge/Bun-Compatible-orange.svg)

A TypeScript-implemented extension library that adds Set-like operations to Map objects. Provides high-performance set operations with a tree-shakeable design while avoiding circular dependencies.

## 📚 Full Documentation

**[👉 Visit the complete documentation site](https://yuyakinjo.github.io/set-object-utils/)**

The documentation includes:
- 🚀 [Getting Started Guide](https://yuyakinjo.github.io/set-object-utils/docs/getting-started)
- 📖 [Complete API Reference](https://yuyakinjo.github.io/set-object-utils/docs/api/set-operations)
- 💡 [Advanced Usage Examples](https://yuyakinjo.github.io/set-object-utils/docs/examples/advanced-usage)
- ⚡ [Performance Benchmarks](https://yuyakinjo.github.io/set-object-utils/docs/benchmarks)
- 🛠️ [Development Guide](https://yuyakinjo.github.io/set-object-utils/docs/development)

## Features

- 🚀 **High Performance**: Extends native Map while maintaining performance
- 🎯 **Type Safe**: Strict type definitions with TypeScript
- 🌳 **Tree-shakeable**: Import only the features you need
- 🔧 **Flexible Usage**: Supports both class inheritance and standalone functions
- ⚡ **Bun Compatible**: Optimized for Bun runtime
- 🧪 **Fully Tested**: Comprehensive tests for all features

## Quick Start

### Installation

```bash
npm install set-object-utils
```

### Basic Usage

```typescript
import { ExtendedMap } from 'set-object-utils';

// Create ExtendedMaps
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

// Set operations
const intersection = map1.intersection(map2);
console.log(intersection); // Map { 'b' => 2, 'c' => 3 }

const union = map1.union(map2);
console.log(union); // Map { 'a' => 1, 'b' => 2, 'c' => 3, 'd' => 4 }
```

### Standalone Functions

```typescript
import { intersection, tryGet } from 'set-object-utils';

const map1 = new Map([['a', 1], ['b', 2]]);
const map2 = new Map([['b', 2], ['c', 3]]);

const result = intersection(map1, map2);
console.log(result); // ExtendedMap { 'b' => 2 }

// Safe value access with fallback
const config = new Map([['theme', 'dark']]);
const theme = tryGet(config, 'theme', 'light'); // 'dark'
const timeout = tryGet(config, 'timeout', 5000); // 5000 (fallback)
```

## Available Operations

### Set Operations
- `intersection()` - Elements in both maps
- `union()` - All elements from both maps
- `difference()` - Elements in first map only
- `symmetricDifference()` - Elements in either map but not both
- `isSubsetOf()` - Check if subset
- `isSupersetOf()` - Check if superset
- `isDisjointFrom()` - Check if no common elements

### Utility Methods
- `tryGet()` - Safe value access with optional fallback
- `getAsserted()` - Get value or throw if missing
- `whereKey()` - Filter by key predicate
- `whereValue()` - Filter by value predicate
- `toObject()` - Convert to plain object
- `isEmpty()` - Check if empty

## Performance

ExtendedMap is optimized for various dataset sizes:

- **Small datasets** (< 100 items): ~1M+ operations/sec
- **Medium datasets** (1K items): ~30K+ operations/sec
- **Large datasets** (100K items): ~100+ operations/sec

Run benchmarks: `bun run benchmark`

## Project Structure

```
set-object-utils/
├── src/                  # Source code
├── test/                 # Tests
├── benchmark/            # Performance benchmarks
├── docs/                 # Documentation site
└── index.ts              # Entry point
```

## Development

```bash
# Install dependencies
bun install

# Run tests
bun test

# Run benchmarks
bun run benchmark

# Start documentation site
cd docs && npm start
```

## Contributing

Pull requests are welcome! Please see our [Development Guide](https://yuyakinjo.github.io/set-object-utils/docs/development) for details.

## License

MIT

---

**[📚 Read the full documentation →](https://yuyakinjo.github.io/set-object-utils/)**