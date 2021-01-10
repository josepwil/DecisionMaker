const express = require('express');
const router  = express.Router();

const query = `
SELECT title, option_name, description
FROM polls
JOIN
`

module.exports = (db) => {
  router.get("/polls/:id/vote", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
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
