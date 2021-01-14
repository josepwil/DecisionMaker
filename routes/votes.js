const express = require('express');
const router  = express.Router();
const { newVoteEmail } = require("../helper/helper");
const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({apiKey: process.env.API_KEY, domain: DOMAIN});


// access form to vote on a particular poll
module.exports = (db) => {
  router.get("/:poll_id", (req, res) => {
    const query = `
    SELECT title, option_name, description, options.id AS option_id, polls.id AS poll_id, name_required
    FROM polls
    JOIN options ON poll_id = polls.id
    WHERE polls.id = $1;
    `;
    db.query(query, [req.params.poll_id])
      .then(data => {
        const pollData = data.rows;
        const templateVars = { pollData };
        res.render("poll_vote", templateVars);
        console.log(templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:poll_id", (req, res) => {
    const pollId = req.params.poll_id;
    const submitterName = req.body.submitter_name;
    const rankArray = req.body.options_rank.split(',');

    // get the email of the poll creator
    db.query(`
    SELECT email FROM creators
    JOIN polls ON creator_id = creators.id
    WHERE polls.id = $1
    `, [pollId])
      .then(data => {
        const email = data.rows[0].email;
        const newVote = newVoteEmail(email, pollId);
        mg.messages().send(newVote, function(error, body) {
          console.log(body);
        })
      })

    // insert submission into submissions table
    const submissionsQuery = `
    INSERT INTO submissions (poll_id, submitter_name)
    VALUES ($1, $2)
    RETURNING id;
    `
    const votesQuery = `
    INSERT INTO votes (submission_id, option_id, rank)
    VALUES ($1, $2, $3)
    `
    db.query(submissionsQuery, [pollId, submitterName])
      .then(data => {
        const submissionId = data.rows[0].id;
        // using the submission id insert the votes
        for (let i = 0; i < rankArray.length; i++) {
          db.query(votesQuery, [submissionId, rankArray[i], i+1]);
        }
        res.render('vote_cast');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    })
    return router;
};
