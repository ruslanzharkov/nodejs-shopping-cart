const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const { validationResult } = require("express-validator");

const ERRORS_MESSAGES = {
  email: "Email is invalid",
  password: "Password should be 4 symbols min",
};

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function singUp(req, email, password, done) {
      const { errors } = validationResult(req);

      if (errors.length) {
        const messages = [];

        errors.forEach(function (error) {
          messages.push(ERRORS_MESSAGES[error.param]);
        });

        return done(null, false, req.flash("error", messages));
      }
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, false, { message: "Email is already in use." });
        }

        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);

        newUser.save(function (err) {
          if (err) {
            return done(err);
          }
          return done(null, newUser);
        });
      });
    },
  ),
);

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function signIn(req, email, password, done) {
      const { errors } = validationResult(req);

      if (errors.length) {
        const messages = [];

        errors.forEach(function (error) {
          console.log(ERRORS_MESSAGES[error.param]);
          messages.push(ERRORS_MESSAGES[error.param]);
        });

        return done(null, false, req.flash("error", messages));
      }

      User.findOne({ email: email }, function (err, user) {
        const message = { message: "Wrong email or password" };

        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, message);
        }

        if (!user.validPassword(password)) {
          return done(null, false, message);
        }

        return done(null, user);
      });
    },
  ),
);
