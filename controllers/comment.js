const { response, request } = require("express");
const {Comment} = require('../models');
// getComments - paginate - total - populate

const getComments = async (req = request , res = response ) => {
    const{limit = 5, from = 0,publication} = req.query;
    const query = {status:true,publication:publication};
    const [comment,total] = await Promise.all([Comment.find(query).
        populate('publication',['user','postuser']).
        skip(Number(from)).
        limit(Number(limit)),
        Comment.countDocuments(query)]);
        res.json({
            total,
            comment,
        });
}

// getCategory - populate

const getComment = async(req = request, res = response) => {
    const {id} = req.params;
    const comment = await Comment.findById(id).
                populate('publication',['user','postuser'])
    return res.status(200).json({
        comment,
    })
}

const createComment = async (req = request,res = response)=>{
    const body = req.body;
    const data = {
        ...body,
        user : req.user._id
    }
    const comment = new Comment(data);
    await comment.save();
    res.status(201).json(comment);
}
// update category

const updateComment = async(req = request, res = response)=>{
    const {id} = req.params;
    const {status,publication,...data} = req.body;
    data.user =  req.user._id;
    const comment = await Comment.findByIdAndUpdate(id,data,{new:true}).
                            populate('publication',['user','postuser'])
    res.json({
        msg: 'Update publication',
        comment
    })
}
// // // // delete 

const deleteComment = async (req = request,res = response) =>{
    const {id} = req.params;
    const comment = await Comment.findByIdAndUpdate(id,{status:false},{new:true})
    //const authenticUser = req.user; 
    res.json({
        message: 'delete API from controller',
        comment,
        //authenticUser,
    });
}
// delete category
module.exports = {
    createComment,
    getComments,
    getComment,
    updateComment,
    deleteComment,
}