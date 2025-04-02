const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('education', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
