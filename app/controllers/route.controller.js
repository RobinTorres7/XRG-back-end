const Route = require('../models/routes.model');


const readRoutes = async (req, res) => {
    const result = await Route.find();
    console.log(result);
   return res.status(200).json({
    ok: true,
    res:result
   })
 

}


module.exports = readRoutes;