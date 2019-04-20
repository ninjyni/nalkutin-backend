var config = require('../config/config'),
  JwtStrategy = require('passport-jwt').Strategy,
  LocalStrategy = require('passport-local').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  models = require('../models'),
  User = models.user;

module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = secret = process.env.JWT_SECRET || config.secret;

  opts.jwtFromRequest = ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    function(req) {
      var token = null;
      if (req && req.cookies) {
        token = req.cookies['token'];
      }
      return token;
    }
  ]);

  passport.use(
    new LocalStrategy(function(username, password, done) {
      User.findOne({
        where: {
          username: username
        }
      })
        .then(function(user) {
          if (user && user.validPassword(password)) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: 'Incorrect username or password.'
            });
          }
        })
        .catch(function(error) {
          return done(error);
        });
    })
  );

  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
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
  );
};
