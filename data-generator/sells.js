/*
 * Generate a set of fake user used by our API mocker (json-server)
 */
let faker = require('faker');
let users = require('./users.js');
/*
 * Ask faker to give us a french like dataset
 */
faker.locale = 'fr';

/**
 * TODO : Wait on @mtechy to finish ticket and payment
 * Generate a dataset of sells
 * @param {Number} numberOfSells of sells put on the dataset
 * @return {Object} Dataset of sells
 */
function generateSells(numberOfSells) {
    let sells = [];
    for(let i = 0; i < numberOfSells; i++) {
        let id = i;
        let ticket = {}; // Supposed to be a ticket object
        let amount = faker.finance.amount();
        let payment = {}; // Supposed to be a payment object
        let date = faker.date.past();
        let seller = users(1).pop();


        sells.push({
            'id': id,
            'ticket': ticket,
            'amount': amount,
            'payment': payment,
            'date': date,
            'seller': seller,
        });
    }

    return sells;
}

module.exports = generateSells;
