const Ad = require('../models/ad.model');


const readAdCards = async (req, res) => {
    const result = await Ad.find();
    
   return res.status(200).json({
    ok: true,
    res:result
   })

}


module.exports = readAdCards;