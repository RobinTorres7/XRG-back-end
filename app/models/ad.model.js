const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const adsSchema = new Schema({
    title:{
        type:String,
},
imageAds:{
    type:String,

},
logoImgCustomer:{
    type:String,
},
customerAdsName:{
    type:String,
},
callToAction:{
    type:String,
},
urlStore:{
    type:String,
},
classImg:{
    type:String,
},
classBack:{
    type:String,
},
})




const ad = mongoose.model('ad',adsSchema );
module.exports = ad ;