/*
 * Generate a set of fake tickets used by the API mocker (json-server)
 */
const faker = require('faker');
const users = require('./users.js');
const products = require('./products.js');
const payments = require('./payments.js');

/*
 * Ask faker to give a french like dataset
 */
faker.locale = 'fr';

/**
 * Generate a dataset of tickets
 * @param {Number} numberofTickets number of tickets to generate in the dataset
 * @return {Object} return a dataset full of tickets.
 */
function generateTickets(numberofTickets) {
    var tickets = [];

    for(let i = 0; i < numberofTickets; i++) {

        let id = faker.random.number();
        let date = faker.date.recent();
        let user = users(1).pop();
        let productList = products(5);
        let discount = faker.random.number();
        let tax = faker.random.number();
        let total =  faker.random.number();
        let client = users(1).pop();
        let payment = payments(1).pop();

        tickets.push({
            'id' : id,
            'date' : date,
            'cashier' : user,
            'products' : productList,
            'discount' : discount,
            'tax' : tax,
            'total' : total, 
            'client' : client,
            'payment' : payment,
        });

    }

    return tickets;
}

module.exports = generateTickets;
