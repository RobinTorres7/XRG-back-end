const express = require ('express');
const { getAccounts, newAccount } = require('../controllers/account.controller');
// const accounts = require('../models/accounts.model');
const router = express.Router();
// const Account = require('../models/accounts.model');

router.get('/getAccounts', getAccounts
)
router.post('/newAccount', newAccount
)

    
module.exports= router;