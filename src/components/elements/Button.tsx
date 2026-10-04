import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'outline'
}

export default function Button({
  type = 'button',
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary'
          ? 'border-transparent bg-primary text-primary-foreground hover:bg-primary/90'
          : 'border-border bg-background text-primary hover:bg-accent',
        className,
      )}
      {...props}
    />
  )
}
