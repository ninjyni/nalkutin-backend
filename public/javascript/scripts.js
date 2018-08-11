// Updates timestamp of task's last completion and PUTs in to server
function completeTask(taskId) {
  var time = new Date().toISOString();

  $.ajax({
    method: 'PUT',
    url: '/tasks/' + taskId,
    dataType: 'json',
    data: {id: taskId, lastCompleted: time}
  })
  //TODO any way to call prettyDate when rendering server-side pages?
  .done(function(data) {
    const cell = $("td").filter(function() {
      return $(this).text() == data.title
    });
    cell.next().text(prettyDate(data.lastCompleted));
  })
  .fail(function(err) {
    console.log('Error', err);
  });
};

function logout() {
  $.ajax({
    method: 'DELETE',
    url: '/login'
  })
  .done(function(data) {
    location.reload();
  })
};

// Update active link on navbar
$(document).ready(function() {
  $('li.active').removeClass('active');
  $('a[href="' + location.pathname + '"]').closest('li').addClass('active');
});

function prettyDate(dateString) {
  if (dateString) {
    var date = new Date(dateString);
    var d = date.getDate();
    var m = date.getMonth()+1;
    var y = date.getFullYear();
    return d+'.'+m+'.'+y;
  } else {
    return '-';
  }
}
