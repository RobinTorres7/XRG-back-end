//rutas legandarias = titulo, distancia, desnivel, pendiente, deporte.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routesSchema = new Schema({
    routeName: {
        type: String,

    },
    distance: {
        type: Number,

    },
    averageGrade: {
        type: Number,
        
    },
    elevation: {
        type: Number,
        
    },
    difficulty: {
        type: String,
        
    },
    bestUser: {
        type: String,
        
    },
    bestTime: {
        type: String,
        
    },
    iconBestTime: {
        type:String
    },
    bestUserCategory:{
        type:String,
    },
    bestTimeCategory: {
        type: String,

    },
    iconBestCategory:{
        type:String,
    },
    bestTimeUser: {
        type: String,
    },
    userPosition: {
        type: Number,
    },
    imageRoute:{
        type:String,
    },

},);

const accounts = mongoose.model('routes',routesSchema );
module.exports = accounts;