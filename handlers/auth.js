const db     = require('../models'),
      jwt    = require('jsonwebtoken');

exports.signin = async function(req, res, next){
    try{
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, username, profileImgUrl } = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch){
            let token = jwt.sign(
                {id, username, profileImgUrl },
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                username,
                profileImgUrl,
                token
            });
        } else {
            return next({
                status: 400,
                message: 'Incorrect Password'
            });
        }
    } catch(err) {
        return next({
            status: 400,
            message: 'Invalid Email/Password'
        });
    }
}

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