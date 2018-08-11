const express = require('express');

const Client = require('mariasql');

const DATABASE_HOST = '127.0.0.1';
const DATABASE_USER = 'root';
const DATABASE_PASSWORD = 'bachmair';
const DATABASE_NAME='pickup_game';
const USERS_TABLE_NAME = 'users';

const SUCCESS = 0;
const USER_REGISTRATION_ERROR = 101;
const DATABASE_LOOKUP_ERROR = 102;
const AUTHENTICATION_ERROR = 103;
const DATABASE_UPDATE_ERROR = 104;
const INVALID_TOKEN_ERROR = 105;

const app = express();


const db = new Client({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  db: DATABASE_NAME
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post();

module.exports = app;
