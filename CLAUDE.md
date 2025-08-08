# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript utility library that extends the native Map object with Set-like operations. The project uses Bun as the runtime and test runner.

## Key Architectural Decision: Inheritance vs Functions

The main architectural decision to discuss and implement is whether to:
1. **Extend Map class through inheritance** - Create a new class that extends Map with additional methods
2. **Use utility functions** - Create pure functions that operate on Map instances

This decision affects type safety, performance, and API design.

## Development Commands

```bash
# Run tests
bun test

# Run tests in watch mode
bun test --watch

# Type checking (no emit)
bun run lint

# Run example code
bun run example

# Benchmark performance (to be implemented)
bun run benchmark
```

## Implementation Requirements

### Extended Map Methods (Set Operations)
- All Set methods should be prefixed with `withMap` (e.g., `intersectionWithMap`)
- Methods to implement:
  - `intersectionWithMap` - Returns intersection of Map keys/values
  - `unionWithMap` - Returns union of Map keys/values
  - `differenceWithMap` - Returns difference of Map keys/values
  - `symmetricDifferenceWithMap` - Returns symmetric difference
  - `isSubsetOfWithMap` - Checks if one Map is subset of another
  - `isSupersetOfWithMap` - Checks if one Map is superset of another
  - `isDisjointFromWithMap` - Checks if Maps have no common elements

### Additional Methods
- `toObject()` - Convert Map to plain object
- `whereKey(predicate)` - Filter Map by key predicate
- `whereValue(predicate)` - Filter Map by value predicate
- Default value support in constructor (e.g., `new ExtendedMap({default: 1})`)

## Type Safety Requirements
- Use strict TypeScript types throughout
- Ensure proper generic type inference
- No `any` types unless absolutely necessary

## Testing Strategy
- Write tests for every method using Bun's test runner
- Test edge cases (empty Maps, single elements, type edge cases)
- Test default value behavior

## Performance Considerations
- Benchmark different implementation approaches
- Consider memory efficiency for large Maps
- Use native JavaScript features where possible (no external libraries)