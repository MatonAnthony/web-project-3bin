const express = require('express');
// eslint-disable-next-line no-cap
const router = express.Router();
const payment = require('../business/payment');
const logger = require('winston');

router.post('/new', (req, res) => {
    req.checkBody('amount').isFloat();
    req.checkBody('moneyReceived').isFloat();
    req.checkBody('change').isFloat();

    let errors = req.validationErrors();

    if(errors) {
        res.status(417).send(errors);
    } else {
        let futurePayment = {
            amount: req.body.amount,
            moneyReceived: req.body.moneyReceived,
            change: req.body.change,
        };

        payment.register(futurePayment).then((payment) => {
            res.status(200).json(payment);
        }).catch((error) => {
            logger.log('error', 'Promise rejected : ', error);
            res.status(500).send();
        });
    }
});

module.exports = router;
