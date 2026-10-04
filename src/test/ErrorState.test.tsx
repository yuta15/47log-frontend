import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ErrorState from '@/components/blocks/ErrorState'

describe('ErrorStateの再試行', () => {
  it('onRetryを省略すると再試行ボタンを表示しない', () => {
    render(<ErrorState title="読み込みに失敗しました" />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('再試行ボタンを押すと呼び出し元の処理を実行する', async () => {
    const user = userEvent.setup()
    const retry = vi.fn()
    render(<ErrorState title="読み込みに失敗しました" onRetry={retry} />)

    await user.click(screen.getByRole('button', { name: '再試行' }))

    expect(retry).toHaveBeenCalledTimes(1)
  })

  it('再試行中はボタンを押しても処理を追加実行しない', async () => {
    const user = userEvent.setup()
    const retry = vi.fn()
    render(
      <ErrorState title="読み込みに失敗しました" onRetry={retry} isRetrying />,
    )

    await user.click(screen.getByRole('button', { name: '再試行中' }))

    expect(retry).not.toHaveBeenCalled()
  })
})
