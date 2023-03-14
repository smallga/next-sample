import { useTotalPrice } from '@/hook/useTotalPrice'
import { useMemo } from 'react'
import Image from 'next/image'

interface ChekcoutProps {}
export default function Chekcout(props: ChekcoutProps) {
  const totalPrice = useTotalPrice()

  const Vat = useMemo(() => {
    return totalPrice * 0.05
  }, [totalPrice])

  const addVat = useMemo(() => {
    return Vat + totalPrice
  }, [totalPrice, Vat])

  return (
    <div className="m-auto flex h-[calc(100vh-6rem)] w-full max-w-[600px] flex-col justify-center px-4">
      <div className="flex">
        {`未稅:`}
        <div className="ml-auto">${totalPrice}</div>
      </div>
      <div className="flex">
        {`稅額(5%):`}
        <div className="ml-auto">+${Vat}</div>
      </div>
      <div className="h-1 border-t-2 border-slate-500"></div>
      <div className="flex">
        <div>總金額:</div>
        <div className="ml-auto">${addVat}</div>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button className="flex h-14 w-full max-w-[250px] items-center justify-center border-2 border-slate-700 bg-white text-[32px] text-slate-700 lg:w-full lg:flex-1">
          <Image
            src={'/images/line.png'}
            alt={'linepay'}
            width={32}
            height={32}
            className="mr-4"
          ></Image>
          Line Pay
        </button>
        <button className="flex h-14 w-full max-w-[250px] items-center justify-center border-2 border-slate-700 bg-white text-[32px] text-slate-700 lg:w-full lg:flex-1">
          <Image
            src={'/images/apple.png'}
            alt={'applepay'}
            width={32}
            height={32}
            className="mr-4"
          ></Image>
          Apple Pay
        </button>
      </div>
    </div>
  )
}
