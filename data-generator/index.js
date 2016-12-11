/**
 * Generate a set of fake user used by our API mocker (json-server)
 */
const users = require('./users.js');
const products = require('./products.js');
const tickets = require('./tickets.js');
const payments = require('./payments.js');
const searchs = require('./searchs.js');
const accountancy = require('./accountancy.js');
const registeredProducts = require('./registeredProducts.js');

/**
 * Generate a fake dataset to mock the API.
 * @return {Object} Return a dataset JSON compliant.
 */
function generate() {
    let dataset = {};
    dataset.users = users(50);
    dataset.products = products(200);
    dataset.tickets = tickets(100);
    dataset.payments = payments(50);
    dataset.searchs = searchs(500);
    dataset.accountancies = accountancy(10, 500000);
    dataset.registeredProducts = registeredProducts(20);
    return dataset;
}

module.exports = generate;
