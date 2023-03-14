import { getProducts } from '@/server/product'
import { useQuery } from '@tanstack/react-query'

const usePosts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })
}

export default usePosts
