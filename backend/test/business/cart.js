const cart = require('../../business/cart');
const mongoose = require('mongoose');

describe('cart', function() {
    describe('#newCart', function() {
        it('should add a cart to the database', function() {
            return cart.newCart();
        });
    });
});

describe('cart', function() {
    describe('#getAllCarts', function() {
        it('should get all the carts stored in the database', function() {
            return cart.getAllCarts();
        });
    });
});

describe('cart', function() {
    describe('#updateCart', function() {
        it('should update the fields for the cart of given id', function() {
            return cart.updateCart(new mongoose.Types.ObjectId(1234567890),
                {products: [
                    {
                        product: new mongoose.Types.ObjectId(3),
                    },
                    {
                        product: new mongoose.Types.ObjectId(4),
                    },
                ],
                });
        });
    });
});

describe('cart', function() {
    describe('#removeCart', function() {
        it('Should remove the cart for the given id', function() {
            return cart.removeCart(new mongoose.Types.ObjectId(1234567890));
        });
    });
});
