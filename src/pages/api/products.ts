// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Product } from '@/interface/product.interface'
import type { NextApiRequest, NextApiResponse } from 'next'
import { sampleProduct } from './sample/product-sample'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  res.status(200).json(sampleProduct)
}
