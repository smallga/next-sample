import ShopCartProduct from '@/components/shop-cart-product'
import { useAppSelector } from '@/hook/redux-hook'
import { useTotalPrice } from '@/hook/useTotalPrice'
import { CartProduct } from '@/interface/cart-product.interface'
import { getCartProducts } from '@/store/slice/shopcart.slice'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

interface ShopCartProps {}
export default function ShopCart(props: ShopCartProps) {
  const router = useRouter()
  const cartProducts = useAppSelector(getCartProducts)
  const cartContent = useMemo(() => {
    return Object.entries<CartProduct>(cartProducts).map(([key, product]) => (
      <ShopCartProduct key={key} product={product} />
    ))
  }, [cartProducts])

  const totalPrice = useTotalPrice()

  const handleCartClose = () => {
    if (router) {
      router.back()
    }
  }

  const handleScroll = (e: any) => {
    e.stopPropagation()
  }

  return (
    <div aria-label="shopping-cart" className="flex h-full w-full flex-col">
      <div
        className="rounded-t-md border-b-[1px] border-slate-300 bg-white px-4 pt-4"
        onScroll={handleScroll}
      >
        <h2 className="mb-2">購物車</h2>
        <div
          aria-label="close-shopping-cart"
          className="absolute right-4 top-4 cursor-pointer"
          onClick={handleCartClose}
        >
          X
        </div>
      </div>
      <div className="w-full flex-1 overflow-y-auto p-2 px-4">
        {cartContent}
      </div>
      <div
        aria-label="cart-footer"
        className="h-20 w-full rounded-b-md border-t-[1px] border-slate-300 bg-white px-4 py-2"
      >
        <div>Total: ${totalPrice}</div>
        <Link href={`/checkout`}>
          <button className="mt-2 w-full bg-slate-700">我要結帳</button>
        </Link>
      </div>
    </div>
  )
}
