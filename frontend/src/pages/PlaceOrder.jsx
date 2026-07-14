import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets, products } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

function PlaceOrder() {
  const { navigate, cartItems, products, getCartAmount, delivery_fee, backendUrl, token, setCartItems } = useContext(ShopContext);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const intiPay = (order)=>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_API_KEY,
      amount: order.amount,
      currency: order.currency,
      name: 'order payment',
      description: 'order payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          console.log("Razorpay payment response ::", response);
          const {data} = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, {headers:{token}})
          console.log("payment data :::", data);
          if(data.success){
            navigate('/orders')
            setCartItems({})
          }else{
            console.log("Payment fail:::", response);
          }
        } catch (error) {
          console.log("Error in initPay handler::", error);
          toast.error(error)
        }
      },
      modal: {
      ondismiss: async function () {
        try {
          const {data} = await axios.post(backendUrl + '/api/order/failedPayment', {orderId: order.receipt}, {headers:{token}})
          if(data.success){
            console.log("payment failed. order deleted :", data.message);
            toast.error("Payment cancelled.");
          }
        } catch (error) {
          console.log("error while payment failed, order delte :", error);
        }
      }
      }
    }

    const rzp = new window.Razorpay(options);
    rzp.open()
  }

  const onSubmintHandler = async(e) => {
    e.preventDefault();

    try {
      let orderItem = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id == items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];

              orderItem.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        items: orderItem,
        amount: getCartAmount() + delivery_fee,
        address: formData,
      }
      
      switch(paymentMethod){
        case 'COD':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers:{token}})
          if(response.data.success){
            toast.success("Congratulation! Order Placed")
            setCartItems({});
            navigate('/orders')
          }else{
            toast.error(response.data.message)
          }
          break;

        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers:{token}})
          console.log("Razorpay order save and give response:::", responseRazorpay);
          if(responseRazorpay.data.success){
            intiPay(responseRazorpay.data.order);
          }else{
            console.log("razorpay respose false");
          }
          break;
        default:
          console.log("default not match switch....");
          break;
      }
    } catch (error) {
      toast.error(error.message)
      console.error("Error while order placed", error);
    }
  };

  return (
    <form
      onSubmit={onSubmintHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* ----------------- Left Side ------------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-120">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onchangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            onChange={onchangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={onchangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
        />
        <input
          required
          onChange={onchangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onchangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onchangeHandler}
            name="state"
            value={formData.value}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onchangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zipcode"
          />
          <input
            required
            onChange={onchangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onchangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone number"
        />
      </div>

      {/* --------------- Right side -------------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"}></Title>
          {/* -------------------Payment method----------------- */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={(e) => setPaymentMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === "stripe" ? "bg-green-400" : ""}`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={(e) => setPaymentMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === "razorpay" ? "bg-green-400" : ""}`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={(e) => setPaymentMethod("COD")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === "COD" ? "bg-green-400" : ""}`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
        </div>
        <div className="w-full text-end mt-8">
          <button
            type="submit"
            className="bg-black text-white px-16 py-3 text-sm "
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
