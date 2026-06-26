import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

function About() {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-112.5' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Forever is an online shopping platform designed to provide customers with a seamless and enjoyable shopping experience. We offer a wide range of high quality products, including fashion, accessories, and lifestyle essentials, at affordable prices.</p>
          <p>Our mission is to make online shopping simple, reliable, and accessible for everyone. We focus on delivering excellent customer service, secure payments, fast shipping, and quality products that meet customer expectations.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>To become a trusted global eCommerce brand by providing quality products, exceptional service, and a customer first shopping experience.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 mx:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Quality is at the heart of everything we do. Every product available on Forever is carefully reviewed to ensure it meets our standards for durability, design, and performance. We work closely with trusted suppliers and manufacturers to provide products that deliver value and exceed customer expectations. Our commitment to quality ensures that every purchase reflects the standards our customers deserve</p>
        </div>
        <div className='border px-10 mx:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience at Every Step</b>
          <p className='text-gray-600'>We understand the importance of a smooth and hassle free shopping experience. Forever is designed with a user friendly interface that allows customers to easily discover products, compare options, and complete purchases securely. From simple navigation and secure payment methods to fast order processing and reliable delivery, we focus on making online shopping as convenient as possible.</p>
        </div>
        <div className='border px-10 mx:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Innovation and Growth</b>
          <p className='text-gray-600'>Forever continuously adapts to changing customer needs and market trends. We are committed to improving our platform, expanding our product range, and implementing innovative solutions that enhance the shopping experience. Through constant growth and innovation, we aim to remain a trusted and preferred choice for online shoppers.</p>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default About