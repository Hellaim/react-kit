import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '@/types/product.interface'

interface CartProduct {
  product: IProduct
  count: number // количество в корзине
}

interface CartState {
  products: CartProduct[] // товары в корзине
  totalCount: number // общее количество товаров
  totalPrice: number // общая цена всех товаров
}

const LOCAL_STORAGE_KEY = 'cart'
const LOCAL_STORAGE_KEY_TOTALS = 'cart_totals'

// Функция загрузки корзины из localStorage
const loadCart = (): CartProduct[] => {
  try {
    const savedCart = localStorage.getItem(LOCAL_STORAGE_KEY)
    return savedCart ? JSON.parse(savedCart) : []
  } catch (error) {
    console.error('Ошибка загрузки корзины из localStorage:', error)
    return []
  }
}

// Функция загрузки данных корзины (totalCount и totalPrice) из localStorage
const loadCartTotals = (): { totalCount: number; totalPrice: number } => {
  try {
    const savedTotals = localStorage.getItem(LOCAL_STORAGE_KEY_TOTALS)
    return savedTotals ? JSON.parse(savedTotals) : { totalCount: 0, totalPrice: 0 }
  } catch (error) {
    console.error('Ошибка загрузки данных корзины из localStorage:', error)
    return { totalCount: 0, totalPrice: 0 }
  }
}

// Функция сохранения корзины в localStorage
const saveCart = (cart: CartProduct[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart))
  } catch (error) {
    console.error('Ошибка сохранения корзины в localStorage:', error)
  }
}

// Функция сохранения данных корзины (totalCount и totalPrice) в localStorage
const saveCartTotals = (totalCount: number, totalPrice: number) => {
  try {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_TOTALS,
      JSON.stringify({ totalCount, totalPrice }),
    )
  } catch (error) {
    console.error('Ошибка сохранения данных корзины в localStorage:', error)
  }
}

// Функция для вычисления общего количества и общей цены
const calculateTotals = (products: CartProduct[]) => {
  let totalCount = 0
  let totalPrice = 0

  products.forEach((cartProduct) => {
    totalCount += cartProduct.count
    totalPrice += cartProduct.product.price * cartProduct.count
  })

  return { totalCount, totalPrice }
}

const initialState: CartState = {
  products: loadCart(),
  totalCount: loadCartTotals().totalCount,
  totalPrice: loadCartTotals().totalPrice,
}

// Обновляем состояние корзины с учётом общего количества и цены
const updateCartTotals = (state: CartState) => {
  const { totalCount, totalPrice } = calculateTotals(state.products)
  state.totalCount = totalCount
  state.totalPrice = totalPrice

  saveCartTotals(totalCount, totalPrice) // Сохраняем новые данные в localStorage
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      const existingProduct = state.products.find(
        (p) => p.product.id === action.payload.id,
      )

      if (existingProduct) {
        if (existingProduct.count < action.payload.count) {
          existingProduct.count += 1
        }
      } else {
        state.products.push({ product: action.payload, count: 1 })
      }

      updateCartTotals(state) // Обновляем общие данные
      saveCart(state.products) // Сохраняем изменения в localStorage
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.product.id !== action.payload)
      updateCartTotals(state) // Обновляем общие данные
      saveCart(state.products) // Сохраняем изменения в localStorage
    },
    clearCart: (state) => {
      state.products = []
      state.totalCount = 0
      state.totalPrice = 0
      saveCart(state.products) // Очищаем localStorage
      saveCartTotals(0, 0) // Очищаем данные корзины в localStorage
    },
  },
})

export const { addProduct, removeProduct, clearCart } = cartSlice.actions
export default cartSlice.reducer
