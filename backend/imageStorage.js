const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { bucketName, accessKeyId, secretAcessKey } = require('./config');


const s3 = new aws.S3();

//configuring the AWS environment
aws.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAcessKey
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
    }
};

const upload = multer({
    fileFilter,
    storage: multerS3({
        acl: "public-read",
        s3,
        bucket: bucketName,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: "TESTING_METADATA" });
        },
        key: function (req, file, cb) {
            cb(null, req.body.username + "/" + Date.now().toString() + "_" + file.originalname);
        },
    }),
});

module.exports = { upload };

