const getTweet = require('../../models/getTweets.js');

describe('logIn model', () => {
  test('should check in database if user exist with given email', async () => {
    const client = {};
    const expectedResult = { foo: 'bar' };
    client.query = jest.fn(() => expectedResult);
    const expectedDBQuery = 'select t.description from tweets t inner join users u on u.id = t.createdby where u.emailid = \'blah\';';
    const res = await getTweet.getTweets(client, 'blah');
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(client.query).toHaveBeenCalledWith(expectedDBQuery);
    expect(res.result).not.toBeNull();
    expect(res.error).toBeNull();
  });

  test('should return proper error if db query fails', async () => {
    const client = {};
    const expectedError = new Error('random error : blah');
    client.query = jest.fn(() => { throw expectedError; });
    const expectedDBQuery = 'select t.description from tweets t inner join users u on u.id = t.createdby where u.emailid = \'blah\';';
    const res = await getTweet.getTweets(client, 'blah');
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(client.query).toHaveBeenCalledWith(expectedDBQuery);
    expect(res.error).not.toBeNull();
    expect(res.result).toBeNull();
  });
});
