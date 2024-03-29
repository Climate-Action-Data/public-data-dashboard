import { changeHoverColor } from '@/utils/Stickify'
import { Table, Tbody, Td, Tr } from '@chakra-ui/react'
import { EffectResponse } from '@/@types/EffectResponse'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { ProjectSearchBodySkeleton } from '../ProjectSearchBodySkeleton/ProjectSearchBodySkeleton'
import { UnitSearchResponse, UnitSearchResult } from '@/@types/UnitSearchResult'
import { formatDate } from '@/utils/DateFormat'
import { DateFormats } from '@/@types/DateFormats'
import { TableData } from '../TableData/TableData'
import { generateUnitUrl } from '@/utils/RequestHelpers'
import { UnitStatus } from '@/@types/Unit'
import { SearchFlow } from '@/@types/Search'

interface UnitSearchBodyContentProps {
  unitResults?: EffectResponse<UnitSearchResponse>
}

export const UnitSearchBodyContent = (props: UnitSearchBodyContentProps) => {
  const { unitResults } = props
  const router = useRouter()
  const { t } = useTranslation(`home`)

  const generateTableRow = (unitList: UnitSearchResult[]) => {
    return unitList.map((unit, idx) => {
      const redirectId = unit?.status === UnitStatus.RETIRED ? unit.warehouseUnitId : unit.issuanceId
      const generatedUrl = generateUnitUrl(`${unit?.status}`, redirectId ?? ``, SearchFlow.UNIT)

      return (
        <Tr
          onClick={() => router.push(`${generatedUrl}`)}
          data-testid="unit-table-row"
          onMouseEnter={() => changeHoverColor(`project-row-${idx}`, `hoverGreen`)}
          className={`project-row-${idx}`}
          key={`project-body-row-${unit.warehouseUnitId}`}
          height="92px"
        >
          <Td title={unit.status}>
            <TableData data={unit.status} />
          </Td>
          <Td title={unit.vintage?.toString()}>
            <TableData data={unit.vintage?.toString()} />
          </Td>
          <Td title={unit.quantity?.toLocaleString()}>
            <TableData data={unit.quantity?.toLocaleString()} />
          </Td>
          <Td title={unit?.issuanceDate ? formatDate(unit.issuanceDate, DateFormats.YYYY_MM_DD) : t(`noData`)}>
            <TableData data={unit?.issuanceDate ? formatDate(unit.issuanceDate, DateFormats.YYYY_MM_DD) : t(`noData`)} />
          </Td>
          <Td title={unit?.project?.standard}>
            <TableData data={unit?.project?.standard} />
          </Td>
          <Td title={unit?.project?.methodology}>
            <TableData data={unit?.project?.methodology} />
          </Td>
          <Td title={unit?.project?.sector}>
            <TableData data={unit?.project?.sector} />
          </Td>
          <Td title={unit?.project?.country}>
            <TableData data={unit?.project?.country} />
          </Td>
          <Td title={unit?.correspondingAdjustment}>
            <TableData data={unit?.correspondingAdjustment} />
          </Td>
          <Td minW="250px !important" title={unit.marketplace}>
            <TableData data={unit?.marketplace} />
          </Td>
          <Td minW="250px !important" title={unit.serialNumber}>
            <TableData data={unit.serialNumber} />
          </Td>
        </Tr>
      )
    })
  }

  return (
    <Table variant="simple" className="searchTable">
      <Tbody data-testid="table-scroll">{unitResults?.data?.units !== undefined ? generateTableRow(unitResults.data.units) : <ProjectSearchBodySkeleton />}</Tbody>
    </Table>
  )
}
