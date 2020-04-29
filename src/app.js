const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

const store = require('./store-data.js');

app.get('/apps', (req, res) => {
  const { sort } = req.query;
  
  const search = req.query.genres;

  let results = [...store];
  
  const validGenres = ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'];

  if (validGenres.indexOf(search) === -1) {
    res
      .status(400)
      .json({ error: 'Bad request: not a possible genre' });
  }

  if (!sort) {
    res
      .status(400)
      .json({error: 'Please sort by rating or app'})
  }

  if (search) {
    results = store.filter((item) =>
      item.Genres.toLowerCase().includes(search)
    );
  }

  if (sort) {
    results.sort((a, b) => {
      return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
    });
  } 

  res
    .status(200)
    .json(results);
});

module.exports = app; 

