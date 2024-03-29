import { changeHoverColor } from '@/utils/Stickify'
import { Box, Button, Flex, Menu, MenuButton, Skeleton, Stack, Table, Tbody, Td, Text, Tr } from '@chakra-ui/react'
import { MenuContent } from '@/components/atoms/MenuContent/MenuContent'
import { KebabMenuIcon } from '../KebabMenuIcon/KebabMenuIcon'
import { EffectResponse } from '@/@types/EffectResponse'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { UnitSearchResponse, UnitSearchResult } from '@/@types/UnitSearchResult'
import { generateUnitUrl } from '@/utils/RequestHelpers'
import { generateRandomString } from '@/utils/GenerationHelpers'
import { UnitStatus } from '@/@types/Unit'
import { generateMenuList } from '@/utils/MenuOptionHelper'
import { SearchFlow } from '@/@types/Search'

interface UnitSearchHeadContentProps {
  unitResults?: EffectResponse<UnitSearchResponse>
}

export const UnitSearchHeadContent = (props: UnitSearchHeadContentProps) => {
  const { unitResults } = props
  const router = useRouter()
  const { t } = useTranslation(`search`)

  const handleClick = (unitId: string, unitStatus: string, event?: any) => {
    if (event?.target) {
      const target = event.target as HTMLElement
      if (target instanceof HTMLTableCellElement || target instanceof HTMLParagraphElement) {
        const generatedUrl = generateUnitUrl(`${unitStatus}`, unitId, SearchFlow.UNIT)

        router.push(`${generatedUrl}`)
      }
    }
  }

  const buildMenuContent = (unitWarehouseId: string, projectWarehouseId: string, unitStatus: string) => {
    return generateMenuList(unitWarehouseId, projectWarehouseId, unitStatus, router, t)
  }

  const generateTableRow = (unitList: UnitSearchResult[]) => {
    return unitList.map((unitResults, idx) => {
      const redirectId = unitResults?.status === UnitStatus.RETIRED ? unitResults.warehouseUnitId : unitResults.issuanceId

      return (
        <Tr
          onClick={(event) => handleClick(redirectId ?? unitResults.warehouseUnitId, unitResults.status, event)}
          onMouseEnter={() => changeHoverColor(`project-row-${idx}`, `hoverGreen`)}
          data-testid="project-search-head-row"
          className={`project-row-${idx}`}
          key={`project-row-${generateRandomString()}`}
          height="92px"
        >
          <Td data-testid="project-search-head-row-td">
            <Flex alignItems="center">
              <Box title={unitResults?.project?.name} overflow="hidden" flex={1}>
                <Text fontWeight={500}>{unitResults?.project?.name}</Text>
                <Text fontSize="sm">{unitResults?.project?.id}</Text>
                <Text textOverflow="ellipsis" color="lightGray.700" fontSize="sm">
                  {unitResults?.project?.developer}
                </Text>
              </Box>
              <Menu variant="menuWhite">
                <MenuButton as={Button} textAlign="center" iconSpacing={0} rightIcon={<KebabMenuIcon />} variant="lightGrayRound32"></MenuButton>
                <MenuContent menuItems={buildMenuContent(redirectId ?? unitResults.warehouseUnitId, unitResults?.project?.warehouseProjectId, unitResults.status)} />
              </Menu>
            </Flex>
          </Td>
        </Tr>
      )
    })
  }

  return (
    <Table variant="simple" className="searchTable">
      <Tbody borderRight="1px solid #B8BEC0">
        {unitResults?.data?.units !== undefined ? (
          generateTableRow(unitResults.data.units)
        ) : (
          <Tr height="92px">
            <Td>
              <Flex alignItems="center">
                <Box flex={1}>
                  <Stack>
                    <Skeleton height="20px" />
                    <Skeleton height="10px" />
                    <Skeleton height="10px" />
                  </Stack>
                </Box>
              </Flex>
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  )
}
