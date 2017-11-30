/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import pino = require('pino');

/**
 * @private
 */
class Logger {
  logger: pino.Logger;

  constructor(quiet: boolean) {
    this.logger = pino({
      level: quiet ? 'error' : 'debug',
      prettyPrint: process.env.NODE_ENV !== 'production'
    });
  }

  log(tag: string, message: string) {
    this.logger.debug(tag + ': ' + message);
  }

  warning(tag: string, message: string, rawError?: any) {
    if (rawError) {
      const error = rawError.backingJsObject || rawError;
      this.logger.warn(error, tag);
    } else {
      this.logger.warn(tag + ': ' + message);
    }
  }

  error(tag: string, message: string, rawError?: any) {
    if (rawError) {
      const error = rawError.backingJsObject || rawError;
      this.logger.error(error, tag);
    } else {
      this.logger.error(tag + ': ' + message);
    }
  }
}

export default Logger;
