import { useAppDispatch } from '@/hook/redux-hook'
import { CartProduct } from '@/interface/cart-product.interface'
import { addProdcctUnit, minusProdcctUnit } from '@/store/slice/shopcart.slice'
import Image from 'next/image'
import { useEffect, useMemo, useRef } from 'react'

interface ShopCartProductProps {
  product: CartProduct
}
export default function ShopCartProduct(props: ShopCartProductProps) {
  const { product } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const dispach = useAppDispatch()

  const addUnit = () => {
    dispach(addProdcctUnit(product.id))
  }
  const minusUnit = () => {
    dispach(minusProdcctUnit(product.id))
  }
  const totalPrice = useMemo(
    () => product.quantity * product.unitPrice,
    [product.quantity, product.unitPrice]
  )

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = String(product.quantity)
    }
  }, [inputRef, product.quantity])

  return (
    <div className="flex border-b-[1px] border-slate-300 py-2">
      <div
        aria-label="product-image"
        className="mr-2 flex h-[80px] items-center"
      >
        <Image
          src={product.imgLink}
          alt={product.name}
          width={70}
          height={70}
          className="object-contain"
        ></Image>
      </div>
      <div
        aria-label="product-info"
        className="flex flex-1 flex-col justify-between"
      >
        <div className="flex justify-between">
          <span>{product.name}</span>
          <span>${totalPrice}</span>
        </div>
        <p className="text-xs text-des">
          <span className="mr-1">${product.unitPrice}</span>/
          <span className="ml-1">{product.unit}</span>
        </p>
        <div>
          <button
            onClick={addUnit}
            className="h-6 w-4 min-w-[35px] rounded-l-lg rounded-r-none border-[1px] border-slate-300 bg-white p-0 leading-none text-black"
          >
            +
          </button>
          <input
            ref={inputRef}
            className="h-6 w-12 rounded-none border-l-0 border-r-0 border-slate-300 text-center shadow-none"
            type="number"
          />
          <button
            onClick={minusUnit}
            className="h-6 w-4 min-w-[35px] rounded-l-none rounded-r-lg border-[1px] border-slate-300 bg-white leading-none text-black"
          >
            -
          </button>
        </div>
      </div>
    </div>
  )
}
