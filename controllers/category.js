const { response, request } = require("express");
const {Category} = require('../models');
// getCategorys - paginate - total
const getCategorys = async (req = request , res = response ) => {
    const{limit = 5, from = 0} = req.query;
    const {id} = req.params;
    const [category,total] = await Promise.all([Category.find(id).
        skip(Number(from)).
        limit(Number(limit)),
        Category.countDocuments()]);
    res.json({
        total,
        category
    });
}
const getCategory = async(req = request, res = response) => {
    const {id} = req.params;
    const category = await Category.findById(id);
    return res.status(200).json({
        category,
    })
}
module.exports = {
    getCategory,
    getCategorys,
}