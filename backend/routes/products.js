const express = require('express');
// eslint-disable-next-line no-cap
const router = express.Router();
const productBiz = require('../business/product.js');
const logger = require('winston');

/**
 * Routes available on /products :
 *
 * POST /products -> add a product
 * GET /products/preferred -> return an array of preferred products
 * GET /products/{id} -> return an product given his id
 * DELETE /products/{id} -> delete a product given his id
 * PATCH /products/{id} -> update the data for a product given his id
 */

router.post('/', (req, res) => {
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
        logger.log('error', 'Promise Rejected : ', err);
        res.status(500).send('Internal Server Error : ' + err);
    });
});

router.get('/preferred', (req, res) => {
    productBiz.getAllProducts({isPreferred: true}).then( (products) => {
        res.status(200).json(products);
    }).catch((err) => {
        logger.log('error', 'Promise Rejected : ', err);
        res.status(500).send('Internal Server Error : ' + err);
    });
});

router.get('/:id', (req, res) => {
    req.checkParams('id', 'Invalid id').isMongoId();

    let errors = req.validationErrors();
    if(errors) {
        res.status(417).send('There have been validation errors: ' + errors);
    }
    productBiz.getAllProducts({_id: req.params.id}).then( (product) => {
        res.status(200).json(product);
    }).catch((err) => {
        logger.log('error', 'Promise Rejected : ', err);
        res.status(500).send('Internal Server Error : ' + err);
    });
});

router.delete('/:id', (req, res) => {
    console.log('DELETE /:id');
    req.checkParams('id', 'Invalid id').isMongoId();

    let errors = req.validationErrors();
    if(errors) {
        res.status(417).send('There have been validation errors: ' + errors);
    }
    productBiz.removeProduct(req.params.id).then(() =>{
        res.status(200);
    }).catch((error) => {
        res.status(500).send('Internal Server Error : ' + error);
    });
});

router.patch('/:id', (req, res) => {
    console.log('PATCH /:id');
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

    productBiz.updateProduct(req.params.id, req.body).then((product) => {
        res.status(200).send(product);
    }).catch((error) => {
        res.status(500).send('Internal Server Error : ' + error);
    });
});

module.exports = router;
