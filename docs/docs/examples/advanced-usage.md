# Advanced Usage

This page demonstrates advanced patterns and real-world use cases for ExtendedMap.

## Method Chaining

ExtendedMap methods return new instances, allowing for powerful method chaining:

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
  .union(map2)                           // Union first
  .whereValue(value => value > 2)        // Filter values > 2
  .difference(new Map([['e', 5]]));      // Remove specific element

console.log(result); // Map { 'c' => 3, 'd' => 4 }
```

## Working with Complex Data Types

ExtendedMap works seamlessly with complex object types:

```typescript
interface User {
  id: number;
  name: string;
  active: boolean;
  roles: string[];
}

const users = new ExtendedMap<string, User>([
  ['user1', { id: 1, name: 'Alice', active: true, roles: ['admin'] }],
  ['user2', { id: 2, name: 'Bob', active: false, roles: ['user'] }],
  ['user3', { id: 3, name: 'Charlie', active: true, roles: ['user', 'moderator'] }]
]);

// Extract active users only
const activeUsers = users.whereValue(user => user.active);
console.log(activeUsers.size); // 2

// Find admin users
const adminUsers = users.whereValue(user => user.roles.includes('admin'));
console.log(adminUsers.get('user1')?.name); // 'Alice'

// Find users with specific IDs
const specificUsers = users.whereKey(userId => ['user1', 'user3'].includes(userId));
```

## Configuration Management

ExtendedMap is excellent for configuration management with fallbacks:

```typescript
interface AppConfig {
  theme: 'light' | 'dark';
  language: string;
  debug: boolean;
  timeout: number;
  features: string[];
}

class ConfigManager {
  private config = new ExtendedMap<keyof AppConfig, any>();

  constructor(initialConfig?: Partial<AppConfig>) {
    if (initialConfig) {
      Object.entries(initialConfig).forEach(([key, value]) => {
        this.config.set(key as keyof AppConfig, value);
      });
    }
  }

  getTheme(): AppConfig['theme'] {
    return this.config.tryGet('theme', 'light');
  }

  getLanguage(): string {
    return this.config.tryGet('language', 'en');
  }

  isDebugEnabled(): boolean {
    return this.config.tryGet('debug', false);
  }

  getTimeout(): number {
    return this.config.tryGet('timeout', 5000);
  }

  getFeatures(): string[] {
    return this.config.tryGet('features', []);
  }

  mergeConfig(newConfig: Partial<AppConfig>): ConfigManager {
    const newConfigMap = new ExtendedMap(Object.entries(newConfig));
    this.config = this.config.union(newConfigMap);
    return this;
  }

  toObject(): Partial<AppConfig> {
    return this.config.toObject();
  }
}

// Usage
const configManager = new ConfigManager({
  theme: 'dark',
  debug: true
});

console.log(configManager.getTheme());    // 'dark'
console.log(configManager.getLanguage()); // 'en' (default)
console.log(configManager.isDebugEnabled()); // true

// Merge additional configuration
configManager.mergeConfig({
  language: 'ja',
  timeout: 10000,
  features: ['feature-a', 'feature-b']
});

console.log(configManager.toObject());
// { theme: 'dark', debug: true, language: 'ja', timeout: 10000, features: ['feature-a', 'feature-b'] }
```

## Data Processing Pipelines

Combine multiple operations for data transformation:

```typescript
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

const products = new ExtendedMap<string, Product>([
  ['p1', { id: 'p1', name: 'Laptop', category: 'electronics', price: 1200, inStock: true }],
  ['p2', { id: 'p2', name: 'Phone', category: 'electronics', price: 800, inStock: false }],
  ['p3', { id: 'p3', name: 'Book', category: 'books', price: 20, inStock: true }],
  ['p4', { id: 'p4', name: 'Tablet', category: 'electronics', price: 500, inStock: true }]
]);

const discountedProducts = new ExtendedMap<string, Product>([
  ['p1', { id: 'p1', name: 'Laptop', category: 'electronics', price: 1000, inStock: true }],
  ['p3', { id: 'p3', name: 'Book', category: 'books', price: 15, inStock: true }]
]);

// Find electronics that are in stock and apply discounts
const result = products
  .whereValue(product => product.category === 'electronics' && product.inStock)
  .union(discountedProducts) // Apply discounted prices
  .whereValue(product => product.inStock); // Ensure still in stock

console.log([...result.values()]);
// Products with discounted prices where available
```

## Performance Optimization

### Large Dataset Handling

ExtendedMap is optimized for large datasets:

```typescript
// Working with large datasets
const createLargeMap = (size: number) => {
  return new ExtendedMap(
    Array.from({ length: size }, (_, i) => [`key${i}`, i])
  );
};

const largeMap1 = createLargeMap(100000);
const largeMap2 = createLargeMap(100000, (_, i) => [`key${i + 50000}`, i]);

console.time('intersection');
const intersection = largeMap1.intersection(largeMap2);
console.timeEnd('intersection');
console.log(intersection.size); // 50000
```

### Memory-Efficient Operations

Use standalone functions to avoid creating intermediate ExtendedMap instances:

```typescript
import { intersection, union, whereValue } from 'set-object-utils';

// Memory-efficient approach for one-time operations
const regularMap1 = new Map([['a', 1], ['b', 2], ['c', 3]]);
const regularMap2 = new Map([['b', 2], ['d', 4]]);

// Direct operations without ExtendedMap overhead
const result = intersection(regularMap1, regularMap2);
console.log(result); // ExtendedMap { 'b' => 2 }
```

## Error Handling and Type Safety

### Safe Value Access

Use `tryGet` for safe value access:

```typescript
const userProfiles = new ExtendedMap<string, { name: string; email: string }>();

// Safe access with tuple destructuring
const [found, profile] = userProfiles.tryGet('user123');
if (found) {
  // profile is guaranteed to be the correct type
  sendEmail(profile.email, `Hello ${profile.name}!`);
} else {
  console.log('User not found');
}

// Safe access with fallback
const defaultProfile = { name: 'Guest', email: 'guest@example.com' };
const profile = userProfiles.tryGet('user123', defaultProfile);
sendEmail(profile.email, `Hello ${profile.name}!`);
```

### Assertion-based Access

Use `getAsserted` when you're certain a key exists:

```typescript
const cache = new ExtendedMap<string, string>();

function processUser(userId: string) {
  if (!cache.has(userId)) {
    // Load user data
    const userData = loadUserFromDatabase(userId);
    cache.set(userId, userData);
  }

  // We know the key exists, so getAsserted is safe and provides better types
  const userData = cache.getAsserted(userId); // string, not string | undefined
  return processUserData(userData);
}
```

## Integration with Existing Code

### Converting from Regular Maps

Easily upgrade existing Map-based code:

```typescript
// Existing code with regular Maps
function processRegularMaps(map1: Map<string, number>, map2: Map<string, number>) {
  // Convert to ExtendedMap for powerful operations
  const extended1 = new ExtendedMap(map1);
  const extended2 = new ExtendedMap(map2);

  // Perform complex operations
  const result = extended1
    .intersection(extended2)
    .whereValue(value => value > 10);

  // Convert back to regular Map if needed
  return new Map(result);
}
```

### Working with JSON Data

ExtendedMap integrates well with JSON data:

```typescript
interface APIResponse {
  users: Record<string, { name: string; age: number }>;
}

function processAPIResponse(response: APIResponse): ExtendedMap<string, { name: string; age: number }> {
  // Convert from object to ExtendedMap
  const userMap = new ExtendedMap(Object.entries(response.users));

  // Process data
  return userMap.whereValue(user => user.age >= 18);
}

// Usage
const apiData = {
  users: {
    'user1': { name: 'Alice', age: 25 },
    'user2': { name: 'Bob', age: 17 },
    'user3': { name: 'Charlie', age: 30 }
  }
};

const adultUsers = processAPIResponse(apiData);
console.log(adultUsers.toObject());
// { user1: { name: 'Alice', age: 25 }, user3: { name: 'Charlie', age: 30 } }

// Helper functions used in examples above
function loadUserFromDatabase(userId: string): string {
  return `userData-${userId}`;
}

function processUserData(userData: string): string {
  return userData.toUpperCase();
}

function sendEmail(email: string, message: string): void {
  console.log(`Sending to ${email}: ${message}`);
}
```
