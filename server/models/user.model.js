const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id:{type:Schema.Types.ObjectId, auto:true},
    name:{type:String, require:true},
    contact:{type:String, require:true},
    address:{type:String}
},{
    versionKey:false
});

const user = mongoose.model('users', userSchema);
module.exports = user;