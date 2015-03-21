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
  index: {type: Number, required: true},
  created: dateField,
  updated: dateField,
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
  getNextFragmentIndex: function () {
    if (!this.fragments || !this.fragments.length)
      return 0;
    return _.max(this.fragments, 'index').index + 1;
  },
  addFragment: function (textFragment) {
    var index = this.getNextFragmentIndex();
    console.log('adding fragment index: ', index, ' for text: ', textFragment);
    this.fragments.push({
      index: index,
      text: textFragment
    });
    return _.last(this.fragments);
  },
  getTextFragments: function () {
    return _.map(this.fragments, _.property('text'));
  },
  getCombinedText: function (separator) {
    return this.getTextFragments().join(separator || '\n');
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
