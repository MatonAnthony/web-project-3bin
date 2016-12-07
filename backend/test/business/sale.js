const sale = require('../../business/sale');
const mongoose = require('mongoose');

describe('sale', function() {
    describe('#register', function() {
        it('should add a sale to the database', function() {
            let futureSale = {
                _id: new mongoose.Types.ObjectId(1234567890),
                ticket: new mongoose.Types.ObjectId(1),
                payment: new mongoose.Types.ObjectId(2),
                date: new Date(),
            };
            return sale.register(futureSale);
        });
    });
});

describe('sale', function() {
    describe('#getAllSales', function() {
        it('should get all the sales stored in the database', function() {
            return sale.getAllSales();
        });
    });
});

describe('sale', function() {
    describe('#updateSale', function() {
        it('should update the fields for the sale of given id', function() {
            return sale.updateSale(new mongoose.Types.ObjectId(1234567890),
                {date: new Date()});
        });
    });
});

describe('sale', function() {
    describe('#removeSale', function() {
        it('Should remove the sale for the given id', function() {
            return sale.removeSale(new mongoose.Types.ObjectId(1234567890));
        });
    });
});
