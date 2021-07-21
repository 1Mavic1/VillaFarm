const{request,response} = require('express');
const validateFile = (req=require,res=response,next)=>{
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg: `Not exist file in request`
        });
    } 
    next();
}
module.exports = {
    validateFile
}