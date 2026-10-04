import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type SpinnerProps = Omit<ComponentProps<'span'>, 'children'> & {
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

const sizeClasses = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
}

export default function Spinner({
  size = 'md',
  label = '読み込み中',
  className,
  ...props
}: SpinnerProps) {
  return (
    <span
      role="status"
      className={cn(
        'inline-flex shrink-0 align-middle text-primary',
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          'animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none',
          sizeClasses[size],
        )}
      />
      <span className="sr-only">{label}</span>
    </span>
  )
}
