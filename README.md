# set_object_utils

## Mapオブジェクトのキー・値で集合演算を行う拡張

ES2024のSet集合演算APIにインスパイアされ、Mapオブジェクトの`key`（キー集合）・`value`（値集合）で集合演算ができるように拡張しています。

### 使い方

```ts
const map1 = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);
const map2 = new Map([
  ['b', 2],
  ['c', 4],
  ['d', 5],
]);

// キーでintersection
console.log(map1.key.intersection(map2.keys())); // Set { 'b', 'c' }
// 値でintersection
console.log(map1.value.intersection(map2.values())); // Set { 2, 3 }
```

### 提供メソッド
- intersection
- union
- difference
- symmetricDifference
- isSubsetOf
- isSupersetOf
- isDisjointFrom

#### 例
```ts
// キーの和集合
map1.key.union(map2.keys());
// 値の差集合
map1.value.difference(map2.values());
```

### 注意点
- `Map.prototype.key`/`value`の集合演算メソッドは、引数に`Iterable`（例: `map2.keys()`や`map2.values()`、配列など）を渡してください。
- Mapオブジェクト自体を直接渡すと型エラーになります。
- TypeScriptで利用する場合、グローバル拡張が自動で適用されます。

---

## 開発・実行

依存インストール:
```bash
bun install
```

実行:
```bash
bun run index.ts
```

---

This project was created using `bun init` in bun v1.2.13. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
