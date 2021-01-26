const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'twitter',
  password: 'p',
  port: 5432,
});

exports.connect = async () => {
  await client.connect();
  return client;
};
