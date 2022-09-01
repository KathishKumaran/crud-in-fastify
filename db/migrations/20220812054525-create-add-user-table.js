"use strict";
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.addColumn("Users", {
//       password: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       mark_as_signin: {
//         type: Sequelize.DATE,
//         allowNull: false,
//       },
//     });
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable("Users");
//   },
// };

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Users", "password", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("Users", "mark_as_signin", {
        type: Sequelize.DATE,
        allowNull: true,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Users", "password"),
      queryInterface.removeColumn("Users", "mark_as_signin"),
    ]);
  },
};
