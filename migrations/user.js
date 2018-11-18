'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      fontSize: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '14px'
      },
      liveAutocomplete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      showGutter: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      hightlightActiveLine: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      showLineNumber: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      tabSpacing: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '2'
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};