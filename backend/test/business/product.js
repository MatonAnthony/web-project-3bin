const assert = require('assert');
const product = rewire('../../business/product.js');

// Database configuration
const mongoose = require('mongoose');
mongoose.connect('mongodb://95.85.47.179/test');
mongoose.Promise = global.Promise;

describe('product', function() {
    describe('#register', function(done) {
       let futureProduct = {
           department: 'Alimentaire',
           productName: 'Moules',
           ean: '768501540',
           price: 12,
           tva: 3,
           category: 'others',
       };

       product.register(futureProduct).then(function() {
           done();
       }).catch(function(err) {
            assert.fail();
       });
    });
});
