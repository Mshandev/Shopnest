const {Category}=require("../model/Category");

exports.fetchCategories= async(req,res)=>{

    try{
        const categories= await Category.find({}).exec();
        res.status(200).json(categories);
    }
    catch(err){
        res.status(400).json(err);
    }
};

exports.createCategory= async(req,res)=>{

    const category=new Category(req.body);
    try{
        const doc= await category.save();
        res.status(201).json(doc);
    }
    catch(err){
        res.status(400).json(err);
    }
};

exports.fetchAllCategories= async(req,res)=>{

    let query=Category.find({});
    let totalCategoriesQuery=Category.find({});
    
    if(req.query._sort && req.query._order){
        query= query.sort({[req.query._sort]:req.query._order});
    }

    const totalDocs=await totalCategoriesQuery.count().exec();
    console.log({totalDocs});

    if(req.query._page && req.query._limit){
        const pageSize=req.query._limit;
        const page=req.query._page;
        query= query.skip(pageSize*(page-1)).limit(pageSize);
    }

    try{
        const doc= await query.exec();
        res.set('X-Total-Count',totalDocs);
        res.status(200).json(doc);
    }
    catch(err){
        res.status(200).json(err);
    }
};

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
      const doc = await Category.findByIdAndDelete(id);
      res.status(200).json(doc);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  exports.updateCategory= async(req,res)=>{
    const {id}=req.params;
    try{
        const category= await Category.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(category);
    }
    catch(err){
        res.status(400).json(err);
    }
};

exports.fetchCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Category.findById(id);
      res.status(200).json(category);
    } catch (err) {
      res.status(400).json(err);
    }
  };