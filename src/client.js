/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

const pino = require('pino');
const patchScope = require('./patch-scope');
const Logger = require('./runtime/Logger');
const AsyncStorage = require('./runtime/AsyncStorage');

function createClient({ endpoints, quiet }) {
  patchScope();
  const createCore = require('@dlghq/dialog-java-core');

  return new Promise((resolve) => {
    createCore({
      endpoints,
      logger: quiet ? null: new Logger(),
      asyncStorage: new AsyncStorage(window.localStorage),
      customAppName: 'Dialog Test',
      apiAppName: 'Dialog Test App',
      apiAppId: 4,
      apiAppKey: '278f13e07eee8398b189bced0db2cf66703d1746e2b541d85f5b42b1641aae0e'
    }, (core) => {
      resolve(core);
    });
  });
}

module.exports = createClient;
