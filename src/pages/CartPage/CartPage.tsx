import { Container } from '@/components/grid'
import s from './CartPage.module.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { IProduct } from '@/types/product.interface'
import { ProductCard } from '@/components/shared/ProductCard/ProductCard'
import { Button } from '@/components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { addProduct, clearCart, removeProduct } from '@/store/slices/cart.slice'

const getProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3001/products')
    return response.data
  } catch (error) {
    console.error('Ошибка при загрузке продуктов:', error)
    throw new Error('Не удалось загрузить продукты')
  }
}

export default function CartPage() {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery<IProduct[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  const dispatch = useDispatch()
  const cartProducts = useSelector((state: RootState) => state.cart.products)
  const cartProductsTotal = useSelector((state: RootState) => state.cart)

  return (
    <Container>
      <div className={s.container}>
        <div>
          <h3 className={s.title}>Продукты</h3>
          <div className={s['product-list']}>
            {isLoading && <div>Загрузка</div>}
            {error && (
              <div>{error instanceof Error ? error.message : 'Ошибка загрузки'}</div>
            )}
            {data.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                count={product.count}
              >
                <Button onClick={() => dispatch(addProduct(product))}>В корзину</Button>
              </ProductCard>
            ))}
          </div>
        </div>
        <div>
          <h3 className={s.title}>Страница корзины</h3>
          <Button onClick={() => dispatch(clearCart())}>Очистить корзину</Button>
          <div>
            Количество товаров в корзине:{' '}
            {cartProductsTotal.totalCount ? cartProductsTotal.totalCount : 'Товаров нет'}
          </div>
          <div>Общая стоимость: {cartProductsTotal.totalPrice}</div>

          {cartProducts.map((cartProduct) => (
            <ProductCard
              key={cartProduct.product.id}
              title={cartProduct.product.title}
              description={cartProduct.product.description}
              price={cartProduct.product.price}
            >
              <p className={s.count}>{cartProduct.count}</p>
              <Button onClick={() => dispatch(removeProduct(cartProduct.product.id))}>
                Удалить
              </Button>
            </ProductCard>
          ))}
        </div>
        <div>
          <h3 className={s.title}>Модальное окно корзины</h3>
          {cartProducts.map((cartProduct) => (
            <ProductCard
              key={cartProduct.product.id}
              title={cartProduct.product.title}
              price={cartProduct.product.price}
            >
              <p className={s.count}>{cartProduct.count}</p>
              <Button onClick={() => dispatch(removeProduct(cartProduct.product.id))}>
                Удалить
              </Button>
            </ProductCard>
          ))}
        </div>
      </div>
    </Container>
  )
}
