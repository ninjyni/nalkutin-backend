'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [{
      createdAt : new Date(),
      updatedAt : new Date(),
      title : 'imurointi'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Tasks', [{
      title :'imurointi'
    }])
  }
};
