import {Router} from "express";
import ProductController from "../controllers/ProductController.js";
import UserController from "../controllers/UserController.js";
const apiRoute = Router();


apiRoute.get('/product/:userId' , ProductController.index);
apiRoute.post('/product/create/' , ProductController.create);

apiRoute.post('/signup', UserController.signup )
apiRoute.post('/signin', UserController.signin )

apiRoute.param("userId" , UserController.userById)
export default apiRoute;

