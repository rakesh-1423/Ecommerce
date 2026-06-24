import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";

function Product() {
  const { productId } = useParams();
  const { products, currency, setCartProduct, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState();
  const [image, setImage] = useState();
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };


  useEffect(() => {
    fetchProductData();
    console.log("Product data :", productData);
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* -------------------- product data -------------- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* --------------product image-------------  */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={(e) => setImage(item)}
                className="w-24% sm:w-full sm:mb-3 shrink-0 cursor-pointer"
                key={index}
                src={item}
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%] ">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/* -------------product info---------------  */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium mt-2">{productData.name}</h1>
          <div className="flex gap-1 items-center mt-2">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency} {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={(e) => setSize(item)}
                  key={index}
                  className={`py-2 px-4 bg-gray-100 ${item == size ? "border border-orange-500" : ""}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id, size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
            ADD TO CARD
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% original product.</p>
            <p>Cash on delivery is available in this product.</p>
            <p>Easy return and exchange policy in 7 days.</p>
          </div>
        </div>
      </div>

      {/* -----------------description and review section ------------- */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Review (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Reprehenderit vel ipsum fugiat obcaecati eaque itaque ducimus,
            commodi, est nobis ab ipsa illum labore autem consequuntur esse
            repellendus a culpa soluta doloribus minima. Repudiandae quam
            voluptas sint facere voluptate totam facilis quo. Aspernatur nulla
            commodi consequuntur rerum nam incidunt autem ullam?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias,
            magni reiciendis nihil odio quae in dolor minima suscipit magnam,
            pariatur unde ratione eum dolore sequi!
          </p>
        </div>
      </div>

      {/* display related product  */}
      <div className="">
        <RelatedProduct
          id={productData._id}
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="">"Rakesh"</div>
  );
}

export default Product;
