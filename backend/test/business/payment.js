const payment = require('../../business/payment');
const models = require('../../business/models');

const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/test');
//mongoose.Promise = global.Promise;

const id = new mongoose.Types.ObjectId;

describe('hook', function() {
    before('Add a payment to the database', function() {
        let paymentTemp = models.payment({
            id: id,
            amount: 4000,
            moneyReceived: 5000,
            change: 1000,
            transactionNumber: 123,
        });

        paymentTemp.save().then().catch();
    });
});

describe('payment', function() {
    describe('#Register', function() {
        it('Should add a payment to the database', function() {
            let futurePayment = {
                amount: 9000,
                moneyReceived: 10000,
                change: 1000,
                transactionNumber: 42,
            };
            return payment.register(futurePayment);
        });
    });
});

describe('payment', function() {
   describe('#getAllPayments', function() {
      it('Should return an array with all the payments in the database',
          function() {
            return payment.getAllPayments();
      });
   });
});

describe('payment', function() {
    describe('#UpdatePayment', function() {
        it('Should update the fields of the payment of given id', function() {
            return payment.updatePayment(id,
                {moneyReceived: 6000, change: 2000});
        });
    });
});

describe('payment', function() {
    describe('#RemovePayment', function() {
        it('Should remove the payment of given id of the database', function() {
            return payment.removePayment(id);
        });
    });
});

