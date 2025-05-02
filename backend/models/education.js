const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('education', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    institution_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    qualification: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    field_of_study: {
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
    currently_studying: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    location: {
      type: DataTypes.STRING(50),
      allowNull: true
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
    tableName: 'education',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "education_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
