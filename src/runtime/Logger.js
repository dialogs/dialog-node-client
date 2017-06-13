/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

const createLogger = require('pino');

class Logger {
  constructor() {
    this.logger = createLogger({
      level: 'debug',
      prettyPrint: process.env.NODE_ENV !== 'production'
    });
  }

  log(tag, message) {
    this.logger.debug(tag + ' ' + message);
  }

  warning(tag, message, error) {
    if (error) {
      this.logger.warn(error, tag);
    } else {
      this.logger.warn(tag + ' ' + message);
    }
  }

  error(tag, message, error) {
    if (error) {
      this.logger.error(error, tag);
    } else {
      this.logger.error(tag + ' ' + message);
    }
  }
}

module.exports = Logger;
