import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { WatchlistMenu } from './WatchlistMenu'
import { TestRouter } from '@/test/TestRouter'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { watchlistData } from '@/test/mock-data/watchlist_data'

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <TestRouter router={{}}>
        <WatchlistMenu watchlist={watchlistData[0]} />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly and click rename`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <TestRouter router={{}}>
        <WatchlistMenu watchlist={watchlistData[0]} />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  const renameButton = screen.getByTestId(`watchlist-rename`)
  fireEvent.click(renameButton)
  expect(container).toMatchSnapshot()
})

it(`renders correctly and click rename`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <TestRouter router={{}}>
        <WatchlistMenu watchlist={watchlistData[0]} />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  const renameButton = screen.getByTestId(`watchlist-delete`)
  fireEvent.click(renameButton)
  waitFor(() => screen.getByTestId(`cancel-delete-modal`))
  fireEvent.click(screen.getByTestId(`cancel-delete-modal`))
  expect(container).toMatchSnapshot()
})

it(`renders correctly and click rename`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <TestRouter router={{}}>
        <WatchlistMenu watchlist={watchlistData[0]} />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  const renameButton = screen.getByTestId(`watchlist-delete`)
  fireEvent.click(renameButton)
  waitFor(() => screen.getByTestId(`confirm-delete-modal`))
  fireEvent.click(screen.getByTestId(`confirm-delete-modal`))
  expect(container).toMatchSnapshot()
})
