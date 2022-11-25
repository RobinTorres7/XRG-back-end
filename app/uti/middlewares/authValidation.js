const jwt = require("jsonwebtoken");
const config = process.env;

const authValidation = (req,res,next)=>{
    console.log(req.body);
    const token = req.body.token;
    
if (!token){
    return res.status(403).send(" a token is required for authentication");
};
try {
    
    jwt.verify(token, config.SECRET_KEY);
    console.log("verificando");

}
catch(err){
    return res.status(401).send("invalid token");
    console.log("fallo");

}
}
module.exports = {authValidation}