const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);

var blogschem=new mongoose.Schema({
    title : String,image:String,
    body: String,
    created: {type: Date,default:Date.now},
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});
module.exports = mongoose.model("blogms",blogschem);
