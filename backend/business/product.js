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

/**
 * Update a product in the database
 * @param {Object} productId The id of the product to update
 * @param {Object} fieldsToUpdate An object with the fields with the new value
 * @return {Promise} return the future related to the updateProduct process
 */
exports.updateProduct = (productId, fieldsToUpdate) => {
    let options = {
        new: true,
    };

    return models.product.findOneAndUpdate({_id: productId}, fieldsToUpdate,
        options);
};

/**
 * Remove the product in the database, for the given id
 * @param {Object} productId The id of the product to remove
 * @return {Promise} return the future related to the remove process
 */
exports.removeProduct = (productId) => {
  return models.product.find({_id: productId}).remove().exec();
};
