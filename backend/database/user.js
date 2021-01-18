const User = require('./userSchema.js');
const Image = require('./imageSchema.js');
const connector = require('./connectToDatabase.js')
const bcrypt = require('bcryptjs');
const googleVision = require('../labelDetection.js')

async function signUp(username, password, name) {

    // Hash password before saving to db
    password = bcrypt.hashSync(password, 10);
    let user = new User({ username, password, name });

    return user.save();
}

async function login(username, password) {
    return await User.findOne({ username: username })
        .then(async (doc) => {
            //if there are no documents with that username
            if (doc === null) {
                return null;
            }
            return bcrypt.compare(password, doc.password).then((res) => {
                if (res) {
                    return doc;
                } else {
                    return null;
                }
            });
        })
        .catch((err) => {
            throw err;
        })

}

async function addImage(username, imageLink) {

    const labels = await googleVision.imageLabels(imageLink);

    let image = new Image({ image: imageLink, labels: labels, username: username });

    image.save();

    return await User.findOne({ username: username })
        .then(async (doc) => {
            //if there are no documents with that username
            if (doc === null) {
                return null;
            }
            doc.images.push(imageLink);
            return await doc.save().then(savedDoc => {
                return savedDoc.images;
            });
        })
        .catch((err) => {
            throw err;
        })

}

async function searchLabel(username, characteristic) {
    const lowerCaseChar = characteristic.toLowerCase();
    return await Image.find({ labels: lowerCaseChar, username: username }).then(async (docs) => {
        //if there are no documents with that username
        if (docs === null) {
            return null;
        }

        const validArrs = [];
        docs.forEach(doc => validArrs.push(doc.image));
        return validArrs;
    })
        .catch((err) => {
            throw err;
        })

}

module.exports = { signUp, login, addImage, searchLabel };