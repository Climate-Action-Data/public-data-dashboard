'use client'
import { NextPage } from 'next'
import { useEffect, useLayoutEffect } from 'react'
import { Box, Container, Flex } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'

import { useActions, useAppState, useEffects } from '@/overmind'
import { setScrollEventListeners } from '@/utils/Stickify'
import { ALLOWED_RENDER_TYPE, DEFAULT_PROJECT_COUNT_TO_DISPLAY, ESearchParams } from '@/@types/ProjectSearchResult'

import { ProjectSearchHead } from '@/components/molecules/ProjectSearchHead/ProjectSearchHead'
import { PaginationWidget } from '@/components/atoms/PaginationWidget/PaginationWidget'
import { UnitSearchBody } from '@/components/molecules/UnitSearchBody/UnitSearchBody'
import { CSVDownload } from '@/components/molecules/CSVDownload/CSVDownload'
import { CSVExportTypes } from '@/@types/CSV'

const UnitPage: NextPage = () => {
  const { getUnitResults, getUnitFilterResults } = useEffects().unitResult
  const { setUnitResults, clearUnitResults } = useActions().unitResult
  const { resetSearchFilters } = useActions().searchFilters
  const { unitResults } = useAppState().unitResult
  const { selectedUnitSearchFilterValues } = useAppState().searchFilters
  const searchParams = useSearchParams()
  const pattern = searchParams.get(ESearchParams.KEYWORD) ?? ``
  const filter = searchParams.get(ESearchParams.FILTER) ?? undefined

  useEffect(() => {
    if (filter) {
      clearUnitResults()
      getUnitFilterResults(selectedUnitSearchFilterValues.searchFilterValues).then((hasProjectResults) => {
        setUnitResults(hasProjectResults)
      })
    } else {
      clearUnitResults()
      resetSearchFilters()
      getUnitResults(pattern).then((hasProjectResults) => {
        setUnitResults(hasProjectResults)
      })
    }
  }, [pattern, filter])

  const handlePageChange = (currentPage: number, from: number) => {
    getUnitResults(pattern, from).then((hasProjectResults) => {
      setUnitResults(hasProjectResults)
    })
  }

  useLayoutEffect(() => {
    const projectTable = document.querySelector(`#projectTable`)
    const projectTableReference = document.querySelector(`#projectTableReference`)
    const table = document.querySelector(`#table`)
    const tableReference = document.querySelector(`#tableReference`)
    const reference = document.querySelector(`#headerReference`)
    const scrollableHeader = document.querySelector(`#scrollableHeader`)
    const multiScroll = document.querySelector(`#multiScroll`)

    if (table && tableReference && reference && projectTable && projectTableReference && multiScroll && scrollableHeader) {
      setScrollEventListeners(table, tableReference, reference, projectTable, projectTableReference, multiScroll, scrollableHeader)
    }
  })

  return (
    <Flex maxW={`100vw`} paddingBottom="50px">
      <ProjectSearchHead renderType={ALLOWED_RENDER_TYPE.UNIT} />
      <UnitSearchBody renderType={ALLOWED_RENDER_TYPE.UNIT} />
      <Container variant={`paginationBar`}>
        <PaginationWidget onPageChange={handlePageChange} resultPerPage={DEFAULT_PROJECT_COUNT_TO_DISPLAY} totalResults={unitResults?.data?.totalCount ?? 0} />
        <Box position={[`unset`, `absolute`]} right="10px" float="right">
          <CSVDownload exportType={CSVExportTypes.UNIT} pattern={pattern} />
        </Box>
      </Container>
    </Flex>
  )
}

export default UnitPage
