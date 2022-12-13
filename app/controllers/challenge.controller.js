const Challenge = require('../models/challenge.model');


const readChallengeCards = async (req, res) => {
    const result = await Challenge.find();
   return res.status(200).json({
    ok: true,
    res:result
   })

}


module.exports = readChallengeCards;
