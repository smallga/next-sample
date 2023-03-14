import { Product } from '@/interface/product.interface'
import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import HeartSvg from '@/icons/heart-icon'

interface ProductCardProps {
  product: Product
  addProduct?: (x: number, y: number, product: Product) => void
}
export default function ProductCard(props: ProductCardProps) {
  const { product } = props

  const [isLiked, setIsLiked] = useState(false)
  const [clickX, setClickX] = useState(0)
  const [clickY, setClickY] = useState(0)
  const [showClickAnimated, setShowClickAnimated] = useState(false)

  let inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = '1'
    }
  }, [inputRef])

  const changeLike = useCallback(() => {
    setIsLiked(!isLiked)
  }, [isLiked])

  const addItemToCart = (e: any) => {
    const { addProduct } = props
    let xPosition = e.clientX
    let yPosition = e.clientY
    if (addProduct) {
      addProduct(xPosition, yPosition, product)
    }
  }

  return (
    <div className="m-2 flex-[calc(50%-1rem)] cursor-pointer rounded-xl bg-white p-3 shadow-sm duration-200 hover:scale-[103%]  hover:shadow-xl md:flex-[calc(33%-1rem)] md:p-4 lg:flex-[calc(25%-1rem)]">
      <HeartSvg
        className={`ml-auto cursor-pointer hover:brightness-90 ${
          isLiked ? 'active animate-clickAnimate' : ''
        }`}
        onClick={changeLike}
      ></HeartSvg>
      <Image
        loader={() => product.imgLink}
        src={product.imgLink}
        alt={product.productName}
        width={'200'}
        height={'200'}
        className=" max-h-[200px] w-full object-contain duration-200"
      />
      <h2>{product.productName}</h2>
      <p className="mt-2 text-sm text-des">{product.information}</p>
      <p className="mt-1 text-xs text-des">{product.unit}</p>
      <div className="mt-2 flex items-center">
        <span className="text-xl">{`$${product.price}`}</span>
        <button className="ml-auto block" onClick={addItemToCart}>
          加入
        </button>
      </div>
    </div>
  )
}
