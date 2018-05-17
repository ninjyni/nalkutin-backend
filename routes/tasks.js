var models  = require('../models');
var express = require('express');
var passport = require('passport');
require('../config/passport')(passport);
var router = express.Router();
var Task = models.task;

router.route('/')
.get(function(req, res, next) {
  Task.findAll()
    .then(function (tasks) {
      res.format({
        json: function() {
          res.json(tasks);
        },
        html: function() {
          res.render('tasks', {tasks});
        }
      });
    });
})
// Allow only authenticated users to post new tasks.
.post(passport.authenticate('jwt', {session: false}), function (req, res) {
  Task.create({
    title: req.body.title
  })
  .then(function (task) {
    res.status(201).json(task);
  }).catch(function(error) {
    res.status(400).json({success: false, message: 'Something went wrong'})
  });
});

module.exports = router;
