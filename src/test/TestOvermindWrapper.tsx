import { PropsWithChildren } from 'react'
import { createOvermindMock } from 'overmind'
import { Provider } from 'overmind-react'

import { config } from '@/overmind'
import { SubRegion } from '@/@types/geojson'
import { TimeframesData } from '@/@types/Timeframe'
import { CreditsHistoryDataState, DataState } from '@/@types/State'

interface TestOvermindWrapperProps extends PropsWithChildren {
  analytics?: DataState
  creditsHistory?: CreditsHistoryDataState
}

export const TestOvermindWrapper = (props: TestOvermindWrapperProps) => {
  const actualProps = {
    ...props,
  }

  const carbonMapData = props?.analytics ?? {
    carbonReduction: {
      carbonMapHasCountryData: new Map<string, boolean>(),
      carbonMapDataFilters: { region: SubRegion.WORLD, timeframe: TimeframesData.MAX },
      carbonMapHoveredRegion: ``,
      carbonMapHoveredCountry: ``,
    },
    carbonMapDataFiltered: undefined,
  }
  const creditHistoryData = props?.creditsHistory ?? {
    filteredCreditsHistory: undefined,
    dataFilters: { region: SubRegion.WORLD, timeframe: TimeframesData.MAX },
  }

  const overmind = createOvermindMock(config, (state) => {
    state.analytics = carbonMapData
    state.creditsHistory = creditHistoryData
  })

  return <Provider value={overmind}>{actualProps.children}</Provider>
}
