/* eslint-disable react/display-name */
import { Box, styled } from '@mui/material'
import React from 'react'

const Paper = styled(Box)(() => ({
  padding: '1.5rem',
  backgroundColor: '#ffffffff',
  width: '21cm',
  height: '29.7cm',
  overflow: 'scroll',
  position: 'relative',
}))

const PaperA4 = React.forwardRef<HTMLElement, React.PropsWithChildren>((props, ref) => {
  const { children } = props
  const [zoom, setZoom] = React.useState(0)
  const [height, setHeight] = React.useState(0)
  const widthRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    const runEffect = () => {
      const thisRef: React.RefObject<HTMLElement> = ref as any
      if (widthRef.current && thisRef.current) {
        const fullWidth = widthRef.current.clientWidth
        const paperWidth = thisRef.current.clientWidth
        const newZoom = fullWidth / paperWidth
        const newHeight = fullWidth * 1.4
        if (newZoom !== zoom && newHeight !== height) {
          setZoom(newZoom)
          setHeight(newHeight)
        }
      }
    }
    const interval = setInterval(() => {
      runEffect()
    }, 1)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Box width="100%" ref={widthRef}></Box>
      <Paper ref={ref} sx={{ zoom }}>
        {children}
      </Paper>
    </>
  )
})

export default PaperA4
