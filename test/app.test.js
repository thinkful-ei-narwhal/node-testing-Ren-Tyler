const app = require('../src/app');
const { expect } = require('chai');
const supertest = require('supertest');

describe('GET apps', () => {
  it('If not a valid genre, throw error', () => {
    return supertest(app)
      .get('/apps?genres=badgenre')
      .expect(400);
  });
  it('Should sort by rating', () => {
    return supertest(app)
      .get('/apps')
      .query({ genres: 'action', sort: 'Rating' })
      .expect(200)
      .then(res => {
        let i = 0;
        let sorted = true;
        while (sorted && i < res.length - 1) {
          if (res[i].Rating < res[i + 1].Rating) {
            sorted = false;
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });
  it('Should filter by genre', () => {
    return supertest(app)
      .get('/apps')
      .query({ genres: 'action', sort: 'Rating' })
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(6);
      });
  });
});