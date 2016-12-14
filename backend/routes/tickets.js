const express = require('express');
// eslint-disable-next-line no-cap
const router = express.Router();
const ticket = require('../business/ticket.js');
const logger = require('winston');

/**
 * Routes available on /products :
 *
 * POST /generateTicket/   generate a ticket on base of a cart Id
 */
router.post('/generateTicket/', (req, res) => {
    req.checkBody('cart').notEmpty().isMongoId();
    req.checkBody('seller').notEmpty().isMongoId();
    req.checkBody('payment').notEmpty().isMongoId();

    let errors = req.validationErrors();

    if (errors) {
        res.status(417).send(errors);
    }else{
        ticket.register(req.body).then((ticket) => {
            res.status(201).json(ticket);
        }).catch((err) => {
            logger.log('error', 'Promise Rejected : ', err);
            res.status(500).send();
        });
    }
});

module.exports = router;
