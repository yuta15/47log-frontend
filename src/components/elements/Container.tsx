import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export default function Container({
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn('mx-auto w-full max-w-page px-4 md:px-6', className)}
      {...props}
    />
  )
}
