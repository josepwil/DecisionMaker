const express = require('express');
const router  = express.Router();


// access form to vote on a particular poll
module.exports = (db) => {
  router.get("/:pollId", (req, res) => {
    res.send('being hit');
    console.log('req param is: ', req.params.pollId);
    let query = `
    SELECT title, option_name, description
    FROM polls
    JOIN options ON poll_id = polls.d
    WHERE polls.id = ${req.params.poll_id};
    `;
    db.query(query)
      .then(data => {
        const users = data.rows;
        console.log(data.rows)
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
