const jwt = require("jsonwebtoken");
const config = process.env;

const authValidation = (req,res,next)=>{
   
    const token = req.body.token || req.header('token') ;
    
if (!token){
    return res.status(403).send(" a token is required for authentication");
};
try {
    
    jwt.verify(token, config.SECRET_KEY);
    console.log("verificando");
req.user =decoded
}
catch(err){
    return res.status(401).send("invalid token");
    console.log("fallo");

}
return next();
}
module.exports = {authValidation,};