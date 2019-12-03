const db     = require('../models'),
      jwt    = require('jsonwebtoken');

exports.signin = function(){}

exports.signup = async function(req, res, next){
    try{
        let user = await db.User.create(req.body);
        let { id, username, profileImgUrl } = user;
        let token = jwt.sign(
            {id, username, profileImgUrl},
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            username,
            profileImgUrl,
            token
        });
    } catch(err) {
        // if validation fails
        if(err.code === 11000){
            err.message = 'Sorry username and/or email is taken.';
        }
        return next({
            status: 400,
            message: err.message
        });
    }
}