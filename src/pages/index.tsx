import { Inter } from 'next/font/google'
import { GetServerSideProps } from 'next'
import { getProducts } from '@/server/product'
import { Product } from '@/interface/product.interface'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Header from '@/layout/Header'
import ProductCard from '@/components/product-card'
import CartSvgIcon from '@/icons/cart-icon'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ShopCart from '@/layout/Shopcart'
import { useAppDispatch } from '@/hook/redux-hook'
import { pushProduct } from '@/store/slice/shopcart.slice'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
  products: Product[]
}

export default function Home(props: HomeProps) {
  const { products } = props
  const router = useRouter()
  const dispach = useAppDispatch()

  const [showClickAnimated, setShowClickAnimated] = useState(false)
  const [addProductSrc, setAddProductSrc] = useState('')
  const animatedEleRef = useRef<HTMLImageElement>(null)

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    initialData: products,
  })

  const stopAnimated = useCallback(() => {
    setTimeout(() => {
      setShowClickAnimated(false)
    }, 300)
  }, [])

  const handleShowClickAnimated = useCallback(
    (xPosition: number, yPosition: number, productSrc: string) => {
      if (animatedEleRef && animatedEleRef.current) {
        animatedEleRef.current.style.right =
          window.innerWidth - xPosition + 'px'
        animatedEleRef.current.style.bottom =
          window.innerHeight - yPosition + 'px'
      }
      setAddProductSrc(productSrc)
      setShowClickAnimated(true)
      stopAnimated()
    },
    [animatedEleRef, stopAnimated]
  )

  const handleAddProduct = useCallback(
    (xPosition: number, yPosition: number, product: Product) => {
      handleShowClickAnimated(xPosition, yPosition, product.imgLink)
      dispach(
        pushProduct({
          id: product.id,
          name: product.productName,
          imgLink: product.imgLink,
          unitPrice: product.price,
          unit: product.unit,
          quantity: 1,
        })
      )
    },
    [dispach, handleShowClickAnimated]
  )

  const productList = useMemo(() => {
    return (
      products && (
        <>
          {products.map((product, index) => (
            <ProductCard
              key={index}
              addProduct={handleAddProduct}
              product={product}
            />
          ))}
        </>
      )
    )
  }, [products, handleAddProduct])

  const showShoppingCart = useMemo(() => {
    return router.query.action && router.query.action === 'shopcart'
  }, [router.query])

  return (
    <div className="w-full">
      <Header></Header>
      <div className="flex flex-wrap bg-slate-300 px-2 pt-12">
        {productList}
      </div>
      <Link href={`/?action=shopcart`} shallow>
        <div className="fixed right-5 bottom-5 cursor-pointer rounded-full bg-black p-3 shadow-lg duration-200 hover:shadow-active">
          <CartSvgIcon className="text-white"></CartSvgIcon>
        </div>
      </Link>
      {
        <Image
          ref={animatedEleRef}
          src={addProductSrc}
          className={`fixed h-8 w-8 translate-x-1/2 translate-y-1/2 rounded-full bg-black ${
            showClickAnimated ? 'block animate-gotoShopCartMobile' : 'hidden'
          }`}
          alt={'product-img'}
        ></Image>
      }
      <div
        className={`fixed bottom-5 right-5 max-h-[calc(100%-2.5rem)] max-w-[calc(100%-2.5rem)] rounded-lg bg-white shadow-2xl ${
          showShoppingCart
            ? 'h-full w-full animate-scaleIn'
            : 'h-0 w-0 animate-scaleOut'
        }`}
      >
        <ShopCart />
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
