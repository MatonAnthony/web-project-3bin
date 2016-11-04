/*
 * Generate a set of fake payments used by the API mocker (json-server)
 */
var faker = require('faker');
var users = require('./users.js');

/*
 * Ask faker to give a french like dataset
 */
faker.locale = 'fr';

function generatePayments(numberofPayments){
    var payments = [];

    for(let i = 0; i < numberofPayments; i++){

        //randomize the type of payments
        let randomType = Math.floor((Math.random()*4)+1);
        let id = faker.random.number();
        let amount = faker.random.number();
        let transactionNumber = faker.random.number();
        let cardNumber = faker.random.number();

        switch(randomType){
            case 1:
                payments.push({
                    "id":id,
                    "type":"cash",
                    "amount":amount,
                    "change": faker.random.number()
                });
                break;
            case 2:
                payments.push({
                    "id":id,
                    "type":"card",
                    "amount":amount,
                    "transactionNumber":transactionNumber,
                    "cardNumber": cardNumber

                });
                break;
            case 3:
                payments.push({
                    "id":id,
                    "type":"visa",
                    "amount":amount,
                    "transactionNumber":transactionNumber,
                    "cardNumber": cardNumber

                });
                break;
            case 4:
                payments.push({
                    "id":id,
                    "type":"mastercard",
                    "amount":amount,
                    "transactionNumber":transactionNumber,
                    "cardNumber": cardNumber

                });
                break;
        }

    }
    return payments;
}

module.exports = generatePayments;