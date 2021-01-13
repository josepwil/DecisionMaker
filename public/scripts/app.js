$(document).ready(() => {
  // graph magic (hopefully)
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
        let title = ''
        let graphType = ''
        //for each vote
        for(let h = 0; h < pollData.length; h++){
          if (pollData[h].option_id === sortedOptId[b]){
            title = pollData[h].title;
            totalPoint += pollData[h].point;
            label = pollData[h].label;
            voteData += pollData[h].name + ':' + pollData[h].rank +',';
            graphType = pollData[h].render_graph
          }
        }
        voteData = voteData.split(',')
        voteData.pop();
        voteData = voteData.join(', ')
        let obj = {label, x, y : totalPoint, toolTipContent : voteData, poll_id, title, graphType}
        pollOpt.push (obj);
      }
      result.push(pollOpt);
    }
    return result;
  }

  ////////////////////////////////////////////////////////////

  const createGraph = function(graphType, graphDataPoints, anchor) {
    anchor.CanvasJSChart({ //Pass chart options
      backgroundColor: "#cad2de",
      title: {
        text: graphDataPoints[0].title
      },
      data: [
        {
          type: graphType, //change it to column, spline, line, pie, etc
          dataPoints: graphDataPoints
        }
      ]
    })
  };




  const createModal = function(graphTitle) {
    const $markup = `
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">${graphTitle}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div id="modalGraph" style="height: 360px; width: 100%;></div>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
    `;
    return $markup;
  }

  const specificPoll = function(pollObjs){
    let id = window.location.search.split('=');
    if(id[0] === '?id'){
      let pollID = id[id.length - 1]
      const specificGraph = pollObjs[pollID];
      let dataFromGraph = graphData(specificGraph).pop();

      const graphType = specificGraph[0].render_graph
      const graphTitle = specificGraph[0].title;
      const newModal = createModal(graphTitle);
      $(".content-container").append(newModal);
      $("#exampleModalCenter").modal('show');
      $('#exampleModalCenter').on('shown.bs.modal', function () {
        createGraph(graphType, dataFromGraph, $('#modalGraph'));
    });
    }
  }


<<<<<<< HEAD


=======
>>>>>>> master
  const allPolls = function(){
    $.ajax({
      method: "GET",
      url: "/polls"
    }).done(data => {
<<<<<<< HEAD
      //console.log('~~~~~graphData', graphData(data));
=======
>>>>>>> master
      $(".content-container").empty();
      $("#chartContainer").empty();       //if click on all poll mutiple times, no extra graph
      //squashing the graphs to the left
      const dataFromGraphs = graphData(data)
      let i = 1;
      for (let graph of dataFromGraphs) {
<<<<<<< HEAD
        let newDiv = `<div id="chartContainer${i}" class="graph" style="width:40%; height:300px;"></div>`
=======
        let newDiv = `<div id="chartContainer${i}" data-poll="${graph[0].poll_id}" class="graph" style="width:40%; height:300px;"></div>`
>>>>>>> master
        $("#chartContainer").append(newDiv);
        // createGraph('column', graph, $(`#chartContainer${i}`));
        createGraph(graph[0].graphType, graph, $(`#chartContainer${i}`));
        i++;
      }
      // data needed for specificPoll function
      const pollObjs = {}
      for (let obj of data) {
        const pollId = obj.poll_id;
        if(pollObjs[pollId]) {
          pollObjs[pollId].push(obj);
        } else {
          pollObjs[pollId] = [obj];
        }
      }
      specificPoll(pollObjs);
    })
  }
  // call on page load
  allPolls();
  // called on allpolls click (missing specific poll)
  $(".allPolls").on("click", function() {
    $.ajax({
      method: "GET",
      url: "/polls"
    }).done(data => {
      $(".content-container").empty();
      $("#chartContainer").empty();       //if click on all poll mutiple times, no extra graph
      //squashing the graphs to the left
      const dataFromGraphs = graphData(data)
      let i = 1;
      for (let graph of dataFromGraphs) {
        let newDiv = `<div id="chartContainer${i}" data-poll="${graph[0].poll_id}" class="graph" style="width:40%; height:300px;"></div>`
        $("#chartContainer").append(newDiv);
        // createGraph('column', graph, $(`#chartContainer${i}`));
        createGraph(graph[0].graphType, graph, $(`#chartContainer${i}`));
        i++;
      }
    })
  });

  // when a graph is clicked
  $(document).on("click", ".graph", function() {
    const pollid = $(this).data('poll');
    $.ajax({
      method: "GET",
      url: "/polls"
    }).done(data => {
      const targetPoll = data.filter(obj => obj.poll_id === pollid);
      let dataFromGraph = graphData(targetPoll).pop();
      const graphType = targetPoll[0].render_graph
      const graphTitle = targetPoll[0].title;
      const newModal = createModal(graphTitle);
      $(".content-container").append(newModal);
      $("#exampleModalCenter").modal('show');
      $('#exampleModalCenter').on('shown.bs.modal', function () {
        createGraph(graphType, dataFromGraph, $('#modalGraph'));
    });

    })


  })


  const createNewPollForm = function() {
    const $markup = $(`
    <form class="newPollForm">
    <h3>Add A New Poll</h3>
        <label for="title">Poll Title:</label>
        <input type="text" id="title" name="title">
        <div class="options">
        <div>
        <label for="choice">Option:</label>
        <input type="text" id="option" name="option">
        <label for="description">Description:</label>
        <textarea id="description" name="description"></textarea>
<<<<<<< HEAD
        </div>
        </div>
=======
        </div>
        </div>
>>>>>>> master
        <button type="button" class="addNewOption">Add</button>
        <label for="name_required">Voter Must Enter Name?</label>
        <input type="checkbox" id="name_required" name="name_required">
        <label for="render_as">Render Results as:</label>
        <select name="render_as" id="render_as">
          <option value="column">Bar Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="line">Line Chart</option>
        </select>
        <label for="email">Email Address:</label>
        <input type="text" id="email" name="email">
        <button>Create</button>
      </form>

    `)
    return $markup;
  }

  // poll created (with links)
  const pollCreated = function(resultLink, SubmissionLink) {
    const $markup = `
    <h3>Poll Created</h3>
    <div>
      <p>You will be notified via email whenever someone votes on your poll</p>
      <p>Results Link: <a href=${resultLink}>${resultLink}</a></p>
      <p>Voter Link:  <a href=${SubmissionLink}>${SubmissionLink}</a></p>
    </div>
    `
    return $markup;
  }

  // open new poll form
  $(".createPoll").on("click", function() {
      $(".content-container").empty();
      $("#chartContainer").empty();
      const $pollForm = createNewPollForm();
      $(".content-container").append($pollForm);
  });

  $(document).on('click','.addNewOption',function(){
    const $newInput = `
    <div>
    <label for="choice">Option:</label>
    <input type="text" id="option" name="option">
    <label for="description">Description:</label>
    <textarea id="description" name="description"></textarea>
    </div>
    `;
    $(".options").append($newInput);
  });

  // post the submitted form
  $(document).on('submit', '.newPollForm', function(event) {
    event.preventDefault();

    const userEmail = $(this).find("#email").val();

    $.ajax({
      method: "POST",
      url: "/polls",
      data: $(this).serialize()
    })
    .done(function(data) {
      const resultsLink = `http://localhost:8080/?id=${data}`
      const voteLink = `http://localhost:8080/polls/vote/${data}`
      const $pollConfirmation = pollCreated(resultsLink, voteLink);
      $(".content-container").empty();
      $(".content-container").append($pollConfirmation);
      })
  })

});
