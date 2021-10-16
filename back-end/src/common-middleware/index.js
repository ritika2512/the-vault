const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user;
    }
    else{
        res.status(400).json({msg : 'Signin is required'});
    }
    next();
}