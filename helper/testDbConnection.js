const { Client } = require('pg');

const client = new Client({
  user: process.env.POSTGRES_TEST_USER,
  host: process.env.POSTGRES_TEST_HOST,
  database: process.env.POSTGRES_TEST_DATABASE,
  password: process.env.POSTGRES_TEST_PASSWORD,
  port: process.env.POSTGRES_TEST_PORT,
});

exports.connect = async () => {
  await client.connect();
  return client;
};
