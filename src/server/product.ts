import { Product } from '@/interface/product.interface'
import axios from 'axios'

const urlProfix = 'https://next-shop-page.vercel.app/'

export async function getProduct(id: string): Promise<Product> {
  const { data: response } = await axios(`${urlProfix}/api/product/${id}`)
  return response
}

export async function getProducts(): Promise<Product[]> {
  const { data: response } = await axios(`${urlProfix}/api/products`)
  return response
}
