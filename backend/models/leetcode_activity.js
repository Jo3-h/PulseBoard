const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "leetcode_activity",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      event_id: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: "leetcode_activity_event_id_key",
      },
      event_type: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      problem_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      problem_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      problem_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      difficulty: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      solution_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      solution_content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      solution_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      topics: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      total_accepted: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      total_submissions: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      total_accepted_ratio: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      hits: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dislikes: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "leetcode_activity",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "leetcode_activity_event_id_key",
          unique: true,
          fields: [{ name: "event_id" }],
        },
        {
          name: "leetcode_activity_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
