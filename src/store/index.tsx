import { configureStore } from '@reduxjs/toolkit'
import shopcartSliceReducer from './slice/shopcart.slice'

const store = configureStore({
  reducer: {
    shopcart: shopcartSliceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
