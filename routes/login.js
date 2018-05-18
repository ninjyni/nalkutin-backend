var models  = require('../models');
var config = require('../config/config');
var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = models.user;

router.post('/', function(req, res) {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(function(user) {
    if (!user) {
      res.status(401).json({success: false, message:"No such user found."});
    } else {
      if (user.validPassword(req.body.password)) {
        // Use only user id in token
        var payload = {id: user.id};
        var token = jwt.sign(payload, config.secret);

        res.format({
          json: function() {
            res.json({success: true, token: 'Bearer ' + token});
          },
          html: function() {
            res.cookie('token', token, {httpOnly: true, maxAge: 86400})
              .redirect('/tasks');
          }
        });
      } else {
        res.status(401).json({success: false, message:"Passwords did not match."});
      }
    }
  });
});

module.exports = router;
