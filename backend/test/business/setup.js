const mongoose = require('mongoose');
const models = require('../../business/models');

before(function() {
    mongoose.connect('mongodb://localhost/test');
    mongoose.Promise = global.Promise;

    let productTemp = new models.product({
        _id: new mongoose.Types.ObjectId('584ca77e78e2f724d8fea245'),
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

    let cartTemp = new models.cart({
        _id: new mongoose.Types.ObjectId('584ca77e78e2f724d8fea145'),
        products: [],
    });

    cartTemp.save().then().catch(function(error) {
        console.log(error);
    });
});
