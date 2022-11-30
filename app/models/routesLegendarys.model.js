//rutas legandarias = titulo, distancia, desnivel, pendiente, deporte.
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const routesLegendarysSchema = new Schema({
    routeName :{
        type: String,
    required : true
    },
    distance: {
        type: Number,
        required: true
    },
    metersClimbed :{
        type: Number,
        required: true,
    },
    inclinePercentage:{
        type: String,
        required: true,
    },
    difficulty : {
        type: String,
        required: true,
    },
    routeType :{
        type : String,
        required:true,
    }

})

const accounts = mongoose.model('RoutesLegendarys', accountSchema);
module.exports = accounts;