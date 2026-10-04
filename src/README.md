# このディレクトリに配置するもの

以下は構成例。実際のディレクトリが変わっても変更不要。この形を目指す

```
src/
├── assets/          # 画像、ロゴ、アイコンなどの静的ファイル
├── components/
│   ├── elements/    # Button、Input、Containerなど基本部品
│   ├── blocks/      # Headerなど基本部品を組み合わせた部品
│   └── layouts/     # AppLayoutなどページ全体の構成
├── features/        # 機能固有のUI、処理、型
│   └── posts/       # 例：投稿機能
│       ├── components/  # 投稿一覧、投稿カード、投稿フォーム
│       ├── hooks/       # 投稿取得・投稿操作などのカスタムフック
│       ├── api/         # 投稿APIの呼び出し
│       ├── types.ts     # 投稿機能で使う型
│       └── utils.ts     # 投稿機能専用の補助処理
├── hooks/           # 複数の機能で使うカスタムフック
├── lib/             # APIクライアント、ライブラリ設定、共通の補助処理
├── pages/           # URLに対応する画面。レイアウトと各機能の組み合わせ
├── types/           # 複数の機能で共有する型
├── test/            # テスト共通設定、共通モック、テスト用ヘルパー
├── App.tsx          # ルーティング定義、アプリ全体の構成
├── main.tsx         # Reactの起動処理、全体のProvider設定
└── index.css        # 全体スタイル、テーマ、Tailwind設定
```

## 画面・機能の追加

- 画面は `pages/` に作成し、`App.tsx` に `Route` を追加する。

機能の配置方針は [features/README.md](features/README.md) を参照する。

## 認証と画面遷移

認証を実装する際は、次の方針に従う。

- 認証状態の管理・認証API・保護ルートは `features/auth/` に配置する。
- 認証状態を共有するProviderは `main.tsx` に配置する。
- `App.tsx` で、認証が必要なルートを保護ルートの子としてまとめる。
- 保護ルートは認証確認中に待機表示、未ログイン時に `Navigate` でログイン画面へ遷移、ログイン済みなら `Outlet` で子の画面を表示する。

認証状態の管理と保護ルートは現時点では未実装。
API側でも認証・認可を確認し、画面のアクセス制御だけに依存しない。

## 共通の配色

ライトテーマのみを使用し、ダークモードには対応しない。配色は `index.css` のCSS変数で管理する。

- ページとヘッダーの背景は白（`bg-background`）。
- ロゴ・見出し・本文はネイビー `#192C3B`（`text-foreground`）。
- 主要ボタンはティール `#237C79`（`bg-primary`）と白文字（`text-primary-foreground`）。リンクや選択中のナビには `text-primary` を使う。
- 補足文には `text-muted-foreground`、薄い境界線には `border-border` を使う。
- ホバーなどの背景には淡いティールの `bg-accent` を使う。

各コンポーネントでは色を直接指定せず、用途に対応するテーマのクラスを使う。

## 文字・余白・レイアウト

- フォントは欧文にGeist、日本語にOS標準のゴシック体を使う。
- 本文は16px・行間1.6を全体設定とする。補足文は `text-sm`（14px）、ページ見出しは `text-2xl font-semibold`（24px）を指定する。
- 余白はTailwindの4px単位を使い、主に `gap-2` / `gap-4` / `gap-6` / `gap-8`（8 / 16 / 24 / 32px）を使う。
- 共通の幅と画面端の余白は `components/elements/Container.tsx` で管理する。最大幅は1152px（余白込み）、左右の余白は16px、768px以上で24pxとする。
- フォームを狭く表示するときは、Container内に `mx-auto w-full max-w-form`（最大640px）を指定した要素を置く。
- ページの上下余白は `py-8`（32px）を基本とする。
- 角丸は既存shadcnの設定を使い、基本は `rounded-lg`（10px）とする。
- 区切りには薄い境界線を使い、影はメニューやダイアログなどに限定する。
