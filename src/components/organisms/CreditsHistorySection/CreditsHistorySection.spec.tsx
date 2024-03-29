import { render } from '@testing-library/react'

import CreditsHistorySection from '@/components/organisms/CreditsHistorySection/CreditsHistorySection'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { MockData } from '@/test/TestOvermindMockData'

describe(`CreditsHistorySection`, () => {
  test(`renders loading state when creditsHistoryData is undefined`, () => {
    const { container } = render(
      <TestOvermindWrapper>
        <CreditsHistorySection />
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
  })

  test(`renders the widget when rawCreditsHistory and creditsHistoryData are defined`, () => {
    const { container } = render(
      <TestOvermindWrapper creditsHistory={MockData.CREDIT_HISTORY_DATA}>
        <CreditsHistorySection />
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
  })

  test(`renders the widget when rawCreditsHistory and creditsHistoryData are defined but has no chart data`, () => {
    const { container } = render(
      <TestOvermindWrapper creditsHistory={MockData.CREDIT_HISTORY_DATA_EMPTY_CHART}>
        <CreditsHistorySection />
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
  })
})
