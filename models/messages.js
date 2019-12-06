const mongoose = require('mongoose'),
      User     = require('./user');


const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 160
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

messageSchema.pre('remove', async function(next){
    try{
        let user = await User.findById(this.userId);
        user.messages.remove(this.id);
        await user.save();
        return next();
    } catch(err) {
        return next(err);
    }
});

module.exports = mongoose.model('Message', messageSchema);