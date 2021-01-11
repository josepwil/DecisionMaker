const bordaCount = (rows) => {
  let result = [];
  for (let i = 1; i <= rows[rows.length - 1].sub_id; i++) {
    let thisSub = rows.filter((row) => row.sub_id === i);
    for (let k = 0; k < thisSub.length; k++) {
      thisSub[k].point = thisSub.length + 1 - thisSub[k].rank;
    }
    result.push(thisSub);
  }
  return result;
};

module.exports = { bordaCount };
