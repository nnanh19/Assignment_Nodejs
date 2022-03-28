import {Router} from "express";
import ProductController from "../controllers/ProductController.js";
import UserController from "../controllers/UserController.js";
import CheckAuth from "../middleware/checkAuth.js";
const apiRoute = Router();


apiRoute.get('/product/' , ProductController.index);

apiRoute.post('/product/:userId' , CheckAuth.requiredSignin ,
                CheckAuth.isAuth , CheckAuth.isAdmin, ProductController.create);

apiRoute.post('/signup', UserController.signup )
apiRoute.post('/signin', UserController.signin )

apiRoute.param("userId" , UserController.userById)

export default apiRoute;

