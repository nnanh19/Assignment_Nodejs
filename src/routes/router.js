import {Router} from "express";
import ProductController from "../controllers/ProductController.js";
import UserController from "../controllers/UserController.js";
const apiRoute = Router();


apiRoute.get('/product' , ProductController.index);
apiRoute.post('/product/create' , ProductController.create);

apiRoute.post('/signup', UserController.signup )

export default apiRoute;

