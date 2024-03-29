import { render } from '@testing-library/react'
import layout from './layout'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'

const mockPush = jest.fn()
jest.mock(`next/navigation`, () => ({
  ...jest.requireActual(`next/navigation`),
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({ get: () => `testParams` }),
}))

it(`renders correctly`, () => {
  const { container } = render(<TestOvermindWrapper>{layout({ children: <>test</> })}</TestOvermindWrapper>)
  expect(container).toMatchSnapshot()
})
