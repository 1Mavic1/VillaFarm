const { response, request } = require("express");
const {Product} = require('../models');
// getProducts - paginate - total - populate

const getProducts = async (req = request , res = response ) => {
    const{limit = 5, from = 0} = req.query;
    const query = {status:true};
    const [products,total] = await Promise.all([Product.find(query).
        populate('user','name').
        populate('category','name').
        skip(Number(from)).
        limit(Number(limit)),
        Product.countDocuments(query)]);

    res.json({
        total,
        products,
    });
}

// getCategory - populate

const getProduct = async(req = request, res = response) => {
    const {id} = req.params;
    const product = await Product.findById(id).
                            populate('user','name').
                            populate('category','name');
                
    return res.status(200).json({
        product,
    })
}

const createProduct = async (req = request,res = response)=>{
    
    const {status,user, ...body} = req.body;
    body.name = body.name.toUpperCase()
    const productDB = await Product.findOne({name: body.name});
    if(productDB){
        return res.status(400).json({
            msg: `This product ${body.name} exist in database`,
        })
    }
    const data = {
        ...body,
        name : body.name,
        user : req.user._id,
    }
    const product = new Product(data);
    await product.save();
    res.status(201).json(product);
}
// update category

const updateProduct = async(req = request, res = response)=>{
    const {id} = req.params;
    const {status,user,...data} = req.body;
    if( data.name ) {
        data.name = data.name.toUpperCase();
    }
    data.user =  req.user._id;
    const product = await Product.findByIdAndUpdate(id,data,{new:true}).
                            populate('user','name').
                            populate('category','name');
    res.json({
        msg: 'Update product',
        product
    })
}
// // delete 

const deleteProduct = async (req = request,res = response) =>{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id,{status:false},{new:true})
    //const authenticUser = req.user; 
    res.json({
        message: 'delete API from controller',
        product,
        //authenticUser,
    });
}
// delete category
module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
}