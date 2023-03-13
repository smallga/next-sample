import { Inter } from 'next/font/google'
import { GetServerSideProps } from 'next'
import { getProducts } from '@/server/product'
import { Product } from '@/interface/product.interface'
import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import Header from '@/layout/Header'
import ProductCard from '@/components/product-card'

const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
  products: Product[]
}

export default function Home(props: HomeProps) {
  const { products } = props

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    initialData: products,
  })

  const productList = useMemo(() => {
    return (
      products && (
        <>
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </>
      )
    )
  }, [products])

  useEffect(() => {
    console.log(productsQuery)
  }, [])
  return (
    <div className="w-full">
      <Header></Header>
      <div className="flex flex-wrap bg-slate-300 px-2 pt-12">
        {productList}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // const products = useQuery(['products'], getProducts);
  const products = (await getProducts()) as Product[]

  return {
    props: {
      products,
    },
  }
}
