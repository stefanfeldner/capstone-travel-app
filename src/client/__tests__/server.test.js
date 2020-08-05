const app = require('../../server/server');
const supertest = require('supertest');
const request = supertest(app);

describe('Post endpoint', () => {
  it('/getData', async done => {
    const response = await request.get('/getData');
    expect(response.status).toBe(200);
    done();
  });
});