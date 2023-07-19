import { render } from '@testing-library/react'
import Home from './page'
import { TestOvermindWrapper } from '@/components/atoms/TestOvermindWrapper/TestOvermindWrapper'

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <Home />
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})
