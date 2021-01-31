const sinon = require('sinon');
const sinonTest = require('sinon-test');
const { mockRequest } = require('../utils/interceptor');
const logOut = require('../../controller/logOut.js');

const sinontest = sinonTest(sinon);

describe('logOut controller', () => {
  test('should redirect to login page', sinontest(() => {
    const req = mockRequest();
    const res = {
      redirect: sinon.spy(),
    };

    sinon.stub(req.session, 'destroy').yields();
    logOut.logOutUsers(req, res);

    sinon.assert.calledWith(req.session.destroy);
    sinon.assert.calledWith(res.redirect, sinon.match('/logIn'));
  }));
});
