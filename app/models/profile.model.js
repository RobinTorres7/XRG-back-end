
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    idAccount: {
        type: Schema.ObjectId,
        ref: "Account",
        required: true,
        unique: true,

    },
    experience: {
        type: Number,
        // required:true,
    },
    followers:{
        type: Number, 
        default:0,
    },
    photoProfile:{
        type:String,
        },
    discipline:{
        type:String
    },
    routesTime:{
        type:Array,
        
    },
    performance:{
        type:Array,
    }

  
} )
const profile = mongoose.model('profile', profileSchema);
module.exports = profile;