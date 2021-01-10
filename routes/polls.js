const express = require('express');
const router  = express.Router();

const query = `SELECT label, rank, submission_id as sub_id, polls.id as poll_id
FROM polls
JOIN submissions ON polls.id = submissions.poll_id
JOIN choices ON submissions.id = submission_id
WHERE creator_id = 1
ORDER BY submissions.id`


const bordaCount = (array) => {
  let max = array.map(obj => obj.rank).sort((a, b) => b - a)[0];
  let labelPoints = array.map(obj => {
    let result = {};
    result[obj.label] = max + 1 - obj.rank;
    return result;
  });
  labelPoints.unshift(array[0].sub_id);
  return labelPoints;
}

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(query)
    .then(data => {
      let rows = data.rows;
      console.log(rows.length)
      for (let i = 1 ; i <= rows[rows.length -1].sub_id ; i++) {
        if (rows[i]) {
          let thisSub = rows.filter((row) => row.sub_id === i)
          let labelPoint = bordaCount(thisSub);
          // lablePoint format, [submissions.id, {label1, x point} , {label2, y point}...]
          console.log (labelPoint);
        }
      };
      res.json(rows)

    })

      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

// {"command":"SELECT",
// "rowCount":1,
// "oid":null,
// "rows":[{"count":"2"}],
// "fields":[{"name":"count",
// "tableID":0,"columnID":0,"dataTypeID":20,"dataTypeSize":8,"dataTypeModifier":-1,"format":"text"}],
// "_parsers":[null],
// "rowAsArray":false}test,test test
