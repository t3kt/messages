var Twitter = require('twitter'),
  config = require('../../config/config'),
  _ = require('lodash'),
  StorageBase = require('./index').StorageBase;

function TwitterStorage(message) {
  StorageBase.call(this, message);
  var opts = _.extend({}, message.messageOptions);
  this.client = new Twitter({
    consumer_key: opts.twitterConsumerKey,
    consumer_secret: opts.twitterConsumerSecret,
    access_token_key: opts.twitterAccessTokenKey,
    access_token_secret: opts.twitterAccessTokenSecret
  });
}
TwitterStorage.prototype = new StorageBase();
TwitterStorage.prototype.storeFragment = function (fragment, callback) {
  //...
};
TwitterStorage.prototype.storeMessage = function (callback) {
  //...
};

module.exports = TwitterStorage;
