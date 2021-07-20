const {Schema,model} = require('mongoose');

const UserSchema = Schema({
    firstName:{
        type: String,
        required : ['true','First name is required.'],
    },
    lastName:{
        type: String,
        required : ['true','Last name is required.'],
    },
    email:{
        type:String,
        required : ['true','Email is required.'],
        unique : 'true',
    },
    password:{
        type:String,
        required : ['true','Password is required.'],
    },
    img:{
        type:String,
    },
    role:{
        type:String,
        required : ['true','Role is required.'],
        default : 'USER_ROLE',
    },
    status:{
        type: Boolean,
        default : 'true',
    },
    google:{
        type: Boolean,
        default : 'false',
    },
});

UserSchema.methods.toJSON = function(){
    const {__v,password ,_id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User',UserSchema);