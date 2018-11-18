module.exports = (sequelize, Sequelize) => {

  const User = sequelize.define('user', {
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
    }
  });

  return User;
};
