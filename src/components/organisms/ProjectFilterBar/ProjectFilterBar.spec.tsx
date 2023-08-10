import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { render } from '@testing-library/react'
import { MockData } from '@/test/TestOvermindMockData'
import ProjectFilterBar from '@/components/organisms/ProjectFilterBar/ProjectFilterBar'

const mockPush = jest.fn()
jest.mock(`next/navigation`, () => ({
  ...jest.requireActual(`next/navigation`),
  useRouter: () => ({ push: mockPush, query: { query: `testId` } }),
  useSearchParams: () => ({ get: () => `testParams` }),
}))

it(`renders correctly with no data`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <ProjectFilterBar />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})

it(`renders correctly with loaded data`, () => {
  const { container } = render(
    <TestOvermindWrapper searchFilters={MockData.SEARCH_FILTER_VALUES}>
      <ProjectFilterBar />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})