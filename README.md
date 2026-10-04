# 47log Frontend

React + TypeScript + Viteで構築するSPAです。
URLによる画面遷移にはReact Routerを使用します。
UIにはTailwind CSS 4とshadcn/ui、LintにはESLint 10、整形にはPrettier、テストにはVitestとReact Testing Libraryを使用します。

画面・機能の配置方針は [src/README.md](src/README.md) を参照してください。

## 環境構築

### 必要なツール

- Node.js 24系
- pnpm 10系
- Git

Node.jsをインストールしたうえで、pnpmが未導入の場合は以下を実行します。

```bash
npm install -g pnpm@12.6.0
```

バージョンを確認します。

```bash
node --version
pnpm --version
```

### 依存関係のインストールと起動

リポジトリをcloneした後、プロジェクト直下で実行します。

```bash
cd 47log-frontend
pnpm install --frozen-lockfile
pnpm dev
```

`pnpm install --frozen-lockfile` は、`pnpm-lock.yaml` に記録された依存関係をインストールします。
インストール時に `prepare` スクリプトも実行され、HuskyのGitフックが有効になります。

`pnpm dev` は開発サーバーを起動します。ターミナルに表示されたURLをブラウザで開いてください。
標準のURLは `http://localhost:5173` です。ファイルを変更すると画面に反映されます。
停止する場合は `Ctrl+C` を押します。

## 環境変数・設定値

Viteの標準機能で開発環境と本番環境の設定を切り替えます。
必要な設定ができたら、プロジェクト直下に以下のファイルを作成します。

| ファイル           | 使用するコマンド |
| ------------------ | ---------------- |
| `.env.development` | `pnpm dev`       |
| `.env.production`  | `pnpm build`     |

例えば、APIの接続先は各ファイルに次の形式で設定します。

```dotenv
VITE_API_BASE_URL=https://api.example.com
```

コードでは `import.meta.env.VITE_API_BASE_URL` で参照します。
共通の設定の読み取りは `src/lib/` にまとめ、API呼び出し処理から利用します。

手元だけの値は `.env.development.local` などの `.local` ファイルで上書きできます。
これらはGit管理対象外です。CIでビルドする場合は、同名の環境変数を渡すこともできます。
環境変数を変更したら開発サーバーを再起動してください。

本番の値はビルド時に組み込まれるため、変更時は再ビルドが必要です。
`VITE_` で始まる値はブラウザに公開されるので、秘密鍵やパスワードは設定しません。

## コマンド一覧

すべてプロジェクト直下で実行します。

| コマンド                          | 実行内容                                                                                      |
| --------------------------------- | --------------------------------------------------------------------------------------------- |
| `pnpm dev`                        | Viteの開発サーバーを起動する。変更を画面に反映する                                            |
| `pnpm build`                      | TypeScriptの型チェック後、Viteで本番用ファイルを `dist/` に生成する                           |
| `pnpm preview`                    | ビルド済みの `dist/` をローカルで表示する。本番用サーバーではない                             |
| `pnpm lint`                       | ESLintでTypeScript・React Hooks・Fast Refreshなどのルール違反を検出する。ファイルは変更しない |
| `pnpm format`                     | Prettierで対象ファイルを整形する。ファイルを書き換える                                        |
| `pnpm format:check`               | Prettierの整形ルールに従っているか確認する。ファイルは変更しない                              |
| `pnpm test`                       | Vitestを監視モードで起動し、変更に応じてテストを再実行する                                    |
| `pnpm test:run`                   | Vitestでテストを一度だけ実行する。CIなどで使用する                                            |
| `pnpm test:run --passWithNoTests` | テストを一度だけ実行する。テストがない場合も成功扱いにする                                    |
| `pnpm prepare`                    | HuskyのGitフックを設定する。通常は依存関係のインストール時に自動実行される                    |

本番用ビルドをローカルで確認する場合は、以下の順で実行します。

```bash
pnpm build
pnpm preview
```

型チェックだけを実行する場合は、以下を使います。

```bash
pnpm exec tsc -b
```

## コミット前のチェック

Huskyにより、`git commit` の直前に以下を順番に実行します。

```bash
pnpm lint
pnpm format:check
pnpm test:run --passWithNoTests
```

対象はステージ済みファイルだけではなく、各ツールの設定に従ったプロジェクト全体です。
いずれかが失敗すると、後続のチェックとコミットを停止します。

整形チェックで失敗した場合は、以下で整形し、変更したファイルを再度ステージしてください。

```bash
pnpm format
git add <変更したファイル>
```

Lintやテストで失敗した場合は、表示された問題を修正してから再度コミットします。
フックでは自動修正を行いません。

現在はテストファイルを作成していないため、コミット時には `--passWithNoTests` を指定しています。
テストを追加すると、そのテストが実行され、失敗時はコミットが止まります。
`pnpm test:run` 単体は、テストがない場合に失敗します。

## shadcn/uiの部品追加

必要な部品名を指定して追加します。

```bash
pnpm dlx shadcn@latest add input card dialog
pnpm format
```

部品は `src/components/ui/` に追加されます。
