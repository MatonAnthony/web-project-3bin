const models = require('./models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
        accessCardId: futureUser.accessCardId,
    });
    return user.save();
};

/**
 * Log a user.
 * @param {String} login the username or the connection barcode
 * @param {String} password the password of if a connection barcode is used
 * @return {Promise} return the future related to the login process
 * nothing.
 */
exports.login = (login, password) => {
    let promise = new Promise( (resolve, reject) => {
        if(typeof login === 'number' && typeof password === 'undefined') {
            let query = models.user.findOne({accessCardId: login}).exec();
            query.then((user) => {
                let token = jwt.sign({pseudo: user.pseudo, id: user._id},
                    process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_TOKEN_EXPIRATION,
                    });
                resolve(token);
            }).catch((err) => {
                reject(err);
            });
        } else { 
            let query = models.user.findOne({pseudo: login}).exec();
            query.then((user) => {
                if(!bcrypt.compareSync(password, user.password)) 
                    reject(new Error('Incorrect password'));
                let token = jwt.sign({pseudo: user.pseudo, id: user._id},
                    process.env.JWT_SECRET, { 
                        expiresIn: process.env.JWT_TOKEN_EXPIRATION,
                    });
                resolve(token);
            }).catch((err) => {
                reject(err);
            });
        }
    });

    return promise;
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
