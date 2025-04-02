const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('leetcode_badges', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    badge_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "leetcode_badges_badge_id_key"
    },
    badge_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    icon: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    icon_gif: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date_received: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'leetcode_badges',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "leetcode_badges_badge_id_key",
        unique: true,
        fields: [
          { name: "badge_id" },
        ]
      },
      {
        name: "leetcode_badges_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
