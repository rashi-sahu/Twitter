const logInModel = require('../../models/logIn.js');

describe('logIn model', () => {
  test('should check in database if user exist with given email', async () => {
    const client = {};
    const expectedResult = { foo: 'bar' };
    client.query = jest.fn(() => expectedResult);
    const cb = jest.fn();
    const expectedDBQuery = 'select * from users where emailid = \'blah\' and password = \'blah\'';
    await logInModel.getUser(client, 'blah', 'blah', cb);
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(client.query).toHaveBeenCalledWith(expectedDBQuery);
    expect(cb).toHaveBeenCalledWith(null, expectedResult);
  });

  test('should return proper error if db query fails', async () => {
    const client = {};
    const expectedError = new Error('random error : blah');
    client.query = jest.fn(() => { throw expectedError; });
    const cb = jest.fn();
    const expectedDBQuery = 'select * from users where emailid = \'blah\' and password = \'blah\'';
    await logInModel.getUser(client, 'blah', 'blah', cb);
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(client.query).toHaveBeenCalledWith(expectedDBQuery);
    expect(cb).toHaveBeenCalledWith(expectedError, null);
  });
});
