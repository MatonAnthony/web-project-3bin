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
        let department = faker.commerce.department();
        let productName = faker.commerce.productName();
        let eanNumber = faker.random.number();
        let price = faker.commerce.price();
        let productCategory = faker.lorem.word();
        let tva = faker.random.number();
	let isPreferred = faker.random.boolean();

        products.push({
            'department': department,
            'productName': productName,
            'ean': eanNumber,
            'price': price,
            'tva': tva,
            'category': productCategory,
            'isPreferred': isPreferred,
        });
    }

    return products;
}
module.exports = generateProducts;
