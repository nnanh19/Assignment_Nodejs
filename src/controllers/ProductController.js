import ProductModel from "../models/Product.js";
import slugify from "slugify";

class ProductController {
    index (req, res , next){
        const q_limit = req.query.limit;
        console.log(req.query);
        let find = {};
        if(q_limit){
            const listProduct = ProductModel.find({}).limit(q_limit)
            .then(products => res.json(products))
            .catch(next)
        }else if(req.query.category){
            find = {category : req.query.category.split(',')};
            const listProduct = ProductModel.find(find)
            .then(products => res.json(products))
            .catch(next)
        }
        

        const listProduct = ProductModel.find({})
        .then(products => res.json(products))
        .catch(next)
    }
    findbyCategory (req,res,next) {
        
        
    }
    detail(req, res, next){
        const productDetail = ProductModel.findOne({_id: req.params.id})
        .then(product=>{
            res.json(product);
        })
        .catch(next);
    }
    create(req,res,next){
        req.body.slug = slugify(req.body.name);
        const newProduct = new ProductModel(req.body);
        newProduct.save()
        .then((product)=> res.json(product))
        .catch(next)
    }
    update(req, res, next){
        const newProduct = ProductModel.findByIdAndUpdate({_id : req.params.id},req.body)
        .then(product => res.json(product))
        .catch(next);
    }

    remove(req,res,next){
        const newProduct = ProductModel.findOneAndDelete({_id : req.params.id})
        .then(product => res.json(product))
        .catch(next);
    }
}
export default new ProductController;
