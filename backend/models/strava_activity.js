const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('strava_activity', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    activity_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "strava_activity_activity_id_key"
    },
    activity_type: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    distance_ms: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    duration_sec: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    elapsed_sec: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    average_pace: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    elevation_gain: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    map_polyline: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    start_lat: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    start_lon: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    end_lat: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    end_lon: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    kudos_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_private: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    calories: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    max_speed: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    achievement_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    comment_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    commute: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'strava_activity',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "strava_activity_activity_id_key",
        unique: true,
        fields: [
          { name: "activity_id" },
        ]
      },
      {
        name: "strava_activity_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
