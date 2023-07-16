const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');

const Order = require('../models/order');
const Cart = require('../models/cart');

const csrfProtection = csrf();
router.use(csrfProtection);

// GET profile page
router.get('/profile', isLoggedIn, function (req, res) {
  Order.find({ user: req.user }, function (err, orders) {
    if (err) {
      return res.write('Error!');
    }
    let cart;

    orders.forEach(function (order) {
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
      order.totalPrice = order.cart.totalPrice;
    });

    res.render('user/profile', { orders: orders });
  });
});

// GET logout
router.get('/logout', isLoggedIn, function (req, res, next) {
  req.logout(function logoutCallback(err) {
    if (err) {
      return next(err);
    }

    res.redirect('/');
  });
});

router.use('/', notLoggedIn, function (req, res, next) {
  next();
});

// GET sign up page
router.get('/signup', function (req, res) {
  const messages = req.flash('error');
  res.render('user/signup', {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0,
  });
});

// POST sign up action route
router.post(
  '/signup',
  body('email').notEmpty().isEmail(),
  body('password').notEmpty().isLength({ min: 4 }),
  passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true,
  }),
  function (req, res) {
    if (req.session.oldUrl) {
      const oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    } else {
      res.redirect('/user/profile');
    }
  },
);

// GET sign in page
router.get('/signin', function (req, res) {
  const messages = req.flash('error');
  res.render('user/signin', {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0,
  });
});

// POST sign in action route
router.post(
  '/signin',
  body('email').notEmpty().isEmail(),
  body('password').notEmpty().isLength({ min: 4 }),
  passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    failureFlash: true,
  }),
  function (req, res) {
    if (req.session.oldUrl) {
      const oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    } else {
      res.redirect('/user/profile');
    }
  },
);

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
