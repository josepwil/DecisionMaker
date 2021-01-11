$(document).ready(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });



  const createNewPollForm = function() {
    const $markup = $(`
      <h3>Add A New Poll</h3>
      <form>
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
      <p>Results Link ${resultLink}</p>
      <p>Voter Link ${SubmissionLink}</p>
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
  $(document).on('submit', 'form', function(event) {
    event.preventDefault();
    console.log($(this).serialize());

    $.ajax({
      method: "POST",
      url: "/polls",
      data: $(this).serialize()
    })
      .done(function() {
        console.log('form posted');
        const $pollConfirmation = pollCreated('result link here', 'voter link here')
        $(".content-container").empty();
        $(".content-container").append($pollConfirmation);
      })
  })

});
