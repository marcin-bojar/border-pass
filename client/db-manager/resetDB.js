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

    await usersCollection.deleteOne({ email: 'testing@test.pl' });
    await usersCollection.deleteOne({ email: 'new@test.pl' });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}
// run();

module.exports = run;
