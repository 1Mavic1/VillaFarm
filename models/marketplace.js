const {Schema,model} = require('mongoose');

const MarketplaceSchema =  Schema({
    description:{
        type:String,
        required :true
    },
    status:{
        type: Boolean,
        default : true,
        required : true
    },
    type:{
        type:String,
        required : ['true','Role is required.'],
        enum : ['SALE','BUY']
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required :true
    },
    amount:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        default:0
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required:true
    },
});

MarketplaceSchema.methods.toJSON = function(){
    const {__v,_id,status, ...marketplace} = this.toObject();
    marketplace.uid = _id;
    return marketplace;
}                     

module.exports = model('Marketplace',MarketplaceSchema);