const express = require('express');
const mongo = require('../database/user.js');
const s3 = require('../imageStorage.js');
const singleUpload = s3.upload.single("image");

const router = express.Router();

router.post('/login', async function (req, res, next) {
  await mongo.login(req.body.username, req.body.password)
    .then((value) => {
      //if document exists for requested username
      res.send({ username: value.username, name: value.name, images: value.images });
    })
    .catch((err) => {
      throw err;
    })
});

router.post('/signUp', async function (req, res, next) {
  await mongo.signUp(req.body.username, req.body.password, req.body.name)
    .then((value) => {
      //if userSchema fields are correctly filled and username is unique
      res.send({ username: req.body.username, name: req.body.name, images: [] });
    })
    .catch((err) => {
      console.error(err)
      // we can end up in this catch block if values are not unique
      res.send(false);
    })
});

router.post('/upload', async function (req, res, next) {
  singleUpload(req, res, async function (err) {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: "Image Upload Error",
          detail: err.message,
          error: err,
        },
      });
    }
    await mongo.addImage(req.body.username, req.file.location)
      .then((value) => {
        //send update images 
        res.send(value);
      })
      .catch((err) => {
        console.error(err)
        res.send(false);
      })

  })
});

router.post('/search', async function (req, res, next) {
  await mongo.searchLabel(req.body.username, req.body.characteristic)
    .then(async (value) => {
      //send back array of images matching given characteristic
      res.send(value);
    })
    .catch((err) => {
      console.error(err)
      res.send([]);
    })
});

module.exports = router;
