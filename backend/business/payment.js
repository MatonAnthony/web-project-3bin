const models = require('./models');

/**
 * Add a payment to the database
 * @param {Object} futurePayment The payment to add to the database
 * obtained from the body-parser
 * @return {Promise} the future related to the registration proccess
 */
exports.register = (futurePayment) => {
    let payment = new models.payment({
        amount: futurePayment.amount,
        moneyReceived: futurePayment.moneyReceived,
        change: futurePayment.change,
    });
    return payment.save();
};

/**
 * Get all the payments based on the fields of the param
 * @param {Object} fieldsToCheck An object with the fields to compare
 * @return {Promise} the future related to the getAllPayment process
 */
exports.getAllPayments = (fieldsToCheck) => {
    return models.payment.find(fieldsToCheck);
};

/**
 * Update a payment in the database
 * @param {Object} paymentId the id of the payment to update
 * @param {Object} fieldsToUpdate The fields to update in the payment
 * @return {Promise} the future related to the updatePayment process
 */
exports.updatePayment = (paymentId, fieldsToUpdate) => {
    return models.payment.findOneAndUpdate({_id: paymentId},
        fieldsToUpdate, {new: true});
};

/**
 * Remove the payment from the database
 * @param {Object} paymentId the id of the payment to remove
 * @return {Promise} the future related to the removePayment process
 */
exports.removePayment = (paymentId) => {
    return models.payment.find({_id: paymentId}).remove().exec();
};
