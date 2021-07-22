const { response, request } = require("express");
const {Publication} = require('../models');
// getPostmarket - paginate - total - populate

const getPublications = async (req = request , res = response ) => {
    const{limit = 5, from = 0,postuser} = req.query;
    const query = {status:true,postuser};
    const [publication,total] = await Promise.all([Publication.find(query).
        populate('user',['firstName','lastName']).
        skip(Number(from)).
        limit(Number(limit)),
        Publication.countDocuments(query)]);
        res.json({
            total,
            publication,
        });
}

// getCategory - populate

const getPublication = async(req = request, res = response) => {
    const {id} = req.params;
    const publication = await Publication.findById(id).
                            populate('user',['firstName','lastName'])
    return res.status(200).json({
        publication,
    })
}

const createPublication = async (req = request,res = response)=>{
    const body = req.body;
    const data = {
        ...body,
        user : req.user._id,
    }
    const publication = new Publication(data);
    await publication.save();
    res.status(201).json(publication);
}
// update category

const updatePublication = async(req = request, res = response)=>{
    const {id} = req.params;
    const {status,postuser,...data} = req.body;
    data.user =  req.user._id;
    const publication = await Publication.findByIdAndUpdate(id,data,{new:true}).
                            populate('user',['firstName','lastName'])
    res.json({
        msg: 'Update publication',
        publication
    })
}
// // // delete 

const deletePublication = async (req = request,res = response) =>{
    const {id} = req.params;
    const publication = await Publication.findByIdAndUpdate(id,{status:false},{new:true})
    //const authenticUser = req.user; 
    res.json({
        message: 'delete API from controller',
        publication,
        //authenticUser,
    });
}
// delete category
module.exports = {
    createPublication,
    getPublications,
    getPublication,
    updatePublication,
    deletePublication,
}