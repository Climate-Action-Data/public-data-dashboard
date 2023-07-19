'use client'
import React from 'react'
import { Inter } from 'next/font/google'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from '@/overmind'
import NoSSR from './noSSR'
import { brandPrimary, whiteSecondary } from '@/styles/Button'
import { cardSection } from '@/styles/Section'
import { Menu } from '@/components/organisms/Menu/Menu'
import AppHeader from '@/components/organisms/AppHeader/AppHeader'

import '../i18n'
import './globals.css'

import styles from './page.module.css'

const overmind = createOvermind(config)

// eslint-disable-next-line @typescript-eslint/quotes
const inter = Inter({ subsets: ['latin'] })

const theme = extendTheme({
  fontSizes: {
    xs: `10px`,
    sm: `12px`,
    md: `14px`,
    lg: `16px`,
    xl: `18px`,
    '2xl': `22px`,
    '3xl': `28px`,
    '4xl': `36px`,
    '5xl': `48px`,
    '6xl': `64px`,
  },
  components: {
    Skeleton: {
      baseStyle: {
        _light: {
          '--skeleton-start-color': `#717D81`,
          '--skeleton-end-color': `#949DA1`,
        },
        _dark: {
          '--skeleton-start-color': `#717D81`,
          '--skeleton-end-color': `#949DA1`,
        },
      },
    },
    Button: {
      variants: {
        brandPrimary,
        whiteSecondary,
      },
    },
    Link: {
      variants: {
        brandPrimary,
        whiteSecondary,
      },
    },
    Container: {
      variants: {
        cardSection,
      },
    },
    Text: {
      baseStyle: {
        fontSize: `14px`,
      },
    },
  },
  colors: {
    lightGray: {
      main: `#00242C`,
      50: `#F8FAFA`,
      100: `#EDEFFE`,
      200: `#DBDEE0`,
      300: `#CACED0`,
      400: `#B8BEC0`,
      500: `#949DA1`,
      600: `#717D81`,
      700: `#4D5C62`,
      800: `#3E4A4E`,
      900: `#2E373B`,
    },
    gray: {
      main: `#00242C`,
      50: `#`,
      100: `#3E4A4E`,
      200: `#3E4A4E`,
      300: `#2E373B`,
      400: `#2E373B`,
      500: `#00242C`,
      600: `#00242C`,
      700: `#00242C`,
      800: `#00242C`,
      900: `#00242C`,
    },
    green: {
      main: `#2DEC7C`,
      50: `#EAFDF2`,
      100: `#D5FBE5`,
      200: `#2DEC7C`,
      300: `#2DEC7C`,
      400: `#2DEC7C`,
      500: `#2DEC7C`,
      600: `#24BD63`,
      700: `#1B8E4A`,
      800: `#125E32`,
      900: `#364D3F`,
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode(`#F8FAFA`, `#000`)(props),
      },
    }),
  },
})
export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <Provider value={overmind}>
      <html lang="en">
        <body className={inter.className}>
          <NoSSR>
            <CacheProvider>
              <ChakraProvider theme={theme}>
                <AppHeader />
                <Menu />
                <Flex padding={{ md: 6 }} minHeight="100vh" alignItems="center" justifyContent="space-between" flexDirection="column">
                  {children}
                </Flex>
              </ChakraProvider>
            </CacheProvider>
          </NoSSR>
        </body>
      </html>
    </Provider>
  )
}
