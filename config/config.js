var _ = require('lodash');

var config = {
  cacheTimeout: 180000,
  mongoOptions: {},
  mongoUri: '',
  registrationAllowed: false,
  adminUser: null,
  adminPass: null,
  siteTitle: 'tekt',
  siteAuthor: 'tekt',
  defaultMessageOptions: {}
};

_.merge(config, {
  mongoUri: process.env.MONGOHQ_URL,
  adminUser: process.env.FORMAGE_ADMIN_USER,
  adminPass: process.env.FORMAGE_ADMIN_PASS
});

try
{
  _.merge(config, require('./config.private.json'));
}
catch (e)
{
  // do nothing
}

module.exports = config;