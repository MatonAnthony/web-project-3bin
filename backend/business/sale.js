const models = require('./models');

/**
 * Register a sale
 * @param {Object} futureSale The sale to register to the database
 * @return {Promise} return the future related to the registration process
 */
exports.register = (futureSale) => {
    let sale = new models.sale({
        ticket: futureSale.ticket,
        payment: futureSale.payment,
        date: futureSale.date,
    });
    return sale.save();
};

/**
 * Get all the sales based on the fieldsToCompare param
 * @param {Object} fieldsToCompare An object with the fields to compare
 * @return {Promise} return the future related to the getAllSales process
 */
exports.getAllSales = (fieldsToCompare) => {
    return models.sale.find(fieldsToCompare);
};

/**
 * Update the sale in the database
 * @param {Object} saleId The id of the sale to update
 * @param {Object} fieldsToUpdate An object with the fields to update and their
 * new value
 * @return {Promise} the future related to the updateSale process
 */
exports.updateSale = (saleId, fieldsToUpdate) => {
    return models.sale.findOneAndUpdate({_id: saleId}, fieldsToUpdate,
        {new: true});
};

/**
 * Remove the sale from the database
 * @param {Object} saleId The id of the sale to remove
 * @return {Promise} the future related to the removeSale process
 */
exports.removeSale = (saleId) => {
    return models.sale.find({_id: saleId}).remove().exec();
};
