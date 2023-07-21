import { SubRegion } from '@/@types/geojson'
import { useActions, useAppState, useEffects } from '@/overmind'
import { Flex, Text, Box, Divider, Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { AutoComplete } from '../AutoComplete/AutoComplete'
import { CarbonReduction } from '@/@types/State'

export const getCountryPlaceholder = (carbonReduction: CarbonReduction, t: any, countryTranslate: any): string => {
  let placeholder: string = t(`regions.chooseCountry`)
  if (carbonReduction.carbonMapHoveredCountry !== ``) {
    if (carbonReduction.carbonMapHoveredCountry !== carbonReduction.carbonMapDataFilters?.country) {
      placeholder = countryTranslate(`${carbonReduction.carbonMapHoveredCountry}`)
    } else {
      placeholder = countryTranslate(`${carbonReduction.carbonMapDataFilters?.country}`)
    }
  } else if (carbonReduction.carbonMapDataFilters?.country) {
    placeholder = countryTranslate(`${carbonReduction.carbonMapDataFilters?.country}`)
  }
  return placeholder
}

export const RegionSearch = (): React.JSX.Element => {
  const { t } = useTranslation(`home`)
  const { t: countryTranslate } = useTranslation(`countries`)

  const { carbonReduction } = useAppState().analytics
  const { setSubRegion, setHoverSubRegion, setCountry, setHoverCountry, clearLocationFilters } = useActions().analytics
  const { generateCountryByRegion } = useEffects().analytics

  const getSearchItems = (): {
    value: string
    label: string
  }[] => {
    if (carbonReduction.carbonMapDataFilters.region && carbonReduction.carbonMapDataFilters.region !== SubRegion.WORLD) {
      const test = generateCountryByRegion(carbonReduction.carbonMapDataFilters.region).map((country) => ({
        value: country,
        label: countryTranslate(`${country}`),
      }))
      return test
    } else {
      return Object.values(SubRegion).map((region) => ({
        value: region,
        label: t(`regions.${region}`),
      }))
    }
  }
  const regionTitle = () => {
    if (carbonReduction.carbonMapDataFilters?.region !== SubRegion.WORLD) {
      return (
        <Flex alignItems={`center`}>
          <Button variant="lightGrayRound" marginRight={4} data-testid="button-region-back" onClick={() => clearLocationFilters()}>
            &lt;
          </Button>
          <Text fontWeight={`bold`}>{t(`regions.${carbonReduction.carbonMapDataFilters.region}`)}</Text>
        </Flex>
      )
    } else {
      return (
        <Box>
          <Text fontWeight={`bold`}>Region</Text>
        </Box>
      )
    }
  }
  return (
    <Flex height="auto" alignItems={`center`}>
      {regionTitle()}
      <Divider marginX={[`0.75rem`, `1.5rem`]} height={`70px`} orientation="vertical" />
      {carbonReduction.carbonMapDataFilters?.region !== SubRegion.WORLD ? (
        <AutoComplete
          onItemClick={(country) => setCountry(country.value)}
          onItemHover={(country) => setHoverCountry(country.value)}
          onDropDownLeave={() => setHoverCountry(``)}
          items={getSearchItems()}
          placeholder={getCountryPlaceholder(carbonReduction, t, countryTranslate)}
        />
      ) : (
        <AutoComplete
          onItemHover={(region) => setHoverSubRegion(region.value)}
          onDropDownLeave={() => setHoverSubRegion(``)}
          onItemClick={(region) => setSubRegion(region.value)}
          items={getSearchItems()}
          placeholder={carbonReduction?.carbonMapHoveredRegion !== `` ? t(`regions.${carbonReduction.carbonMapHoveredRegion}`) : t(`regions.chooseRegion`)}
        />
      )}
    </Flex>
  )
}
