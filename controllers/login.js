const { response } = require("express");
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const {verifyGoogle} = require("../helpers/google-verify");
const { verify } = require("jsonwebtoken");
const login = async(req,res = response)=>{
    try{
        const {email,password} = req.body
        // verificar email exist
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg:'User/Password incorrect - email not found'
            })
        }
    // verificar existe usuario
        if(!user.status){
            return res.status(400).json({
                msg:'User/Password incorrect - status false'
            })
        }
    // verificar la contraseña
        const verifyPass = bcryptjs.compareSync(password,user.password);
        if(!verifyPass){
            return res.status(400).json({
                msg:'User/Password incorrect - password incorrect'
            })
        }
    // generar json web token
        const token = await generarJWT(user.id);
        res.json({
            user,
            token
        })
    }
    catch(error){
        console.log(error);
        res.json({
            msg: 'Error talk with admin',
        })
    }
}

const googleSignIn = async (req = request , res = response)=>{
    try {
        const {id_token} = req.body;
        const {given_name,family_name,email,img} = await verifyGoogle(id_token);
        //console.log(given_name,family_name,email,img);
        let user = await User.findOne({email});
        if(!user){
            const data = {
                firstName:given_name,
                lastName:family_name,
                email,
                password:'xD',
                img,
                google: true,
            }
            user = new User(data);
            //console.log(user);
            await user.save();
        }

        if(!user.status){
            return res.status(401).json({
                msg : 'User not found - User delete'
            })
        }
        const token = await generarJWT(user.uid);
        return res.json({
            msg: 'token ok',
            user,
            token,
        })
        
    } catch (error) {
        res.status(400).json({
            msg:'Invalidate google token',
        })
    }
}

module.exports = {
    login,
    googleSignIn,
}