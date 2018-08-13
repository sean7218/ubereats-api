var request = require("request");

const fetchData = () => {
  return new Promise(function (resolve, reject) {
    request("http://localhost:3000/user", (err, res, body) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve({res: res, body: body});
    });
  });
};

describe("test the api endpoint", () => {
  test("it should get data for the user", () => {
    fetchData().then(obj => {
      expect(obj.res.statusCode).toBe(200);
    });
  });
});
