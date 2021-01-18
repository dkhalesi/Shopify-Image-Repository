const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

//image shema for mongodb
const imageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, 'image link is required'],
        unique: [true, 'image is unique']
    },
    labels: {
        type: Array,
        required: [true, 'label is required']
    },
    username: {
        type: String,
        required: [true, 'username is required']
    }
})

imageSchema.plugin(uniqueValidator);

//export model of schema define above
module.exports = mongoose.model('ImageSchema', imageSchema, 'ImageSchema');