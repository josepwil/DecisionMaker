const express = require("express");
const router = express.Router();
const { bordaCount, createEmail } = require("../helper/helper");
const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({apiKey: process.env.API_KEY, domain: DOMAIN});

const queryGet = `SELECT option_name as label, rank, submission_id as sub_id, polls.id as poll_id, submitter_name as name
FROM polls
JOIN submissions ON polls.id = submissions.poll_id
JOIN votes ON submissions.id = submission_id
JOIN options ON options.id = option_id
WHERE creator_id = 1
ORDER BY poll_id`;


const queryPost = `
INSERT INTO polls (creator_id, title, render_graph, name_required)
VALUES ($1, $2, $3, $4)
RETURNING *`

const queryOption = `
INSERT INTO options (poll_id, option_name, description)
VALUES ($1, $2, $3)
RETURNING *`
module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(queryGet)
      .then((data) => {
        let rows = data.rows;
        let dataArray = bordaCount(rows);
        console.log(dataArray);
        res.json(dataArray);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    let data = req.body
    let nameRequired;
    data.name_required? nameRequired = true : nameRequired = false
    let param = [1 /* CREATOR ID */,data.title, data.render_as, nameRequired]
    const creatorEmail = data.email;



    db.query(queryPost, param)
      .then(newPoll => {
        let poll = newPoll.rows;
        for(let i = 0; i < data.option.length; i++){
          let paramOption = [poll[0].id, data.option[i], data.description[i]]
          // adding return on line below fixes unhandled promise error but then does not do the insert query
          db.query(queryOption,paramOption)
          .then(option => {
            const pollId = option.rows[0].poll_id;
            const newEmail = createEmail(creatorEmail, pollId);
            // email the user with mailgun
            mg.messages().send(newEmail, function(error, body) {
              console.log(body);
            })
            res.json(pollId);
          })
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  })
  return router;

};

// {"command":"SELECT",
// "rowCount":1,
// "oid":null,
// "rows":[{"count":"2"}],
// "fields":[{"name":"count",
// "tableID":0,"columnID":0,"dataTypeID":20,"dataTypeSize":8,"dataTypeModifier":-1,"format":"text"}],
// "_parsers":[null],
// "rowAsArray":false}test,test tests

