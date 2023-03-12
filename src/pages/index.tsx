import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { GetServerSideProps } from 'next'
import { getProduct } from '@/server/product'
import { Product } from '@/interface/product.interface'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
  producsts: Product[],
}

export default function Home(props: HomeProps) {
  const { producsts } = props;
  useEffect(() => {
    console.log(producsts);
  }, [])
  return (
    <>
    123
      {producsts && producsts[1]}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await getProduct() as Product[];

  return {
    props: {
      products
    }
  }
}
