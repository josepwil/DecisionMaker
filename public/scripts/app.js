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
<<<<<<< HEAD
          <label for="choice">Option:</label>
          <input type="text" id="option" name="option">
          <label for="description">Description</label>
          <textarea id="description" name="description"></textarea>
=======
          <label for="choice">Options:</label>
          <input type="text" id="option" name="option">
>>>>>>> master
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
<<<<<<< HEAD
    <label for="choice">Option:</label>
    <input type="text" id="option" name="option">
    <label for="description">Description:</label>
    <textarea id="description" name="description"></textarea>
=======
    <input type="text" id="options" name="option">
>>>>>>> master
    `;
    $(".options").append($newInput);
  });

  $(document).on('submit', 'form', function(event) {
    event.preventDefault();
    console.log($(this).serialize());

    $.ajax({
      method: "POST",
      url: "/polls",
      data: $(this).serialize()
    })
      .done(function() {
        console.log(data);
      })
  })

});
