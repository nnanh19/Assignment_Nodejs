import {Router} from "express";
import ProductController from "../controllers/ProductController.js";
const apiRoute = Router();


apiRoute.get('/product' , ProductController.index)

apiRoute.post('/product/create' , ProductController.create)

export default apiRoute;

