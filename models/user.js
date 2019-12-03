const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImgUrl: {
        type: String
    }
});

userSchema.pre('save', async function(next){
    try{
        if(!this.isModified('password')){
            return next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch(err){
        return next(err);
    }
});

userSchema.method.comparePassword = async function(candidatePassword, next){
    try{
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch(err) {
        return next(err);
    }
}

module.exports = mongoose.model('User', userSchema);