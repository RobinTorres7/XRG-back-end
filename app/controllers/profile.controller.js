// const multer = require ('multer');
const uploadFromBuffer = require('../uti/files/uploadfiles');
const profile = require('./models/profile.model');

const updatePhotoProfile = async (req,res)=>{
    console.log('api profile works');
    console.log(req.file);
    const result = await uploadFromBuffer(req.file);
    if(result){
        console.log(result);
        
    }
    // console.log(req.photo);
}

module.exports = updatePhotoProfile;