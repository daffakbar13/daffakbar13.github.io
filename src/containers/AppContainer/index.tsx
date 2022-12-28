import { Navbar } from 'src/components'
import DescriptionIcon from '@mui/icons-material/Description'
import { QueryProvider, ThemeProvider } from './providers'
import Heading from './Heading'

export default function AppContainer(props: React.PropsWithChildren) {
  const { children } = props

  return (
    <>
      <Heading />
      <ThemeProvider>
        <QueryProvider>
          <Navbar
            title="Daffa Akbar"
            menu={[{ title: 'Resume', path: '/resume', Icon: DescriptionIcon }]}
          >
            {children}
          </Navbar>
        </QueryProvider>
      </ThemeProvider>
    </>
  )
}
