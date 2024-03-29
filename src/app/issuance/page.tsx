'use client'
import { Issuance } from '@/@types/Issuance'
import { ESearchParams } from '@/@types/ProjectSearchResult'
import { ProjectBreadcrumb } from '@/components/atoms/ProjectBreadcrumb/ProjectBreadcrumb'
import { ProjectDetailHeader } from '@/components/atoms/ProjectDetailHeader/ProjectDetailHeader'
import { CardSection } from '@/components/molecules/CardSection/CardSection'
import { IssuanceDetails } from '@/components/molecules/IssuanceDetails/IssuanceDetails'
import { ProjectDetailsVerification } from '@/components/molecules/ProjectDetailsVerification/ProjectDetailsVerification'
import { useEffects } from '@/overmind'
import { Box, Container, Divider, Flex } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const IssuancePage: NextPage = () => {
  const [issuance, setIssuance] = useState<Issuance | undefined>(undefined)
  const { t } = useTranslation(`unitDetails`)
  const { t: tHome } = useTranslation(`home`)
  const searchParams = useSearchParams()
  const id = searchParams.get(ESearchParams.ID) ?? ``
  const { getIssuance } = useEffects().unitResult

  useEffect(() => {
    getIssuance(id).then((result) => {
      if (result.data) {
        setIssuance(result.data)
      }
    })
  }, [])

  return (
    <>
      {issuance?.project?.warehouseProjectId && issuance?.project?.name && <ProjectBreadcrumb id={issuance?.project?.warehouseProjectId} title={issuance?.project?.name} />}
      <Box padding="12px 24px">
        <Box paddingBottom="40px">
          <ProjectDetailHeader
            topTitle={t(`topTitleUnitsIssuance`)}
            mainTitle={issuance?.id ?? tHome(`noData`)}
            subTitle={issuance?.project?.name ?? tHome(`noData`)}
            type={issuance?.project?.type}
            isExpanded={false}
          />
        </Box>
        <Flex flexDirection="column" minW="100%" gap="40px">
          <CardSection displaySectionTitle sectionTitle={{ title: t(`sectionHeaders.issuanceDetails`) }}>
            <Container style={{ marginTop: `12px` }} padding={[`12px`, `24px`]} flex={2} gap="24px" display="flex" flexDirection="column" variant="cardSectionNoMargin">
              <IssuanceDetails issuance={issuance} />
              <Divider />
              <ProjectDetailsVerification validation={issuance?.validation} />
            </Container>
          </CardSection>
        </Flex>
      </Box>
    </>
  )
}

export default IssuancePage
