const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();

//defining constants for the different categories of questions
const BASIC = 0;
const BEHAVIORAL = 1;
const SALARY = 2;
const BRAINTEASER = 3;

//defining response codes
const SUCCESS = 0;
const DATABASE_CONNECTION_ERROR = 100;
const DATABASE_LOOKUP_ERROR = 101;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/get-count', (req, res) => {
    const db = new sqlite3.Database("interviewbot.db", (err) => {
        if(err) {
            console.log(err.message);
            res.send(JSON.stringify({status: DATABASE_CONNECTION_ERROR}));
        }
    });
    db.get("SELECT count(*) FROM question WHERE type_id = ?;", req.category, (err, number) => {
        if(err) {
            console.log(err.message);
            res.send(JSON.stringify({status: DATABASE_LOOKUP_ERROR}));
        } else {
            res.send(JSON.stringify({status: SUCCESS, count: number}));
        }
    });
    db.close();
});

app.get('/get-question', (req, res) => {
    const db = new sqlite3.Database("interviewbot.db", sqlite3.OPEN_READWRITE, (err) => {
        if(err) {
            console.log(err.message);
            res.send(JSON.stringify({status: DATABASE_CONNECTION_ERROR}));
        }
    });

    console.log(req);
    
    let statement = db.prepare("SELECT question FROM question WHERE type_id = ?;");
    statement.all(req.body.category, (err, questions) => {
        console.log(questions);
        if(err) {
            console.log(err.message);
            res.send(JSON.stringify({status: DATABASE_LOOKUP_ERROR}));
        } else {
            res.send(JSON.stringify({status: SUCCESS, question: questions[req.body.question]}));
        }
    });
    statement.finalize();
    db.close();
});

app.get('/create-question', (req, res) => {
    const db = new sqlite3.Database("interviewbot.db", (err) => {
        if(err) {
            res.send(JSON.stringify({status: DATABASE_CONNECTION_ERROR}));
        }
    });
    
    let statement = db.prepare("INSERT INTO question(question,type_id) values(?,?);");
    statement.run(req.body.question, req.body.category, (err) => {
        if(err) {
            res.send(JSON.stringify({status: DATABASE_LOOKUP_ERROR}));
        } else {
            res.send(JSON.stringify({status: SUCCESS}));
        }
    });
    statement.finalize();
    
    db.close();
});

module.exports = app;
