import { FC } from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

export const KebabMenuIcon: FC<IconProps> = (props: IconProps) => {
  const actualProps = {
    ...props,
    width: props?.width ?? `24px`,
    height: props?.height ?? `24px`,
  }
  return (
    <Icon viewBox="0 0 24 24" {...actualProps}>
      <path
        fill="currentColor"
        d="M12 19.2688C11.5875 19.2688 11.2344 19.122 10.9406 18.8282C10.6469 18.5345 10.5 18.1814 10.5 17.7689C10.5 17.3564 10.6469 17.0033 10.9406 16.7095C11.2344 16.4158 11.5875 16.2689 12 16.2689C12.4125 16.2689 12.7656 16.4158 13.0593 16.7095C13.3531 17.0033 13.5 17.3564 13.5 17.7689C13.5 18.1814 13.3531 18.5345 13.0593 18.8282C12.7656 19.122 12.4125 19.2688 12 19.2688ZM12 13.4996C11.5875 13.4996 11.2344 13.3527 10.9406 13.059C10.6469 12.7652 10.5 12.4121 10.5 11.9996C10.5 11.5872 10.6469 11.234 10.9406 10.9403C11.2344 10.6465 11.5875 10.4997 12 10.4997C12.4125 10.4997 12.7656 10.6465 13.0593 10.9403C13.3531 11.234 13.5 11.5872 13.5 11.9996C13.5 12.4121 13.3531 12.7652 13.0593 13.059C12.7656 13.3527 12.4125 13.4996 12 13.4996ZM12 7.73039C11.5875 7.73039 11.2344 7.58352 10.9406 7.28977C10.6469 6.99604 10.5 6.64292 10.5 6.23042C10.5 5.81794 10.6469 5.46482 10.9406 5.17107C11.2344 4.87734 11.5875 4.73047 12 4.73047C12.4125 4.73047 12.7656 4.87734 13.0593 5.17107C13.3531 5.46482 13.5 5.81794 13.5 6.23042C13.5 6.64292 13.3531 6.99604 13.0593 7.28977C12.7656 7.58352 12.4125 7.73039 12 7.73039Z"
      />
    </Icon>
  )
}