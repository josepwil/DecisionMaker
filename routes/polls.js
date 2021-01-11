const express = require("express");
const router = express.Router();
const { bordaCount } = require("../helper/helper")
const query = `SELECT option_name as label, rank, submission_id as sub_id, polls.id as poll_id, submitter_name as name
FROM polls
JOIN submissions ON polls.id = submissions.poll_id
JOIN votes ON submissions.id = submission_id
JOIN options ON options.id = option_id
WHERE creator_id = 1
ORDER BY poll_id`;



module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(query)
      .then((data) => {
        let rows = data.rows;
        console.log(rows.length);
        let dataArray = bordaCount(rows);
        console.log(dataArray);
        res.json(dataArray);
      })

      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    console.log(req.body);
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
