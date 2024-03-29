import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { fireEvent, render, screen } from '@testing-library/react'
import UnitFilterAndSearch from '@/components/organisms/UnitFilterAndSearch/UnitFilterAndSearch'

const mockPush = jest.fn()
jest.mock(`next/navigation`, () => ({
  ...jest.requireActual(`next/navigation`),
  useRouter: () => ({ push: mockPush, query: { query: `testId` } }),
  useSearchParams: () => ({ get: () => `testParams` }),
}))

it(`UnitFilterBar renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <UnitFilterAndSearch />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`UnitFilterBar renders correctly and the filter-and-search-trigger was clicked`, () => {
  render(
    <TestOvermindWrapper>
      <UnitFilterAndSearch />
    </TestOvermindWrapper>,
  )

  fireEvent.click(screen.getByTestId(`filter-and-search-trigger`))
  fireEvent.click(screen.getByTestId(`filter-and-search-trigger`))

  expect(screen.getByText(`Search units by keywords`)).toBeDefined()
})
