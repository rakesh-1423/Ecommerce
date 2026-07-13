import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

function Profile() {
    const {token, backendUrl, setToken, navigate, setCartItems} = useContext(ShopContext)
    const [userData, setUserData] = useState({})
    const [copied, setCopied] = useState(false)

    const fetchUserProfile = async ()=>{
        try {
            const response = await axios.post(backendUrl + '/api/user/userProfile', {}, {headers:{token}})
            // console.log("Profil api response : ", response);
            if(response.data.success){
                setUserData(response.data.user)
            }else{
                console.log("false response return...");
            }
        } catch (error) {
            console.log("Error while fetchUserProfile", error);
        }
    }

    useEffect(()=>{
        fetchUserProfile()
    },[token])

    const logout = ()=>{
        setToken('');
        localStorage.removeItem('token')
        navigate('/')
        setCartItems({})
    }

    const handleCopied = async()=>{
        try {
            const referalCode = userData._id;
            if(referalCode){
                await navigator.clipboard.writeText(referalCode)
                setCopied(true);
                toast.success("Referral code copied!")
            }
        } catch (error) {
            console.log("Error while handleCopied::", error);
        }
    }

  return (
    <div className='mt-10'>
        <div className='w-[50%] mx-auto border border-gray-600 rounded pb-5'>
            <div className='h-20 w-[50%] flex items-center py-5 pl-10'>
                <img className='w-15 h-15' src={assets.user_profile_icon} alt="" />
                <p className=''>User_id: <u>{userData._id}</u></p>
            </div>
            <div className='flex flex-col gap-2 w-[90%] mx-auto'>
                <hr></hr>
                <div className='flex justify-between px-10 py-2'>
                    <p>Name</p>
                    <p>{userData.name}</p>
                </div><hr></hr>
                <div className='flex justify-between px-10 py-2'>
                    <p>Email account</p>
                    <p>{userData.email}</p>
                </div><hr></hr>
                <div className='flex justify-between px-10 py-2'>
                    <p>Referral Code</p>
                    <div className='flex gap-1'>
                        <p>{copied ? "Copied!" : "Copy"} </p>
                        <img onClick={handleCopied} className='w-5 h-5 cursor-pointer' src={assets.copy_icon} alt="" />
                    </div>
                </div><hr></hr>
                <div className='flex justify-between px-10 py-2'>
                    <p>Location</p>
                    <p>India</p>
                </div>
                <button onClick={logout} className='cursor-pointer mx-10 px-3 mt-5 font-semibold text-sm py-2 bg-blue-600 text-white rounded'>Log Out</button>
            </div>
        </div>
    </div>
  )
}

export default Profile