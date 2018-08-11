const Promise = require('bluebird');
const express = require('express');
const sqlite = require('sqlite');


const app = express();
const port = process.env.PORT || 3000;
const dbPromise = Promise.resolve()
    .then(() => sqlite.open('./database.sqlite', { Promise }))
    .then(db => db.migrate({ force: 'last'}));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/get-question', async(req, res, next) => {
    try {
    const db = await dbPromise;
    const [post, categories] = await Promise.all([
      db.get('SELECT * FROM Post WHERE id = ?', req.params.id),
      db.all('SELECT * FROM Category')
    ]);
    res.render('post', { post, categories });
  } catch (err) {
    next(err);
  }
});

module.exports = app;
