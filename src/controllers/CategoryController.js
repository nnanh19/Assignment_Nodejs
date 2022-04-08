import Categories from '../models/Category';
import Products from '../models/Product';
import slugify from 'slugify';

function createChildrenCategory(categories, categoryId = null){
    const categoryList = [];
    let category;
    if(categoryId == null){
        category = categories.filter(cate => cate.categoryId == undefined)
    }else{
        category = categories.filter( cate => cate.categoryId === categoryId)
    }
    for(let item of category){
        categoryList.push({
            _id : item._id,
            name : item.name,
            slug : item.slug,
            idC : item.idC,
            children : createChildrenCategory(categories, item.idC)
        })
    }
    return categoryList;
}

class CategoryController{
    async index(req, res, next){
        await Categories.find({})
        .exec((error, categories) => {
            if(error) return res.status(400).json({error});
            if(categories){
                const categoryList = createChildrenCategory(categories);
                res.status(200).json({categoryList});
            }
        })
    }
    async create(req,res,next){
        
        const category = await new Categories({
       
            name : req.body.name,
            slug : req.body.slug = slugify(req.body.name),
            categoryId : req.body.categoryId,
        });
        category.save()
        .then((category) => {
            res.json(category);
        })
        .catch(next);
    }
    
    async slug(req,res,next){
               const {child} = await Categories.findOne({slug: req.params.slug})
                console.log(child.map((chil)=>console.log(chil)));
    //    try {
    //         const category = await Categories.findOne({slug: req.params.slug});
    //         console.log(category);
    //         const products = await Products.find({category : category}).populate('category').select('-category');    
    //         res.json({category, products})
    //    } catch (error) {
    //        res.status(400).json({
    //            message: 'Lỗi'
    //        })
    //    }
    }
}

export default new CategoryController;