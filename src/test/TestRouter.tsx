import { AppRouterContext, AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import React from 'react'

export type TestRouterProps = {
  router: Partial<AppRouterInstance>
  children: React.ReactNode
}

export const TestRouter = ({ router, children }: TestRouterProps): React.ReactNode => {
  const mockedRouter: AppRouterInstance = {
    back: jest.fn(),
    forward: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
    ...router,
  }
  return <AppRouterContext.Provider value={mockedRouter}>{children}</AppRouterContext.Provider>
}
