import ErrorPage from '@/components/blocks/ErrorPage'

export default function NotFoundPage() {
  return (
    <ErrorPage
      title="ページが見つかりません"
      description="ページが削除されたか、URLが間違っている可能性があります。"
    />
  )
}
