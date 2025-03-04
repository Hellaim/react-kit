import { Container } from '@/components/grid'
import s from './Home.module.css'

export default function Home() {
  return (
    <Container>
      <h1 className={s.title}>Home Page</h1>
    </Container>
  )
}
