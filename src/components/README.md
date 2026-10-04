# このディレクトリに配置するもの

- `elements/`: Button、Input、Containerなど、単体の要素や小さな配置用の基本部品。
- `blocks/`: Header、共通エラー表示など、基本部品を組み合わせた部品。
- `layouts/`: AppLayoutなど、共通部品とページを配置する全体構成。

依存は `layouts → blocks → elements` を基本とする。
`layouts` から `elements` を直接使うこともできる。逆方向への依存は作らない。
機能固有のUIは `features/` に配置する。

shadcn/uiで追加する部品の出力先は `elements/` に設定している。

## Headerの右側の表示

Headerはロゴと、右側に任意の要素を配置する枠を提供する。
`actions` を省略するとロゴのみ表示する。

```tsx
<Header />
<Header actions={<HeaderAuth />} />
```

認証状態の判断やログインリンク、ユーザーメニューは認証機能側で実装し、
AppLayoutから `actions` に渡す。Header自体には認証に関する処理を持たせない。
上記のHeaderAuthは将来の利用例で、現時点では未実装。AppLayoutではロゴのみ表示する。

## Spinner

`elements/Spinner.tsx` は配置や画面遷移を持たない、単体の読み込み表示。
サイズは `sm`（16px）、`md`（24px・既定）、`lg`（32px）から選べる。
色は既定でティール。`className` で変更できる。

```tsx
<Spinner />
<Spinner size="sm" label="保存中" className="text-primary-foreground" />
```

ラベルはスクリーンリーダー向けに読み上げ、見た目にはスピナーのみ表示する。
OSで動きを減らす設定をしている場合は回転しない。

## 共通エラー表示

`blocks/ErrorPage.tsx` に `title`、任意の `description` と `actions` を渡す。
操作を省略すると「トップページへ戻る」を表示する。
このリンクはページ全体を読み込み直すため、Error Boundaryのエラー状態も初期化される。

404は `pages/NotFoundPage.tsx`、予期しない描画エラーは `pages/UnexpectedErrorPage.tsx` で文言を指定する。
障害表示はルーターやHeaderに依存せず、共通部分の描画が失敗した場合も表示できる。

`elements/ErrorBoundary.tsx` は子コンポーネントの描画エラーを捕まえ、渡された `fallback` を表示する。
`main.tsx` でアプリ全体を囲む。API通信やイベントハンドラー内のエラーは各処理で扱う。

## ページ内のエラー表示

`blocks/ErrorState.tsx` は一覧やフォームなど、ページの一部分で使うエラー表示。
`title` と、任意の `description`、`onRetry`、`isRetrying` を渡す。
`onRetry` がある場合は、内部の共通Buttonで「再試行」を表示する。
`isRetrying` が `true` の間はボタンを無効化し、Spinnerと「再試行中」を表示する。
通信・再試行処理と実行中の状態は呼び出し元で管理する。

```tsx
<ErrorState
  title="一覧を読み込めませんでした"
  description="時間をおいて、再度お試しください。"
  onRetry={retry}
  isRetrying={isRetrying}
/>
```

エラーが発生したときに表示する。`role="alert"` でスクリーンリーダーにも通知する。

`elements/Button.tsx` はティールの共通ボタン。既定の `type` は `button`。
`variant="outline"` で控えめな枠線のボタンを表示する。ErrorStateの再試行にはこの種類を使う。
フォーム送信に使う場合は `type="submit"` を指定する。
確認用の `/error` ページでは、再試行操作としてページを再読み込みする。
