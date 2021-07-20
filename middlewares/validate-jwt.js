const { request, response } = require("express")
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const validateJWT = async (req = request,res= response,next)=>{
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg:'Not exist token',
        });
    }
    try {
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        // leer el usuario autenticado y guardarlo en el request
        const user = await User.findById(uid);
        // si tenemos el token del usuario pero el usuario ya no existe fisicamente en la db
        if(!user){
            return res.status(401).json({
                msg:"Not exist token - user don't exist in database",
            })
        }
        // si estado es false en la db
        if(!user.status){
            return res.status(401).json({
                msg:"Not exist token - status false",
            })
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            msg:'Invalidate token'
        })
    }
}

module.exports = {
    validateJWT
}