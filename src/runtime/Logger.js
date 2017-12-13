/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

const createLogger = require('pino');

class Logger {
  constructor(quiet) {
    this.logger = createLogger({
      level: quiet ? 'error' : 'debug',
      prettyPrint: process.env.NODE_ENV !== 'production'
    });
  }

  log(tag, message) {
    this.logger.debug(tag + ': ' + message);
  }

  warning(tag, message, rawError) {
    if (rawError) {
      const error = rawError.backingJsObject || rawError;
      this.logger.warn(error, tag);
    } else {
      this.logger.warn(tag + ': ' + message);
    }
  }

  error(tag, message, rawError) {
    if (rawError) {
      const error = rawError.backingJsObject || rawError;
      this.logger.error(error, tag);
    } else {
      this.logger.error(tag + ': ' + message);
    }
  }
}

module.exports = Logger;
