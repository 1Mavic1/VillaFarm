const { request, response } = require("express");
const {uploadFile} = require('../helpers');   
const { User, Product } = require("../models");
const path = require('path')
const fs = require('fs');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const loadFile = async (req = request , res = response)=>{
    
    try{
        const name = await uploadFile(req.files,undefined,'imgs');
        res.json(name);
    }
    catch(msg){
        return res.status(400).json(msg)
    }
}
const uploadImageCloudinary = async (req = request,res = response)=>{
    const {collection,id} = req.params
    switch (collection) {
        case 'users':
            modelo = await User.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: ` Not exist user with id ${id}`,
                });
            }
            break;
        case 'products':
            modelo = await Product.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `Not exist product with id ${id}`
                })
            }
            break;
        default:
                return res.status(500).json({msg: `I forget validate this`})
    }

    if(modelo.img){
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        await cloudinary.uploader.destroy(public_id);
        console.log(public_id);
    }

    const {tempFilePath} = req.files.archivo;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    modelo.img = secure_url;
    await modelo.save();
    res.json(modelo);
}


const showImage = async (req,res = response)=>{
    const {collection,id} = req.params
    switch (collection) {
        case 'users':
            modelo = await User.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: ` Not exist user with id ${id}`,
                });
            }
            break;
        case 'products':
            modelo = await Product.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `Not exist product with id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({msg: `I forget validate this`})
    }

    if(modelo.img){
        return res.json(modelo.img); 
    }
    const pathNotFoundImage = path.join(__dirname ,'../assets','no-image.jpg')
    if(fs.existsSync(pathNotFoundImage)){
        return res.sendFile(pathNotFoundImage);
    }
}
module.exports = {
    loadFile,
    uploadImageCloudinary,
    showImage,
}