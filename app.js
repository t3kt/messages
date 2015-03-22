var program = require('commander'),
  core = require('./lib/core'),
  _ = require('lodash'),
  util = require('util');

function dumpMessageDetails(message, options) {
  if (options.full) {
    console.log(message.inspect());
  } else if (options.showtext) {
    _.forEach(message.getTextFragments(), function (textFrag) {
      console.log('\t', textFrag);
    });
  }
}

program
  .command('list')
  .description('list messages in db')
  .option('-f, --full', 'output full message json')
  .option('-t, --showtext', 'show message text')
  .action(function (options) {
    console.log('Messages:');
    core.getMessages({}, function (err, messages) {
      if (err) {
        console.error('Error loading messages:', err);
        process.exit(1);
      } else if (!messages.length) {
        console.log('Found no messages');
        process.exit(0);
      } else {
        console.log('Found ' + messages.length + ' message(s):');
        _.forEach(messages, function (message, i) {
          console.log('[' + i + '] key: ' + message.key);
          dumpMessageDetails(message, options);
        });
      }
      process.exit(0);
    });
  });

program
  .command('dump <key>')
  .description('view a single message by key')
  .option('-f, --full', 'output full message json')
  .option('-t, --showtext', 'show message text')
  .action(function (key, options) {
    options = _.extend({showtext: true}, options);
    core.getMessage(key, function (err, message) {
      if (err) {
        console.error('Error loading message: ', err);
        process.exit(1);
      } else if (!message) {
        console.error('Message not found: ', key);
        process.exit(1);
      } else {
        if (!options.full)
          console.log('Found message: ', key);
        dumpMessageDetails(message, options);
        process.exit(0);
      }
    })
  });

program
  .command('create <message>')
  .description('create a new message and store it in the database')
  .option('-k, --key <key>', 'specify the unique message key')
  .option('-s, --separator', 'specify the text fragment separator')
  .action(function (messageText, options) {
    var textFragments = messageText.split(options.separator || '|');
    core.createMessage(options.key, textFragments, {}, function (err, message) {
      if (err) {
        console.error('Error creating message: ', err);
        process.exit(1);
      } else {
        console.log('Message created: ', message.key);
        dumpMessageDetails(message, {full: true});
        process.exit(0);
      }
    });
  });


program.parse(process.argv);