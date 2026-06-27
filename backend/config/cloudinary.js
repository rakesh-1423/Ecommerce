import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
    
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
};

export default connectCloudinary;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET_KEY
// })


// const uploadOnCloudinary = async (localPath)=>{
//   if(!localPath){
//     console.log("Image not upload :: File localpath is not available");
//     return null;
//   }

//   const response = await cloudinary.uploader.upload(localPath, {resource_type: "auto"});
//   console.log("Cloudinary response : ", response);
//   console.log("Cloudinary response url of file: ", response.url);

//   return response
// }



// export {uploadOnCloudinary};




// import { v2 as cloudinary } from "cloudinary";

// // Configuration
// // my config 
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET_KEY,
// })


// // running 
// // Configuration
// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // });


// // upload files on cloudinary
// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) {
//       console.log("Not upload, Local File Path is empty");
//       return null;
//     }

//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });
//     // File has been uploaded succefull.
//     console.log(`File is uploaded on cloudinary `, response.url);
//     // fs.unlinkSync(localFilePath)
//     return response;
//   } catch (error) {
//     // fs.unlinkSync(localFilePath); // Remove the locally save temp file as the upload operation got fail.
//     console.log("Error while uplading on cloudinary :", error);
//     return null;
// }
// };

// export {uploadOnCloudinary}
