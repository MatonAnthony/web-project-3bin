
/*
 * Generate a set of fake user used by our API mocker (json-server)
 */
const faker = require('faker');
/*
 * Ask faker to give us a french like dataset
 */
faker.locale = 'fr';

/**
 * Generate a dataset of searchs
 * @param {Number} numberOfSearchs number of searchs to
 * generate in the dataset.
 * @return {Object} return a dataset full of searchs.
 */
function generateSearchs(numberOfSearchs) {
    let searchs = [];
    for(let i = 0; i < numberOfSearchs; i++) {
        let id = faker.random.number();
        let searchWords = faker.lorem.words();

        searchs.push({
            'id': id,
            'search': searchWords,
        });
    }

    return searchs;
}

module.exports = generateSearchs;
