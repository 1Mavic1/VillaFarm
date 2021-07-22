const {Schema,model} = require('mongoose');

const CommentSchema =  Schema({
    description:{
        type:String,
        required :true
    },
    status:{
        type: Boolean,
        default : true,
        required : true
    },
    publication:{
        type: Schema.Types.ObjectId,
        ref: 'Publication',
        required :true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required :true
    }
});

CommentSchema.methods.toJSON = function(){
    const {__v,_id,status, ... comment} = this.toObject();
    comment.uid = _id;
    return comment;
}                     

module.exports = model('Comment',CommentSchema);