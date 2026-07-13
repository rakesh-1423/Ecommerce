import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios, { all } from 'axios';
import { assets } from '../assets/assets';

function Order() {
  const {currency, backendUrl, token, navigate} = useContext(ShopContext)
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async()=>{
    try {
      if(!token){
        return null;
      }
  
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, {headers: {token}})
      console.log("respoknse ::", response.data);
      if(response.data.success){
        let allOrdersItem = [];
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          })
        })
        setOrderData(allOrdersItem.reverse())
        console.log("orderData  ", orderData);
      }
    } catch (error) {
      console.log("Error while loadOrderData ::::", error);
    }
  }

  useEffect(()=>{
    loadOrderData();
  }, [token])
  

  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>

      <div>
        {
          orderData.length > 0 ? orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base'>
                    <p>{currency} {item.price}</p>
                    <p className=''>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>

              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer'>Track Order</button>
              </div>
            </div>
          )) :<div className='flex flex-col items-center text-center'>
                <img className='w-50 h-50' src={assets.no_order} alt="" />
                <div className='flex flex-col my-5 gap-1'>
                  <p className='text-2xl font-bold text-black'>There is no order yet</p>
                  <p className='text-sm font-semibold text-gray-600'>Start browsing there might be something for you</p>
                </div>
                <button onClick={(e)=>navigate('/collection')} className='px-7 py-2 text-white bg-blue-800 rounded'>Shop Now</button>
              </div>
        }
      </div>
    </div>
  )
}

export default Order