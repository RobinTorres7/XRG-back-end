const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const adsSchema = new Schema({

    
});

const accounts = mongoose.model('Account', adsSchema);
module.exports = accounts;