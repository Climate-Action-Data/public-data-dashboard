import { FC } from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

export const MinusIcon: FC<IconProps> = (props: IconProps) => {
  const actualProps = {
    ...props,
    width: props?.width ?? `24px`,
    height: props?.height ?? `24px`,
  }
  return (
    <Icon viewBox="0 0 24 24" {...actualProps}>
      <path
        fill="currentColor"
        d="M5.99997 12.75C5.78747 12.75 5.60936 12.678 5.46563 12.5342C5.32188 12.3904 5.25 12.2122 5.25 11.9997C5.25 11.7871 5.32188 11.609 5.46563 11.4654C5.60936 11.3218 5.78747 11.25 5.99997 11.25H18C18.2125 11.25 18.3906 11.3219 18.5344 11.4657C18.6781 11.6095 18.75 11.7877 18.75 12.0003C18.75 12.2129 18.6781 12.391 18.5344 12.5346C18.3906 12.6782 18.2125 12.75 18 12.75H5.99997Z"
      />
    </Icon>
  )
}
