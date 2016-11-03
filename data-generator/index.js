/*
 * Generate a set of fake user used by our API mocker (json-server)
 */
var users = require('./users.js');
var products = require('./products.js');
var tickets = require('./tickets.js');
var payments = require('./payments.js');

function generate() {
    var dataset = {};
    dataset.users = users(5);
    dataset.products = products(20);
    dataset.tickets = tickets(10);
    dataset.payments = payments(5);
    return dataset;
}

module.exports = generate;
