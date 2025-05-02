const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('projects', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    project_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    project_url: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    frontend_tech_stack: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    backend_tech_stack: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    database_tech_stack: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    github_url: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    image_url: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'projects',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "projects_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
