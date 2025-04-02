const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('experience', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
