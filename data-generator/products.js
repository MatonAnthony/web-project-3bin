/*
 * Generate a set of fake user used by our API mocker (json-server)
 */
const faker = require('faker');
/*
 * Ask faker to give us a french like dataset
 */
faker.locale = 'fr';

/**
 * Generate a dataset of products
 * @param {Number} numberOfProducts number of products to
 * generate in the dataset.
 * @return {Object} return a dataset full of products.
 */
function generateProducts(numberOfProducts) {
    let products = [];
    for(let i = 0; i < numberOfProducts; i++) {
        let id = faker.random.number();
        let department = faker.commerce.department();
        let productName = faker.commerce.productName();
        let product = faker.random.number();
        let price = faker.commerce.price();
        let productCategory = faker.lorem.word();
        let tva = faker.random.number();

        products.push({
            'id': id,
            'department': department,
            'productName': productName,
            'product': product,
            'price': price,
            'tva': tva,
            'category': productCategory,
        });
    }

    return products;
}
module.exports = generateProducts;
