import type { ReactNode } from 'react'
import { Link } from 'react-router'
import Container from '@/components/elements/Container'

type HeaderProps = {
  actions?: ReactNode
}

export default function Header({ actions }: HeaderProps) {
  return (
    <header className="border-b border-border bg-background">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          aria-label="47log トップページ"
          className="rounded-sm text-2xl font-semibold tracking-tight text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          47log
        </Link>
        <div className="flex min-h-10 shrink-0 items-center">{actions}</div>
      </Container>
    </header>
  )
}
