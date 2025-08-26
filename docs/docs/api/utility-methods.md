# Utility Methods

ExtendedMap provides several utility methods for working with Map data structures.

## toObject(): Record&lt;K, V&gt;

Converts a Map to a plain JavaScript object.

### Example

```typescript
const map = new ExtendedMap([
  ['name', 'Alice'],
  ['age', 30],
  ['city', 'Tokyo']
]);

const obj = map.toObject();
// Result: { name: 'Alice', age: 30, city: 'Tokyo' }
```

### Standalone Function

```typescript
import { toObject } from 'set-object-utils';

const obj = toObject(map);
```

## whereKey(predicate: (key: K) => boolean): ExtendedMap&lt;K, V&gt;

Returns a new Map containing only elements where the key satisfies the predicate.

### Example

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

### Standalone Function

```typescript
import { whereKey } from 'set-object-utils';

const result = whereKey(map, key => key.startsWith('a'));
```

## whereValue(predicate: (value: V) => boolean): ExtendedMap&lt;K, V&gt;

Returns a new Map containing only elements where the value satisfies the predicate.

### Example

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

### Standalone Function

```typescript
import { whereValue } from 'set-object-utils';

const result = whereValue(map, value => value > 20);
```

## getAsserted(key: K): V

Returns the value for a key, throwing an error if the key does not exist. Useful when you've already verified existence with `has()` and want to avoid undefined checks.

### Example

```typescript
const map = new ExtendedMap([
  ['existing', 'value'],
  ['another', 'data']
]);

// Safe usage after checking with has()
if (map.has('existing')) {
  const value = map.getAsserted('existing'); // Returns 'value' (type: string, not string | undefined)
  console.log(value.toUpperCase()); // No TypeScript error
}

// Direct usage (throws if key doesn't exist)
try {
  const value = map.getAsserted('nonexistent');
} catch (error) {
  console.error(error); // Error: Key "nonexistent" does not exist in map
}
```

### Type Safety

`getAsserted` provides better type safety than regular `get()`:

```typescript
// Regular get() returns V | undefined
const value1 = map.get('key'); // Type: string | undefined
// Need to handle undefined case

// getAsserted() returns V directly
const value2 = map.getAsserted('key'); // Type: string
// No undefined handling needed (but will throw if key doesn't exist)
```

## tryGet(key: K): [true, V] | [false, undefined]

Returns a tuple indicating whether the key exists and its value. This pattern provides type-safe access to Map values without requiring separate `has()` and `get()` calls.

### Example

```typescript
const map = new ExtendedMap([
  ['user1', { id: 1, name: 'Alice' }],
  ['user2', { id: 2, name: 'Bob' }]
]);

// Using tryGet with destructuring
const [found, user] = map.tryGet('user1');
if (found) {
  // TypeScript knows 'user' is the object type, not undefined
  console.log(user.name.toUpperCase()); // 'ALICE'
}

// Pattern matching style
const result = map.tryGet('user2');
if (result[0]) {
  const user = result[1]; // Type is inferred correctly
  console.log(`User ${user.id}: ${user.name}`);
}

// Non-existing key
const [exists, value] = map.tryGet('user3');
console.log(exists); // false
console.log(value);  // undefined
```

### Standalone Function

```typescript
import { tryGet } from 'set-object-utils';

const [found, value] = tryGet(map, 'key');
```

## tryGet(key: K, fallback: V): V

Returns the value for the given key if it exists, otherwise returns the fallback value. This overload provides a convenient way to get values with defaults without needing to check existence separately.

### Example

```typescript
const map = new ExtendedMap([
  ['theme', 'dark'],
  ['language', 'en'],
  ['timeout', 5000]
]);

// Get existing values
const theme = map.tryGet('theme', 'light');
console.log(theme); // 'dark'

// Get with fallback for missing keys
const debug = map.tryGet('debug', false);
console.log(debug); // false

const maxRetries = map.tryGet('maxRetries', 3);
console.log(maxRetries); // 3

// Useful for configuration objects
const config = {
  theme: map.tryGet('theme', 'light'),
  language: map.tryGet('language', 'en'),
  debug: map.tryGet('debug', false),
  timeout: map.tryGet('timeout', 30000)
};
```

### Standalone Function

```typescript
import { tryGet } from 'set-object-utils';

// With fallback
const value = tryGet(map, 'key', 'default');

// Without fallback (returns tuple)
const [found, value] = tryGet(map, 'key');
```

### Type Inference

Both overloads of `tryGet` provide excellent type inference:

```typescript
// Tuple version - TypeScript infers the correct types
const [found, user] = map.tryGet('userId'); // [boolean, User | undefined]
if (found) {
  // user is now typed as User, not User | undefined
}

// Fallback version - returns the union type of value and fallback
const theme = map.tryGet('theme', 'light'); // string
const count = map.tryGet('count', 0); // number
```

## isEmpty(): boolean

Determines whether the Map contains any elements.

### Example

```typescript
const emptyMap = new ExtendedMap();
const filledMap = new ExtendedMap([['a', 1]]);

console.log(emptyMap.isEmpty());  // true
console.log(filledMap.isEmpty()); // false
```

### Standalone Function

```typescript
import { isEmpty } from 'set-object-utils';

const empty = isEmpty(map);
```
