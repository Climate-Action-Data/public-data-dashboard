import { FC } from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

export const DownloadIcon: FC<IconProps> = (props: IconProps) => {
  const actualProps = {
    ...props,
    width: props?.width ?? `24px`,
    height: props?.height ?? `24px`,
  }
  return (
    <Icon viewBox="0 0 24 24" {...actualProps}>
      <path
        fill="currentColor"
        d="M12 15.3255C11.8795 15.3255 11.7673 15.3063 11.6634 15.2679C11.5596 15.2294 11.4609 15.1634 11.3673 15.0698L8.2577 11.9602C8.11925 11.8217 8.04842 11.6477 8.04522 11.4381C8.04201 11.2285 8.11283 11.0513 8.2577 10.9064C8.40257 10.7615 8.58077 10.6865 8.7923 10.6814C9.00383 10.6763 9.18204 10.7461 9.32692 10.891L11.25 12.8141V5.16404C11.25 4.95122 11.3218 4.77302 11.4654 4.62944C11.609 4.48585 11.7872 4.41406 12 4.41406C12.2128 4.41406 12.391 4.48585 12.5346 4.62944C12.6782 4.77302 12.7499 4.95122 12.7499 5.16404V12.8141L14.673 10.891C14.8115 10.7525 14.9881 10.6843 15.2028 10.6862C15.4176 10.6881 15.5974 10.7615 15.7422 10.9064C15.8871 11.0513 15.9595 11.2269 15.9595 11.4333C15.9595 11.6397 15.8871 11.8153 15.7422 11.9602L12.6327 15.0698C12.5391 15.1634 12.4403 15.2294 12.3365 15.2679C12.2327 15.3063 12.1205 15.3255 12 15.3255ZM6.3077 19.5871C5.80257 19.5871 5.375 19.4121 5.025 19.0621C4.675 18.7121 4.5 18.2845 4.5 17.7794V15.8371C4.5 15.6243 4.5718 15.4461 4.7154 15.3025C4.85898 15.1589 5.03718 15.0871 5.25 15.0871C5.46282 15.0871 5.64102 15.1589 5.7846 15.3025C5.92818 15.4461 5.99997 15.6243 5.99997 15.8371V17.7794C5.99997 17.8563 6.03202 17.9268 6.09612 17.991C6.16024 18.0551 6.23077 18.0871 6.3077 18.0871H17.6922C17.7692 18.0871 17.8397 18.0551 17.9038 17.991C17.9679 17.9268 18 17.8563 18 17.7794V15.8371C18 15.6243 18.0718 15.4461 18.2154 15.3025C18.3589 15.1589 18.5371 15.0871 18.75 15.0871C18.9628 15.0871 19.141 15.1589 19.2845 15.3025C19.4281 15.4461 19.5 15.6243 19.5 15.8371V17.7794C19.5 18.2845 19.325 18.7121 18.975 19.0621C18.625 19.4121 18.1974 19.5871 17.6922 19.5871H6.3077Z"
      />
    </Icon>
  )
}
