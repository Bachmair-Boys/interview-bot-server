const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/get-count', (req, res) => {
    const db = new sqlite3.Database("./interviewbot.db");
    const number = db.get("SELECT count(*) FROM question");
    db.close();
    res.render({number});
});

app.get('/get-question', async (req, res, next) => {
    const db = new sqlite3.Database("./interviewbot.db");
    let statement = db.prepare(/*fill in sql statement with ? parameters*/);
    statement.run("SQL STATEMENT", (err, question) => {
        res.render({});
    });
    db.close();
});

app.get('/create-question', async(req, res, next) => {
    const db = new sqlite3.Database("./interviewbot.db");
    
    let statement = db.prepare(/*fill in sql statement with ? parameters for question type and question*/);
    statement.run(/*parameters should be question type and question*/);

    db.close();
});

module.exports = app;
