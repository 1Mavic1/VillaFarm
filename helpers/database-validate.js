const { 
        Role,
        User 
    } = require('../models');

const roleValidate = async(role = '') => {
    const existRol = await Role.findOne({role});
    if(!existRol){
        throw new Error(`The role ${role} don't exist in the database`);
    }
}

const emailValidate = async(email='')=>{
    const existEmail = await User.findOne({email});
    if(existEmail){
        throw new Error(`The email ${email} exist`);
    }
}

const existUserById = async(id)=>{
    const existId = await User.findById(id);
    if(!existId){
        throw new Error(`User with id ${id} don't exist`);
    }
}


module.exports = {
    roleValidate,
    emailValidate,
    existUserById,
}