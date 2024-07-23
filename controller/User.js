const {User}=require("../model/User");

exports.fetchUserById= async(req,res)=>{
    const {id}=req.user;
    try{
        const user= await User.findById(id,'name email id role addresses').exec();
        res.status(200).json(user);
    }
    catch(err){
        res.status(400).json(err);
    }
};

exports.updateUser= async(req,res)=>{
    const {id}=req.params;
    try{
        const user= await User.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(user);
    }
    catch(err){
        res.status(400).json(err);
    }
};

exports.fetchAllUsers= async(req,res)=>{

    let query=User.find({});
    let totalUsersQuery=User.find({});
    
    if(req.query._sort && req.query._order){
        query= query.sort({[req.query._sort]:req.query._order});
    }

    const totalDocs=await totalUsersQuery.countDocuments().exec();
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

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const doc = await User.findByIdAndDelete(id);
      res.status(200).json(doc);
    } catch (err) {
      res.status(400).json(err);
    }
  };