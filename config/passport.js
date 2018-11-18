const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/index').User;
const secret = require('./config').secret;

module.exports = function (passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = secret;
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {

    User.find({ where: { email: jwt_payload.email } })
      .then((success) => {
        done(null, success.dataValues);
      })
      .catch((err) => done(err, false));
  }));
};