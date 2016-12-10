let request = require('supertest');
request = request('http://localhost:3000');

describe('New cart route related', function() {
    it('Should return HTTP 200', function(done) {
        request.post('/carts/new')
            .send().expect(201, done());
    });
});

describe('Get cart route related', function() {
    it('Should return HTTP 200', function(done) {
        request.get('/carts')
            .send().expect(200, done());
    });

    it('Get with Id, should return HTTP 200', function(done) {
        request.post('/carts/584ca77e78e2f724d8fea145')
            .send().expect(200, done());
    });

    it('Should return HTTP 500', function(done) {
        request.post('/carts/1324679').send({}).expect(500, done());
    });
});

describe('Patch cart route related', function() {
    it('With product ID, should return HTTP 200', function(done) {
        request.patch('/carts/584ca77e78e2f724d8fea145/productId')
            .send({
               productId: '584ca77e78e2f724d8fea245',
               quantity: 70,
            }).expect(200, done());
    });

    it('With wrong productID, should return HTTP 417', function(done) {
       request.patch('/carts/584ca77e78e2f724d8fea145/productId')
           .send({
               productId: '123',
               quantity: 70,
           }).expect(417, done());
    });

    it('With product ean, Should return HTTP 200', function(done) {
       request.patch('/carts/584ca77e78e2f724d8fea145/ean').send({
           ean: '768501540',
           quantity: 12,
       }).expect(200, done());
    });

    it('With wrong cartId, should return HTTP 417', function(done) {
        request.patch('/carts/123/productId')
            .send({
                productId: '123',
                quantity: 70,
            }).expect(417, done());
    });
});

describe('Delete cart route related', function() {
    it('Should return HTTP 200', function(done) {
       request.delete('/carts/584ca77e78e2f724d8fea145').send()
           .expect(200, done());
    });

    it('With wrong cart id, Should return HTTP 500', function(done) {
        request.delete('/carts/123465').send()
            .expect(500, done());
    });
});
