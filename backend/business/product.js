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
 * Get a product based on the non-empty fields of the param
 * @param {Object} futureProduct The product to find in the database
 * @return {Promise} return the future related to the find process
 */
exports.getProduct = (futureProduct) => {
    let query = '{';

    for(let index in futureProduct) {
        if(futureProduct.hasOwnProperty(index)
            && futureProduct[index] != null) {
            query= query + ', ' + index + ': ' + futureProduct[index];
        }
    }

    query += '};';

    return models.product.findOne(query);
};

/**
 * Get a product based on the non-empty fields of the param
 * @param {Object} futureProduct The product to find in the database
 * @return {Promise} return the future related to the findAll process
 */
exports.getAllProducts = (futureProduct) => {
    let query = '{';

    for(let index in futureProduct) {
        if(futureProduct.hasOwnProperty(index)
            && futureProduct[index] != null) {
            query= query + ', ' + index + ': ' + futureProduct[index];
        }
    }

    query += '};';

    return models.product.find(query);
};


