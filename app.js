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
    let statement = db.prepare("SELECT question FROM question WHERE type_id = ?");
    statement.run("SQL STATEMENT", (err, question) => {
        res.render({});
    });
    db.close();
});

app.get('/create-question', async(req, res, next) => {
    const db = new sqlite3.Database("./interviewbot.db");
    
    let statement = db.prepare("INSERT INTO question(question,type_id) values(?,?)");
    statement.run(/*parameters should be question type and question*/);
    
    /* Basic = 0, Behavioral = 1, Salary = 2, Brainteaser = 3 */

    db.close();
});

module.exports = app;
