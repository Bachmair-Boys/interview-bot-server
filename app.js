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

app.post('/get-count', (req, res) => {
    const db = new sqlite3.Database("interviewbot.db", (err) => {
        if(err) {
            console.log(err.message);
            res.send(JSON.stringify({status: DATABASE_CONNECTION_ERROR}));
        }
    });
    db.get("SELECT count(*) FROM question WHERE type_id = ?;", req.body.category, (err, number) => {
        if(err) {
            console.log(err.message);
            res.send(JSON.stringify({status: DATABASE_LOOKUP_ERROR}));
        } else {
            res.send(JSON.stringify({status: SUCCESS, count: number["count(*)"]}));
        }
    });
    db.close();
});

app.post('/get-question', (req, res) => {
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
            res.send(JSON.stringify({status: SUCCESS, question: questions[req.body.question].question}));
        }
    });
    statement.finalize();
    db.close();
});

app.post('/create-question', (req, res) => {
    const db = new sqlite3.Database("interviewbot.db", (err) => {
        if(err) {
            res.send(JSON.stringify({status: DATABASE_CONNECTION_ERROR}));
        }
    });
    
    let statement = db.prepare("INSERT INTO question(question,type_id) values(?,?);");
    statement.run(req.body.question, req.body.category, (err) => {
        if(err) {
            console.log(err.message);
            console.log(req.body.question + " " + req.body.category);
            res.send(JSON.stringify({status: DATABASE_LOOKUP_ERROR}));
        } else {
            res.send(JSON.stringify({status: SUCCESS}));
        }
    });
    statement.finalize();
    
    db.close();
});

app.get('/get-categories', (req, res) => {
    const db = new sqlite3.Database("interviewbot.db", (err) => {
        if(err) {
            res.send(JSON.stringify({status: DATABASE_CONNECTION_ERROR}));
        }
    });

    db.all("SELECT type FROM type;", (err, types) => {
        if(err) {
            console.log(err.message);
            res.send(JSON.stringify({status: DATABASE_LOOKUP_ERROR}));
        } else {
            res.send(JSON.stringify({status: SUCCESS, categories: types.map(el => el["type"])}));
        }
    });
    db.close();
})

app.get('/create-categories', (req, res) => {
    const db = new sqlite3.Database("interviewbot.db", (err) => {
        if(err) {
            res.send(JSON.stringify({status: DATABASE_CONNECTION_ERROR}));
        }
    });

    let statement = db.prepare("INSERT INTO question(question,type_id) values(?,?);");
    statement.run(req.body.category_name, (err) => {
        if(err) {
            console.log(err.message);
            res.send(JSON.stringify({status: DATABASE_LOOKUP_ERROR}));
        } else {
            res.send(JSON.stringify({status: SUCCESS}));
        }
    });
    statement.finalize();
    db.close();
})

module.exports = app;
