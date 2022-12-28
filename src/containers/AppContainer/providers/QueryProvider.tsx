import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function QueryProvider(props: React.PropsWithChildren) {
  const { children } = props
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
