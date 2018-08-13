const userRouter = require('../routes/user');
const express = require('express');
const request = require('supertest');

jest.mock('../models');

const initHugo = () => {
  const app = express();
  app.use('/user', userRouter);
  return app;
}

describe('GET /user', () => {
  test('It should fetch all users', async () => {
    const app = initHugo();
    const res = await request(app).get('/user');
    expect(res.body).toEqual({
      "createdAt": "2018-08-11",
      "email": "da@gmail.com",
      "id": 8,
      "name": "da",
      "password": "$2a$10$5Dx/1.SrUNsOpTCvTyvLCuxqqxVx.piqD5pMGVIPiNPp9UdDiB38O",
      "phone": 1231231122,
      "updatedAt": "2018-08-11"
    });
  });
});