const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('leetcode_summary', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      unique: "leetcode_summary_date_key"
    },
    accepted_easy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    accepted_medium: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    accepted_hard: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    failed_easy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    failed_medium: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    failed_hard: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    untouched_easy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    untouched_medium: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    untouched_hard: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    beats_easy: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    beats_medium: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    beats_hard: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    ranking: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'leetcode_summary',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "leetcode_summary_date_key",
        unique: true,
        fields: [
          { name: "date" },
        ]
      },
      {
        name: "leetcode_summary_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
