var express = require('express');
var router = express.Router();

/* GET tasks listing. */
router.get('/', function(req, res, next) {
  var json = [{title: 'imurointi'}];
  res.format({
    json: function(){
      res.json({title: 'imurointi'});
    },
    html: function(){
      res.render('tasks', { tasks: json });
    }
  });
});

module.exports = router;
