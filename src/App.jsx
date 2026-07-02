import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import HomePage from './pages/HomePage'

function App() {
  const [count, setCount] = useState(0)
  const [userName,setUser] = useState("Guest")

  return (
    <>
      <HomePage />
    </>
  )
}

export default App
