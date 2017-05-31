const chalk = require('chalk');

function formatTime(date) {
  return chalk.gray(date.toISOString().substr(11, 12));
}

function formatLogLevel(level) {
  switch (level) {
    case 'd':
      return chalk.blue('[D]');

    case 'w':
      return chalk.yellow('[W]');

    case 'e':
      return chalk.red('[E]');

    default:
      return chalk.gray(`[${level.toUpperCase()}]`);
  }
}

function formatTag(tag) {
  return tag;
}

function formatMessage(message) {
  const colors = [
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan'
  ];

  return message.replace(/#(\d+)/g, (match, $1) => {
    const number = parseInt($1, 10);
    return chalk[colors[number % colors.length]]('#' + number);
  });
}

function log(tag, level, message) {
  const time = new Date();
  console.error(`${formatTime(time)}${formatLogLevel(level)} ${formatTag(tag)}: ${formatMessage(message)}`);
}

module.exports = log;
