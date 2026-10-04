import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from '@/App'
import ErrorBoundary from '@/components/elements/ErrorBoundary'
import UnexpectedErrorPage from '@/pages/UnexpectedErrorPage'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('共通エラー表示', () => {
  it('正常時は子コンポーネントを表示する', () => {
    render(
      <ErrorBoundary fallback={<UnexpectedErrorPage />}>
        <p>通常の画面</p>
      </ErrorBoundary>,
    )

    expect(screen.getByText('通常の画面')).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: '予期しない問題が発生しました' }),
    ).not.toBeInTheDocument()
  })

  it('描画エラー時はルーターなしで障害表示と再読み込み用リンクを表示する', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    function BrokenComponent(): never {
      throw new Error('描画エラー')
    }

    render(
      <ErrorBoundary fallback={<UnexpectedErrorPage />}>
        <BrokenComponent />
      </ErrorBoundary>,
    )

    expect(
      screen.getByRole('heading', { name: '予期しない問題が発生しました' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/解消しない場合は/)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'トップページへ戻る' }),
    ).toHaveAttribute('href', '/')
  })

  it('存在しないURLでは共通Layoutと404表示を表示する', () => {
    render(
      <MemoryRouter initialEntries={['/missing-page']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'ページが見つかりません' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'トップページへ戻る' }),
    ).toHaveAttribute('href', '/')
  })
})
