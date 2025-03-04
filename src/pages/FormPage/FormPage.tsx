import { Container, FormGroup } from '@/components/grid'
import s from './FormPage.module.css'
import { Button, Input, Label } from '@/components/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import clsx from 'clsx'

// 1️⃣ Определяем схему валидации с помощью Zod
const formSchema = z.object({
  email: z.string().email('Введите корректный email'),
  name: z.string().min(2, 'Имя должно содержать хотя бы 2 символа'),
  password: z
    .string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
    .regex(/[\W_]/, 'Пароль должен содержать хотя бы один спецсимвол'),
})

// 2️⃣ Определяем тип формы на основе схемы Zod
type FormData = z.infer<typeof formSchema>

export default function FormPage() {
  const queryClient = useQueryClient()

  // 3️⃣ Подключаем react-hook-form с Zod валидацией
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  // 4️⃣ Создаем мутацию для отправки данных через React Query
  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return axios.post('http://localhost:3001/users', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }) // Обновляем кэш пользователей
      alert('Пользователь успешно зарегистрирован!')
      reset() // Очищаем форму после успешной отправки
    },
    onError: (error) => {
      console.error('Ошибка при отправке формы:', error)
      alert('Ошибка при отправке данных!')
    },
  })

  // 5️⃣ Функция обработки отправки формы
  const onSubmit = (data: FormData) => {
    mutation.mutate(data)
  }

  return (
    <Container>
      <h1 className={s.title}>Регистрация</h1>
      <div className={s.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="email" required error={errors.email?.message}>
              Электронная почта:
            </Label>
            <Input
              className={clsx({ [s.error]: errors.email })}
              type="email"
              placeholder="Email"
              id="email"
              {...register('email')}
            />
            {errors.email && <p className={s.error}>{errors.email.message}</p>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="name" required>
              Имя:
            </Label>
            <Input
              className={clsx({ [s.error]: errors.name })}
              type="text"
              placeholder="Имя"
              id="name"
              {...register('name')}
            />
            {errors.name && <p className={s.error}>{errors.name.message}</p>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password" required>
              Пароль:
            </Label>
            <Input
              className={clsx({ [s.error]: errors.password })}
              type="password"
              placeholder="Пароль"
              id="password"
              {...register('password')}
            />
            {errors.password && <p className={s.error}>{errors.password.message}</p>}
          </FormGroup>

          <Button type="submit" disabled={mutation.status === 'pending'}>
            {mutation.status === 'pending' ? 'Отправка...' : 'Зарегистрироваться'}
          </Button>
        </form>
      </div>
    </Container>
  )
}
