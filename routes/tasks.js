var models  = require('../models');
var express = require('express');
var passport = require('passport');
require('../config/passport')(passport);
var router = express.Router();
var Task = models.task;

router.route('/')
.get(function(req, res, next) {
  Task.findAll({
    order: [
      ['lastCompleted', 'ASC'],
    ]
  })
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
    res.status(400).json(error.errors);
  });
});

router.route('/:id')
.put(function (req, res) {
  Task.update(req.body, {
    where: {
      id: req.body.id
    },
    returning: true,
    plain: true
  })
  // Extract the updated object from result of update
  .then(function ([affectedRows, updatedTask]) {
    res.status(200).json(updatedTask.dataValues);
  }).catch(function(error) {
    res.status(400).json({message: 'Something went wrong'})
  });
})
// Allow only authenticated users to delete tasks.
.delete(passport.authenticate('jwt', {session: false}), function (req, res) {
  Task.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(function () {
    res.sendStatus(200);
  }).catch(function(error) {
    res.status(500).json({message: 'Something went wrong'})
  });
});

module.exports = router;
