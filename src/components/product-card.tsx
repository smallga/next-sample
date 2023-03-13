import { Product } from '@/interface/product.interface'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
}
export default function ProductCard(props: ProductCardProps) {
  const { product } = props

  let inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = '1'
    }
  }, [inputRef])

  return (
    <div className="m-2 flex-[50%] rounded-xl bg-white p-4 shadow-sm duration-200 hover:shadow-xl md:flex-[33%] lg:flex-[25%]">
      <Image
        loader={() => product.imgLink}
        src={product.imgLink}
        alt={product.productName}
        width={'100'}
        height={'100'}
        className="h-[250px] w-full object-contain"
      />
      <h2>{product.productName}</h2>
      <button className="w-100 h-8 bg-red-400 text-slate-200">+</button>
    </div>
  )
}
