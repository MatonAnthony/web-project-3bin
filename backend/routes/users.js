const express = require('express');
// eslint-disable-next-line no-cap
const router = express.Router();
const user = require('../business/user.js');

router.post('/register', (req, res, next) => {
    req.checkBody('pseudo').notEmpty().isAlpha();
    req.checkBody('password').notEmpty();
    req.checkBody('email').notEmpty().isEmail();
    req.checkBody('firstname').notEmpty();
    req.checkBody('lastname').notEmpty();
    req.checkBody('accessCardId').isNumeric();

    let errors = req.validationErrors();

    if(errors) {
        res.status(417).send(errors);
    } else { 
        user.register(req.body).then(() => {
            res.status(200).json({success: 'Successfull registration'});
        }).catch((err) => {
            res.status(417).end();
        });
    }
});

router.post('/login', (req, res, next) => {
    req.checkBody('pseudo').notEmpty().isAlpha();

    let errors = req.validationErrors();
    if(errors) {
        res.status(417).send(errors);
    } else {
        user.login(req.body.pseudo, req.body.password).then((jwt) => {
            res.status(200).json({token: jwt});
        }).catch((err) => {
            res.status(403).end();
        });
    }
});

module.exports = router;
