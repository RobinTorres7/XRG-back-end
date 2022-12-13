const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const challengesSchema = new Schema({
    title:{
        type:String,
},
imageChallenge:{
    type:String,

},
logoImgChallenge:{
    type:String,
},
descriptionSmall:{
    type:String,
},
descriptionLong:{
    type:String,
},
})




const accounts = mongoose.model('RoutesLegendarys',challengesSchema );
module.exports = accounts;