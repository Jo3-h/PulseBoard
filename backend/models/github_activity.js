const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "github_activity",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      event_id: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: "github_activity_event_id_key",
      },
      event_type: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      repo_owner: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      repo_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      repo_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_private: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      action: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      commit_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "github_activity",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "github_activity_event_id_key",
          unique: true,
          fields: [{ name: "event_id" }],
        },
        {
          name: "github_activity_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
