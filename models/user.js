'use strict';
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      notEmpty: true
    }
  },
  {
    timestamps: false,
    underscored: true,
    freezeTableName: true
  });

  User.associate = function(models) {
    // associations can be defined here
  };

  User.prototype.generateHash = function(password) {
    return bcrypt.hash(password, bcrypt.genSaltSync(8));
  }
  User.prototype.validPassword = function(password) {
    return bcrypt.compare(password, this.password);
  }
  return User;
};
