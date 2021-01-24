const signUp = require('../../controller/signUp.js');

test('adds 1 + 2 to equal 3', () => {
  expect(signUp.sum(1, 2)).toBe(3);
});
