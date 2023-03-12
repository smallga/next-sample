import { Inter } from 'next/font/google'
import { GetServerSideProps } from 'next'
import { getProducts } from '@/server/product'
import { Product } from '@/interface/product.interface'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

const inter = Inter({ subsets: ['latin'] })

interface HomeProps{
  products: Product[],
}

export default function Home(props: HomeProps) {
  const { products } = props;

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    initialData: products,
  })

  useEffect(() => {
    console.log(productsQuery);
  }, [])
  return (
    <>

      {productsQuery.isSuccess && JSON.stringify(productsQuery.data)}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // const products = useQuery(['products'], getProducts);
  const products = await getProducts() as Product[];

  return {
    props: {
      products
    }
  }
}
