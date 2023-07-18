import { Box, Flex, Text } from '@chakra-ui/react'
import { SectorPieChart } from '../SectorPieChart/SectorPieChart'

interface CarbonReductionSectorProps {
  colorChart: string[]
  data: { average: number; name: string }[]
}
export const CarbonReductionSector = ({ colorChart, data }: CarbonReductionSectorProps): React.JSX.Element => {
  return (
    <Flex>
      <Flex height="150px" width="200px" padding={2}>
        <SectorPieChart data={data.map((d) => ({ value: d.average, label: d.name }))} colorChart={colorChart} />
      </Flex>
      <Flex flexDirection={`column`} justifyContent={`space-evenly`} flex={1}>
        {data.map((sector, idx) => (
          <Box key={`${sector.value}-${idx}`}>
            <Text fontWeight="500" color={colorChart[idx]}>
              {sector.average}% {sector.name}
            </Text>
          </Box>
        ))}
      </Flex>
    </Flex>
  )
}
