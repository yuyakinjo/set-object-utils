# Development

This guide covers development setup, testing, and contributing to ExtendedMap.

## Development Setup

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js v18+
- Git

### Getting Started

```bash
# Clone the repository
git clone https://github.com/yuyakinjo/set-object-utils.git
cd set-object-utils

# Install dependencies
bun install

# Run tests
bun test

# Start development mode (watches for changes)
bun test --watch
```

## Project Structure

```
set-object-utils/
├── src/                  # Source code
│   ├── extended-map.ts   # Main ExtendedMap class
│   ├── types.ts          # Type definitions
│   ├── *.ts              # Feature implementations
│   └── index.ts          # Exports
├── test/                 # Test files
│   └── *.test.ts         # Feature tests
├── benchmark/            # Performance benchmarks
│   ├── utils.ts          # Common utilities
│   └── *.bench.ts        # Feature benchmarks
├── docs/                 # Documentation site (Docusaurus)
└── index.ts              # Entry point
```

## Available Scripts

```bash
# Testing
bun test                  # Run all tests
bun test:watch           # Run tests in watch mode
bun test specific-file   # Run specific test file

# Code Quality
bun run lint             # Check code style
bun run lint:fix         # Fix auto-fixable issues
bun run format           # Format code with Biome
bun run typecheck        # TypeScript type checking

# Benchmarks
bun run benchmark        # Run all benchmarks
bun benchmark/specific.bench.ts  # Run specific benchmark

# Documentation
cd docs && npm start     # Start documentation dev server
cd docs && npm run build # Build documentation
```

## Testing

### Running Tests

```bash
# Run all tests
bun test

# Run specific test file
bun test test/intersection.test.ts

# Run tests in watch mode
bun test --watch

# Run tests with coverage (if configured)
bun test --coverage
```

### Test Structure

Each feature has comprehensive tests covering:

- Basic functionality
- Edge cases
- Error conditions
- Type safety
- Performance characteristics

Example test file structure:

```typescript
// test/intersection.test.ts
import { describe, it, expect } from 'bun:test';
import { ExtendedMap } from '../src/extended-map';

describe('intersection', () => {
  it('should return intersection of two maps', () => {
    const map1 = new ExtendedMap([['a', 1], ['b', 2]]);
    const map2 = new ExtendedMap([['b', 2], ['c', 3]]);

    const result = map1.intersection(map2);

    expect(result.size).toBe(1);
    expect(result.get('b')).toBe(2);
  });

  it('should handle empty maps', () => {
    const empty = new ExtendedMap();
    const filled = new ExtendedMap([['a', 1]]);

    expect(empty.intersection(filled).size).toBe(0);
    expect(filled.intersection(empty).size).toBe(0);
  });

  // More test cases...
});
```

### Writing Tests

When adding new features:

1. **Create test file**: `test/new-feature.test.ts`
2. **Test all public methods**: Both instance and standalone functions
3. **Cover edge cases**: Empty maps, single elements, large datasets
4. **Verify types**: Ensure TypeScript types work correctly
5. **Test performance**: Add to benchmarks if applicable

## Benchmarks

### Running Benchmarks

```bash
# Run all benchmarks
bun run benchmark

# Run specific benchmark
bun benchmark/intersection.bench.ts

# Compare performance
bun benchmark/comparison.bench.ts
```

### Writing Benchmarks

Create benchmark files in the `benchmark/` directory:

```typescript
// benchmark/new-feature.bench.ts
import { bench, run } from 'mitata';
import { ExtendedMap } from '../src';
import { createTestData } from './utils';

const { small, medium, large } = createTestData();

bench('NewFeature - Small Dataset', () => {
  small.newFeature();
});

bench('NewFeature - Medium Dataset', () => {
  medium.newFeature();
});

bench('NewFeature - Large Dataset', () => {
  large.newFeature();
});

run();
```

## Code Quality

### Linting and Formatting

The project uses [Biome](https://biomejs.dev/) for fast linting and formatting:

```bash
# Check code style
bun run lint

# Fix auto-fixable issues
bun run lint:fix

# Format code
bun run format
```

### TypeScript

Strict TypeScript configuration ensures type safety:

```bash
# Type checking
bun run typecheck

# Build (type checking + transpilation)
bun run build
```

### Configuration Files

- `biome.jsonc`: Linting and formatting rules
- `tsconfig.json`: TypeScript configuration
- `package.json`: Scripts and dependencies

## Adding New Features

### 1. Plan the Feature

- Identify the use case
- Design the API (method signature, behavior)
- Consider performance implications
- Plan backward compatibility

### 2. Implement the Feature

```typescript
// src/new-feature.ts
import type { ExtendedMap } from './extended-map';

export function newFeature<K, V>(
  map: Map<K, V>,
  options?: NewFeatureOptions
): ExtendedMap<K, V> {
  // Implementation
}

// Add to ExtendedMap class
export class ExtendedMap<K, V> extends Map<K, V> {
  newFeature(options?: NewFeatureOptions): ExtendedMap<K, V> {
    return newFeature(this, options);
  }
}
```

### 3. Add Tests

```typescript
// test/new-feature.test.ts
import { describe, it, expect } from 'bun:test';
import { ExtendedMap, newFeature } from '../src';

describe('newFeature', () => {
  // Test both class method and standalone function
  it('should work as instance method', () => {
    const map = new ExtendedMap([['a', 1]]);
    const result = map.newFeature();
    expect(result).toBeInstanceOf(ExtendedMap);
  });

  it('should work as standalone function', () => {
    const map = new Map([['a', 1]]);
    const result = newFeature(map);
    expect(result).toBeInstanceOf(ExtendedMap);
  });
});
```

### 4. Add Benchmarks

```typescript
// benchmark/new-feature.bench.ts
import { bench, run } from 'mitata';
// ... benchmark implementation
```

### 5. Update Documentation

- Add to API documentation
- Include usage examples
- Update README if necessary

### 6. Export the Feature

```typescript
// src/index.ts
export { newFeature } from './new-feature';
export { ExtendedMap } from './extended-map'; // Updated with new method
```

## Release Process

### Versioning

The project follows [Semantic Versioning](https://semver.org/):

- **Major**: Breaking changes
- **Minor**: New features (backward compatible)
- **Patch**: Bug fixes

### Release Checklist

1. **Run all tests**: `bun test`
2. **Check benchmarks**: `bun run benchmark`
3. **Lint code**: `bun run lint`
4. **Update version**: Update `package.json`
5. **Update CHANGELOG**: Document changes
6. **Build documentation**: `cd docs && npm run build`
7. **Create release**: Git tag and GitHub release

## Contributing

### Pull Request Process

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/new-feature`
3. **Write code and tests**
4. **Ensure all checks pass**:
   ```bash
   bun test
   bun run lint
   bun run typecheck
   ```
5. **Update documentation** if needed
6. **Submit pull request**

### Code Review

Pull requests are reviewed for:

- Correctness and functionality
- Test coverage
- Performance impact
- Code style and consistency
- Documentation completeness
- TypeScript type safety

### Issue Reporting

When reporting bugs:

1. **Use issue template**
2. **Provide minimal reproduction**
3. **Include environment details**
4. **Add relevant benchmarks** if performance-related

## Performance Considerations

### Design Principles

1. **Minimize object creation**: Reuse objects when possible
2. **Optimize hot paths**: Profile critical operations
3. **Lazy evaluation**: Defer work until needed
4. **Memory efficiency**: Avoid unnecessary data copying

### Profiling

```typescript
import { performance } from 'perf_hooks';

// Profile operations during development
function profile<T>(name: string, fn: () => T): T {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${name}: ${end - start}ms`);
  return result;
}
```

### Memory Management

- Use `WeakMap`/`WeakSet` for caches when appropriate
- Clear references to large objects
- Consider memory impact of chained operations

## Architecture Decisions

### Why ExtendedMap extends Map

- **Familiar API**: Developers know Map already
- **Performance**: Native Map operations are optimized
- **Compatibility**: Works anywhere Map works
- **Incremental adoption**: Can be dropped in as Map replacement

### Why Standalone Functions

- **Tree shaking**: Import only needed functions
- **Flexibility**: Works with any Map instance
- **Performance**: No object creation overhead
- **Functional style**: Supports functional programming patterns

### Type Design

```typescript
// Ensures type safety while maintaining flexibility
type ObjectKey = string | number | symbol;

interface ExtendedMapOptions<V> {
  default?: V;
}

// Generic constraints ensure proper typing
class ExtendedMap<K, V> extends Map<K, V> {
  // Methods preserve generic types
  intersection<T extends Map<K, V>>(other: T): ExtendedMap<K, V> {
    // Implementation
  }
}
```
