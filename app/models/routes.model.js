//rutas legandarias = titulo, distancia, desnivel, pendiente, deporte.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routesSchema = new Schema({
    routeName: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    averageGrade: {
        type: Number,
        required: true,
    },
    elevation: {
        type: Number,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    bestTime: {
        type: String,
        required: true,
    },
    bestTimeCategory: {
        type: String,
        required: true
    },
    bestTimeUser: {
        type: String,
    },
    userPosition: {
        type: Number,
    },
    imageRoute:{
        type:String,
    }

})

const accounts = mongoose.model('RoutesLegendarys',routesSchema );
module.exports = accounts;