var models  = require('../models');
var config = require('../config/config');
var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = models.user;

router.route('/')
.post(function(req, res) {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(function(user) {
    if (!user) {
      res.sendStatus(401);
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
            res.cookie('token', token, {httpOnly: true, maxAge: 3600000})
              .redirect('back');
          }
        });
      } else {
        res.sendStatus(401);
      }
    }
  });
})
.delete(function(req, res) {
  res.clearCookie('token');
  res.sendStatus(200);
});

module.exports = router;
