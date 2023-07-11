import { FC } from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

export const HomeIcon: FC<IconProps> = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" width={props?.width ?? `24px`} height={props?.height ?? `24px`} {...props}>
    <path
      fill="currentColor"
      d="M5.99997 18.7557H9.34615V12.8134H14.6538V18.7557H18V9.75567L12 5.23644L5.99997 9.75567V18.7557ZM5.99997 20.2556C5.59101 20.2556 5.23877 20.1079 4.94327 19.8124C4.64776 19.5169 4.5 19.1646 4.5 18.7557V9.75567C4.5 9.51893 4.55296 9.29466 4.65887 9.08284C4.76477 8.87103 4.91117 8.69659 5.09807 8.55954L11.0981 4.04032C11.2365 3.93903 11.3808 3.86468 11.5309 3.81724C11.681 3.76981 11.8374 3.74609 12 3.74609C12.1626 3.74609 12.3189 3.76981 12.469 3.81724C12.6192 3.86468 12.7634 3.93903 12.9019 4.04032L18.9019 8.55954C19.0888 8.69659 19.2352 8.87103 19.3411 9.08284C19.447 9.29466 19.5 9.51893 19.5 9.75567V18.7557C19.5 19.1646 19.3522 19.5169 19.0567 19.8124C18.7612 20.1079 18.4089 20.2556 18 20.2556H13.1538V14.3133H10.8461V20.2556H5.99997Z"
    />
  </Icon>
)
