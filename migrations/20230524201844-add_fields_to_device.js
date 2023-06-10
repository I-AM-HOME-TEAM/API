'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('devices', 'mpn', {
      type: DataTypes.STRING,
      allowNull: false
    });

    await queryInterface.addIndex('devices', {
      fields: ['user_id'], name: 'user_id_index', using: "BTREE"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('devices', 'mpn');
    await queryInterface.removeIndex('devices', 'user_id_index');
  }
};
