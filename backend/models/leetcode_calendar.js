const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('leetcode_calendar', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      unique: "leetcode_calendar_date_key"
    },
    events: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'leetcode_calendar',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "leetcode_calendar_date_key",
        unique: true,
        fields: [
          { name: "date" },
        ]
      },
      {
        name: "leetcode_calendar_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
