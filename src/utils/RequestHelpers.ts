import { CSVExportTypes } from '@/@types/CSV'
import { UnitStatus } from '@/@types/Unit'
import { SearchFlow } from '@/@types/Search'

export const defaultHeaders = {
  maxBodyLength: Infinity,
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
  },
}

export const authedHeaders = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `application/json`,
    },
  }
}

export const defaultDomain = process.env.NEXT_PUBLIC_API_HOST ?? `http://localhost:3001`

export const generateUnitUrl = (status: string, id: string, searchFlow: SearchFlow) => {
  if (status === UnitStatus.RETIRED) {
    return `/unit/retirement?id=${id}&searchFlow=${searchFlow}`
  } else {
    return `/issuance?id=${id}&searchFlow=${searchFlow}`
  }
}

export const generateProjectUrl = (id: string, searchFlow?: SearchFlow): string => {
  if (searchFlow) {
    return `/project?id=${id}&searchFlow=${searchFlow}`
  }

  return `/project?id=${id}`
}

export const generateExportUrl = (exportType: CSVExportTypes) => {
  let url = ``
  switch (exportType) {
    case CSVExportTypes.PROJECT:
      url = `${defaultDomain}/v1/projects/export`
      break
    case CSVExportTypes.UNIT:
      url = `${defaultDomain}/v1/units/export`
      break
  }
  return url
}
