const sum = require('./sum');
var request = require('request');

const fetchData = () => {
  return new Promise(function(resolve, reject){
    request('http://localhost:3000/user', (err, res, body) => {
      resolve(res);
    });
  });
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

describe('test the api endpoint', () => {
  test('it should reponse the test method', () => {
    expect(sum(3, 2)).toBe(5);
  });
  test('it should get data for the user', () => {
    fetchData().then(res => {
      expect(res.statusCode).toBe(200);
    })
  });
});