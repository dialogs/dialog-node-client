/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

const fs = require('fs');
const path = require('path');
const createClient = require('../src/index');

createClient({
  endpoints: ['wss://ws1.dlg.im'],
  storageFileName: path.join(__dirname, 'storage.json')
}).then((messenger) => {
  return new Promise((resolve, reject) => {
    if (messenger.isLoggedIn()) {
      messenger.login(() => {
        resolve(messenger);
      });
    } else {
      const onError = (tag, message) => reject(new Error(message, tag));
      messenger.requestSms(
        '75555555555',
        () => messenger.sendCode('5555', () => resolve(messenger), onError),
        onError
      );
    }
  });
}).then((messenger) => {
  const peer = { type: 'user', id: 10 };
  messenger.sendFile(peer, File.create(__filename));
}).catch((error) => {
  console.trace(error);
});
