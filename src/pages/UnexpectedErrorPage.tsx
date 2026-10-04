import ErrorPage from '@/components/blocks/ErrorPage'

export default function UnexpectedErrorPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <ErrorPage
        title="予期しない問題が発生しました"
        description="トップページへ戻って、再度お試しください。解消しない場合は、時間をおいて再度お試しください。"
      />
    </div>
  )
}
