var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET tasks listing. */
router.get('/', function(req, res, next) {
  var Task = models.Task;

  Task.findAll()
    .then(function (tasks) {
      res.format({
        json: function(){
          res.json(tasks);
        },
        html: function(){
          res.render('tasks', {tasks});
        }
      });
    });
});

module.exports = router;
