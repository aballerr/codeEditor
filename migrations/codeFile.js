'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('codeFiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      filename: Sequelize.STRING,
      fileType: Sequelize.STRING,
      code: Sequelize.TEXT,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('codeFiles');
  }
};