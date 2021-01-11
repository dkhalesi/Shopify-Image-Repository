const User = require('./userSchema.js');
const connector = require('./connectToDatabase.js')
const bcrypt = require('bcryptjs');

async function createAccount(username, password, name) {

    // Hash password before saving to db
    const hashedPassword = bcrypt.hashSync(password, 10);
    let user = new User({ username, hashedPassword, name });

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

module.exports = { createAccount, login };