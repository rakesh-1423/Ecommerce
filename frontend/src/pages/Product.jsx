import React from 'react'

function Product({productid}) {

    console.log("You are given product id is: ", productid);

  return (
    <div>Product : {productid}</div>
  )
}

export default Product