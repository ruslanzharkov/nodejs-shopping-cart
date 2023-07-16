const express = require('express');
const router = express.Router();

const Product = require('../models/product');

// GET home page
router.get('/', async function getMainPage(req, res, next) {
  const successMgs = req.flash('success')[0];

  const products = await Product.find().lean();

  res.render('shop/index', {
    title: 'Shopping cart',
    products,
    successMgs: successMgs,
    noMessage: !successMgs,
  });
});

module.exports = router;
