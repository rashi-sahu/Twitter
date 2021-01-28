const { mockRequest, mockResponse } = require('../utils/interceptor');
const signUp = require('../../controller/signUp.js');

describe('signUp controller', () => {
  test('should render profile page', () => {
    const req = mockRequest();
    req.params.username = 'blah';
    const res = mockResponse();
    signUp.profile(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('profile', { name: 'blah' });
  });

  test('should render sign up page', () => {
    const req = mockRequest();
    const res = mockResponse();
    signUp.renderSignUpPage(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('signUp', { message: '' });
  });
});
