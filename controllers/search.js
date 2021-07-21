const {response} = require('express')
const {ObjectId} = require('mongoose').Types
const allowedCollections = [
    'users',
    'categorys',
    'products',
    'roles'
];
const {User,Category,Product} = require('../models')

const searchUser = async (term = '',res = response) => {
    const isMongoId = ObjectId.isValid(term)//
    if(isMongoId){
        const user = await User.findById(term)
        return res.json({
            results: (user)?[user]:[]
        })
    }
    const regex = new RegExp(term,'i');
    const users = await User.find({
        $or: [{firstName:regex},{email:regex}],
        $and: [{status:true}]
    });

    res.json({
        results: users
    })
}
const searchCategorys = async (term = '', res = response)=>{
    const isMongoId = ObjectId.isValid(term)//
    if(isMongoId){
        const category = await Category.findById(term)
        return res.json({
            results: (category)?[category]:[]
        })
    }
    const regex = new RegExp(term,'i');
    const categorys = await Category.find({name:regex,status:true});
    res.json({
        results: categorys
    })
}

const searchProducts = async (term = '', res = response)=>{
    const isMongoId = ObjectId.isValid(term)//
    if(isMongoId){
        const product = await Product.findById(term)
        return res.json({
            results: (product)?[product]:[]
        })
    }
    const regex = new RegExp(term,'i');
    const products = await Product.find({name:regex,status:true});
    res.json({
        results: products
    })
}

const search = (req , res = response ) =>{
    const {collection, term} = req.params;
    if( !allowedCollections.includes(collection)){
        return res.status(400).json({
            msg : `The allowed collections are :${allowedCollections}`
        })
    }

    switch (collection) {
        case 'users':
            searchUser(term,res)
            break;
        case 'categorys':
            searchCategorys(term,res)
            break;
        case 'products':
            searchProducts(term,res)
            break;
        case 'roles':
            
            break;
    
        default:
            res.status(500).json({
                msg: 'Busqueda no implementada'
            })
    }
}
module.exports = {
    search
}