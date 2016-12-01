const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

//TODO Make it vary in function of the program config file
//mongodb://username:password@host:port/database?options...
mongoose.connect('mongodb://drago:password@95.85.47.179:27017/drago');

let productSchema= new Schema({
    department: String,
    productName: String,
    product: String,
    price: Number,
    tva: Number,
    category: String,
});

productSchema.methods.getDepartment= () => {
    return department;
};
productSchema.methods.getProductName= () => {
    return productName;
};
productSchema.methods.getProduct= () => {
    return product;
};
productSchema.methods.getPrice= () => {
    return price;
};
productSchema.methods.getTva= () => {
    return tva;
};
productSchema.methods.getCategory= () => {
    return category;
};

let productModel = mongoose.model('Products', productSchema);
/**
 * Functions added to the methods property of a schema get compiled
 * into the Model prototype and exposed on each document instance:
 */

let aProduct = new productModel({
    id: 17145,
    department: 'NewDepartement',
    productName: 'Awesome Wooden Sausages',
    product: 'Bacon',
    price: 902.00,
    tva: 90862,
    category: 'accusamus',
});

/**
 * Data sent to DB
 */
let promise = aProduct.save();

promise.then(function() {
    console.log('inserted');
}).catch(function(e) {
    console.log('Rejected and error is: \n' + e);
});

productModel.findOne({department: 'NewDepartement'}).then( (res) => {
    console.log(res);
}).catch( (error) => {
    console.log('error ' +error);
});

