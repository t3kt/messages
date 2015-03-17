var mongoose = require('mongoose'),
  config = require('../../config/config'),
  models = require('../models');

var types = module.exports.types = {
  twitter: require('./twitterStorage')
};
