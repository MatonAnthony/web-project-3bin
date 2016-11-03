/*
 * Generate a set of fake user used by our API mocker (json-server)
 */
var users = require('./users.js');
var products = require('./products.js');

function generate() {
    var dataset = {};
    dataset.users = users(5);
    dataset.products = products(20);
    return dataset;
}

module.exports = generate;
