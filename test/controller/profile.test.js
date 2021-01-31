const { mockRequest, mockResponse } = require('../utils/interceptor');
const signUp = require('../../controller/profile.js');

describe('profile controller', () => {
  test('should render profile page if session exist', () => {
    const req = mockRequest();
    req.params.username = 'blah';
    req.session.user = { username: 'blah' };
    const res = mockResponse();
    signUp.profile(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('profile', { name: 'blah' });
  });

  test('should redirect to login page if session expired', () => {
    const req = mockRequest();
    req.params.username = 'blah';
    req.session.user = null;
    const res = mockResponse();
    signUp.profile(req, res);

    expect(res.redirect).toHaveBeenCalledTimes(1);
    expect(res.redirect).toHaveBeenCalledWith('/logIn');
  });
});
