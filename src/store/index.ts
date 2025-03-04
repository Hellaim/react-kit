import { configureStore } from '@reduxjs/toolkit'
import testReducer from './slices/testSlice'
import cartReducer from './slices/cart.slice'

export const store = configureStore({
  reducer: {
    test: testReducer,
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
