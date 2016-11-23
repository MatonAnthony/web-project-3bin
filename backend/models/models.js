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

const product = mongoose.model('Products', productSchema);

const userSchema = new Schema({
    pseudo: String,
    password: String,
    email: String,
    firstname: String,
    lastname: String,
    lastConnection: Date,
    accessCardId: Number,
    // TODO : Think about wether or not to manage permissions
});

const user = mongoose.model('Users', userSchema);

modules.exports.product = product;
modules.exports.user = user;

