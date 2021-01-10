const express = require('express');
const router  = express.Router();


// access form to vote on a particular poll
module.exports = (db) => {
  router.get("/:poll_id", (req, res) => {
    let query = `
    SELECT title, option_name, description
    FROM polls
    JOIN options ON poll_id = polls.id
    WHERE polls.id = ${req.params.poll_id};
    `;
    db.query(query)
      .then(data => {
        const pollData = data.rows;
        const templateVars = { pollData };
        console.log(pollData);

        res.render("poll_vote", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
