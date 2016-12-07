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
    // TODO : Think about whether or not to manage permissions
});

const user = mongoose.model('Users', userSchema);

const paymentSchema = new Schema({
    amount: Number,
    moneyReceived: Number,
    change: Number,
    transactionNumber: Number,
});

const payment = mongoose.model('Payments', paymentSchema);

const salesSchema = new Schema({
    ticket: {type: Schema.Types.ObjectId, ref: 'Tickets'},
    payment: {type: Schema.Types.ObjectId, ref: 'Payments'},
    date: Date,
});

const sell = mongoose.model('Sales', salesSchema);

const ticketsSchema = new Schema({
    date: Date,
    seller: {type: Schema.Types.ObjectId, ref: 'Users'},
    products: [
        {type: Schema.Types.ObjectId, ref: 'Products'},
    ],
    discount: Number,
    tax: Number,
    total: Number,
    payment: {type: Schema.Types.ObjectId, ref: 'Payments'},
});

const ticket = mongoose.model('Ticket', ticketsSchema);

const cashRegisterSchema = new Schema({
    payment: {type: Schema.Types.ObjectId, ref: 'Payments'},
    balance: Number,
});

const cashRegister = mongoose.model('CashRegister', cashRegisterSchema);

module.exports.product = product;
module.exports.user = user;
module.exports.payment = payment;
module.exports.sell = sell;
module.exports.ticket = ticket;
module.exports.cashRegister = cashRegister;
