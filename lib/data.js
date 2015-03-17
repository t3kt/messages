var mongoose = require('mongoose'),
  config = require('../config/config'),
  models = require('./models');

mongoose.connect(config.mongoUri);

exports.models = models;

var Message = models.Message,
  User = models.User,
  Settings = models.Settings,
  storageTypes = models.storageTypes;

exports.userExists = function (username, callback) {
  return User.count({username: username}, function (err, count) {
    if (err)
      callback(err);
    else
      callback(null, count !== 0);
  });
};

exports.getUser = function (username, callback) {
  return User.findOne({username: username}, callback);
};

exports.getSettings = function (callback) {
  return Settings.findOne({}, callback);
};

exports.getMessage = function (key, callback) {
  return Message.findOne({key: key}, callback);
};
