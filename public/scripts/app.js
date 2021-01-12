$(document).ready(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });

  const createModal = function(content) {
    const $markup = `
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>${content}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    `;
    return $markup;
  }

  const renderGraph = function(obj) {
    console.log('~~~~ we make our graph here: ', obj)
    const $graph = `
    <div>
      <p>I am a graph for:</p>
      ${obj}
    </div>
    `
    $(".content-container").append($graph);
  };

  const specificPoll = function(pollObjs){
    let id = window.location.search.split('=');
    if(id[0] === '?id'){
      let pollID = id[id.length - 1]
      const specificGraph = {[pollID]: pollObjs[pollID]}
      console.log('specific graph ~~~~', specificGraph);
      const newModal = createModal(specificGraph);
      $(".content-container").append(newModal);
      $("#exampleModalCenter").modal('show');
    }
  }


  const allPolls = function(){
    $.ajax({
      method: "GET",
      url: "/polls"
    }).done(data => {
      $(".content-container").empty();
      const pollObjs = {}
      for (let obj of data) {
        const pollId = obj.poll_id;
        if(pollObjs[pollId]) {
          pollObjs[pollId].push(obj);
        } else {
          pollObjs[pollId] = [obj];
        }
      }
      for(let key in pollObjs) {
        renderGraph(key);
      }

      specificPoll(pollObjs);
    })
  };
  // call on page load
  allPolls();

  $(".allPolls").on("click", allPolls);






  const createNewPollForm = function() {
    const $markup = $(`
      <h3>Add A New Poll</h3>
      <form class="newPollForm">
        <label for="title">Poll Title:</label>
        <input type="text" id="title" name="title">
        <div class="options">
          <label for="choice">Option:</label>
          <input type="text" id="option" name="option">
          <label for="description">Description</label>
          <textarea id="description" name="description"></textarea>
          <p class="addNewOption">Add</p>
        </div>
        <label for="name_required">Voter Must Enter Name?</label>
        <input type="checkbox" id="name_required" name="name_required">
        <label for="render_as">Render Results as:</label>
        <select name="render_as" id="render_as">
          <option value="bar">Bar Chart</option>
          <option value="Pie">Pie Chart</option>
          <option value="Line">Line Chart</option>
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
      const $pollForm = createNewPollForm();
      $(".content-container").append($pollForm);
  });

  $(document).on('click','.addNewOption',function(){
    const $newInput = `
    <label for="choice">Option:</label>
    <input type="text" id="option" name="option">
    <label for="description">Description:</label>
    <textarea id="description" name="description"></textarea>
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
      const resultsLink = `http://localhost:8080/polls/${data}`
      const voteLink = `http://localhost:8080/polls/vote/${data}`
      const $pollConfirmation = pollCreated(resultsLink, voteLink);
      $(".content-container").empty();
      $(".content-container").append($pollConfirmation);
      })
  })
});
