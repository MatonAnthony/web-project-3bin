/*
 * Generate a set of fake user used by our API mocker (json-server)
 */
var faker = require('faker');
var users = require('./users.js');
/*
 * Ask faker to give us a french like dataset
 */
faker.locale = 'fr';

/*
 * TODO : Wait on @mtechy to finish ticket and payment
 */
function generateSells(numberOfSells) {
    var sells = [];
    for(let i = 0; i < numberOfSells; i++) {
        let id = i;
        let ticket = {}; // Supposed to be a ticket object
        let amount = faker.finance.amount();
        let payment = {}; // Supposed to be a payment object
        let date = faker.date.past();
        let seller = users(1).pop();


        sells.push({
            "id": id,
            "ticket": ticket,
            "amount": amount,
            "payment": payment,
            "date": date,
            "seller": seller
        });
    }

    return sells;
}

module.exports = generateSells;