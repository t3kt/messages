var mongoose = require('mongoose'),
  config = require('../../config/config'),
  models = require('../models');

var types = {
  twitter: require('./twitterStorage')
};

function storeFragment(type, message, fragment, callback) {
  var t = types[type];
  if (!t) {
    callback('Storage type not recognized: "' + type + '"');
  } else {
    t.store(message, fragment, callback);
  }
}

module.exports = {
  types: types,
  storeFragment: storeFragment
};
