/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

const path = require('path');
const createClient = require('../src');

createClient({
  endpoints: ['wss://ws1.dlg.im']
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
  console.log('my uid: ', messenger.getUid());
}).catch((error) => {
  console.trace(error);
});
