const product = require('../../business/product');
const assert = require('assert');
const mongoose = require('mongoose');

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
            product.getAllProducts().then(function(products) {
                assert.ok(products[0]['department'] == 'Alimentaire' &&
                    products[0]['productName'] == 'Moules' &&
                    products[0]['ean'] == '768501540' &&
                    products[0]['price'] == 12 && products[0]['tva'] == 3 &&
                    products[0]['category'] == 'others',
                    'Les données récupérées ne sont pas valides');
            }).catch(function(error) {
                assert.ok(false, error);
            });
        });
   });
});

describe('product', function() {
    describe('#updateProduct', function() {
        it('should update the fields for the product of given id', function() {
            return product.updateProduct(new mongoose.Types.ObjectId(123456789),
                {price: 150, tva: 100});
        });
    });
});

describe('product', function() {
   describe('#removeProduct', function() {
         it('Should remove the product for the given id', function() {
            return product.removeProduct(new mongoose.Types.ObjectId(123456789)
            );
         });
   });
});

