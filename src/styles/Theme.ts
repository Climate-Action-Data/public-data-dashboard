import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

import {
  accentPrimary32,
  blackLink,
  blueFilled,
  blueLink,
  blueOutline,
  brandPrimary,
  calendarAction,
  calendarDate,
  calendarNavigation,
  dropdown,
  dropdownSelected,
  dropdownSelectedDark,
  dropdownUnselected,
  dropdownUnselectedDark,
  green,
  hoverOnly,
  hoverOnlyNoBold,
  lightGray,
  lightGrayRound,
  lightGrayRound32,
  modalClose,
  redFilled,
  redOutline,
  textLink,
  applyButton,
  toastButton,
  underlinedLink,
  whiteSecondary,
} from '@/styles/Button'
import { Aeonik, AeonikFono } from '@/styles/fonts'
import { Checkbox } from '@/styles/Checkbox'
import { cardSection, cardSectionNoMargin, cardSectionNoMarginNoPadding, filterCardSection, searchBar } from '@/styles/Section'
import fontSizes from './FontSizes'
import { headingAeonik, Text } from './Text'
import { Input } from '@/styles/Input'
import { paginationBar } from './PaginationBar'
import { searchTable, searchTableSmall } from './SearchTable'
import { menuWhite, menuDark } from './Menu'
import { statMain } from './Stat'
import { tagTheme } from '@/styles/Tag'
import { homeFilterAndSearchWrapper, resultsPageFilterAndSearchWrapper } from '@/styles/Container'
import { watchlist, watchlistNoHover } from './Card'

const theme = extendTheme({
  fontSizes: fontSizes,
  fonts: {
    body: Aeonik.style.fontFamily,
    heading: AeonikFono.style.fontFamily,
    table: Aeonik.style.fontFamily,
  },
  components: {
    Skeleton: {
      baseStyle: {
        _light: {
          '--skeleton-start-color': `#CACED0`,
          '--skeleton-end-color': `#EDEFEF`,
        },
        _dark: {
          '--skeleton-start-color': `#CACED0`,
          '--skeleton-end-color': `#EDEFEF`,
        },
      },
    },
    Divider: {
      baseStyle: {
        borderColor: `lightGray.400`,
      },
    },
    Button: {
      baseStyle: {
        _hover: {
          _disabled: {
            backgroundColor: `lightGray.200`,
            borderColor: `lightGray.200`,
            color: `lightGray.500`,
            opacity: 1,
          },
        },
      },
      variants: {
        brandPrimary,
        whiteSecondary,
        lightGrayRound,
        lightGray,
        lightGrayRound32,
        hoverOnly,
        hoverOnlyNoBold,
        accentPrimary32,
        textLink,
        applyButton,
        underlinedLink,
        blackLink,
        dropdownUnselected,
        dropdownSelected,
        dropdownUnselectedDark,
        dropdownSelectedDark,
        calendarNavigation,
        calendarAction,
        calendarDate,
        blueFilled,
        blueOutline,
        dropdown,
        modalClose,
        toastButton,
        green,
        redFilled,
        redOutline,
      },
    },
    Heading: {
      variants: { aeonik: headingAeonik },
    },
    Stat: {
      variants: {
        statMain,
      },
    },
    Link: {
      variants: {
        brandPrimary,
        whiteSecondary,
        accentPrimary32,
        blueLink,
        blackLink,
        blueOutline,
        blueFilled,
      },
    },
    Container: {
      variants: {
        cardSection,
        cardSectionNoMargin,
        cardSectionNoMarginNoPadding,
        paginationBar,
        filterCardSection,
        searchBar,
        homeFilterAndSearchWrapper,
        resultsPageFilterAndSearchWrapper,
      },
    },
    Menu: {
      variants: {
        menuWhite,
        menuDark,
      },
    },
    Card: {
      baseStyle: {
        container: {
          boxShadow: `2px 2px 8px 0px #0000001A`,
        },
      },
      variants: {
        watchlist,
        watchlistNoHover,
      },
    },
    Text,
    Tag: tagTheme,
    Checkbox,
    Input,
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
      50: `#EDEFEF`,
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
    blue: {
      main: `#0075FF`,
      50: `#ebf8ff`,
      100: `#bee3f8`,
      200: `#90cdf4`,
      300: `##46B1FD`,
      400: `#4299e1`,
      500: `#0075FF`,
      600: `#005ECC`,
      700: `#2a4365`,
      800: `#1A365D`,
      900: `#002F66`,
    },
    red: {
      main: `#CC4A42`,
      50: `#FFE9E8`,
      100: `#FFD1CF`,
      200: `#FFD1CF`,
      300: `#FF5C53`,
      400: `#CC4A42`,
      500: `#CC4A42`,
      600: `#993732`,
      700: `#993732`,
      800: `#652828`,
      900: `#652828`,
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode(`#F8FAFA`, `#000`)(props),
        pointerEvents: `auto`,
        userSelect: `auto`,
        color: `gray.700`,
      },
      '.chakra-popover__popper': {
        zIndex: 999,
      },
      '.fixed': {
        position: `fixed`,
        top: [`480px`, `240px`],
        width: `100%`,
        display: `inherit`,
        tr: {
          overflowX: `scroll`,
          maxWidth: [`calc(100vw - 184px)`, `calc(100vw - 552px)`],
          display: `flex`,
          th: {
            display: `flex`,
            alignItems: `end`,
          },
        },
      },
      ' .hide-scrollbar::-webkit-scrollbar': { height: 0 },
      '.hide-scrollbar': {
        scrollbarWidth: `thin`,
        scrollbarColor: `transparent transparent`,
        '&::-webkit-scrollbar': {
          width: `1px`,
        },
        '&::-webkit-scrollbar-track': {
          background: `transparent`,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: `transparent`,
        },
      },
      ':focus-visible, [data-focus-visible]': {
        borderColor: `green.700 !important`,
        boxShadow: `0 0 0 1px var(--chakra-colors-green-800) !important`,
      },
      '.disabled': {
        _hover: {
          cursor: `not-allowed`,
          pointerEvents: `none`,
        },
      },
      '.toast.success': {
        borderColor: `green.600`,
        color: `green.800`,
        backgroundColor: `green.50`,
      },
      '.toast.failure': {
        borderColor: `red.300`,
        color: `red.800`,
        backgroundColor: `red.100`,
      },
      ...searchTable,
      ...searchTableSmall,
    }),
  },
})

export default theme
