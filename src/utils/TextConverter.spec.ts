import { EWebGoal } from '@/@types/EWebGoal'
import {
  extractTitleFromUrl,
  capitalizeString,
  extractEWebGoalFromString,
  sanitizeString,
  extractProjectTypeFromString,
  extractTagItemsFromTag,
  extractPageFromUrl,
  extractUrlFromString,
  formatCreditingPeriod,
  stringifyString,
} from './TextConverter'
import { ProjectType } from '@/@types/ProjectDetails'

const TEST_FULL_CAP = `LOREM`
const TEST_CAP = `Lorem`
const TEST_LOWER = `lorem`

describe(`capitalizeString`, () => {
  test(`convert uppercase to capitalized`, () => {
    expect(capitalizeString(TEST_FULL_CAP)).toBe(TEST_CAP)
  })

  test(`convert capitalized to capitalized`, () => {
    expect(capitalizeString(TEST_CAP)).toBe(TEST_CAP)
  })

  test(`convert lowercase to capitalized`, () => {
    expect(capitalizeString(TEST_LOWER)).toBe(TEST_CAP)
  })
})

const URL = `/lorem/ipsum`
const URL_VOID = `/`
const TITLE = `Ipsum`
const DEFAULT = ``

describe(`extractTitleFromUrl`, () => {
  test(`extract title from url`, () => {
    expect(extractTitleFromUrl(URL)).toBe(TITLE)
  })

  test(`extract title from coid url to be default`, () => {
    expect(extractTitleFromUrl(URL_VOID)).toBe(DEFAULT)
  })
})
const DEFAULT_EWEBGOAL = `SDG 1 - No Poverty`
const DEFAULT_EWEBGOAL_FAKE = `SDG 19 - No Poverty`
const DEFAULT_EWEBGOAL_RANDOM = `Muy random`

describe(`extractEWebGoalFromString`, () => {
  test(`extract ewebgoal from string`, () => {
    expect(extractEWebGoalFromString(DEFAULT_EWEBGOAL)).toBe(EWebGoal.SDG1)
  })

  test(`extract ewebgoal from string to be undefined`, () => {
    expect(extractEWebGoalFromString(DEFAULT_EWEBGOAL_FAKE)).toBeUndefined()
  })

  test(`extract ewebgoal from random string to be undefined`, () => {
    expect(extractEWebGoalFromString(DEFAULT_EWEBGOAL_RANDOM)).toBeUndefined()
  })
})

const DEFAULT_STRING = `energy`
const DEFAULT_STRING_CAP = `Energy`
const DEFAULT_STRING_CAP_SPECIAL = `Energy &`

describe(`sanitizeString`, () => {
  test(`sanitize string`, () => {
    expect(sanitizeString(DEFAULT_STRING)).toBe(DEFAULT_STRING)
  })

  test(`sanitize string to be undefined`, () => {
    expect(sanitizeString(DEFAULT_STRING_CAP)).toBe(DEFAULT_STRING)
  })

  test(`sanitize random string to be undefined`, () => {
    expect(sanitizeString(DEFAULT_STRING_CAP_SPECIAL)).toBe(DEFAULT_STRING)
  })
})

const DEFAULT_TYPE_STRING = `Improved Forest Management`

describe(`extractProjectTypeFromString`, () => {
  test(`extract project type from string`, () => {
    expect(extractProjectTypeFromString(DEFAULT_TYPE_STRING)).toBe(ProjectType.IMPROVED_FOREST_MANAGEMENT)
  })

  test(`extract project type from string to be default`, () => {
    expect(extractProjectTypeFromString(DEFAULT_STRING)).toBe(ProjectType.DEFAULT)
  })
})

const DEFAULT_TAG_TEXT = `My Tag || My Tag 2 || My Tag 3`
const DEFAULT_TAG_TEXT_WITH_EMPTY = `My Tag || My Tag 2 || || My Tag 3`
const DEFAULT_TAG_ARR = [`My Tag`, `My Tag 2`, `My Tag 3`]

describe(`extractTagItemsFromTag`, () => {
  test(`extract tag items from tag`, () => {
    expect(extractTagItemsFromTag(DEFAULT_TAG_TEXT)).toEqual(DEFAULT_TAG_ARR)
  })

  test(`extract tag items from tag`, () => {
    expect(extractTagItemsFromTag(DEFAULT_TAG_TEXT_WITH_EMPTY)).toEqual(DEFAULT_TAG_ARR)
  })

  test(`extract tag items from tag to be empty`, () => {
    expect(extractTagItemsFromTag(undefined)).toEqual([])
  })
})

const URL_PAGE = `ipsum`

describe(`extractPageFromUrl`, () => {
  test(`extract page from url`, () => {
    expect(extractPageFromUrl(URL)).toBe(URL_PAGE)
  })

  test(`extract page from coid url to be default`, () => {
    expect(extractPageFromUrl(URL_VOID)).toBe(``)
  })
})

const URL_STRING = `Details on website: https://www.ecoregistry.io/projects/65`
const URL_PARSED = `https://www.ecoregistry.io/projects/65`

describe(`extractUrlFromString`, () => {
  test(`extract url from string`, () => {
    expect(extractUrlFromString(URL_STRING)).toBe(URL_PARSED)
  })

  test(`extract url from string with no url`, () => {
    expect(extractUrlFromString(TITLE)).toBe(undefined)
  })
})

const CREDIT_PERIOD_START = `2018-01-01T00:00:00.000Z`
const CREDIT_PERIOD_END = `2037-12-31T00:00:00.000Z`
const FORMATTED_CREDIT_PERIOD = `2018/01/01 - 2037/12/31`
const FORMATTED_CREDIT_PERIOD_FROM_START = `2018/01/01`
const FORMATTED_CREDIT_PERIOD_FROM_END = `2037/12/31`

describe(`formatCreditingPeriod`, () => {
  test(`format crediting period from start and end dates`, () => {
    expect(formatCreditingPeriod(CREDIT_PERIOD_START, CREDIT_PERIOD_END)).toBe(FORMATTED_CREDIT_PERIOD)
  })

  test(`format crediting period from start date`, () => {
    expect(formatCreditingPeriod(CREDIT_PERIOD_START, undefined)).toBe(FORMATTED_CREDIT_PERIOD_FROM_START)
  })

  test(`format crediting period from end date`, () => {
    expect(formatCreditingPeriod(undefined, CREDIT_PERIOD_END)).toBe(FORMATTED_CREDIT_PERIOD_FROM_END)
  })
})

const DEFAULT_TEST_STRING = `test,e`
const DEFAULT_TEST_STRING_ESCAPED = `"test,e"`

describe(`stringifyString`, () => {
  it(`should return same string`, async () => {
    expect(stringifyString(DEFAULT_TEST_STRING)).toBe(DEFAULT_TEST_STRING_ESCAPED)
  })
})
