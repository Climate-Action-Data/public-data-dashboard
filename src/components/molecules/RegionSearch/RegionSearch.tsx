import { Regions } from '@/@types/Region'
import { Flex, Text, Box, Divider, HStack, Tag, Button, TagLabel } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const RegionSearch = (): React.JSX.Element => {
  const [region, setRegion] = useState<string | undefined>(undefined)
  const { t } = useTranslation(`home`)
  const regionTitle = () => {
    if (region) {
      return (
        <Flex alignItems={`center`}>
          <Button data-testid="button-region-back" borderRadius="50%" backgroundColor="transparent" onClick={() => setRegion(undefined)}>
            &lt;
          </Button>
          <Text fontWeight={`bold`}>{region}</Text>
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
    <Flex height={`40px`} alignItems={`center`}>
      {regionTitle()}
      <Divider marginX={6} height={`70%`} orientation="vertical" />
      <HStack spacing={4}>
        {Regions.map(
          (regionName, idx) =>
            regionName !== region && (
              <Button data-testid={`button-region-${idx}`} key={regionName} variant={`unstyled`} onClick={() => setRegion(regionName)}>
                <Tag size={`md`} borderRadius="full" variant="solid" colorScheme="gray">
                  <TagLabel>{t(`regions.${regionName}`)}</TagLabel>
                </Tag>
              </Button>
            ),
        )}
      </HStack>
    </Flex>
  )
}
