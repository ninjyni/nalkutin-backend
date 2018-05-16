'use strict';

module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('task', {
    title: DataTypes.STRING,
    lastCompleted: DataTypes.DATE
  },
  {
    timestamps: false,
    underscored: true,
    freezeTableName: true
  });

  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};
