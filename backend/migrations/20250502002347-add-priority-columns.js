"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add 'priority' column to 'experience' table
    await queryInterface.addColumn("experience", "priority", {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    });

    // Add 'priority' column to 'education' table
    await queryInterface.addColumn("education", "priority", {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    });

    // Add 'priority' column to 'projects' table
    await queryInterface.addColumn("projects", "priority", {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove added columns
    await queryInterface.removeColumn("projects", "priority");
    await queryInterface.removeColumn("education", "priority");
    await queryInterface.removeColumn("experience", "priority");
  },
};
