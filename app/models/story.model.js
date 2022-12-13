const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
    idAccount: {
        type: Schema.ObjectId,
        ref: "Account",
        required: true,
        unique: true,
    },
    imageStory: {
        type: String
    },
    photoProfile: {
        type: String,
    },
    descriptionStory: {
        type: String,
    },
    DateStory: {
        type: Date,
    },
    isActive: {
        type:Boolean,
        default:true,
    
    },
    idTypePublication:{
        
    }


})

const accounts = mongoose.model('RoutesLegendarys', StorySchema);
module.exports = accounts;