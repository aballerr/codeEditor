module.exports = (sequelize, Sequelize) => {
  let CodeFile = sequelize.define('codeFile', {
    filename: Sequelize.STRING,
    fileType: Sequelize.STRING,
    code: Sequelize.TEXT
  });


  return CodeFile;
};
