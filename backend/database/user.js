const User = require('./userSchema.js');
const connector = require('./connectToDatabase.js')
const bcrypt = require('bcryptjs');

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

module.exports = { signUp, login, addImage };