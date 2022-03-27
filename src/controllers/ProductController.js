import ProductModel from "../models/Product.js";
import slugify from "slugify";

class ProductController {
    index (req, res , next){
        const listProduct = ProductModel.find()
        .then(product=> res.json(product))
        .catch(next)
    }
    create(req,res,next){
        
        req.body.slug = slugify(req.body.name);

        const newProduct = new ProductModel(req.body);
        newProduct.save()
        .then((product)=> res.json(product))
        .catch(next)
    }
}
export default new ProductController;
