/* eslint-disable */

/*
 * Generate a set of fake user used by our API mocker (json-server)
 */
let faker = require('faker');
/*
 * Ask faker to give us a french like dataset
 */
faker.locale = 'fr';

function generateProducts(numberOfProducts) {
    let products = [];
    for(let i = 0; i < numberOfProducts; i++) {
        let id = faker.random.number();
        let department = faker.commerce.department();
        let productName = faker.commerce.productName();
        let product = faker.commerce.product();
        let price = faker.commerce.price();

        products.push({
            'id': id,
            'department': department,
            'productName': productName,
            'product': product,
            'price': price,
        });
    }

    return products;
}

module.exports = generateProducts;
