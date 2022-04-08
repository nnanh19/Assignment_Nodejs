import mongoose from "mongoose";
import { uuid } from "uuidv4";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Category = new Schema({
    name: { type: String, required : true , trim: true },
    slug : {
        replacement: '-',
        type: String, 
        trim: true,
        lowercase : true,
        unique: true,
        index: true,
    },
    idC: {
        type : String,
    },
    categoryId : {
        type : String,
    }

}, {timestamps : true});

Category.pre("save" , function(next){
    try {
        const unique_id = uuid();
        this.idC = unique_id.slice(0,8);
        next();
    } catch (error) {
        console.log(error);
    }
})

export default mongoose.model('Category', Category)