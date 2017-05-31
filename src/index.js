const patchScope = require('./patch-scope');
const log = require('./logger');

function createClient({ storageFileName, endpoints, quiet }) {
  patchScope({ storageFileName });

  const createCore = require('@dlghq/dialog-java-core');
  const AsyncStorage = require('./AsyncStorage');

  return new Promise((resolve) => {
    createCore({
      endpoints,
      asyncStorage: new AsyncStorage(window.localStorage),
      customAppName: 'Dialog Test',
      apiAppName: 'Dialog Test App',
      apiAppId: 4,
      apiAppKey: '278f13e07eee8398b189bced0db2cf66703d1746e2b541d85f5b42b1641aae0e',
      logHandler: quiet ? () => {} : log
    }, (core) => {
      resolve(core);
    });
  });
}

module.exports = createClient;
