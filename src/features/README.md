# このディレクトリに配置するもの

- 機能固有のUI、処理、型

## ルール

- 機能固有のものを配置し、共有されるものは外だしすること
- ディレクトリルールは以下に従うこと

### feature/{featureName}/components

機能固有のcomponentを配置する。

### feature/{featureName}/hooks

機能固有のhooksを配置する

### feature/{featureName}/api

機能固有のAPI呼び出しを配置

### feature/{featureName}/types.ts

機能固有の型

### feature/{featureName}/utils.ts

機能固有の汎用的な補助処理
