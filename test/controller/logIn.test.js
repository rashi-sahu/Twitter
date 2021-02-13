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

  test('should redirect to profile page if already logged in', () => {
    const req = mockRequest();
    req.session.user = { uname: 'blah' };
    const res = mockResponse();
    logIn.renderLoginPage(req, res);

    expect(res.redirect).toHaveBeenCalledTimes(1);
    expect(res.redirect).toHaveBeenCalledWith('/blah');
  });

  test('should redirect to login page', () => {
    const res = mockResponse();
    const req = {
      session: { user: { uname: 'foo' } },
    };
    logIn.redirect(req, res);

    expect(res.redirect).toHaveBeenCalledTimes(1);
    expect(res.redirect).toHaveBeenCalledWith('/foo');
  });

  test('should redirect to login page', () => {
    const req = mockRequest();
    const res = mockResponse();
    logIn.redirect(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('logIn', { message: '' });
  });
});

describe('get user by login', () => {
  afterEach(() => {
    userModel.getUser.restore();
  });

  test('should logIn user by checking in db', sinontest(() => {
    const res = {
      redirect: sinon.spy(),
      header: sinon.spy(),
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
    sinon.assert.calledWith(res.header, sinon.match('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'));
  }));

  test('should render login page with error message if user does not exist', sinontest(() => {
    const res = {
      render: sinon.spy(),
      header: sinon.spy(),
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
    sinon.assert.calledWith(res.header, sinon.match('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'));
  }));

  test('should render login page with error message if error occured in db', sinontest(() => {
    const res = {
      render: sinon.spy(),
      header: sinon.spy(),
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
    sinon.assert.calledWith(res.header, sinon.match('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'));
  }));
});
