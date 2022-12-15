const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
   /*  idAccount: {
        type: Schema.ObjectId,
        ref: "Account",
        required: false,
        unique: true,
    }, */
    imageStory: {
        type: String
    },
    photoProfile: {
        type: String,
    },
    descriptionStory: {
        type: String,
    },
    isActive: {
        type:Boolean,
        default:true,
    
    },
    profileName:{
    type:String
    }
    /* idTypePublication:{
        type: String,
    }, */
},
/* {timestamps:true,

} */);

const accounts = mongoose.model('stories', storySchema);
module.exports = accounts;