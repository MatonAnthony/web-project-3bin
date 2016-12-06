const rewire = require('rewire');
const user = rewire('../../business/user.js');
const bcrypt = require('bcrypt');
const assert = require('assert');

// Database configuration
const mongoose = require('mongoose');

// process.env configuration due to issue to read config file
process.env.JWT_SECRET = 'JeSuisUneLicorne';
process.env.JWT_TOKEN_EXPIRATION = '24h';

// Note that due to the code behind this test to be synchronous, this test
// takes around 1/4 sec to run.
describe('user', function() {
    describe('#encryptPassword', function() {
        it('should return true if the two password are identical', function() {
            let unencrypted = 'password';
            let encryptPassword = user.__get__('encryptPassword');
            let encrypted = encryptPassword(unencrypted);

            assert.ok(bcrypt.compareSync(unencrypted, encrypted));
        });
    });
});

// Generic case for user#register
describe('user', function() {
    describe('#register', function(done) {
        it('should add a user to the database', function() {
            let futureUser = { 
                pseudo: 'glados',
                password: 'glad0s',
                email: 'glados@aperture.sciences',
                firstname: 'Aperture',
                lastname: 'Science',
                accessCardId: 0,
            };
            
            user.register(futureUser).then(function() {
                    done();
            }).catch(function(err) {
                assert.fail();
            });
        });
    });
});

// Generic case for user#login (with user/password)
describe('user', function() {
    describe('#login', function() {
        it('should return a valid JWT Token', function() {
            let pseudo = 'glados';
            let password = 'glad0s';
 
            return user.login(pseudo, password);
        });
    });
});
