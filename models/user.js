'use strict';
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      notEmpty: true
    },
    password: {
      type: DataTypes.STRING,
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

  User.prototype.validPassword = function(password) {
    return bcrypt.compare(password, this.password);
  }
  User.beforeCreate(user => {
    return bcrypt.hash(user.password, bcrypt.genSaltSync(8))
      .then(hash => {
        user.password = hash;
      });
  })
  return User;
};
