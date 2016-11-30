const models = require('./models.js');

/**
 * Register a product
 * @param {Object} futureProduct The product to register to the database
 * @return {Promise} return the future related to the registration process
 */
exports.register = (futureProduct) => {
    let product = new models.product({
        department: futureProduct.department,
        productName: futureProduct.productName,
        ean: futureProduct.ean,
        price: futureProduct.price,
        tva: futureProduct.tva,
        category: futureProduct.category,
    });
    return product.save();
};

/**
 * Get all products based on the fields of the param
 * @param {Object} futureProduct An object with the fields to compare
 * @return {Promise} return the future related to the getAllProducts process
 */
exports.getAllProducts = (futureProduct) => {
    return models.product.find(futureProduct);
};


