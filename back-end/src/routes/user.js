const express = require('express');
const { signup, signin } = require('../controllers/user');
const { validateSigninRequest, isRequestValidated, validateSignupRequest } = require('../validators/user');
const router = express.Router();

router.post('/signin',validateSigninRequest,isRequestValidated,signin);

router.post('/signup',validateSignupRequest,isRequestValidated,signup);

router.get('/home', (req, res)=>{
    res.status(200).json({"msg":"hello ritika"});
});

module.exports = router;