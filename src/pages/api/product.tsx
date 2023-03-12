// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Product } from '@/interface/product.interface'
import type { NextApiRequest, NextApiResponse } from 'next'
import { sampleProduct } from './sample/product-sample';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | undefined>
) {
  const { id } = req.query;
  const getProduct = sampleProduct.find(product => (String(product.id) === id));
  res.status(200).json(getProduct);
}
