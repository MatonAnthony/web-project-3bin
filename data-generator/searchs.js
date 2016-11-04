
/*
 * Generate a set of fake user used by our API mocker (json-server)
 */
const faker = require('faker');
/*
 * Ask faker to give us a french like dataset
 */
faker.locale = 'fr';

function generateSearchs(numberOfSearchs) {
    let searchs = [];
    for(let i = 0; i < numberOfSearchs; i++) {
        let id = faker.random.number();
        let search_words = faker.lorem.words();

        searchs.push({
            'id': id,
            'search': search_words,
        });
    }

    return searchs;
}

module.exports = generateSearchs;
