const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.genToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        isAdmin: this.isAdmin
    }, 'mysecretkey');
};


const User = mongoose.model('user', userSchema);

module.exports = User;