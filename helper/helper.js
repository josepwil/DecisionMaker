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
const newVoteEmail = (userEmail, pollId) => {
  return data = {
    from: "Mailgun Sandbox <postmaster@sandboxbfeeb2c2d36e4f3c8fc8d3c598dce193.mailgun.org>",
    to: userEmail,
    subject: "Someone voted on your poll!",
    text: `
    Hey there!

    Someone just voted your poll, check out the latest results here:
    http://localhost:8080/polls/${pollId}

    Share this link with your other friends so they can vote:
    http://localhost:8080/polls/vote/${pollId}
    `
  }
}

const graphData = (data) => {
  let result = [];
  //find number of polls
  let pollNum = [];
  for(let i = 0; i < data.length; i ++) {
    if (data[i].poll_id > pollNum) {
      pollNum = data[i].poll_id;
    }
  }
  //for each poll
  for(let pol = 1; pol <= pollNum; pol++){
    let options = []
    let pollData = []
    let pollOpt = []
    //for all data, count out options ID, and group data by poll
    for(let l = 0; l < data.length; l++){
      if (data[l].poll_id === pol) {
        pollData.push(data[l]);
        if(options.indexOf(data[l].option_id) === -1)
        options.push(data[l].option_id);
      }
    }
    //loop through data in one poll to work with each option
    let sortedOptId = options.sort((a, b) => a - b)
    //for each option
    for (let b = 0; b < sortedOptId.length; b ++){
      let totalPoint = 0;
      let label;
      let x = sortedOptId[b]
      let voteData = ''
      let poll_id = pol
      //for each vote
      for(let h = 0; h < pollData.length; h++){
        if (pollData[h].option_id === sortedOptId[b]){
          totalPoint += pollData[h].option_id;
          label = pollData[h].label;
          voteData += pollData[h].name + ':' + pollData[h].rank +',';
        }
      }
      voteData = voteData.split(',')
      voteData.pop();
      voteData = voteData.join(', ')
      let obj = {label, x, y : totalPoint, toolTipContent : voteData, poll_id}
      pollOpt.push (obj);
    }
    result.push(pollOpt);
  }
  return result;
}

module.exports = { bordaCount, createEmail, newVoteEmail };
