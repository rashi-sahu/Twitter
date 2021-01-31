const sinon = require('sinon');
const sinonTest = require('sinon-test');
const userModel = require('../../models/logIn');
const { mockRequest, mockResponse } = require('../utils/interceptor');
const logIn = require('../../controller/logIn.js');

const sinontest = sinonTest(sinon);

describe('logIn controller', () => {
  test('should render log in page', () => {
    const req = mockRequest();
    const res = mockResponse();
    logIn.renderLoginPage(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('logIn', { message: '' });
  });

  test('should redirect to login page', () => {
    const req = mockRequest();
    const res = mockResponse();
    logIn.redirect(req, res);

    expect(res.redirect).toHaveBeenCalledTimes(1);
    expect(res.redirect).toHaveBeenCalledWith('/logIn');
  });
});

describe('get user by login', () => {
  afterEach(() => {
    userModel.getUser.restore();
  });

  test('should logIn user by checking in db', sinontest(() => {
    const res = {
      redirect: sinon.spy(),
    };
    const expectedResult = {
      rowCount: 1,
      rows: [{
        handle: 'blah',
      }],
    };
    const req = {
      body: {
        email: 'foo',
        password: 'bar',
      },
      app: {
        dbClient: {},
      },
      session: {},
    };
    sinon.stub(userModel, 'getUser').yields(null, expectedResult);
    logIn.logInUsers(req, res);
    sinon.assert.calledWith(userModel.getUser, {}, 'foo', 'bar');
    sinon.assert.calledWith(res.redirect, sinon.match('/blah'));
  }));

  test('should render login page with error message if user does not exist', sinontest(() => {
    const res = {
      render: sinon.spy(),
    };
    const expectedResult = {
      rowCount: 0,
      rows: [],
    };
    const req = {
      body: {
        email: 'foo',
        password: 'bar',
      },
      app: {
        dbClient: {},
      },
    };
    sinon.stub(userModel, 'getUser').yields(null, expectedResult);
    logIn.logInUsers(req, res);
    sinon.assert.calledWith(userModel.getUser, {}, 'foo', 'bar');
    sinon.assert.calledWith(res.render, 'logIn', { message: 'Email or Password is incorrect' });
  }));

  test('should render login page with error message if error occured in db', sinontest(() => {
    const res = {
      render: sinon.spy(),
    };
    const expectedError = new Error({ error: 'Error Occured in database' });
    const req = {
      body: {
        email: 'foo',
        password: 'bar',
      },
      app: {
        dbClient: {},
      },
    };
    sinon.stub(userModel, 'getUser').yields(expectedError, null);
    logIn.logInUsers(req, res);
    sinon.assert.calledWith(userModel.getUser, {}, 'foo', 'bar');
    sinon.assert.calledWith(res.render, 'logIn', { message: 'Error Occured in database' });
  }));
});
