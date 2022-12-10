// const multer = require ('multer');
const uploadFromBuffer = require('../uti/files/uploadfiles');
const profile = require('../models/profile.model');

const updatePhotoProfile = async (req, res) => {
    
    try {
        
        const resultUploadPhoto = await uploadFromBuffer(req.file);
        if (!resultUploadPhoto) {
            return res.status(400).json({
                ok: false,
                message: "no se pudo obtener url de la photo"
            });

        }
      
        const photoUpDated = await profile.findOneAndUpdate(
            { idAccount: req.user.id },
            {
                photoProfile: resultUploadPhoto.url,
            });
        console.log(photoUpDated);
        if (!photoUpDated) {
            await profile.create({
                idAccount: req.user.id,
                photoProfile: resultUploadPhoto.url,
            });
        }
        res.status(200).json({
            ok: true,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: error.message,
        })
    };
};

const getProfile = async (req, res) => {
    console.log("obteniendo perfil");
    try {
        const responseProfile = await profile.findOne({ idAccount: req.user.id })
        console.log(req.user.id);
        if (!responseProfile) {
            return res.status(404).json({
                ok: false,
                message: "Profile don't search"
            })
        }
        res.status(200).json({
            ok: true,
            data: responseProfile,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: error,
        })
    }
}

module.exports = { updatePhotoProfile, getProfile };