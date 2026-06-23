import React from 'react'

function Product({productId = 0}) {

    console.log("You are given product id is: ", productId);

  return (
    <div>Product : {productId}</div>
  )
}

export default Product