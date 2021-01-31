const sinon = require('sinon');
const sinonTest = require('sinon-test');
const userModel = require('../../models/signUp');
const { mockRequest, mockResponse } = require('../utils/interceptor');
const signUp = require('../../controller/signUp.js');

const sinontest = sinonTest(sinon);

describe('signUp controller', () => {
  test('should render sign up page', () => {
    const req = mockRequest();
    const res = mockResponse();
    signUp.renderSignUpPage(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('signUp', { message: '' });
  });
});

describe('get user by signup', () => {
  afterEach(() => {
    userModel.addUser.restore();
  });

  test('should logIn user by checking in db', sinontest(() => {
    const res = {
      redirect: sinon.spy(),
    };
    const req = {
      body: {
        uname: 'blah',
      },
      app: {
        dbClient: {},
      },
      session: {},
    };
    sinon.stub(userModel, 'addUser').yields(null);
    signUp.addUsers(req, res);
    sinon.assert.calledWith(userModel.addUser, {}, sinon.match({ uname: 'blah' }));
    sinon.assert.calledWith(res.redirect, sinon.match('/blah'));
  }));

  test('should render signup page with error message if error occured in db', sinontest(() => {
    const res = {
      render: sinon.spy(),
    };
    const expectedError = new Error({ error: 'some error occured, try again' });
    const req = {
      body: {},
      app: {
        dbClient: {},
      },
    };
    sinon.stub(userModel, 'addUser').yields(expectedError);
    signUp.addUsers(req, res);
    sinon.assert.calledWith(userModel.addUser, {}, {});
    sinon.assert.calledWith(res.render, 'signUp', { message: 'some error occured, try again' });
  }));
});
