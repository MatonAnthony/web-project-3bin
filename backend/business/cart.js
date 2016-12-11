const models = require('./models');

/**
 * Create an new cart
 * @return {Promise} return the future related to the registration process
 */
exports.newCart = () => {
    let cart = new models.cart();
    return cart.save();
};

/**
 * Get all carts based on the fields of the param
 * @param {Object} fieldsToCompare An object with the fields to compare
 * @return {Promise} return the future related to the getAllCarts process
 */
exports.getAllCarts = (fieldsToCompare) => {
    return models.cart.find(fieldsToCompare);
};

/**
 * Update a cart in the database
 * @param {Object} cartId The id of the cart to update
 * @param {Object} fieldsToUpdate An object with the fields with the new value
 * @return {Promise} return the future related to the updateCart process
 */
exports.updateCart = (cartId, fieldsToUpdate) => {
    return models.cart.findOneAndUpdate({_id: cartId}, fieldsToUpdate,
        {new: true});
};

/**
 * Remove the cart in the database, for the given id
 * @param {Object} cartId The id of the cart to remove
 * @return {Promise} return the future related to the remove process
 */
exports.removeCart = (cartId) => {
    return models.cart.find({_id: cartId}).remove().exec();
};
