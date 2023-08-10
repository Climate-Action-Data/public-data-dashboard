import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex, Spacer, Stack, StackDivider } from '@chakra-ui/react'

import { useActions, useAppState, useEffects } from '@/overmind'
import AutoCompleteCheckbox from '@/components/molecules/AutoCompleteCheckbox/AutoCompleteCheckbox'
import CreditingPeriodFilter from '@/components/molecules/CreditingPeriodFilter/CreditingPeriodFilter'
import { KYOTO_PROTOCOL_START_DATE } from '@/@types/CarbonStandards'
import { DatesFilter } from '@/@types/ProjectSearchFilterValues'
import FilterBarWrapper from '@/components/molecules/FilterBarWarpper/FilterBarWrapper'
import SearchButton from '@/components/atoms/SearchButton/SearchButton'

const ProjectFilterBar: FC = () => {
  const {
    allSearchFilterValues: { searchFilterValues, isEmpty },
    selectedProjectSearchFilterValues: { searchFilterValues: selectedSearchFilters },
  } = useAppState().searchFilters

  const { setProjectCountriesFilter, setProjectMethodologiesFilter, setProjectSectorsFilter, setProjectStandardsFilter, setProjectCreditingPeriodFilter } =
    useActions().searchFilters
  const { getGovernanceData } = useEffects().searchFilters
  const { transformGovernanceDataToSearchFilterData } = useActions().searchFilters
  const { t } = useTranslation(`search`)

  useEffect(() => {
    if (isEmpty) {
      getGovernanceData().then((result) => {
        transformGovernanceDataToSearchFilterData(result)
      })
    }
  }, [])

  const handleProjectStatusFilter = (value: string[]) => {
    setProjectStandardsFilter(value)
  }

  const handleSetProjectMethodologiesFilter = (value: string[]) => {
    setProjectMethodologiesFilter(value)
  }

  const handleSetProjectSectorsFilter = (value: string[]) => {
    setProjectSectorsFilter(value)
  }

  const handleSetProjectCountriesFilter = (value: string[]) => {
    setProjectCountriesFilter(value)
  }

  const handleSetProjectCreditingPeriodFilter = (value: DatesFilter) => {
    setProjectCreditingPeriodFilter(value)
  }

  return (
    <FilterBarWrapper>
      <Stack direction={[`column`, null, null, `row`]}>
        <Stack direction={[`column`, null, null, `row`]} divider={<StackDivider borderColor="lightGray.400" />} width="100%">
          <AutoCompleteCheckbox
            label={t(`filterBar.standard`)}
            options={searchFilterValues.projectStatus}
            selectedFilters={selectedSearchFilters.projectStatus}
            noOfSelectedFilters={selectedSearchFilters.projectStatus.length}
            applyFilters={handleProjectStatusFilter}
          />
          <AutoCompleteCheckbox
            label={t(`filterBar.methodology`)}
            options={searchFilterValues.methodologies}
            selectedFilters={selectedSearchFilters.methodologies}
            noOfSelectedFilters={selectedSearchFilters.methodologies.length}
            applyFilters={handleSetProjectMethodologiesFilter}
          />
          <AutoCompleteCheckbox
            label={t(`filterBar.sector`)}
            options={searchFilterValues.sectors}
            selectedFilters={selectedSearchFilters.sectors}
            noOfSelectedFilters={selectedSearchFilters.sectors.length}
            applyFilters={handleSetProjectSectorsFilter}
          />
          <AutoCompleteCheckbox
            label={t(`filterBar.country`)}
            options={searchFilterValues.countries}
            selectedFilters={selectedSearchFilters.countries}
            noOfSelectedFilters={selectedSearchFilters.countries.length}
            applyFilters={handleSetProjectCountriesFilter}
          />
          <CreditingPeriodFilter
            label={t(`filterBar.creditingPeriod`)}
            dateFilter={selectedSearchFilters.creditingPeriod}
            earliestDate={KYOTO_PROTOCOL_START_DATE}
            applyFilters={handleSetProjectCreditingPeriodFilter}
          />
        </Stack>
        <Flex>
          <Spacer minWidth={`32px`} />
          <SearchButton href={`/search/projects`} />
        </Flex>
      </Stack>
    </FilterBarWrapper>
  )
}

export default ProjectFilterBar