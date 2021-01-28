const { mockRequest, mockResponse } = require('../utils/interceptor');
const logIn = require('../../controller/logIn.js');

describe('signUp controller', () => {
  test('should render log in page', () => {
    const req = mockRequest();
    const res = mockResponse();
    logIn.renderLoginPage(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('logIn', { message: '' });
  });

  test('should render sign up page', () => {
    const req = mockRequest();
    const res = mockResponse();
    logIn.redirect(req, res);

    expect(res.redirect).toHaveBeenCalledTimes(1);
    expect(res.redirect).toHaveBeenCalledWith('/logIn');
  });
});
