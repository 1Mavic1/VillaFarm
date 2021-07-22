const { response, request } = require("express");
const {Marketplace} = require('../models');
// getPostmarket - paginate - total - populate

const getMarketplaces = async (req = request , res = response ) => {
    const{limit = 5, from = 0,type =''} = req.query;
    const query = {status:true,type:type};
    const [marketplace,total] = await Promise.all([Marketplace.find(query).
        populate('user',['firstName','lastName']).
        populate('product',['name','price']).
        skip(Number(from)).
        limit(Number(limit)),
        Marketplace.countDocuments(query)]);

    res.json({
        total,
        marketplace,
    });
}

// getCategory - populate

const getMarketplace = async(req = request, res = response) => {
    const {id} = req.params;
    const marketplace = await Marketplace.findById(id).
                            populate('user',['firstName','lastName']).
                            populate('product','name');
                
    return res.status(200).json({
        marketplace,
    })
}

const createMarketplace = async (req = request,res = response)=>{
    
    const {status,user, ...body} = req.body;
    //body.name = body.name.toUpperCase()
    const marketplaceDB = await Marketplace.findOne({product: body.product,user:req.user._id});
    if(marketplaceDB){
        return res.status(400).json({
            msg: `This publication of user with id ${req.user._id} and product ${body.product} exist in database`,
        })
    }
    const data = {
        ...body,
        user : req.user._id,
    }
    const marketplace = new Marketplace(data);
    await marketplace.save();
    res.status(201).json(marketplace);
}
// update category

const updateMarketplace = async(req = request, res = response)=>{
    const {id} = req.params;
    const {status,user,product,...data} = req.body;
    data.user =  req.user._id;
    const marketplace = await Marketplace.findByIdAndUpdate(id,data,{new:true}).
                            populate('user','name').
                            populate('product','name');
    res.json({
        msg: 'Update publication marketplace',
        marketplace
    })
}
// // delete 

const deleteMarketplace = async (req = request,res = response) =>{
    const {id} = req.params;
    const marketplace = await Marketplace.findByIdAndUpdate(id,{status:false},{new:true})
    //const authenticUser = req.user; 
    res.json({
        message: 'delete API from controller',
        marketplace,
        //authenticUser,
    });
}
// delete category
module.exports = {
    createMarketplace,
    getMarketplace,
    getMarketplaces,
    updateMarketplace,
    deleteMarketplace,
}