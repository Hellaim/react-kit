import { createBrowserRouter } from 'react-router-dom'
import { Home, About, Demo, FormPage, CartPage } from '@/pages'
import { Layout } from './Layout'
import { Suspense } from 'react'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/about',
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: '/demo',
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Demo />
          </Suspense>
        ),
      },
      {
        path: '/form-page',
        element: (
          <Suspense fallback={<p>Loding...</p>}>
            <FormPage />
          </Suspense>
        ),
      },
      {
        path: '/cart',
        element: (
          <Suspense fallback={<p>Loding...</p>}>
            <CartPage />
          </Suspense>
        ),
      },
    ],
  },
])
