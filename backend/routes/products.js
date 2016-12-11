const express = require('express');
// eslint-disable-next-line no-cap
const router = express.Router();
const productFunctions = require('../business/product.js');
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
        res.status(417).send(errors);
    }else{
        productFunctions.register(req.body).then(() => {
            res.status(201).json({success: 'Successfully added product'});
        }).catch((err) => {
            logger.log('error', 'Promise Rejected : ', err);
            res.status(500).send();
        });
    }
});

router.get('/preferred', (req, res) => {
    productFunctions.getAllProducts({isPreferred: true}).then( (products) => {
        res.status(200).json(products);
    }).catch((err) => {
        logger.log('error', 'Promise Rejected : ', err);
        res.status(500).send();
    });
});

router.get('/:id', (req, res) => {
    req.checkParams('id', 'Invalid id').isMongoId();

    let errors = req.validationErrors();
    if(errors) {
        res.status(417).send(errors);
    }else {
        productFunctions.getAllProducts({_id: req.params.id})
            .then((product) => {
            res.status(200).json(product);
        }).catch((err) => {
            logger.log('error', 'Promise Rejected : ', err);
            res.status(500).send();
        });
    }
});

router.delete('/:id', (req, res) => {
    req.checkParams('id', 'Invalid id').isMongoId();

    let errors = req.validationErrors();
    if(errors) {
        res.status(417).send(errors);
    }else {
        productFunctions.removeProduct(req.params.id).then(() => {
            res.status(200).send();
        }).catch((error) => {
            logger.log('error', 'Promise Rejected : ', err);
            res.status(500).send();
        });
    }
});

router.patch('/:id', (req, res) => {
    req.checkParams('id', 'Invalid id').isMongoId();
    req.checkBody('department', 'Invalid department').isAlpha();
    req.checkBody('productName', 'Invalid product').isAlpha();
    req.checkBody('ean', 'Invalid ean number').isNumeric();
    req.checkBody('price', 'Invalid price').isNumeric();
    req.checkBody('tva', 'Invalid tva').isNumeric();
    req.checkBody('category', 'Invalid category').isAlpha();

    let errors = req.validationErrors();
    if(errors) {
        res.status(417).send(errors);
    }else {
        productFunctions.updateProduct(req.params.id, req.body)
            .then((product) => {
            res.status(200).send(product);
        }).catch((error) => {
            logger.log('error', 'Promise Rejected : ', err);
            res.status(500).send();
        });
    }
});

module.exports = router;
