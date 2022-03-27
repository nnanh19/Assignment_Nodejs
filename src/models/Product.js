import mongoose from "mongoose";
const {Schema} = mongoose;

const ProductSchema = new Schema({
    "name" : String,
    "slug" :{ 
            type: String ,
            lowercase : true,
            unique : true
            }
}, {timestamps : true})

const ProductModel = mongoose.model('product' , ProductSchema);

export default ProductModel;