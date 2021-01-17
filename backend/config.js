const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    connectionString: process.env.MONGO_CONNECTION_STRING,
    bucketName: process.env.BUCKET_NAME,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAcessKey: process.env.SECRET_ACCESS_KEY
};