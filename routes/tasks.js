var models  = require('../models');
var express = require('express');
var router = express.Router();
var task = models.Task;

router.route('/')
.get(function(req, res, next) {
  task.findAll()
    .then(function (tasks) {
      res.format({
        json: function() {
          res.json(tasks);
        },
        html: function(){
          res.render('tasks', {tasks});
        }
      });
    });
})
.post(function (req, res) {
  task.create({
    title: req.body.title
  })
  .then(function (task) {
    res.json(task);
  });
});

module.exports = router;
