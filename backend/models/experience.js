const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('experience', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    company_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    job_title: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    current_position: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'experience',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "experience_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
