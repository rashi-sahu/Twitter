const { mockRequest, mockResponse } = require('../utils/interceptor');
const logOut = require('../../controller/logOut.js');

describe('logOut controller', () => {
  test('should redirect to login page page', () => {
    const req = mockRequest();
    const res = mockResponse();
    logOut.logOutUsers(req, res);

    expect(res.redirect).toHaveBeenCalledTimes(1);
    expect(res.redirect).toHaveBeenCalledWith('/logIn');
  });
});
