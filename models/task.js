'use strict';

module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define(
    'task',
    {
      title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        notEmpty: true
      },
      lastCompleted: {
        type: DataTypes.DATE,
        field: 'last_completed'
      }
    },
    {
      timestamps: false,
      underscored: true,
      freezeTableName: true
    }
  );

  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};
