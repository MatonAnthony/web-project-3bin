const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const productSchema = new Schema({
    department: String,
    productName: String,
    ean: Number,
    price: Number,
    tva: Number,
    category: String,
});

let product = mongoose.model('Products', productSchema);

modules.exports.product = product;
