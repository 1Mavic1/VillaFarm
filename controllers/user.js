const {request,response} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
// const {validationResult} = require('express-validator');
const getUser = async(req = request, res = response) => {
    const{limit = 5, from = 0} = req.query;
    const query = {status:true};
    const [users,total] = await Promise.all([User.find(query).
        skip(Number(from)).
        limit(Number(limit)),
        User.countDocuments(query)]);
    res.json({
        total,
        users
    });
}

const postUser = async (req = request, res = response)=>{

    const {firstName,lastName,email,password,role} = req.body;
    const user = new User({firstName,lastName,email,password,role});
    // Verify exist email
   
    // Encrypt password
    const saltRounds = 10;
    const salt = bcryptjs.genSaltSync(saltRounds);
    user.password = bcryptjs.hashSync(password,salt);

    // Save in DB
    await user.save();

    res.json({
        user,
    });
}

const putUser = async (req,res = response)=>{
    const {id} = req.params;
    // here lack email update
    const {_id, password , google ,email , ...other} = req.body;
    if(password){
        const saltRounds = 10;
        const salt = bcryptjs.genSaltSync(saltRounds);
        other.password = bcryptjs.hashSync(password,salt);
    }
    const user = await User.findByIdAndUpdate(id,other,{new:true});
    res.json({
        message: 'put API from controller',
        user,
    });
}

module.exports = {
    getUser,
    postUser,
    putUser,
}