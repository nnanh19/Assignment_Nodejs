import {Router} from "express";
import CategoryController from "../controllers/CategoryController.js";
import ProductController from "../controllers/ProductController.js";
import UserController from "../controllers/UserController.js";
import CheckAuth from "../middleware/checkAuth.js";
const apiRoute = Router();

//product
apiRoute.get('/product/' , ProductController.index);
apiRoute.get('/product/:id' , ProductController.detail);
apiRoute.get('/product/find/byCategory' , ProductController.findbyCategory);

apiRoute.post('/product/:userId' , CheckAuth.requiredSignin ,
                CheckAuth.isAuth , CheckAuth.isAdmin, ProductController.create);
apiRoute.put('/product/:id', ProductController.update);
apiRoute.delete('/product/:id', CheckAuth.requiredSignin ,
CheckAuth.isAuth , CheckAuth.isAdmin, ProductController.remove);


//category
apiRoute.get('/category/' , CategoryController.index)

apiRoute.post('/category' , CategoryController.create)

apiRoute.get('/category/:slug', CategoryController.slug)


//auth
apiRoute.post('/signup', UserController.signup )
apiRoute.post('/signin', UserController.signin )


//param
apiRoute.param("userId" , UserController.userById)

export default apiRoute;

