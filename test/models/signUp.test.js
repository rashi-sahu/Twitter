const signUpModel = require('../../models/signUp.js');

const createRequestObject = () => {
  const req = {};
  req.email = 'blah';
  req.password = 'blah';
  req.name = 'blah';
  req.uname = 'blah';
  return req;
};

describe('signUp model', () => {
  test('should insert a new user', async () => {
    const client = {};
    const req = createRequestObject();
    const expectedResult = { foo: 'bar' };
    client.query = jest.fn(() => expectedResult);
    const cb = jest.fn();
    const expectedDBQuery = `INSERT INTO users(emailid, password, name, handle, joinedon) 
    VALUES('blah','blah','blah','blah', current_timestamp);`;
    await signUpModel.addUser(client, req, cb);
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(client.query).toHaveBeenCalledWith(expectedDBQuery);
    expect(cb).toHaveBeenCalledWith(null);
  });

  test('should return proper error if db query fails', async () => {
    const client = {};
    const req = createRequestObject();
    const expectedError = new Error('random error : blah');
    client.query = jest.fn(() => { throw expectedError; });
    const cb = jest.fn();
    const expectedDBQuery = `INSERT INTO users(emailid, password, name, handle, joinedon) 
    VALUES('blah','blah','blah','blah', current_timestamp);`;
    await signUpModel.addUser(client, req, cb);
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(client.query).toHaveBeenCalledWith(expectedDBQuery);
    expect(cb).toHaveBeenCalledWith(expectedError);
  });
});
