const { check, validationResult } = require('express-validator');

exports.validateSignupRequest = [
    check('firstName').notEmpty().withMessage('Valid first name is required.'),
    check('lastName').notEmpty().withMessage('Valid last name is required.'),
    check('email').isEmail().withMessage('Valid email is required.'),
    check('password').not().isEmpty().withMessage('Password can not be empty.')
];

exports.validateSigninRequest = [
    check('email').isEmail().withMessage('Valid email is required.'),
    check('password').not().isEmpty().withMessage('Password can not be empty.')
];

exports.isRequestValidated = (req, res, next) =>{
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({error : errors.array()[0].msg});
    }
    next();
};