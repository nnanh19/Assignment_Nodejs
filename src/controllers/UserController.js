import UserModel from "../models/User";
import jwt from "jsonwebtoken";
class UserController {

    async userById(req,res,next,id){
        try {
            const user = await UserModel.findById({_id : id});
            if(!user){
                return res.status(400).json({
                    message : 'Người dùng không tồn tại'
                })
            }
            req.profile = user;
            req.profile.password = undefined;
            req.profile.signature = undefined;
            console.log(req.profile);
            next();
        } catch (error) {
            console.log(error);
        }
    }

    async signup(req,res,next){
        const {email} = req.body;
        try {
            const User = await UserModel.findOne({email});
            if(User){
                return res.status(400).json({
                    message : 'user này đã tồn tại'
                });
            }
            const newUser = await new UserModel(req.body);
            newUser.save()
            .then(user => res.json(user))
            .catch(next);
        } catch (error) {
            console.log(error);
        }
    }

    async signin(req,res,next){
        const {email , password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message : 'Tài khoản không tồn tại'
            })
        }
        if(!user.authenticate(password)){
            return res.status(400).json(({
                message : 'Mật khẩu sai'
            }))
        }

        const token = jwt.sign({_id : user._id }, '1999' , { expiresIn: '1h'});
        res.json({
            token,
            user : {
                _id : user.id,
                username: user.username,
                email : user.email
            }
        })
    }
}

export default new UserController;