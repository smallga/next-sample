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
import { useAppDispatch, useAppSelector } from '@/hook/redux-hook'
import { getCartProducts, pushProduct } from '@/store/slice/shopcart.slice'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import useProducts from '@/hook/useProducts'

const inter = Inter({ subsets: ['latin'] })

interface HomeProps {}

export default function Home(props: HomeProps) {
  const { data, isLoading } = useProducts()
  const router = useRouter()
  const dispach = useAppDispatch()
  const cartProducts = useAppSelector(getCartProducts)

  const [showClickAnimated, setShowClickAnimated] = useState(false)
  const [addProductSrc, setAddProductSrc] = useState('')
  const animatedEleRef = useRef<HTMLImageElement>(null)

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
      data &&
      data.length > 0 && (
        <>
          {data.map((product, index) => (
            <ProductCard
              key={index}
              addProduct={handleAddProduct}
              product={product}
            />
          ))}
        </>
      )
    )
  }, [data, handleAddProduct])

  const showShoppingCart = useMemo(() => {
    return router.query.action && router.query.action === 'shopcart'
  }, [router.query])

  return (
    <div className="w-full">
      <div className="flex flex-wrap bg-slate-300 px-2">
        {isLoading && (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        {productList}
      </div>
      <Link href={`/?action=shopcart`} shallow>
        <div className="fixed right-5 bottom-5 cursor-pointer rounded-full bg-black p-3 shadow-lg duration-200 hover:shadow-active">
          <div className="relative">
            {cartProducts && Object.entries(cartProducts).length > 0 && (
              <>
                <span className="absolute top-0 right-0 inline-flex h-3 w-3 animate-ping  rounded-full bg-sky-400 opacity-90"></span>
                <span className="absolute top-0 right-0 inline-flex h-3 w-3  rounded-full bg-sky-500"></span>
              </>
            )}
            <CartSvgIcon className="text-white"></CartSvgIcon>
          </div>
        </div>
      </Link>
      {
        <Image
          ref={animatedEleRef}
          src={addProductSrc}
          width="32"
          height="32"
          className={`fixed h-8 w-8 translate-x-1/2 translate-y-1/2 rounded-full bg-slate-500 ${
            showClickAnimated ? 'block animate-gotoShopCartMobile' : 'hidden'
          }`}
          alt={'product-img'}
          priority={true}
        ></Image>
      }
      <div
        className={`fixed bottom-5 right-5 max-h-[calc(100%-2.5rem)] max-w-[calc(100%-2.5rem)] rounded-lg bg-white shadow-2xl lg:max-h-[700px] lg:max-w-[500px] ${
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
  const queryClient = new QueryClient()
  await queryClient.fetchQuery(['products'], getProducts)
  // const products = (await getProducts()) as Product[]

  return {
    props: {
      products: dehydrate(queryClient).queries[0].state.data,
    },
  }
}
