import { Product } from '@/interface/product.interface'
import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import HeartSvg from '@/icons/heart-icon'

interface ProductCardProps {
  product: Product
}
export default function ProductCard(props: ProductCardProps) {
  const { product } = props

  const [isLiked, setIsLiked] = useState(false)

  let inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = '1'
    }
  }, [inputRef])

  const changeLike = useCallback(() => {
    setIsLiked(!isLiked)
  }, [isLiked])

  return (
    <div className="m-2 flex-[50%] rounded-xl bg-white p-4 shadow-sm duration-200 hover:shadow-xl md:flex-[33%] lg:flex-[25%]">
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
      <p className="my-2 text-des">{product.information}</p>
      <div className="flex">
        <input
          type="number"
          ref={inputRef}
          className="mx-2 ml-auto w-[60px] border-slate-400"
        />
        <button className="ml-2">加入購物車</button>
      </div>
    </div>
  )
}
