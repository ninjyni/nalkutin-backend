'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Tasks', 'last_completed', Sequelize.DATE);

    queryInterface.removeColumn('Tasks', 'createdAt');
    queryInterface.removeColumn('Tasks', 'updatedAt');
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Tasks', 'last_completed');

    queryInterface.addColumn('Tasks', 'createdAt');
    queryInterface.addColumn('Tasks', 'updatedAt');
  }
};
