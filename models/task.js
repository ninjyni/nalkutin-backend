'use strict';
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    lastCompleted: DataTypes.DATE
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};
