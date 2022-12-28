import { ThemeProvider as ThemeProviderMui } from '@mui/material'
import React from 'react'
import { theme } from 'src/configs'

export default function ThemeProvider(props: React.PropsWithChildren) {
  const { children } = props
  return <ThemeProviderMui theme={theme}>{children}</ThemeProviderMui>
}
