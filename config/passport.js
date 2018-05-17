var config = require('../config/config');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var models  = require('../models');
var User = models.user;

module.exports = function(passport) {
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.secret;

  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({
      where: {
        id: jwt_payload.id
      }
    }).then(function(user) {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
   })
  )};
