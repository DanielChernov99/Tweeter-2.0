import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import HomePage from './pages/HomePage'
import UserPage from './pages/UserPage'
import NavBar from './components/NavBar'
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  const [count, setCount] = useState(0)
  const [userName,setUser] = useState("Guest")

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/user" element={<UserPage />}/>
      </Routes>
        
    </BrowserRouter>
  )
}

export default App
