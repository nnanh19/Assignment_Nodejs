import mongoose from "mongoose";
const Schema = mongoose.Schema;
import createHmac from "create-hmac";
import { uuid } from "uuidv4";

const UserScheme = new Schema({
    username : {
        type : String,
        trim : true,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    address : {
        type : String
    }, 
    phone :{
        type : Number
    },
    gender : {
        type: Number
    },
    avatar : {
        type : String
    },
    signature : {
        type: String
    },
    role : {
        type : Number,
        default : 0
    }
})

UserScheme.methods = {
    encryPassword(password){
        if(!password) return;
        try {
            // console.log('chu ky',this.signature);
            // console.log('this.password = 'createHmac('sha256' , '123').update(password).digest('hex'));
            //this.password = 81c7be73b3eaeca31695a744fbc6d3abb5a37ffc10498d0fcb4111c7944b28a0
            return createHmac('sha256' , this.signature).update(password).digest('hex');
        } catch (error) {
            console.log(error);
        }
    },
    authenticate(password){
        console.log(this.password === this.encryPassword(password));
        return this.password === this.encryPassword(password);
    }
}
UserScheme.pre("save" , function(next){
    try {
        // console.log('this.password' , this.password);
        //'this.password = 12345'
        this.signature = uuid(); //chữ ký
        this.password = this.encryPassword(this.password); //gọi method encryPassword
        // console.log(this.password);
        //this.password = 81c7be73b3eaeca31695a744fbc6d3abb5a37ffc10498d0fcb4111c7944b28a0

        next();
    } catch (error) {
        
    }
})
const UserModel = mongoose.model('users' , UserScheme);

export default UserModel;