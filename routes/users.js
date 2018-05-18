var models  = require('../models');
var express = require('express');
var passport = require('passport');
require('../config/passport')(passport);
var router = express.Router();
var user = models.user;

router.route('/')
.post(function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Missing username or password.'});
  } else {
    user.create({
      username: req.body.username,
      password: req.body.password
    })
    .then(function (user) {
      //TODO return user object with password removed
      res.status(201).json({id: user.id});
    }).catch(function(error) {
      res.status(400).json({success: false, message: 'Something went wrong'})
    });
  }
});

module.exports = router;
