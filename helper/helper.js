


const bordaCount = (rows) => {
  let result = [];
  for (let i = 1; i <= rows[rows.length - 1].sub_id; i++) {
    let thisSub = rows.filter((row) => row.sub_id === i);
    for (let k = 0; k < thisSub.length; k++) {
      thisSub[k].point = thisSub.length + 1 - thisSub[k].rank;
      result.push(thisSub[k]);
    }
  }
  return result;
};

const createEmail = (userEmail, pollId) => {
  return data = {
    from: "Mailgun Sandbox <postmaster@sandboxbfeeb2c2d36e4f3c8fc8d3c598dce193.mailgun.org>",
    to: userEmail,
    subject: "Your new poll was created",
    text: `
    Congrats, your new poll was created!

    Share this link with your friends so they can vote:
    http://localhost:8080/polls/vote/${pollId}

    Check out the results here:
    http://localhost:8080/polls/${pollId}
    `
  }
}

module.exports = { bordaCount, createEmail };
