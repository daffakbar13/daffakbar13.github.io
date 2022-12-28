import { Box, Grid, styled } from '@mui/material'
import React from 'react'

const Background = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[600],
  padding: 20,
}))

interface PrintPreviewProps extends React.PropsWithChildren {
  actionArea: React.ReactNode
}

export default function PrintPreview(props: PrintPreviewProps) {
  const { children, actionArea } = props

  return (
    <Background>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          {children}
        </Grid>
        <Grid item xs={2}>
          {actionArea}
        </Grid>
      </Grid>
    </Background>
  )
}
