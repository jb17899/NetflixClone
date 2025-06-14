import { useState } from 'react'
import './App.css'
import HomePage from './pages/home/HomePage'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path = '/' element={<HomePage/>}/>
    
      <Route path = '/login' element={<LoginPage/>}/>
    
      <Route path = '/signup' element={<SignUpPage/>}/>
    </Routes>
  )
}

export default App
