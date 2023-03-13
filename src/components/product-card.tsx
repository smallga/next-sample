import { Product } from '@/interface/product.interface'
import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import HeartSvg from '@/icons/heart-icon'

interface ProductCardProps {
  product: Product
  showClickAnimated?: (x: number, y: number, src: string) => void
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
    console.log(e)
    const { showClickAnimated } = props
    let xPosition = e.clientX
    let yPosition = e.clientY
    if (showClickAnimated) {
      showClickAnimated(xPosition, yPosition, product.imgLink)
    }
  }

  return (
    <div className="m-2 flex-[calc(50%-1rem)] rounded-xl bg-white p-4 shadow-sm duration-200 hover:shadow-xl md:flex-[calc(33%-1rem)] lg:flex-[calc(25%-1rem)]">
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
      <h2>
        {product.productName}
        <span className="ml-2 text-xl">{`- $${product.price}`}</span>
      </h2>
      <p className="mt-2 text-des">{product.information}</p>
      <p className="mt-1 text-sm text-des">{product.unit}</p>
      <div className="flex items-center">
        {/* <input
          type="number"
          ref={inputRef}
          className="mx-2 ml-auto w-[60px] border-slate-400"
        /> */}
        <button className="ml-auto block" onClick={addItemToCart}>
          加入購物車
        </button>
      </div>
    </div>
  )
}
