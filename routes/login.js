var models  = require('../models'),
    config = require('../config/config'),
    express = require('express'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    router = express.Router(),
    User = models.user;

router.post('/', function (req, res) {
  passport.authenticate('local', {session: false}, (error, user, message) => {
    if (error || !user) {
      return res.status(401).json(message);
    }

    var payload = {
      id: user.id,
      expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS || 3600000)
    };
    var token = jwt.sign(payload, process.env.JWT_SECRET || config.secret);

    res.format({
      json: function() {
        res.json({success: true, token: 'Bearer ' + token});
      },
      html: function() {
        res.cookie('token', token, {
          httpOnly: true,
          maxAge: 3600000
        }).redirect('back');
      }
    });
  }) (req, res);
});

router.delete('/', function (req, res) {
  res.clearCookie('token');
  res.sendStatus(200);
});

module.exports = router;
