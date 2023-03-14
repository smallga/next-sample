import ShopCartProduct from '@/components/shop-cart-product'
import { useAppSelector } from '@/hook/redux-hook'
import { CartProduct } from '@/interface/cart-product.interface'
import { getCartProducts } from '@/store/slice/shopcart.slice'
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

  const totalPrice = useMemo(() => {
    const initialValue = 0
    return Object.entries<CartProduct>(cartProducts).reduce(
      (accumulator, [key, product]) =>
        accumulator + product.quantity * product.unitPrice,
      initialValue
    )
  }, [cartProducts])

  const handleCartClose = () => {
    if (router) {
      router.back()
    }
  }

  const handleScroll = (e: any) => {
    e.stopPropagation()
  }

  return (
    <div
      aria-label="shopping-cart"
      className="relative h-full w-full overflow-y-auto"
    >
      <div
        className="sticky top-0 left-0 rounded-t-md border-b-[1px] border-slate-300 bg-white px-4 pt-4"
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
      <div className="p-2 px-4">{cartContent}</div>
      <div
        aria-label="cart-footer"
        className="sticky left-0 bottom-0 h-20 rounded-b-md bg-white px-4 py-2"
      >
        <div>Total: ${totalPrice}</div>
        <button className="mt-2 w-full bg-slate-700">我要結帳</button>
      </div>
    </div>
  )
}
