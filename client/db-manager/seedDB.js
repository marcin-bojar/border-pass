const { MongoClient } = require('mongodb');
const uri = require('./connectionUri');

async function run() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db();
    const usersCollection = database.collection('users');

    const testUser = {
      name: 'Tester Name',
      email: 'testing@test.pl',
      password: '$2a$10$uIbgyIzRWnwzmafnGsY7tevsd5.B0Yk7EmUivSmT89SMIsp5O7UJK',
      company: {
        companyName: 'Tor',
        companyEmail: 'test@test.pl',
      },
      preferences: {
        showPlaces: true,
      },
      borders: [],
      countries: [
        { name: 'PL' },
        { name: 'CZ' },
        { name: 'SK' },
        { name: 'DE' },
        { name: 'HU' },
        { name: 'AT' },
        { name: 'NL' },
        { name: 'BE' },
        { name: 'LT' },
        { name: 'LV' },
      ],
      places: [],
    };

    const isUser = await usersCollection.findOne(testUser);

    if (!isUser) {
      await usersCollection.insertOne(testUser);
    }
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}
// run();

module.exports = run;
