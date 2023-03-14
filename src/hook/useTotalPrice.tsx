import { CartProduct } from '@/interface/cart-product.interface'
import { getCartProducts } from '@/store/slice/shopcart.slice'
import { useMemo } from 'react'
import { useAppSelector } from './redux-hook'

export const useTotalPrice = () => {
  const cartProducts = useAppSelector(getCartProducts)

  return useMemo(() => {
    const initialValue = 0
    return Object.entries<CartProduct>(cartProducts).reduce(
      (accumulator, [key, product]) =>
        accumulator + product.quantity * product.unitPrice,
      initialValue
    )
  }, [cartProducts])
}
