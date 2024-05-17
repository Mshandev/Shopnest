const {Brand}=require("../model/Brand");

exports.fetchBrands= async(req,res)=>{

    try{
        const brands= await Brand.find({}).exec();
        res.status(200).json(brands);
    }
    catch(err){
        res.status(400).json(err);
    }
};

exports.createBrand= async(req,res)=>{

    const brand=new Brand(req.body);
    try{
        const doc= await brand.save();
        res.status(201).json(doc);
    }
    catch(err){
        res.status(400).json(err);
    }
};

exports.fetchAllBrands= async(req,res)=>{

    let query=Brand.find({});
    let totalBrandsQuery=Brand.find({});
    
    if(req.query._sort && req.query._order){
        query= query.sort({[req.query._sort]:req.query._order});
    }

    const totalDocs=await totalBrandsQuery.count().exec();
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

exports.deleteBrand = async (req, res) => {
    const { id } = req.params;
    try {
      const doc = await Brand.findByIdAndDelete(id);
      res.status(200).json(doc);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  exports.updateBrand= async(req,res)=>{
    const {id}=req.params;
    try{
        const brand= await Brand.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(brand);
    }
    catch(err){
        res.status(400).json(err);
    }
};

exports.fetchBrandById = async (req, res) => {
    const { id } = req.params;
    try {
      const brand = await Brand.findById(id);
      res.status(200).json(brand);
    } catch (err) {
      res.status(400).json(err);
    }
  };