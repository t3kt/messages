#!/usr/bin/env node
/*
 * messagetool.js : command line tool for storing/managing/querying messages
 * usage:
 *    messagetool.js create "this is a message fragment|this is a second fragment|etc" --sep "|" --config foo.json
 *    messagetool.js list --full
 *    messagetool.js dump <id>
 */

var realist = require('realist'),
  core = require('../lib/core'),
  _ = require('lodash'),
  util = require('util');

var options = {
  'separator': ['s', 'separator'],
  'config': ['c', 'config'],
  'full': ['full'],
  'showtext': ['showtext']
};

var commands = {
  // Show options, if name is given -> dump single option
  'showopt [option-name]': function (opt, name) {
    if (name) {
      console.log(opt[name]);
    } else {
      console.log(opt);
    }
  },
  'create <message>': function (opt, message) {
    var separator = opt['separator'] || '|';
    console.log('CREATE', 'message: ', message, 'opt: ', opt);
  },
  'list': function (opt) {
    console.log('Messages:');
    core.getMessages({}, function (err, messages) {
      if (err) {
        console.error('Error loading messages:', err);
        process.exit(1);
      } else {
        console.log('Found ' + messages.length + ' message(s):');
        _.forEach(messages, function (message, i) {
          console.log('[' + i + '] key: ' + message.key);
          if (opt.full) {
            console.log(message.inspect());
          } else if (opt.showtext) {
            _.forEach(message.getTextFragments(), function (textFrag) {
              console.log('\t', textFrag);
            });
          }
        });
      }
    });
    //...
  },
  'dump <key>': function (opt, key) {
    //...
  }
};

realist(commands, options);

