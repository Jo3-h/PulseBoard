var DataTypes = require("sequelize").DataTypes;
var _education = require("./education");
var _experience = require("./experience");
var _github_activity = require("./github_activity");
var _leetcode_activity = require("./leetcode_activity");
var _leetcode_badges = require("./leetcode_badges");
var _leetcode_calendar = require("./leetcode_calendar");
var _leetcode_summary = require("./leetcode_summary");
var _projects = require("./projects");
var _references = require("./references");
var _strava_activity = require("./strava_activity");

function initModels(sequelize) {
  var education = _education(sequelize, DataTypes);
  var experience = _experience(sequelize, DataTypes);
  var github_activity = _github_activity(sequelize, DataTypes);
  var leetcode_activity = _leetcode_activity(sequelize, DataTypes);
  var leetcode_badges = _leetcode_badges(sequelize, DataTypes);
  var leetcode_calendar = _leetcode_calendar(sequelize, DataTypes);
  var leetcode_summary = _leetcode_summary(sequelize, DataTypes);
  var projects = _projects(sequelize, DataTypes);
  var references = _references(sequelize, DataTypes);
  var strava_activity = _strava_activity(sequelize, DataTypes);


  return {
    education,
    experience,
    github_activity,
    leetcode_activity,
    leetcode_badges,
    leetcode_calendar,
    leetcode_summary,
    projects,
    references,
    strava_activity,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
