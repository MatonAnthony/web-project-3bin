/**
 * Generate a set of fake user used by our API mocker (json-server)
 */
const users = require('./users.js');
const products = require('./products.js');
const tickets = require('./tickets.js');
const payments = require('./payments.js');

/**
 * Generate a fake dataset to mock the API.
 * @return {Object} Return a dataset JSON compliant.
 */
function generate() {
    let dataset = {};
    dataset.users = users(5);
    dataset.products = products(20);
    dataset.tickets = tickets(10);
    dataset.payments = payments(5);
    return dataset;
}

module.exports = generate;
