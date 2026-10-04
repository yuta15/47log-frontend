import type { ReactNode } from 'react'
import Container from '@/components/elements/Container'

type ErrorPageProps = {
  title: string
  description?: string
  actions?: ReactNode
}

export default function ErrorPage({
  title,
  description,
  actions,
}: ErrorPageProps) {
  return (
    <main className="flex flex-1 items-center py-8">
      <Container className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description && (
          <p className="max-w-form text-muted-foreground">{description}</p>
        )}
        {actions ?? (
          <a
            href="/"
            className="rounded-sm text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            トップページへ戻る
          </a>
        )}
      </Container>
    </main>
  )
}
