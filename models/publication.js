const {Schema,model} = require('mongoose');

const PublicationSchema =  Schema({
    description:{
        type:String,
        required :true
    },
    status:{
        type: Boolean,
        default : true,
        required : true
    },
    postuser:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required :true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required :true
    }
});

PublicationSchema.methods.toJSON = function(){
    const {__v,_id,status, ... publication} = this.toObject();
    publication.uid = _id;
    return publication;
}                     

module.exports = model('Publication',PublicationSchema);