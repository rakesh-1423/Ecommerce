import React, { useState } from 'react'

function NewsletterBox() {
    const [subscriberEmail, setSubscriberEmail] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("Subscribed by email: ", subscriberEmail);
        setSubscriberEmail("")
    }
  return (
    <div className='w-full text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now and get 20% off</p>
        <p className='text-gray-400 mt-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium nostrum tenetur veritatis sunt animi repudiandae.</p>
    
        <form onSubmit={handleSubmit} className='border w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 pl-3'>
            <input value={subscriberEmail} onChange={(e)=>setSubscriberEmail((e.target.value))} className='outline-none w-full sm:flex-1' type="email" placeholder='Enter your email' required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsletterBox