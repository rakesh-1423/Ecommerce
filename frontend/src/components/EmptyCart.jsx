import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

function EmptyCart() {
  const {token} = useContext(ShopContext)
  return (
    <div className='flex flex-col gap-5 w-full items-center text-center mt-5 mb-0'>
        <img className='w-70' src={assets.nova_emty} alt="" />
        <p className='font-bold text-3xl '>{token === '' ? 'Missing Cart items?' : 'Your cart is empty!'}</p>
        <Link to={'/login'}><button className='px-10 py-2 bg-blue-600 rounded-sm text-white font-semibold text-sm cursor-pointer'>{token === '' ? 'Login' : 'Shop now'}</button></Link>
        <Link to={'/collection'}><p className='text-[#0000FF] text-sm'>{token === '' ? 'Continue Shopping' : "There is nothing in your bag. Let's add some items."}</p></Link>
    </div>
  )
}

export default EmptyCart