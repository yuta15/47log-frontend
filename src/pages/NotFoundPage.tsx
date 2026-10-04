import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 p-6">
      <h1>ページが見つかりません</h1>
      <Link to="/" className="text-primary underline underline-offset-4">
        トップページへ戻る
      </Link>
    </main>
  )
}
