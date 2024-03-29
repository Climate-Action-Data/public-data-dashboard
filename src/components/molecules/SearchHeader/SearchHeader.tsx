import { ChangeEvent, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Box, Flex, Heading, HStack, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'

import { extractPageFromUrl, extractTitleFromUrl } from '@/utils/TextConverter'

import { BreadCrumbs } from '@/components/atoms/BreadCrumbs/BreadCrumbs'
import { useActions, useAppState } from '@/overmind'
import UnitFilterBar from '@/components/organisms/UnitFilterBar/UnitFilterBar'
import ProjectFilterBar from '@/components/organisms/ProjectFilterBar/ProjectFilterBar'
import InputSearchButton from '../../atoms/InputSearchButton/InputSearchButton'

interface SearchHeaderProps {
  title?: string
  hideSearch?: boolean
}

export const SearchHeader = (props: SearchHeaderProps) => {
  const [searchPattern, setSearchPattern] = useState(``)
  const { title, hideSearch } = props
  const { setKeywordSearch } = useActions().searchFilters
  const { keywordSearch } = useAppState().searchFilters

  const currentPath = usePathname()
  const currentTitle = title ?? extractTitleFromUrl(currentPath)
  const { t } = useTranslation(`search`)
  const router = useRouter()
  const extractedPage = extractPageFromUrl(currentPath)

  //TODO: refactor search to use state and not url params

  useEffect(() => {
    if (keywordSearch && keywordSearch !== ``) {
      setSearchPattern(keywordSearch)
    }

    if (searchPattern && searchPattern !== ``) {
      router.push(`/search/${extractedPage}`)
    }
  }, [])

  const handleOnSearch = () => {
    setKeywordSearch(searchPattern)
    router.push(`/search/${extractedPage}`)
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchPattern(event.target.value)
  }

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === `Enter`) {
      handleOnSearch()
    }
  }

  const generateFilterBar = () => {
    if (currentPath === `/search/projects`) {
      return <ProjectFilterBar isResultsPage />
    } else if (currentPath === `/search/units`) {
      return <UnitFilterBar isResultsPage />
    }
  }

  const getSearchPlaceholder = () => {
    if (currentPath === `/search/projects`) {
      return t(`searchProjectsByKeywordsPlaceholder`)
    } else if (currentPath === `/search/units`) {
      return t(`searchUnitsByKeywordsPlaceholder`)
    }
  }

  return (
    <Flex
      id="headerReference"
      position="sticky"
      top={`56px`}
      zIndex="docked"
      padding="16px 24px"
      minH={[`430px`, null, null, `184px`]}
      color="white"
      backgroundColor="gray.900"
      width="100%"
    >
      <VStack alignItems="start" flex={1}>
        {currentPath && <BreadCrumbs items={[{ title: currentTitle, link: currentPath }]} />}
        <HStack w={`100%`} justifyContent={`space-between`}>
          <Box>
            <Heading style={{ marginBottom: `16px`, fontWeight: 500 }}>{currentTitle}</Heading>
          </Box>
          {!hideSearch && (
            <Box>
              <InputGroup w={[`100%`, `446px`]} height={`48px`}>
                <Input
                  pr="5rem"
                  data-testid="search-input-enter"
                  type={`text`}
                  placeholder={getSearchPlaceholder()}
                  _placeholder={{ color: `lightGray.600` }}
                  value={searchPattern}
                  onChange={handleOnChange}
                  onKeyDown={handleOnKeyDown}
                />
                <InputRightElement width="5rem" mr={`10px`}>
                  <InputSearchButton onClick={handleOnSearch} />
                </InputRightElement>
              </InputGroup>
            </Box>
          )}
        </HStack>
        {!hideSearch && generateFilterBar()}
      </VStack>
    </Flex>
  )
}
