import { startCase } from 'lodash'
import { useRouter } from 'next/router'

export default function useTitle() {
  const router = useRouter()
  const [, firstPath] = router.pathname.split('/')
  const title = startCase(firstPath)

  return title || 'Home'
}
