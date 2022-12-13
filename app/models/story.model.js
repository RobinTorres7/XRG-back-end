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
    /* idTypePublication:{
        type: String,
    }, */
},
/* {timestamps:true,

} */);

const accounts = mongoose.model('RoutesLegendarys', storySchema);
module.exports = accounts;