# Mapオブジェクトの拡張（extends）クラスを作る

## やりたいこと

- Mapオブジェクトを拡張して、Setオブジェクトのメソッドを使えるようにする
- ライブラリは使わない（typescriptのみ）
- 型はできるだけ厳密に
- テストコードはすべてのメソッド
- パフォーマンスを考慮して、拡張したMapオブジェクトを作成する関数をベンチマークする
- typescriptのdeferを使いたいので、関数自体はすべて

## 拡張する内容

- メソッドはSetのメソッド名 + withMap という名前にする(例：Set.intersectionであれば、Map.intersectionWithMap)
- Mapオブジェクト → Object に変換する toObject メソッドを作成
- Mapのキーの中で検索できるwhereKeyを作成
- Mapの値の中で検索できるwhereValueを作成
- デフォルト値を設定できる。(ex: new Map({default: 1}).get('key') → 1)

## ベンチマーク

ベンチマークはbunで実行

```bash
bun run benchmark
```

## ドキュメント


# 参考URL

- [MDN Set](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [MDN Map](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [デフォルト値を返すオブジェクトの参考](https://qiita.com/k_bobchin/items/6c1dfb2ff2edbfb24607)
- [typescript import defer](https://devblogs.microsoft.com/typescript/announcing-typescript-5-9/)