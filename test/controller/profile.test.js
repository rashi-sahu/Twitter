const sinon = require('sinon');
const sinonTest = require('sinon-test');
const { mockRequest } = require('../utils/interceptor');
const profilePage = require('../../controller/profile.js');
const userModel = require('../../models/getTweets');

const sinontest = sinonTest(sinon);

describe('profile controller', () => {
  test('should render profile page if session exist', sinontest(async () => {
    const req = mockRequest();
    req.params.username = 'blah';
    req.session.user = { uname: 'blah' };
    req.app.dbClient = {};
    const res = {
      render: sinon.spy(),
      header: sinon.spy(),
    };
    const expectedResult = {
      rows: [{
        handle: 'blah',
      }],
    };
    const tweets = [{
      handle: 'blah',
    }];

    sinon.stub(userModel, 'getTweets').resolves({ error: null, result: expectedResult });
    await profilePage.profile(req, res);

    sinon.assert.calledWith(userModel.getTweets, {}, 'blah');
    sinon.assert.calledWith(res.render, 'profile', { name: 'blah', tweets });
    sinon.assert.calledWith(res.header, sinon.match('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'));
  }));

  test('should redirect to login page if session expired', sinontest(() => {
    const res = {
      redirect: sinon.spy(),
      header: sinon.spy(),
    };
    const req = mockRequest();
    req.params.username = 'blah';
    req.session.user = null;

    profilePage.profile(req, res);

    sinon.assert.calledWith(res.redirect, sinon.match('/logIn'));
    sinon.assert.calledWith(res.header, sinon.match('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'));
  }));
});
