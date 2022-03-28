import UserModel from "../models/User";

class UserController {
    async signup(req,res,next){
        const {email} = req.body;
        try {
            const User = await UserModel.findOne({email});
            if(User){
                res.status(400).json({
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
}

export default new UserController;