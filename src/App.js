import React from 'react'
import NavBar from './components/navBar/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/placeOrder/PlaceOrder'

const App = () => {
  return (
    <div className='app'>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/placeOrder'element={<PlaceOrder/>}/>
      </Routes>
      <title>Food Del</title>
    </div>
  )
}

export default App
