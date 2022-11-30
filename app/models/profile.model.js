//rutas profiles = titulo, distancia, desnivel, pendiente, deporte.
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    idUser:{
        type : Schema.ObjectId,
        ref:"Account"
            },
    fullName:{
        type: String,
    required : true
    },
    email:{
        type:String,
        required :true,
        unique: true,
    },

})
const accounts = mongoose.model('Profile', accountSchema);
module.exports = accounts;