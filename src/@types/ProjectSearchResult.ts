export interface ProjectSearchResult {
  name: string
  id: string
  warehouseProjectId: string
  link: string
  standard: string
  methodology: string
  sector: string
  country?: string
  inCountryRegion?: string
  status: string
  creditingPeriodStart?: string
  creditingPeriodEnd?: string
  annualEst?: number
  annualIssued?: number
  annualRetired?: number
  annualAvailable?: number
  developer: string
  coveredByNdc: string
  watchlists: string[]
}

export interface ProjectSearchResponse {
  projects: ProjectSearchResult[]
  totalCount: number
}

export enum ESearchParams {
  KEYWORD = `keyword`,
  PATTERN = `pattern`,
  COUNT = `count`,
  OFFSET = `offset`,
  ID = `id`,
  SEARCH_FLOW = `searchFlow`,
  FILTER = `filter`,
}

export const DEFAULT_PROJECT_COUNT_TO_DISPLAY = 15

export enum ALLOWED_RENDER_TYPE {
  PROJECT = `ProjectTable`,
  UNIT = `UnitTable`,
}
