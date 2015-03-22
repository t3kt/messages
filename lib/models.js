var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  _ = require('lodash');

var tokenField = {type: String, lowercase: true, trim: true},
  keyField = _.extend({}, tokenField, {required: true, unique: true, index: true}),
  dateField = {type: Date, default: Date.now};

var settingsSchema = Schema({});

var userSchema = Schema({
  username: keyField,
  password: String,
  salt: String,
  hash: String
});

var storageTypes = {
  twitter: 'twitter'
};

var fragmentSchema = Schema({
  text: String,
  storageType: _.extend({}, tokenField, {enum: Object.keys(storageTypes)}),
  storageKey: String,
  storageUrl: String,
  storageProperties: Schema.Types.Mixed
});

var messageSchema = Schema({
  key: keyField,
  title: String,
  messageOptions: Schema.Types.Mixed,
  fragments: [fragmentSchema],
  created: dateField,
  updated: dateField
});

_.extend(messageSchema.methods, {
  addFragment: function (textFragment) {
    console.log('adding fragment index: ', this.fragments.length, ' for text: ', textFragment);
    this.fragments.push({
      text: textFragment
    });
  },
  getTextFragments: function () {
    return _.map(this.fragments, _.property('text'));
  }
});

var Settings = mongoose.model('settings', settingsSchema),
  Message = mongoose.model('messages', messageSchema),
  User = mongoose.model('users', userSchema);

module.exports = {
  Message: Message,
  User: User,
  Settings: Settings,
  storageTypes: storageTypes
};
