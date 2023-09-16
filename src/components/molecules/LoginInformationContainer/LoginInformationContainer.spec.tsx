import { render } from '@testing-library/react'
import LoginInformationContainer from './LoginInformationContainer'

describe(`LoginInformationContainer`, () => {
  it(`renders correctly`, () => {
    const { container } = render(<LoginInformationContainer />)
    expect(container).toMatchSnapshot()
  })
})