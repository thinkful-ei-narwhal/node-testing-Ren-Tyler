const app = require('../src/app');
const { expect } = require('chai');
const supertest = require('supertest');

describe('GET apps', () => {
  it('should return 200 if no params included', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/);
  });
});