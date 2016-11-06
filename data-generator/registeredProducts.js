/*
 * Generate the registered products
 */
const faker = require('faker');
const products = require('./products.js');
/*
 * Ask faker to give us a french like dataset
 */
faker.locale = 'fr';

/**
 * Generate the registered products
 * @param {Number} numberProducts of products to be generated
 * @return {Object} return a dataset with the full stock.
 */
function generateRegisteredProducts(numberProducts) {
    let registeredProducts = [];
    for (let i = 0; i < numberProducts; i++) {
        let number = faker.random.number();
        let product = products(1).pop();

        registeredProducts.push({
            'amount': number,
            'product': product,
        });
    }

    return registeredProducts;
}

module.exports = generateRegisteredProducts;
