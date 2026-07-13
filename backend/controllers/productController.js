import { v2 as cloudinary } from "cloudinary";
// import { uploadOnCloudinary } from "../config/cloudinary.js";
import productModel from "../models/productModel.js";

// function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );

    //-----------------------image upload on cloudinary------------------------
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let path = item.path;
        // console.log("file localpath : ", path);
        let url;
        if (path) {
          url = await cloudinary.uploader.upload(path);
          // console.log("Url of file :", url);
          return url.secure_url;
        } else {
          console.log("Image path not available :: name ::", item.name);
          return null;
        }
      }),
    );
    // console.log(imagesUrl);

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestSeller: bestSeller == "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    console.log("Product data added :", product.name);

    return res.json({ success: true, message: "Product Added!" });
  } catch (error) {
    console.log("Error while add product ", error);
    return res.json({ error });
  }
};

// function for list all product
const listProduct = async (req, res) => {
  try {
    const allProductList = await productModel.find({});
    res.json({ success: true, products:allProductList });
  } catch (error) {
    console.log("Error while list all product : ", error);
    res.json({ success: false, message: `fail to list product : ${error}` });
  }
};

// function for removing product
const removeProduct = async (req, res) => {
  try {

    if(!req.body.id){
      return res.json({success:false, messsage:"product not available from this id"})
    }

    await productModel.findByIdAndDelete(req.body.id)
    return res.json({success: true, message:"Product removed"});
  } catch (error) {
    console.log("fil to remove product :", error);
    return res.json({ success: true, message: "faild remove product" });
  }
};

// function for single product Info
const singleProduct = async (req, res) => {
  try {
    const {productId} = req.body
    const product = await productModel.findById(productId)
    if(!product){
      res.json({success: false, message:"Product not found from this id"})
    }
    res.json({success:true, message:product})
  } catch (error) {
    console.log("Error while single product founding :", error);
    res.json({success:false, message: error.message})
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
