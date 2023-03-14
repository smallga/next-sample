import { CartProduct } from '@/interface/cart-product.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

export interface ShopcartSlice {
  products: Record<string, CartProduct>
}

export interface changeCartItem {
  id: number
  unit: number
}

export const shopcartSlice = createSlice({
  name: 'shopcart',
  initialState: {
    products: {},
  } as ShopcartSlice,
  reducers: {
    uploadProductUnit: (
      state: ShopcartSlice,
      action: PayloadAction<changeCartItem>
    ) => {
      if (state.products[String(action.payload.id)]) {
      } else {
      }
    },
    pushProduct: (state: ShopcartSlice, action: PayloadAction<CartProduct>) => {
      if (state.products[String(action.payload.id)]) {
        state.products[String(action.payload.id)].quantity += 1
      } else {
        state.products[String(action.payload.id)] = action.payload
      }
    },
    deleteProductById: (
      state: ShopcartSlice,
      action: PayloadAction<number>
    ) => {
      delete state.products[String(action.payload)]
    },
    addProdcctUnit: (state: ShopcartSlice, action: PayloadAction<number>) => {
      if (state.products[String(action.payload)]) {
        state.products[String(action.payload)].quantity += 1
      }
    },
    minusProdcctUnit: (state: ShopcartSlice, action: PayloadAction<number>) => {
      if (
        state.products[String(action.payload)] &&
        state.products[String(action.payload)].quantity > 0
      ) {
        state.products[String(action.payload)].quantity -= 1
      }
    },
  },
})

export const {
  uploadProductUnit,
  addProdcctUnit,
  minusProdcctUnit,
  deleteProductById,
  pushProduct,
} = shopcartSlice.actions
export const getCartProducts = (state: RootState) => state.shopcart.products
export default shopcartSlice.reducer
