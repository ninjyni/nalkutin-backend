'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.renameTable('Tasks', 'task');
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.renameTable('task', 'Tasks');
  }
};
