import { Product } from "@/interface/product.interface"
import { useEffect, useRef } from "react";

interface ProductCardProps {
  product: Product;
}
export default function ProductCard(props: ProductCardProps) {

  const { product } = props;
  
  let inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(inputRef && inputRef.current) {
      inputRef.current.value = '1';
    }
  }, [inputRef])

  return (
    <div className="p-4 duration-200 rounded-xl shadow-sm bg-white hover:shadow-xl">
      <img src={product.imgLink} alt={product.productName} className="w-full h-[250px] object-contain"/>
      <h3>{product.productName}</h3>
      <div className="flex justify-center">
        <button className="h-6 w-6 bg-red-400 text-slate-200">+</button>
          <input ref={inputRef} className="focus:border-red-400"/>
        <button className="h-6 w-6 bg-red-400 text-slate-200">-</button>
      </div>
      <button className="h-8 w-100 bg-red-400 text-slate-200">+</button>
    </div>
  )
}