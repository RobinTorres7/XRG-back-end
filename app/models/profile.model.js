//rutas profiles = titulo, distancia, desnivel, pendiente, deporte.
const mongoose = require('mongoose');
const {Schema} = require("./accounts.model");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    idAccount: {
        type: schema.objectId,
        ref: "Account",
        required: true,

    },
    phone: {
        type: string,

    },
    location:{
    type:srting, 
    },
    photoProfile:{
        type:string,
        

    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

})
const profiles = mongoose.model('Profile', profileSchema);
module.exports = profiles;