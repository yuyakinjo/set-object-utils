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

## Quick Start

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

const union = map1.union(map2);
console.log(union); // Map { 'a' => 1, 'b' => 2, 'c' => 3, 'd' => 4 }
```

## What's Next?

- [Getting Started](./getting-started) - Learn the basics
- [Set Operations API](./api/set-operations) - Detailed API reference for set operations
- [Utility Methods API](./api/utility-methods) - Detailed API reference for utility methods
- [Advanced Examples](./examples/advanced-usage) - Complex usage patterns