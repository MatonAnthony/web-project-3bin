/*
 * Generate the accountancy
 */
const faker = require('faker');

/*
 * Ask faker to give us a french like dataset
 */
faker.locale = 'fr';

/**
 * Generate the accountancy after every transaction
 * @param {Number} numberOfAccountancies of transactions generated
 * @param {Number} initialBalance the balance before the operations
 * @return {Object} return a dataset with the full accountancy.
 */
function generateAccountancy(numberOfAccountancies, initialBalance) {
    let accountancy = [];
    let balance = initialBalance;
    for (let i = 0; i < numberOfAccountancies; i++) {
        let toPay = faker.random.number();
        let received = faker.random.number();
        while (received < toPay) {
            received = faker.random.number();
        }
        let change = received - toPay;
        balance = balance + toPay;

        accountancy.push({
            'transactionNumber': i + 1,
            'priceToPay': toPay,
            'moneyReceived': received,
            'change': change,
            'balance': balance,
        });
    }

    return accountancy;
}

module.exports = generateAccountancy;
