let request = require('supertest');
request = request('http://localhost:3000');

describe('New payment route', function() {
   it('Should return HTTP 200', function(done) {
        request.post('/payments/new') .send(
           {
               'amount': 100,
               'moneyReceived': 150,
               'change': 50,
               'transactionNumber': 42,
           }
        ).expect(200, done());
   });

    it('Should return HTTP 417', function(done) {
        request.post('/payments/new') .send(
            {
                'amount': 'LOL',
                'moneyReceived': 150,
                'change': 50,
                'transactionNumber': 42,
            }
        ).expect(417, done());
    });
});
