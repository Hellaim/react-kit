'use client'
import { Button } from '@/components/ui'
import { useEffect, useState } from 'react'

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<string>(() => {
    // Чтение сохраненной темы или установка темы по умолчанию
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    // Обновление localStorage и класса HTML элемента
    localStorage.setItem('theme', theme)
    document.documentElement.className = theme
  }, [theme])

  const toggle = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <Button onClick={toggle}>{theme === 'light' ? 'Темная тема' : 'Светлая тема'}</Button>
  )
}
