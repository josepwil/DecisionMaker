const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT rank, poll_id, choice_id, render_graph, submissions.id FROM polls
              JOIN submissions
              ON polls.id = poll_id
              WHERE creator_id = 1;`)
      .then(data => {
        const polls = data.rows[0];
        console.log(polls);
        const tempVar = { polls };
        res.render("polls", tempVar);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
