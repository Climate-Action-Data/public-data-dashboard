import { FC } from 'react'
import { Stat, StatLabel, StatNumber, Text } from '@chakra-ui/react'

import { toCompactValueAndSuffix } from '@/utils/UnitConverter'

interface CreditHistoryStateProps {
  amount: number | undefined
  label: string
  textColor?: string
}

const CreditsHistoryStat: FC<CreditHistoryStateProps> = (props: CreditHistoryStateProps) => {
  const { amount, label, textColor } = props
  const [compactAmount, suffix] = toCompactValueAndSuffix(amount ?? 0)

  return (
    <Stat textAlign={`center`} fontFamily={`heading`}>
      <StatNumber>
        <Text variant={`statValue`} color={textColor} fontSize={[`40px`, null, `64px`]}>
          {compactAmount}
        </Text>
        <Text variant={`statSuffix`} fontSize={[`16px`, null, `24px`]}>
          {suffix}
        </Text>
      </StatNumber>
      <StatLabel>{label}</StatLabel>
    </Stat>
  )
}
export default CreditsHistoryStat
