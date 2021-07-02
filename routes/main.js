const express = require('express');
const router = express.Router();

const Product = require('../models/product');


/* GET home page. */
router.get('/', function(req, res, next) {
    const successMgs = req.flash('success')[0];
    Product.find(function(err, docs){
        const productChunks = [];
        const chunkSize = 3;
        for (let i = 0; i < docs.length; i += chunkSize) {
          productChunks.push(docs.slice(i, i  + chunkSize));
        }
        res.render('shop/index', { title: 'Shopping cart', products: productChunks, successMgs: successMgs, noMessage: !successMgs });
    }).lean();
});

module.exports = router;
