const Sequelize = require('sequelize');
const sequelize = new Sequelize('docker', 'docker', 'docker', {
  host: 'db',
  dialect: 'postgres',
  operatorsAliases: false
});


const codeFile = require('./codeFile')(sequelize, Sequelize);
const User = require('./user')(sequelize, Sequelize);


module.exports = {
  codeFile: codeFile,
  User: User
}