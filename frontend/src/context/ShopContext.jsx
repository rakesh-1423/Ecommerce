import { createContext, useEffect, useState } from "react";
import {products} from '../assets/assets' 
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

export const ShopContext = createContext();

const ShopContextProvider = (props)=>{
    const currency = "₹"
    const delivery_fee = 10
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const navigate = useNavigate()  // for navigate path of url if page exist 

    const addToCart = async (itemId, size) =>{
        const cartData = structuredClone(cartItems)

        if(!size){
            toast.error("select product size")
            return ;    
        }

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        setCartItems(cartData)
    }

    const getCartCount = ()=>{
        let totalCount = 0;

        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.error("Eroro foun in getCartCount :", error)
                }
            }
        }

        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity)=>{
        let cartData = structuredClone(cartItems);
        console.log("Update cart count Rk : ", itemId, size, quantity);
        cartData[itemId][size] = quantity;

        setCartItems(cartData);
    }

    const getCartAmount = ()=>{
        let totalAmount = 0;

        for(const items in cartItems){
            let productInfo = products.filter((product) => product._id == items)

            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        console.log("My Rakesh product ", productInfo);
                        console.log("Product price :", productInfo[0].price);
                        console.log("Cart item count :", cartItems[items][item]);
                        totalAmount += productInfo[0].price * cartItems[items][item]
                    }
                } catch (error) {
                    console.error("Error in getCartAmount ", error)
                }
            }
        }
        console.log("Total amount in context :", totalAmount);
        return totalAmount;
    }

    useEffect(()=>{
        
    }, [cartItems])
    
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart, getCartCount, updateQuantity,
        getCartAmount, navigate
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;