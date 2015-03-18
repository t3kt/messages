var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  _ = require('lodash'),
  moment = require('moment');

var tokenField = {type: String, lowercase: true, trim: true},
  keyField = _.extend({}, tokenField, {required: true, unique: true}),
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

var messagePropertiesSchema = Schema({
  foo: {type: String}
});

var fragmentStorageSchema = Schema({
  type: _.extend({}, tokenField, {required: true, enum: Object.keys(storageTypes)}),
  key: {type: String},
  url: {type: String}
});

var fragmentSchema = Schema({
  key: keyField,
  title: {type: String},
  created: dateField,
  updated: dateField,
  text: {type: String},
  storage: fragmentStorageSchema
});

var messageSchema = Schema({
  key: keyField,
  title: {type: String},
  properties: messagePropertiesSchema,
  messages: [fragmentSchema],
  created: dateField,
  updated: dateField
});

var Settings = mongoose.Model('settings', settingsSchema),
  Message = mongoose.Model('messages', messageSchema),
  User = mongoose.Model('users', userSchema);

module.exports = {
  Message: Message,
  User: User,
  Settings: Settings,
  storageTypes: storageTypes
};
