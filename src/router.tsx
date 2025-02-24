import { createBrowserRouter } from 'react-router-dom'
import { Home, About, Demo } from '@/pages'
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
    ],
  },
])
