const express = require('express');
const router  = express.Router();

const query = `SELECT option_name as label, rank, submission_id as sub_id, polls.id as poll_id, submitter_name as name
FROM polls
JOIN submissions ON polls.id = submissions.poll_id
JOIN votes ON submissions.id = submission_id
JOIN options ON options.id = option_id
WHERE creator_id = 1
ORDER BY poll_id`


const bordaCount = (array) => {
  for (let i = 0; i < array.length; i++){
    array[i].point = array.length + 1 - array[i].rank
  }
  return array;
}


// [ [  { label: 'apple', rank: 1, sub_id: 1, poll_id: 1, point: 3 },
//    { label: 'orange', rank: 3, sub_id: 1, poll_id: 1, point: 1 },
//      { label: 'banana', rank: 2, sub_id: 1, poll_id: 1, point: 2 } ],

//      [  { label: 'apple', rank: 3, sub_id: 2, poll_id: 1, point: 1 },
//     { label: 'orange', rank: 2, sub_id: 2, poll_id: 1, point: 2 },
//      { label: 'banana', rank: 1, sub_id: 2, poll_id: 1, point: 3 } ],

//      [  { label: 'apple', rank: 1, sub_id: 3, poll_id: 1, point: 3 },
//    { label: 'orange', rank: 2, sub_id: 3, poll_id: 1, point: 2 },
//    { label: 'banana', rank: 3, sub_id: 3, poll_id: 1, point: 1 } ],

//    [ { label: 'pizza', rank: 1, sub_id: 4, poll_id: 2, point: 4 },
//    { label: 'burger', rank: 2, sub_id: 4, poll_id: 2, point: 3 },
//    {
//       label: 'fried chicken',
//       rank: 4,
//       sub_id: 4,
//       poll_id: 2,
//       point: 1 },
//    { label: 'taco bell', rank: 3, sub_id: 4, poll_id: 2, point: 2 } ],

//    [ { label: 'pizza', rank: 4, sub_id: 5, poll_id: 2, point: 1 },
//    { label: 'burger', rank: 1, sub_id: 5, poll_id: 2, point: 4 },
//    {
//       label: 'fried chicken',
//       rank: 3,
//       sub_id: 5,
//       poll_id: 2,
//       point: 2 },
//    { label: 'taco bell', rank: 2, sub_id: 5, poll_id: 2, point: 3 } ],

//    [ { label: 'pizza', rank: 2, sub_id: 6, poll_id: 2, point: 3 },
//    { label: 'burger', rank: 4, sub_id: 6, poll_id: 2, point: 1 },
//    {
//       label: 'fried chicken',
//       rank: 1,
//       sub_id: 6,
//       poll_id: 2,
//       point: 4 },
//    { label: 'taco bell', rank: 3, sub_id: 6, poll_id: 2, point: 2 } ] ]








module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(query)
    .then(data => {
      let rows = data.rows;
      console.log(rows.length)
      let subArray = []
      for (let i = 1 ; i <= rows[rows.length -1].sub_id ; i++) {
        if (rows[i]) {
          let thisSub = rows.filter((row) => row.sub_id === i)
          let labelPoint = bordaCount(thisSub);
          subArray.push(labelPoint)
        }
      };

      console.log (subArray)
      res.json(rows)

    })

      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
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
