/**
 * Generate a set of fake user used by our API mocker (json-server)
 */
const users = require('./users.js');
const products = require('./products.js');

/**
 * Generate a fake dataset to mock the API.
 * @return {Object} Return a dataset JSON compliant.
 */
function generate() {
    let dataset = {};
    dataset.users = users(5);
    dataset.products = products(20);
    return dataset;
}

module.exports = generate;
