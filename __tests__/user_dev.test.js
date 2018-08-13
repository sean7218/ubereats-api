var request = require('request');

const fetchData = () => {
  return new Promise(function(resolve, reject){
    request('http://localhost:3000/user', (err, res, body) => {
      resolve(res);
    });
  });
}

describe('test the api endpoint', () => {
  test('it should get data for the user', () => {
    fetchData().then(res => {
      expect(res.statusCode).toBe(200);
    })
  });
});