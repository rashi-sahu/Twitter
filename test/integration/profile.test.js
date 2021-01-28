const login = require('../../controller/logIn');
const dbConnector = require('../../helper/testDbConnection');
const { mockRequest, mockResponse } = require('../utils/interceptor');

const createUserTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    Id serial PRIMARY KEY,
    emailId varchar(100) UNIQUE NOT NULL,
    password varchar(1000) NOT NULL,
    name varchar(100) NOT NULL,
    handle varchar(30) UNIQUE NOT NULL,
    dateOfBirth timestamptz,
    joinedOn timestamptz,
    description varchar(100),
    country varchar(100),
    state varchar(100),
    city varchar(100)
);
`;

// describe('Profile GET', () => {
//   test('should fetch a user from database', async () => {
//     const req = mockRequest();
//     req.body.email = 'blah';
//     req.body.password = 'blah';
//     const client = await dbConnector.connect();
//     req.app.dbClient = client;
//     await client.query(createUserTableQuery);
//     const insert = `INSERT INTO users(emailid, password, name, handle, joinedon)
//     VALUES('${req.body.email}','${req.body.password}','${req.body.email}','${req.body.email}',
//     current_timestamp);`;
//     await client.query(insert);
//     const res = mockResponse();
//     await login.logInUsers(req, res);

//     expect(res.redirect).toHaveBeenCalledTimes(1);
//     expect(res.redirect).toHaveBeenCalledWith('/blah');

//     // await client.query('drop table users;');
//     // client.end();
//   });
// });
