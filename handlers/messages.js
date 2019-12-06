const db = require('../models');

exports.createMessage = async function(req, res, next){
    try{
        let message = await db.Message.create({
            text: req.body.text,
            user: req.params.id
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.messages.push(message.id);
        await foundUser.save();
        let foundMessage = await db.Message.findById(message.id).populate('user', {
            username: true,
            profileImgUrl: true
        });
        return res.status(200).json(foundMessage);
    } catch(err) {
        next(err);
    }
}


exports.getMessage = async function(){}
exports.deleteMessage = async function(){}