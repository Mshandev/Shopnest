const {Contact}=require("../model/Contact");


exports.createContact= async(req,res)=>{

    const contact=new Contact(req.body);
    try{
        const doc= await contact.save();
        res.status(201).json(doc);
    }
    catch(err){
        res.status(400).json(err);
    }
};

exports.fetchAllContacts= async(req,res)=>{

    let query=Contact.find({});
    let totalContactsQuery=Contact.find({});
    
    if(req.query._sort && req.query._order){
        query= query.sort({[req.query._sort]:req.query._order});
    }

    const totalDocs=await totalContactsQuery.countDocuments().exec();
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

exports.deleteContact = async (req, res) => {
    const { id } = req.params;
    try {
      const doc = await Contact.findByIdAndDelete(id);
      res.status(200).json(doc);
    } catch (err) {
      res.status(400).json(err);
    }
  };