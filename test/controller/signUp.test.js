const { mockRequest, mockResponse } = require('../utils/interceptor');
const signUp = require('../../controller/signUp.js');

test('adds 1 + 2 to equal 3', () => {
  expect(signUp.sum(1, 2)).toBe(3);
});

describe('signUp controller', () => {
  test('should render profile page', () => {
    const req = mockRequest();
    req.params.username = 'blah';
    const res = mockResponse();
    signUp.profile(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('profile', { name: 'blah' });
  });
});
