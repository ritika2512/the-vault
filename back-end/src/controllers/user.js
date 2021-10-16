const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req,res)=>{
    User.findOne({email : req.body.email})
    .exec((error, user)=>{
        if(user) return res.status(400).json({
            message : 'User already exits.'
        });
        const {firstName, lastName, email, password} = req.body;
        const _user = new User({
            firstName,
            lastName,
            email,
            password
        });

        _user.save((error, data)=>{
            if(error) return res.status(400).json({
                message : error                
            });
            if(data){
                return res.status(201).json({
                    user : 'User succesfully created.'
                });
            }
        });
    });
}
exports.signin = (req, res) =>{
    User.findOne({email : req.body.email})
    .exec((error, user)=>{
        if(error) { return res.status(400).json({error});}
        if(user){
            if(user.authenticate(req.body.password)){
                const token = jwt.sign({_id:user._id}, process.env.SECRET_KEY, {expiresIn:'1h'});
                const {_id, firstName, lastName, email} = user;
               res.status(200).json({
                    token,
                    user:{_id, firstName, lastName, email}
                });
            }
            else{
                return res.status(400).json({message : 'Wrong Password.'});
            }
        }
        else{
            return res.status(400).json({message:'User not found.'});
        }
    });

}
