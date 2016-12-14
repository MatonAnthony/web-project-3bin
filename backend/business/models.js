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
    isPreferred: Boolean,
});

const product = mongoose.model('Products', productSchema);

const userSchema = new Schema({
    pseudo: {type: String, unique: true},
    password: String,
    email: {type: String, unique: true},
    firstname: String,
    lastname: String,
    lastConnection: Date,
    accessCardId: {type: Number, unique: true},
    // TODO : Think about whether or not to manage permissions
});

const user = mongoose.model('Users', userSchema);

const paymentSchema = new Schema({
    amount: Number,
    moneyReceived: Number,
    change: Number,
});

const payment = mongoose.model('Payments', paymentSchema);

const salesSchema = new Schema({
    ticket: {type: Schema.Types.ObjectId, ref: 'Tickets'},
    payment: {type: Schema.Types.ObjectId, ref: 'Payments'},
    date: Date,
});

const sale = mongoose.model('Sales', salesSchema);

const ticketsSchema = new Schema({
    date: Date,
    seller: {type: Schema.Types.ObjectId, ref: 'Users'},
    cart: {type: Schema.Types.ObjectId, ref: 'Cart'},
    discount: Number,
    tax: Number,
    total: Number,
    payment: {type: Schema.Types.ObjectId, ref: 'Payments'},
});

const ticket = mongoose.model('Tickets', ticketsSchema);

const cartSchema = new Schema({
    products: [{
        product: {type: Schema.Types.ObjectId, ref: 'Products'},
        quantity: Number,
    }],
});

const cart = mongoose.model('Cart', cartSchema);

module.exports.product = product;
module.exports.user = user;
module.exports.payment = payment;
module.exports.sale = sale;
module.exports.ticket = ticket;
module.exports.cart = cart;
