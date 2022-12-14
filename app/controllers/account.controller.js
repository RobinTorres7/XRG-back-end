const Account = require('../models/accounts.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const profile = require('../models/profile.model');


const getAccounts = (req, res) => {
    console.log('accounts/api works');
    res.send('newAccount api works!')

}
const googleAccount = async (req, res, next) => {
    try {
        const user = req.body;

        const account = await Account.findOneAndUpdate(
            { email: user.email },
            { fullName: user.name }
        );
        if (account) {
            profile.findOneAndUpdate(
                { idAccount: account._id },
                { photoProfile: user.photoUrl }
            );
            return (next);
        }
        const passwordHash = await bcrypt.hash(user.password, saltRounds)
        const newAccount = await Account.create({
            fullName: user.name,
            email: user.email,
            password: passwordHash,
        })
        if (newAccount) {
            profile.create({
                idAccount: newAccount._id,
                photoProfile: user.photoUrl,
            });
        }
        return next();
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: error.message,
        });
    }
};

const newAccount = async (req, res) => {
    try {
        bcrypt.hash(req.body.password, saltRounds,);
        const user = req.body;
        const passwordHash = await bcrypt.hash(user.password, saltRounds)
        if (passwordHash) {
            user.password = passwordHash
        }
        const result = await Account.create(user);
        if (!result) {
            return res.status(400).json({
                ok: false,
                message: "No se puede crear cuenta"
            })
        }
        const token = jwt.sign(
            {
                id: result._id,
                fullName: result.fullName,
                email: result.email,
                role: result.role,
            },
            process.env.SECRET_KEY)

        res.status(200).json({
            ok: true,
            token,
        });
        console.log(result);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}


module.exports = { newAccount, getAccounts, googleAccount };