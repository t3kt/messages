var program = require('commander'),
  core = require('./lib/core'),
  _ = require('lodash');

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
          if (options.full) {
            console.log(message.inspect());
          } else if (options.showtext) {
            _.forEach(message.getTextFragments(), function (textFrag) {
              console.log('\t', textFrag);
            });
          }
        });
      }
      process.exit(0);
    });
  });

program.parse(process.argv);