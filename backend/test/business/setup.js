const mongoose = require('mongoose');
const models = require('../../business/models');

before(function() {
    mongoose.connect('mongodb://localhost/test');
    mongoose.Promise = global.Promise;

    let productTemp = new models.product({
        _id: new mongoose.Types.ObjectId(123456789),
        department: 'Alimentaire',
        productName: 'Moules',
        ean: '768501540',
        price: 12,
        tva: 3,
        category: 'others',
    });
    productTemp.save().then().catch(function(error) {
        console.log(error);
    });
});
