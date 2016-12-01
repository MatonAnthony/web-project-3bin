const product = require('../../business/product.js');
const models = require('../../business/models');
// Database configuration
const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/test');
//mongoose.Promise = global.Promise;

const id = new mongoose.Types.ObjectId;

let productTemp = new models.product({
    _id: id,
    department: 'Alimentaire',
    productName: 'Moules',
    ean: '768501540',
    price: 12,
    tva: 3,
    category: 'others',
});

productTemp.save().then(() => {

}).catch((error) => {
    console.log(error);
});

describe('product', function() {
    describe('#register', function() {
        it('should add a product to the database', function() {
            let futureProduct = {
                department: 'Alimentaire',
                productName: 'Moules',
                ean: '768501540',
                price: 12,
                tva: 3,
                category: 'others',
            };

            return product.register(futureProduct);
        });
    });
});

describe('product', function() {
   describe('#getAllProducts', function() {
        it('should get all the products stored in the database', function() {
          return product.getAllProducts();
        });
   });
});

describe('product', function() {
    describe('#updateProduct', function() {
        it('should update the fields for the product of given id', function() {
            return product.updateProduct(id,
                {price: 150, tva: 100});
        });
    });
});

describe('product', function() {
   describe('#removeProduct', function() {
     it('Should remove the product for the given id', function() {
        return product.removeProduct(id);
     });
   });
});

