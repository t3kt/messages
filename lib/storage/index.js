var mongoose = require('mongoose'),
  config = require('../../config/config'),
  models = require('../models');

var types = {
  twitter: require('./twitterStorage')
};

function StorageBase(message) {
  this.message = message;
}
StorageBase.prototype = {
  storeFragment: function (fragment, callback) {
    callback("NOT IMPLEMENTED");
  },
  storeMessage: function (callback) {
    callback("NOT IMPLEMENTED");
  }
};

module.exports = {
  types: types,
  StorageBase: StorageBase,
  getStorage: function (type, message) {
    var t = types[type];
    if (!t) {
      callback('Storage type not recognized: "' + type + '"');
    } else {
      return new t(message);
    }
  }
};
