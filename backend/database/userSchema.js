const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

//user schema for mongodb
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'username is unique']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    images: {
        type: Array,
        required: [false, 'images is not required'],
        default: []
    },
})

userSchema.plugin(uniqueValidator);

//export model of schema define above
module.exports = mongoose.model('UserSchema', userSchema, 'UserSchema');