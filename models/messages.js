const mongoose = require('mongoose'),
      User     = require('./user');


const messageSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            maxlength: 160
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

messageSchema.pre('remove', async function(next){
    try{
        let user = await User.findById(this.user);
        user.messages.remove(this.id);
        await user.save();
        return next();
    } catch(err) {
        return next(err);
    }
});

module.exports = mongoose.model('Message', messageSchema);