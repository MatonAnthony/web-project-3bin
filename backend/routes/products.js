const express = require('express');
// eslint-disable-next-line no-cap
const router = express.Router();
const productBiz = require('../business/product.js');

/**
 * Routes available on /products :
 *
 * PUT /products -> add a product
 * GET /products -> return an array with all products
 * GET /products/{id} -> return an product given his id
 * GET /products/pref/{isPreferred} -> return an array of preferred products
 * DELETE /products/{id} -> delete a product given his id
 * PATCH /products/{id} -> update the data for a product given his id
 */

router.put('/products', (req, res) => {
    req.checkBody('department').notEmpty().isAlpha();
    req.checkBody('productName').notEmpty();
    req.checkBody('ean').notEmpty().isNumeric();
    req.checkBody('price').notEmpty().isNumeric();
    req.checkBody('tva').notEmpty().isNumeric();
    req.checkBody('category').notEmpty();
    req.checkBody('isPreferred').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.status(417).send('Invalid arguments ' + errors);
}

    productBiz.register(req.body).then(() => {
        res.status(201).json({success: 'Successfully added product'});
    }).catch((err) => {
        res.status(500).send('Internal Server Error : ' + err);
    });
});

router.get('/products', (req, res) => {
    console.log('/products has been hitted');
    productBiz.getAllProducts().then( (products) => {
        res.status(200).json(products);
    }).catch((err) => {
        res.status(500).send('Internal Server Error : ' + err);
    });
});

router.get('/products/pref/:isPreferred', (req, res, next) => {
    console.log('/products/pref/:isPreferred has been hitted');
    if(req.params.isPreferred !== 'true'&&req.params.isPreferred!== 'false') {
        res.status(417).send('Invalid arguments');
    }
    productBiz.getAllProducts({isPreferred: true}).then( (products) => {
        res.status(200).json(products);
    }).catch((err) => {
        res.status(500).send('Internal Server Error : ' + err);
    });
});

router.get('/products/:id', (req, res) => {
    console.log('/products/:id has been hitted');
    req.checkParams('id', 'Invalid id').isAlpha();

    let errors = req.validationErrors();
    if(errors) {
        res.status(417).send('There have been validation errors: ' + errors);
    }
    productBiz.getAllProducts({_id: req.params.id}).then( (product) => {
        res.status(200).json(product);
    }).catch((err) => {
        res.status(500).send('Internal Server Error : ' + err);
    });
});

router.delete('/products/:id', (req, res) => {
    req.checkParams('id', 'Invalid id').isAlpha();

    let errors = req.validationErrors();
    if(errors) {
        res.status(417).send('There have been validation errors: ' + errors);
    }
    product.removeProduct(req.params.id).then(() =>{
        res.status(200);
    }).catch((error) => {
        res.status(500).send('Internal Server Error : ' + error);
    });
});

router.patch('/products/:id', (req, res) => {
    req.checkParams('id', 'Invalid id').isAlpha();
    req.checkBody('department', 'Invalid department').isAlpha();
    req.checkBody('productName', 'Invalid product').isAlpha();
    req.checkBody('ean', 'Invalid ean number').isNumeric();
    req.checkBody('price', 'Invalid price').isNumeric();
    req.checkBody('tva', 'Invalid tva').isNumeric();
    req.checkBody('category', 'Invalid category').isAlpha();

    let errors = req.validationErrors();
    if(errors) {
        res.status(417).send('There have been validation errors: ' + errors);
    }

    product.updateProduct(req.params.id, req.body).then((product) => {
        res.status(200).send(product);
    }).catch((error) => {
        res.status(500).send('Internal Server Error : ' + error);
    });
});

module.exports = router;
