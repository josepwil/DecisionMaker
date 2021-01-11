$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });


  // const createNewPollForm = function() {
  //   const markup = $(`
  //     <form>





  //     </form>
  //   `)
  // }


});
