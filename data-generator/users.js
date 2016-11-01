/*
 * Generate a set of fake user used by our API mocker (json-server)
 */
var faker = require('faker');
/*
 * Ask faker to give us a french like dataset
 */
faker.locale = 'fr';

function generateUsers(numberOfUsers) {
    var users = [];
    for(let i = 0; i < numberOfUsers; i++) {
        let pseudo = faker.internet.userName();
        let password = faker.internet.password();
        let email = faker.internet.email();
        let firstname = faker.name.firstName();
        let lastname = faker.name.lastName();
        let lastConnection = faker.date.past();
        let permissions = [];

        users.push({
            "pseudo": pseudo,
            "password": password,
            "email": email,
            "firstname": firstname,
            "lastname": lastname,
            "lastConnection": lastConnection,
            "permissions" : permissions
        });
    }

    return users
}

module.exports = generateUsers;