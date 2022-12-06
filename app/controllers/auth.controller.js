const Account = require('../models/accounts.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const login = async (req,res )=>{
    // console.log("into");
    const user = req.body;
    const result = await Account.findOne({email:user.email});
   if (!result){
   return res.status(404).json({
        error:'Usuario no registrado '
    })
   }
// res.status(200).json({
//     message:'Usuario si existe'
// })
const isCorrectPassword = await bcrypt.compare(user.password, result.password);
if(isCorrectPassword && result.isActive){
    // res.status(200).json({
    //     ok:true ,
    // data:{ fullName: result.fullName,
    //     email:result.email,
    //     role:result.role,}
    // });
   const token =  jwt.sign(
    {
        id:result._id,
        fullName : result.fullName,
        email: result.email,
        role: result.role,
    },
     process.env.SECRET_KEY)
    
res.status(200).json({
    ok: true,
    token,
});
    
} else
{
    res.status(403).json({
        message: 'PASSWORD INCORECT O USER INACTIVE'
    })
}
// true
// bcrypt.compareSync(someOtherPlaintextPassword, hash); // false
}
module.exports = login;