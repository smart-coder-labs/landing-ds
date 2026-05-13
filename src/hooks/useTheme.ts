import React from 'react'

export function useTheme() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('apple-ds-theme')
    if (saved === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark')
    localStorage.setItem('apple-ds-theme', isDark ? 'dark' : 'light')
  }

  return { mounted, toggleTheme }
}
