import { changeHoverColor } from '@/utils/Stickify'
import { Tbody, Tr, Td, Table } from '@chakra-ui/react'
import { EffectResponse } from '@/@types/EffectResponse'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { ProjectSearchBodySkeleton } from '../ProjectSearchBodySkeleton/ProjectSearchBodySkeleton'
import { UnitSearchResult } from '@/@types/UnitSearchResult'
import { formatDate } from '@/utils/DateFormat'
import { DateFormats } from '@/@types/DateFormats'
import { TableData } from '../TableData/TableData'
interface UnitSearchBodyContentProps {
  unitResults?: EffectResponse<UnitSearchResult[]>
}

export const UnitSearchBodyContent = (props: UnitSearchBodyContentProps) => {
  const { unitResults } = props
  const router = useRouter()
  const { t } = useTranslation(`home`)

  const generateTableRow = (unitList: UnitSearchResult[]) => {
    return unitList.map((unit, idx) => (
      <Tr
        onClick={() => router.push(`/unit/${unit.warehouseUnitId}`)}
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
        <Td isNumeric title={unit.annualEst?.toLocaleString()}>
          <TableData data={unit.annualEst?.toLocaleString()} />
        </Td>
        <Td title={unit?.issuanceDate ? formatDate(unit.issuanceDate, DateFormats.YYYY_MM_DD) : t(`noData`)}>
          <TableData data={unit?.issuanceDate ? formatDate(unit.issuanceDate, DateFormats.YYYY_MM_DD) : t(`noData`)} />
        </Td>
        <Td title={unit?.retirementDate ? formatDate(unit.retirementDate, DateFormats.YYYY_MM_DD) : t(`noData`)}>
          <TableData data={unit?.retirementDate ? formatDate(unit.retirementDate, DateFormats.YYYY_MM_DD) : t(`noData`)} />
        </Td>
        <Td title={unit.projectStandard}>
          <TableData data={unit.projectStandard} />
        </Td>
        <Td title={unit.projectMethodology}>
          <TableData data={unit.projectMethodology} />
        </Td>
        <Td title={unit.projectSector}>
          <TableData data={unit.projectSector} />
        </Td>
        <Td title={unit.projectCountry}>
          <TableData data={unit.projectCountry} />
        </Td>
        <Td title={unit.correspondingAdjustment}>
          <TableData data={unit.correspondingAdjustment} />
        </Td>
        <Td minW="250px !important" title={unit.marketplace}>
          <TableData data={unit.marketplace} />
        </Td>
        <Td minW="250px !important" title={unit.serialNumber}>
          <TableData data={unit.serialNumber} />
        </Td>
      </Tr>
    ))
  }

  return (
    <Table variant="simple" className="searchTable">
      <Tbody data-testid="table-scroll">{unitResults?.data ? generateTableRow(unitResults.data) : <ProjectSearchBodySkeleton />}</Tbody>
    </Table>
  )
}