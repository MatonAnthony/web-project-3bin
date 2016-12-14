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
    let userId= req.checkBody('cartId').notEmpty().isMongoId();
    let cartId= req.checkBody('userId').notEmpty().isMongoId();
    let paymentId= req.checkBody('paymentId').notEmpty().isMongoId();

    let errors = req.validationErrors();

    if (errors) {
        res.status(417).send(errors);
    }else{
        let ticketData= {
            date: new Date(),
            seller: userId,
            cart: cartId,
            discount: 0,
            tax: 0,
            payment: paymentId,
        };
        ticket.register(JSON.stringify(ticketData)).then(() => {
            res.status(201).json({success: 'ticket successfully added'});
        }).catch((err) => {
            logger.log('error', 'Promise Rejected : ', err);
            res.status(500).send();
        });
        console.log(req.body);
    }
});

module.exports = router;
