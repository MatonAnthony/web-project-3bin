const logger = require('winston');
const models = require('./models.js');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

/**
 * Register a user
 * @param {Object} futureUser obtained from body-parser
 * @return {Promise} return the future related to the registration process
 */

exports.register = (futureUser) => {
        let user = new models.user({
            pseudo: futureUser.pseudo,
            password: encryptPassword(futureUser.password),
            email: futureUser.email,
            firstname: futureUser.firstname,
            lastname: futureUser.lastname,
            lastConnection: Date.now(),
            accessCardId: futureUser.accessCardId
        });
        return user.save();
};

/**
 * Encrypt a password using BCrypt algorithm
 * @param {String} unencrypted the non-crypted password
 * @return {String} the encrypted password
 */
function encryptPassword(unencrypted) {
    // TODO: Rewrite in async
    return bcrypt.hashSync(unencrypted, SALT_ROUNDS);
};
