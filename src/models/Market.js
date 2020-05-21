const mongoose = require('mongoose')
const {Schema} = mongoose

const MarketSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    image:{
        type:[Buffer],
        
    },
    latitude:{
       type :Number,
       required:true,
    },
    longitude:{
        type :Number,
        required:true,
     } 

},{
    timestamps:true
});
const Market = mongoose.model('Market',MarketSchema);
module.exports = Market