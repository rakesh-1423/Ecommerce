import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    //   cartData: {type: mongoose.models.Type.Object, ref="productModel"}
    cartData: { type: Object, default: {} },
  },
  {
    minimize: false, // not complsory cartData have need data when user login
  },
);

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel;
