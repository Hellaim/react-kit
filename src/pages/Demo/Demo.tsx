import s from './Demo.module.css'
import { Container } from '@/components/grid'
import { Button } from '@/components/ui'

// redux
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { decrement, increment } from '@/store/slices/testSlice'

// tanstack
import { useQuery } from '@tanstack/react-query'

type Post = {
  id: number
  title: string
}

const fetchData = async (): Promise<Post[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
  if (!response.ok) {
    throw new Error('Ошибка сети')
  }
  return response.json()
}

export default function Demo() {
  // redux
  const dispatch = useDispatch()
  const test = useSelector((state: RootState) => state.test.value)

  // tanstack
  const {
    data = [],
    error,
    isLoading,
  } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchData,
  })

  if (isLoading) return <div>Loading...</div>
  if (error instanceof Error) return <div>An error occurred: {error.message}</div>

  return (
    <Container>
      <h1>DEMO</h1>
      <h2>Test redux</h2>
      <p>Value: {test}</p>
      <Button className={s['btn-m']} onClick={() => dispatch(decrement())}>
        decrement
      </Button>
      <Button onClick={() => dispatch(increment())}>increment</Button>
      <h2>Test Tanstack</h2>
      <ul>
        {data.map((post: { id: number; title: string }) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </Container>
  )
}
