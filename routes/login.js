var config = require('../config/config'),
  express = require('express'),
  passport = require('passport'),
  jwt = require('jsonwebtoken'),
  router = express.Router();

router.post('/', function(req, res) {
  passport.authenticate('local', { session: false }, (error, user, message) => {
    if (error || !user) {
      return res.status(401).json(message);
    }

    var payload = {
      id: user.id,
      expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS || 3600000)
    };
    var token = jwt.sign(payload, process.env.JWT_SECRET || config.secret);

    res.json({ success: true, token: 'Bearer ' + token });
  })(req, res);
});

module.exports = router;
