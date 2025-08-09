# Project Structure

## Directory Organization

```
set_object_utils/
├── src/                    # Core implementation
│   ├── extended-map.ts     # Main ExtendedMap class
│   ├── types.ts           # Type definitions
│   ├── index.ts           # Internal exports
│   └── [feature].ts       # Individual feature implementations
├── test/                   # Test files (mirrors src structure)
│   └── [feature].test.ts   # Feature-specific tests
├── benchmark/              # Performance benchmarks
│   ├── utils.ts           # Shared benchmark utilities
│   ├── index.ts           # Benchmark runner
│   └── [feature].bench.ts # Feature-specific benchmarks
├── docs/                   # Documentation
├── index.ts               # Main entry point
└── package.json           # Package configuration
```

## Architecture Patterns

### Modular Design

- Each feature implemented as standalone function in separate file
- ExtendedMap class delegates to standalone functions
- Avoids circular dependencies through careful import structure

### Dual API Approach

- **Class methods**: `extendedMap.intersectionWithMap(other)`
- **Standalone functions**: `intersectionWithMap(map1, map2)`
- Both approaches return ExtendedMap instances

### File Naming Conventions

- Feature files: `kebab-case` (e.g., `intersection-with-map.ts`)
- Test files: `[feature].test.ts`
- Benchmark files: `[feature].bench.ts`
- All files use `.ts` extension

### Import/Export Patterns

- Use dynamic imports in standalone functions to avoid circular deps
- Re-export everything through `src/index.ts` and root `index.ts`
- Type-only imports where possible
- Named exports preferred, default export for main class

### Testing Structure

- One test file per feature, mirroring src structure
- Tests cover both standalone functions and class methods
- Use Bun's built-in test framework with `describe`/`it` structure
- Test edge cases: empty maps, no matches, type safety
