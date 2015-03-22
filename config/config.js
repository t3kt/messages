var _ = require('lodash');

var config = {
  mongoOptions: {},
  mongoUri: '',
  defaultMessageOptions: {},
  twitterConsumerKey: null,
  twitterConsumerSecret: null,
  twitterAccessTokenKey: null,
  twitterAccessTokenSecret: null
};

_.merge(config, {
  mongoUri: process.env.MONGOHQ_URL
});

try {
  _.merge(config, require('./config.private.json'));
}
catch (e) {
  // do nothing
}

module.exports = config;