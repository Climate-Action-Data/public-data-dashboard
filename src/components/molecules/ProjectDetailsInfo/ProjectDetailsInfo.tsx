import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { Link } from '@chakra-ui/next-js'
import { Stack, StackDivider, SimpleGrid, Flex, HStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { ProjectDetailsInfoSkeleton } from '../ProjectDetailsInfoSkeleton/ProjectDetailsInfoSkeleton'
import { extractEWebGoalFromString, extractTagItemsFromTag } from '@/utils/TextConverter'
import { EWebGoalIcon } from '@/components/atoms/EWebGoalIcon/EWebGoalIcon'
import { formatDate } from '@/utils/DateFormat'
import { DateFormats } from '@/@types/DateFormats'
import { ProjectDetails } from '@/@types/ProjectDetails'
import { ExpandableList } from '@/components/atoms/ExpandableList/ExpandableList'

interface ProjectDetailsInfoProps {
  project?: ProjectDetails
}

export const ProjectDetailsInfo = (props: ProjectDetailsInfoProps) => {
  const { project } = props

  const { t } = useTranslation(`projectDetails`)
  const { t: tHome } = useTranslation(`home`)

  if (!project) {
    return <ProjectDetailsInfoSkeleton />
  }

  const renderCreditingPeriod = (start: string, end: string) => {
    if (!start || !end) {
      return tHome(`noData`)
    }
    const startDate = formatDate(start, DateFormats.YYYY_MM_DD)
    const endDate = formatDate(end, DateFormats.YYYY_MM_DD)
    return `${startDate} - ${endDate}`
  }

  const DEFAULT_COLUMN = 2

  return (
    <Stack divider={<StackDivider />} spacing="24px">
      <SimpleGrid columns={DEFAULT_COLUMN} gap="24px">
        <DetailWidget title={t(`detailsHeaders.registry`)}>{project.standard}</DetailWidget>
        <DetailWidget title={t(`detailsHeaders.methodology`)}>{project.methodology}</DetailWidget>
        <DetailWidget title={t(`detailsHeaders.developer`)}>{project.developer}</DetailWidget>
        <DetailWidget asBox title={t(`detailsHeaders.link`)}>
          <Link variant={`blueLink`} target="_blank" href={project.link}>
            {project.link}
          </Link>
        </DetailWidget>
        <DetailWidget title={t(`detailsHeaders.sector`)}>{project.sector}</DetailWidget>
        <DetailWidget title={t(`detailsHeaders.type`)}>{project.type}</DetailWidget>
      </SimpleGrid>
      <SimpleGrid columns={DEFAULT_COLUMN} gap="24px">
        <DetailWidget title={t(`detailsHeaders.status`)}>{project.status}</DetailWidget>
        <DetailWidget title={t(`detailsHeaders.statusUpdated`)}>{project.statusDate ? formatDate(project.statusDate, DateFormats.YYYY_MM_DD) : tHome(`noData`)}</DetailWidget>
        <DetailWidget title={t(`verificationHeaders.validationBody`)}>{project.validation.body}</DetailWidget>
        <DetailWidget title={t(`verificationHeaders.validationDate`)}>
          {project.validation.date ? formatDate(project.validation.date, DateFormats.YYYY_MM_DD) : tHome(`noData`)}
        </DetailWidget>
      </SimpleGrid>
      <Flex flexWrap="wrap">
        <SimpleGrid columns={DEFAULT_COLUMN} gap="24px">
          <DetailWidget title={t(`detailsHeaders.availableUnits`)}>{project.units.available.toLocaleString()}</DetailWidget>
          <DetailWidget title={t(`detailsHeaders.issuances`)}>{project.units.issued.toLocaleString()}</DetailWidget>
          <DetailWidget asBox title={t(`detailsHeaders.creditingPeriod`)}>
            {renderCreditingPeriod(project.units.creditingPeriodStart, project.units.creditingPeriodEnd)}
          </DetailWidget>
        </SimpleGrid>
        <SimpleGrid columns={DEFAULT_COLUMN} gap="24px">
          <DetailWidget title={t(`detailsHeaders.retirememts`)}>{project.units.retired.toLocaleString()}</DetailWidget>
          <DetailWidget title={t(`detailsHeaders.estimatedUnits`)}>{project.units.estimated.toLocaleString()}</DetailWidget>
          <DetailWidget title={t(`detailsHeaders.unitMetric`)}>{project.units.unitMetric}</DetailWidget>
        </SimpleGrid>
      </Flex>
      <SimpleGrid columns={DEFAULT_COLUMN} gap="24px">
        <DetailWidget title={t(`detailsHeaders.ndcCoverage`)}>{project.coveredByNdc}</DetailWidget>
      </SimpleGrid>
      <SimpleGrid columns={[1, DEFAULT_COLUMN]} gap="24px">
        <DetailWidget asBox title={t(`detailsHeaders.tags`)}>
          <ExpandableList items={extractTagItemsFromTag(project?.tags)} />
        </DetailWidget>
        <DetailWidget asBox title={t(`detailsHeaders.coBenefits`)}>
          <HStack flexWrap="wrap" gap="4px">
            {project.coBenefits.map((benefit) => {
              const eWebGoal = extractEWebGoalFromString(benefit)
              if (eWebGoal) {
                return <EWebGoalIcon key={benefit} goal={eWebGoal} />
              }
            })}
          </HStack>
        </DetailWidget>
      </SimpleGrid>
    </Stack>
  )
}
