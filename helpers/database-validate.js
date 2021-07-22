const { 
    Category,
    Marketplace,
    Product,
    Publication,
    Role,
    User ,
} = require('../models');


const allowedCollections = async(collection='',collections = [])=>{
    if(!collections.includes(collection)){
        throw new Error(`This collection ${collection} not allowed , ${collections}`)
    }
    return true;
}

const existCategory = async(id)=>{
    const exist = await Category.findById(id);
    if(!exist){
        throw new Error(`Category with id ${id} don't exist`);
    }
}
const existMarketplace = async(id)=>{
    const exist = await Marketplace.findById(id);
    if(!exist){
        throw new Error(`This publication with id ${id} don't exist`);
    }
}
const existProduct = async(id)=>{
    const exist = await Product.findById(id);
    if(!exist){
        throw new Error(`Product with id ${id} don't exist`);
    }
}
const existPublicationById = async(id)=>{
    const exist = await Publication.findById(id);
    if(!exist){
        throw new Error(`Product with id ${id} don't exist`);
    }
}

const existUserById = async(id)=>{
    const existId = await User.findById(id);
    if(!existId){
        throw new Error(`User with id ${id} don't exist`);
    }
}
    
const emailValidate = async(email='')=>{
    const existEmail = await User.findOne({email});
    if(existEmail){
        throw new Error(`The email ${email} exist`);
    }
}

const roleValidate = async(role = '') => {
    const existRol = await Role.findOne({role});
    if(!existRol){
        throw new Error(`The role ${role} don't exist in the database`);
    }
}

module.exports = {
    allowedCollections,
    existCategory,
    existProduct,
    existMarketplace,
    existPublicationById,
    existUserById,
    emailValidate,
    roleValidate,
}