import React, { useState } from 'react'

function Login() {
  const [currentState, setCurrentState] = useState('Login')

  const onsubmitHandler = (event)=>{
    event.preventDefault();
  }

  return (
    <form onSubmit={onsubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentState === 'Login' ? "" : <input className='w-full px-3 py-2 border border-gray-800' type="text" placeholder='Name' required/>}
      <input className='w-full px-3 py-2 border border-gray-800' type="email" placeholder='Email' required/>
      <input className='w-full px-3 py-2 border border-gray-800' type="password" placeholder='password' required/>
      <div className='flex w-full justify-between text-sm -mt-2'>
        <p>Foregot your password?</p>
        {
          currentState === "Login"
          ? <p onClick={(e)=>setCurrentState('Sign Up')} className='cursor-pointer'>Sign Up</p>
          : <p onClick={(e)=> setCurrentState('Login')} className='cursor-pointer'>Sign In</p>
        }
      </div>
      <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? "Sing In" : "Sign Up"}</button>
    </form>
  )
}

export default Login