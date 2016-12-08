const ticket = require('../../business/ticket');
const mongoose = require('mongoose');

describe('ticket', function() {
    describe('#register', function() {
        it('should add a ticket to the database', function() {
            let futureTicket = {
                _id: new mongoose.Types.ObjectId(123456789),
                date: new Date(),
                seller: new mongoose.Types.ObjectId(1),
                products: [new mongoose.Types.ObjectId(2),
                    new mongoose.Types.ObjectId(3)],
                discount: 5,
                tax: 21,
                total: 100,
                payment: new mongoose.Types.ObjectId(4),
            };
            return ticket.register(futureTicket);
        });
    });
});

describe('ticket', function() {
    describe('#getAllTickets', function() {
        it('should get all the tickets stored in the database', function() {
            return ticket.getAllTickets();
        });
    });
});

describe('ticket', function() {
    describe('#updateTicket', function() {
        it('should update the fields for the ticket of given id', function() {
            return ticket.updateTicket(new mongoose.Types.ObjectId(123456789),
                {total: 150, tva: 10});
        });
    });
});

describe('ticket', function() {
    describe('#removeTicket', function() {
        it('Should remove the ticket for the given id', function() {
            return ticket.removeTicket(new mongoose.Types.ObjectId(123456789));
        });
    });
});
