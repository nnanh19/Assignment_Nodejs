import ProductModel from "../models/Product.js";
import slugify from "slugify";

let find = {};

class ProductController {
    index (req, res , next){
        const Page_Size = 3;
        var page = req.query.page ;
        if(page < 0 ){
            page = 1
        }
        if(page){
            page = parseInt(page);
            var skip = (page - 1) * Page_Size;

            ProductModel.find({})
            .skip(skip)
            .limit(Page_Size)
            .then(product =>{
                res.json(product);
            })
            .catch(next)
        }
        var q_name = req.query.name;
        if(q_name){
            console.log(q_name);
            const listProduct = ProductModel.find({name: q_name})
            .then(products => res.json(products))
            .catch(next)
        }
        
        if(req.query.category){
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
