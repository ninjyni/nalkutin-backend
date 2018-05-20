// Updates timestamp of task's last completion and PUTs in to server
function completeTask(taskId) {
  var time = new Date().toISOString();

  $.ajax({
    method: "PUT",
    url: "/tasks",
    dataType: 'json',
    data: {id: taskId, lastCompleted: time}
  })
  //TODO update view/show error
  .done(function(data) {
      console.log('Data updated', data);
  })
  .fail(function(err) {
    console.log('Error', err);
  });
};

// Update active link on navbar
$(document).ready(function() {
  $('li.active').removeClass('active');
  $('a[href="' + location.pathname + '"]').closest('li').addClass('active');
});
