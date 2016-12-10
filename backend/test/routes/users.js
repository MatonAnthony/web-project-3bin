let request = require('supertest');
request = request('http://localhost:3000');

describe('Registration route related', function() {
    it('Should return HTTP 200', function(done) {
        request.post('/register')
            .send({
                pseudo: 'Glados',
                password: 'Glad0s',
                email: 'aperture@sciences.gov',
                firstname: 'Aperture',
                secondName: 'Sciences',
                accessCardId: '101010',
            }).expect(200, done());
    });

    it('Should return HTTP 417', function(done) { 
        request.post('/register')
            .send({})
            .expect(417, done());
    });
});

describe('Login route related', function() {
    it('Should return HTTP 200', function(done) {
        request.post('/login')
            .send({
                pseudo: 'Glados',
                passowrd: 'Glad0s',
            }).expect(200, done());
    });

    it('Auth with card, should return HTTP 200', function(done) {
        request.post('/login')
            .send({
                pseudo: '101010',
            }).expect(200, done());
    });

    it('Should return HTTP 403', function(done) {
        request.post('/login')
            .send({})
            .expect(403, done());
    });
});
