var mongoose = require('mongoose'),
  config = require('../config/config'),
  models = require('./models'),
  data = require('./data'),
  storage = require('./storage'),
  moment = require('moment'),
  _ = require('lodash'),
  async = require('async');

function addMessageFragment(message, textFragment, callback) {
  var fragment = message.addFragment(textFragment);
  callback(null, fragment);
}

function createMessage(key, textFragments, options, callback) {
  key = key || ('msg-' + moment().format('YYYY.MM.DD-HH.mm.ss'));
  options = _.extend({}, config.defaultMessageOptions, options);
  models.Message.create({key: key, messageOptions: options},
    function (err, message) {
      if (err)
        return callback(err, message);
      async.eachSeries(textFragments || [],
        function (textFragment, nextFragment) {
          addMessageFragment(message, textFragment, nextFragment);
        },
        function (err) {
          if (err)
            return callback(err, message);
          message.save(function (err) {
            if (err)
              return callback(err, message);
            //...
            callback(null, message);
          });
        });
    });
}

exports.createMessage = createMessage;
exports.getMessage = data.getMessage;
exports.getMessages = data.getMessages;

