'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  

    const arrarrExistingUsers = await queryInterface.sequelize.query(
      `
        SELECT * FROM "users"
      `
    )
    .then(arr => Promise.resolve(arr || []));

    if(arrarrExistingUsers[0].length) return Promise.resolve();

    return queryInterface.bulkInsert('users', [{
      email: 'a@a.com',
      password: 'a'
    }]);

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
