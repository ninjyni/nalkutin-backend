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
          res.render('tasks', {tasks: tasks, title: 'Tasks'});
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
    res.format({
      json: function() {
        res.status(201).json(task);
      },
      html: function() {
        res.redirect('/tasks');
      }
    });
  }).catch(function(error) {
    res.status(400).json({message: 'Something went wrong'})
  });
})
//TODO separate create/update, depending on whether existing task is found
.put(function (req, res) {
  Task.update(req.body, {where: {id: req.body.id}})
  .then(function (task) {
    res.status(200).json(task);
  }).catch(function(error) {
    res.status(400).json({message: 'Something went wrong'})
  });
});

module.exports = router;
