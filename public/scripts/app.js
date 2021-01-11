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
          <label for="choice">Options:</label>
          <input type="text" id="choice" name="choice">
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


  $(".createPoll").on("click", function() {
    $.ajax({
      method: "GET",
      url: "/",
      dataType: "html"
    }).done((submissions) => {
      const $pollForm = createNewPollForm();
      $("body").append($pollForm);
    });
  })




  $(document).on('click','.addNewOption',function(){
    const $newInput = `
    <input type="text" id="choice" name="choice">
    `;
    $(".options").append($newInput);
  });

});
