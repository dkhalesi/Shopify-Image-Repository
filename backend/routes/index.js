const express = require('express');
const mongo = require('../database/user.js');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async function (req, res, next) {
  await mongo.login(req.body.username, req.body.password)
    .then((value) => {
      //if document exists for requested username
      res.send(value);
    })
    .catch((err) => {
      throw err;
    })
});

router.post('/signUp', async function (req, res, next) {
  await mongo.createAccount(req.body.username, req.body.password, req.body.name)
    .then((value) => {
      //if userSchema fields are correctly filled and username is unique
      res.send(true);
    })
    .catch((err) => {
      console.log(err)
      // we can end up in this catch block if values are not unique
      res.send(false);
    })


})

module.exports = router;
