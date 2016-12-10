const express = require('express');
// eslint-disable-next-line no-cap
const router = express.Router();
const productBiz = require('../business/product.js');

router.put('/products', (req, res, next) => {
    req.checkBody('department').notEmpty().isAlpha();
    req.checkBody('productName').notEmpty();
    req.checkBody('ean').notEmpty().isNumeric();
    req.checkBody('price').notEmpty().isNumeric();
    req.checkBody('tva').notEmpty().isNumeric();
    req.checkBody('category').notEmpty();
    req.checkBody('isPreferred').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.status(400).send(errors);
    }

    productBiz.getAllProducts();
    res.status(201);

    productBiz.register(req.body).then(() => {
        res.status(201).json({success: 'Successfully added product'});
    }).catch((err) => {
        res.status(400);
    });
});

router.get('/products', (req, res, next) => {
    req.body//Todo -> Gérer le filter dans l'url
    productBiz.getAllProducts({isPreferred: true}).then( (querryRes) => {
        res.status(200).json(querryRes);
    }).catch((err) => {
        res.status();
    });
});

router.get('/product');

module.exports = router;
