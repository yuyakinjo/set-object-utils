# Technology Stack

## Runtime & Package Manager

- **Bun**: Primary runtime and package manager (optimized for performance)
- **TypeScript**: Strict type checking with ESNext target
- **Node.js**: Compatible but Bun is preferred

## Development Tools

- **Biome**: Code formatting and linting (replaces ESLint + Prettier)
  - Line width: 100 characters
  - 2-space indentation
  - Recommended rules with `noExplicitAny` disabled
- **TypeScript**: Strict mode enabled with bundler module resolution

## Testing & Benchmarking

- **Bun Test**: Built-in test runner
- Custom benchmark utilities for performance testing

## Common Commands

### Development

```bash
# Install dependencies
bun install

# Run tests
bun test
bun test:watch

# Type checking
bun run typecheck

# Linting and formatting
bun run lint
bun run lint:fix
bun run format
```

### Testing & Benchmarking

```bash
# Run example
bun run index.ts

# Run benchmarks
bun run benchmark
bun run benchmark/[specific-feature].bench.ts
```

## Module System

- **ESNext modules** with tree-shakeable exports
- **Bundler resolution** for TypeScript imports
- Both named and default exports supported
- Dual entry points: root `index.ts` and `src/index.ts`
