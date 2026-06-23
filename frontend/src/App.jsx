import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Collection from './pages/Collection'
import Contect from './pages/Contect'
import Login from './pages/Login'
import Order from './pages/Order'
import PlaceOrder from './pages/placeOrder'
import Product from './pages/Product'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/contact' element={<Contect/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/order' element={<Order/>} />
        <Route path='/place-order' element={<PlaceOrder/>} />
        <Route path='/product/:productId' element={<Product/>} />
      </Routes>
    </div>
  )
}

export default App