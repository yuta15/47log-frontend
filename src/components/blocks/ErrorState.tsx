import Button from '@/components/elements/Button'
import Spinner from '@/components/elements/Spinner'

type ErrorStateProps = {
  title: string
  description?: string
  onRetry?: () => void
  isRetrying?: boolean
}

export default function ErrorState({
  title,
  description,
  onRetry,
  isRetrying = false,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-2 rounded-lg border border-border bg-destructive/5 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-6"
    >
      <div className="flex min-w-0 items-start gap-2 sm:gap-3">
        <CircleAlert
          className="mt-0.5 size-4 shrink-0 text-destructive sm:size-5"
          aria-hidden="true"
        />
        <div className="min-w-0 break-words">
          <p className="font-semibold text-foreground">{title}</p>
          {description && (
            <p className="mt-0.5 text-muted-foreground sm:mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
      {onRetry && (
        <div className="ml-6 self-start sm:ml-0 sm:self-auto">
          <Button
            variant="outline"
            className="min-h-9 px-3 text-xs sm:min-h-10 sm:px-4 sm:text-sm"
            onClick={onRetry}
            disabled={isRetrying}
            aria-busy={isRetrying}
          >
            {isRetrying && (
              <Spinner size="sm" className="text-current" aria-hidden="true" />
            )}
            {isRetrying ? '再試行中' : '再試行'}
          </Button>
        </div>
      )}
    </div>
  )
}
import { CircleAlert } from 'lucide-react'
