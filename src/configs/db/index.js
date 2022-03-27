import mongoose from "mongoose";

async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/assignment');
        console.log('db connect successfully');
    }catch(error){
        console.log('connect failure');
    }
}

export default {connect};