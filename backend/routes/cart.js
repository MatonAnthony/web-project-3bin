const express = require('express');
// eslint-disable-next-line no-cap
const router = express.Router();
const cart = require('../business/cart');
const product = require('../business/product');
const logger = require('winston');

/**
 * Routes available on /carts :
 *
 * POST /carts/new => Add a cart and return the id of the created cart
 * GET /carts => Return an array with all the carts
 * GET /carts/{id} => Return the cart of id : {id}
 * GET /carts/{id}/complete => Return the cart with all the products
 * PATCH /carts/{id}/removeProduct => Remove a product
 *          from the cart of id : {id}
 * PATCH /carts/{id}/productId => add a product to the cart based
 *          on its productId, or update the quantity if the product
 *          already is in the cart.
 * PATCH /carts/{id}/ean => add a product to the cart based
 *          on its ean, or update the quantity if the product
 *          already is in the cart.
 * DELETE /carts/{id} Delete the cart of given id 
 */

router.post('/new', (req, res) => {
   cart.newCart().then((cart) => {
        res.status(201).json({cartId: cart['_id']});
   }).catch((error) => {
       logger.log('error', 'Promise rejected : ', error);
       res.status(500).send();
   });
});

router.get('/', (req, res) => {
        cart.getAllCarts().then((cart) => {
            res.status(200).json(cart);
        }).catch((error) => {
            logger.log('error', 'Promise rejected : ', error);
            res.status(500).send();
        });
});

router.get('/:id', (req, res) => {
    req.checkParams('id').isMongoId();

    let errors = req.validationErrors();

    if(errors) {
        res.status(417).send(errors);
    } else {
        cart.getAllCarts({_id: req.params.id})
            .then((cart) => {
                res.status(200).json(cart);
            }).catch((error) => {
            logger.log('error', 'Promise rejected : ', error);
            res.status(500).send();
        });
    }
});

router.get('/:id/complete', (req, res) => {
    req.checkParams('id').isMongoId();

    let errors = req.validationErrors();

    if(errors) {
        res.status(417).send(errors);
    } else {
        cart.getAllCarts({_id: req.params.id})
            .then((cart) => {
                let promises = [];
                cart[0].products.forEach(function(entry) {
                    promises.push(product
                        .getAllProducts({_id: entry.product}));
                });

                Promise.all(promises).then((values) => {
                    res.status(200).json(values);
                }).catch((error) => {
                    logger.log('error', 'Promise rejected : ', error);
                    res.status(500).send();
                });
            }).catch((error) => {
                logger.log('error', 'Promise rejected : ', error);
                res.status(500).send();
            });
    }
});

router.patch('/:id/removeProduct', (req, res) => {
    req.checkParams('id').isMongoId();
    req.checkBody('productId').isMongoId();

    let errors = req.validationErrors();

    if(errors) {
        res.status(417).send(errors);
    } else {
        cart.getAllCarts({_id: req.params.id}).then((cartTemp) => {
            let deleted = false;
            for(let i= 0; i< cartTemp[0].products.length; i++) {
                if (cartTemp[0].products[i].product == req.body.productId) {
                    deleted=true;
                    cartTemp[0].products.splice(i, 1);
                    cart.updateCart(req.params.id, cartTemp[0])
                        .then((cartUpdated) =>{
                            res.status(200).json(cartUpdated);
                        }).catch((error) => {
                        logger.log('error', 'Promise rejected : ', error);
                        res.status(500).send();
                    });
                }
            }
            if(!deleted) {
                res.status(417).send();
            }
        }).catch((error) => {
            logger.log('error', 'Promise rejected : ', error);
            res.status(500).send();
        });
    }
});

router.patch('/:id/productId', (req, res) =>{
    req.checkParams('id').isMongoId();
    req.checkBody('productId').isMongoId();
    req.checkBody('quantity').isInt({min: 0});

    let errors = req.validationErrors();

    if(errors) {
        res.status(417).send(errors);
    } else {
        addProductToCart(req.params.id, req.body.productId, req.body.quantity,
            res);
    }
});

router.patch('/:id/ean', (req, res) =>{
    req.checkParams('id').isMongoId();
    req.checkBody('ean').isNumeric();
    req.checkBody('quantity').isInt({min: 0});

    let errors = req.validationErrors();

    if(errors) {
        res.status(417).send(errors);
    } else {
        product.getAllProducts({ean: req.body.ean}).then((productTemp) =>{
            addProductToCart(req.params.id, productTemp[0]._id,
                req.body.quantity, res);
        }).catch((error) => {
            logger.log('error', 'Promise rejected : ', error);
            res.status(500).send();
        });
    }
});

router.delete('/:id', (req, res) => {
    req.checkParams('id', 'Invalid id').isMongoId();

    let errors = req.validationErrors();
    if(errors) {
        res.status(417).send('There have been validation errors: ' + errors);
    }else{
        cart.removeCart(req.params.id).then(() =>{
            res.status(200).send();
        }).catch((error) => {
            logger.log('error', 'Promise rejected : ', error);
            res.status(500).send();
        });
    }
});

/**
 * Add a product to the cart
 * @param {Number} cartId The id of the cart
 * @param {Number} productId The id of the product to add
 * @param {Number} quantity The quantity to add
 * @param {Object} res The http response
 */
function addProductToCart(cartId, productId, quantity, res) {
    cart.getAllCarts({_id: cartId}).then((cartTemp) => {
        let addOne = true;
        cartTemp[0].products.forEach((entry) => {
            if(JSON.stringify(entry.product) == JSON.stringify(productId)) {
                addOne=false;
                entry.quantity = quantity;
                cart.updateCart(cartId, cartTemp[0]).then((cartUpdated) =>{
                        res.status(200).json(cartUpdated);
                    }).catch((error) => {
                        logger.log('error', 'Promise rejected : ', error);
                        res.status(500).send();
                    });
            }
        });
        if(addOne) {
            cartTemp[0].products.push({
                product: productId,
                quantity: quantity,
            });
            cart.updateCart(cartId, cartTemp[0])
                .then((cartUpdated) => {
                    res.status(200).json(cartUpdated);
                }).catch((error) => {
                    logger.log('error', 'Promise rejected : ', error);
                    res.status(500).send();
                });
        }
    }).catch((error) => {
        logger.log('error', 'Promise rejected : ', error);
        res.status(500).send();
    });
}

module.exports = router;
