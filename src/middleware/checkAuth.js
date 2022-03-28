import expressJWT from 'express-jwt';

export const requiredSignin = expressJWT({
    secret: '1999', 
    algorithms: ['sha1', 'RS256', 'HS256'],
    requestProperty: 'auth' 
});


export const isAuth = (req,res, next) =>{
    const user = req.profile._id == req.auth._id;
    if(!user){
        return res.status(402).json({
            message : 'Bạn không được phép truy cập'
        })
    }
    next();
}

