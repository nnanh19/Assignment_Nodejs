import mongoose from "mongoose";
const {Schema} = mongoose;

const ProductSchema = new Schema({
    "name" : {
        type : String,
        required : true
    },
    "desc" : {
        type : String,
        required : true
    },
    "price" : {
        type : Number,
        required : true
    },
    "sale" : {
        type : Number
    },
    "img" : {
        type : String,
        default : 'https://th.bing.com/th/id/R.06353653c4c75ea7099ac6a3dc86af33?rik=smriBRsIMGfd%2bQ&pid=ImgRaw&r=0'
    },

    "slug" :{ 
            type: String ,
            lowercase : true,
            unique : true
            }
}, {timestamps : true})

const ProductModel = mongoose.model('product' , ProductSchema);

export default ProductModel;