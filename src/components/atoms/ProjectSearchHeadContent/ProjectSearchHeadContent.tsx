import { changeHoverColor } from '@/utils/Stickify'
import { Box, Button, Flex, Menu, MenuButton, Skeleton, Stack, Table, Tbody, Td, Text, Tr } from '@chakra-ui/react'
import { BookmarkPlusIcon } from '../BookmarkPlusIcon/BookmarkPlusIcon'
import { DownloadIcon } from '../DownloadIcon/DownloadIcon'
import { KebabMenuIcon } from '../KebabMenuIcon/KebabMenuIcon'
import { ProjectSearchResponse, ProjectSearchResult } from '@/@types/ProjectSearchResult'
import { EffectResponse } from '@/@types/EffectResponse'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { MenuContent, MenuItemProps } from '../MenuContent/MenuContent'
import { generateProjectPDFDocument } from '../../../app/project/page.pdf'
import { AddWatchlistPopup } from '@/components/molecules/AddWatchlistPopup/AddWatchlistPopup'
import { useState } from 'react'
import { AddCompareIcon } from '../AddCompareIcon/AddCompareIcon'
import { RemoveCompareIcon } from '../RemoveCompareIcon/RemoveCompareIcon'
import { useActions, useAppState } from '@/overmind'
import { MinusIcon } from '../MinusIcon/MinusIcon'
import { generateProjectUrl } from '@/utils/RequestHelpers'
import { SearchFlow } from '@/@types/Search'

interface ProjectSearchHeadContentProps {
  watchlistId?: string
  projectResults?: EffectResponse<ProjectSearchResponse>
  refreshData?: () => void
}

export const ProjectSearchHeadContent = (props: ProjectSearchHeadContentProps) => {
  const { projectResults, watchlistId, refreshData } = props
  const router = useRouter()
  const [projectIdForWatchlist, setProjectIdForWatchlist] = useState<string>(``)
  const [selectedProjectWatchlists, setSelectedProjectWatchlists] = useState<string[]>([])
  const [showAddWatchlistPopup, setShowAddWatchlistPopup] = useState<boolean>(false)
  const { t } = useTranslation(`search`)
  const { isCompare, projects: projectsToCompare } = useAppState().compareProjects
  const { isAuthed } = useAppState().authentication
  const { setProjectToCompare, removeProjectFromCompare } = useActions().compareProjects
  const { removeProjectFromWatchlist } = useActions().watchlist
  const handleClick = (projectId: string, event?: any) => {
    if (event?.target) {
      const target = event.target as HTMLElement
      if (target instanceof HTMLTableCellElement || target instanceof HTMLParagraphElement) {
        router.push(`${generateProjectUrl(projectId, SearchFlow.PROJECT)}`)
      }
    }
  }

  const handleAddWatchlistClose = () => {
    setShowAddWatchlistPopup(false)
    refreshData?.()
  }
  const hanldeAddToWatchlist = (id: string, watchlists: string[]) => {
    setShowAddWatchlistPopup(true)
    setSelectedProjectWatchlists(watchlists)
    setProjectIdForWatchlist(id)
  }

  const handleRemoveFromWatchlist = (id: string) => {
    if (watchlistId) {
      removeProjectFromWatchlist({ warehouseProjectId: id, watchlistId: watchlistId })
        .then(() => {
          refreshData?.()
        })
        .catch(() => undefined)
    }
  }

  const generateMenuList = (projectWarehouseId: string, watchlists: string[]) => {
    const menuList: MenuItemProps[] = [
      { dataTestId: `view-project-details`, onClick: () => router.push(`${generateProjectUrl(projectWarehouseId, SearchFlow.PROJECT)}`), text: t(`projectMenu.viewProject`) },
      {
        dataTestId: `export-project`,
        onClick: () => {
          ;(async () => {
            generateProjectPDFDocument({ id: projectWarehouseId })
          })()
        },
        icon: <DownloadIcon />,
        text: t(`projectMenu.exportProject`),
      },
    ]
    if (isAuthed) {
      menuList.push({
        dataTestId: `add-from-watchlist`,
        icon: <BookmarkPlusIcon />,
        text: t(`projectMenu.addToWatchlists`),
        onClick: () => hanldeAddToWatchlist(projectWarehouseId, watchlists),
      })
    }
    if (watchlistId) {
      menuList.push({
        dataTestId: `remove-from-watchlist`,
        icon: <MinusIcon />,
        text: t(`projectMenu.removeToWatchlists`),
        onClick: () => handleRemoveFromWatchlist(projectWarehouseId),
      })
    }
    return menuList
  }
  const handleProjectAddedToCompare = (project: ProjectSearchResult) => {
    setProjectToCompare(project)
  }

  const handleProjectRemovedFromCompare = (projectWarehouseId: string) => {
    removeProjectFromCompare(projectWarehouseId)
  }

  const renderAddRemoveCompareButton = (project: ProjectSearchResult) => {
    return projectsToCompare.find((p) => p.warehouseProjectId === project.warehouseProjectId) ? (
      <RemoveCompareIcon onClick={() => handleProjectRemovedFromCompare(project.warehouseProjectId)} />
    ) : (
      <AddCompareIcon onClick={() => handleProjectAddedToCompare(project)} />
    )
  }

  const generateTableRow = (projectList: ProjectSearchResult[]) => {
    return projectList.map((projectResults, idx) => {
      return (
        <Tr
          onClick={(event) => handleClick(projectResults.warehouseProjectId, event)}
          onMouseEnter={() => changeHoverColor(`project-row-${idx}`, `hoverGreen`)}
          data-testid="project-search-head-row"
          className={`project-row-${idx}`}
          key={`project-row-${projectResults.warehouseProjectId}`}
          height="92px"
        >
          <Td data-testid="project-search-head-row-td">
            <Flex alignItems="center">
              <Box title={projectResults.name} overflow="hidden" flex={1}>
                <Text fontWeight={500}>{projectResults.name}</Text>
                <Text color="#00242C" fontSize="sm">
                  {projectResults.id}
                </Text>
                <Text textOverflow="ellipsis" color="#00242C" fontSize="sm">
                  {projectResults.developer}
                </Text>
              </Box>
              {isCompare ? (
                renderAddRemoveCompareButton(projectResults)
              ) : (
                <Menu variant="menuWhite">
                  <MenuButton as={Button} textAlign="center" iconSpacing={0} rightIcon={<KebabMenuIcon />} variant="lightGrayRound32" style={{ marginRight: `12px` }}></MenuButton>
                  <MenuContent menuItems={generateMenuList(projectResults.warehouseProjectId, projectResults.watchlists)} />
                </Menu>
              )}
            </Flex>
          </Td>
        </Tr>
      )
    })
  }

  return (
    <>
      <Table variant="simple" className="searchTable">
        <Tbody borderRight="1px solid #B8BEC0">
          {projectResults?.data?.projects !== undefined ? (
            generateTableRow(projectResults.data.projects)
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
      <AddWatchlistPopup
        selectedWatchlists={selectedProjectWatchlists}
        onModalClose={handleAddWatchlistClose}
        warehouseProjectId={projectIdForWatchlist}
        isOpen={showAddWatchlistPopup}
      />
    </>
  )
}
