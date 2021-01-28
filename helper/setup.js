const clientConnector = require('./databaseConnection');

const testDatabaseName = 'twitter_test';
const devDatabaseName = 'twitter_dev';

const createDBIfNotExist = async (client, databaseName) => {
  const result = await client.query('SELECT datname FROM pg_database;');
  const findCheck = !result.rows.find((i) => i.datname === databaseName);
  if (findCheck) {
    await client.query(`CREATE DATABASE ${databaseName}`);
    console.log(`successfully created ${databaseName}`);
  }
};

clientConnector.connect().then(async (dbClient) => {
  await createDBIfNotExist(dbClient, devDatabaseName);
  await createDBIfNotExist(dbClient, testDatabaseName);
  dbClient.end();
}).catch((err) => {
  console.log('error', err);
});
