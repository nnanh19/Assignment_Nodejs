import expressJWT from 'express-jwt';

class CheckAuth{
    requiredSignin = expressJWT({
        secret: '1999', 
        algorithms: ['sha1', 'RS256', 'HS256'],
        requestProperty: 'auth' 
    });

    isAuth = (req,res, next) =>{
        const user = req.profile._id == req.auth._id;
        console.log(user);
        if(!user){
            return res.status(402).json({
                message : 'Bạn không được phép truy cập'
            })
        }
        next();
    };
    isAdmin = (req, res, next) =>{
        const {role} = req.profile;
        if(role == 1){
            next();
        }else{
            return res.status(401).json({
                message : 'Bạn cần đăng nhập với tư cách quản trị viên để tiếp tục sử dụng chức năng này'
            })
        }
    }
}

export default new CheckAuth;