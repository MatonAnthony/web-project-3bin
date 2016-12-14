const models = require('./models');

/**
  * Register a ticket
  * @param {Object} futureTicket The ticket to register to the database
  * @return {Promise} return the future related to the registration process
 */
exports.register = (futureTicket) => {
    let ticket = new models.ticket({
        date: futureTicket.date,
        seller: futureTicket.seller,
        cart: futureTicket.cart,
        discount: futureTicket.discount,
        tax: futureTicket.tax,
        total: futureTicket.total,
        payment: futureTicket.payment,
    });
    return ticket.save();
};

/**
 * Get all the tickets based on the fieldsToCompare param
 * @param {Object} fieldsToCompare An object with the fields to compare
 * @return {Promise} return the future related to the getAllTikets process
 */
exports.getAllTickets = (fieldsToCompare) => {
    return models.ticket.find(fieldsToCompare);
};

/**
 * Update the ticket in the database
 * @param {Object} ticketId The id of the ticket to update
 * @param {Object} fieldsToUpdate An object with the fields to update and their
 * new value
 * @return {Promise} the future related to the updateTicket process
 */
exports.updateTicket = (ticketId, fieldsToUpdate) => {
    return models.ticket.findOneAndUpdate({_id: ticketId}, fieldsToUpdate,
        {new: true});
};

/**
 * Remove the ticket from the database
 * @param {Object} ticketId The id of the ticket to remove
 * @return {Promise} the future related to the removeTicket process
 */
exports.removeTicket = (ticketId) => {
  return models.ticket.find({_id: ticketId}).remove().exec();
};
