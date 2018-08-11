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

app.post("");

module.exports = app;
