/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

const fs = require('fs');
const path = require('path');
const createClient = require('../src/index');

const image = {
  mime: 'image/png',
  base64: 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAQMAAABKLAcXAAAAA1BMVEUAVtYkK7DpAAAAE0lEQVR4XmOgKxgFo2AUjIJRAAAFeAABfJyg3QAAAABJRU5ErkJggg==',
  width: 100,
  height: 100
};

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
  const file = new File([Buffer.from(image.base64, 'base64')], 'test.png');
  const preview = {
    width: image.width,
    height: image.height,
    base64: `data:${image.mime};base64,${image.base64}`
  };

  messenger.sendPhotoWithPreview(peer, file, image.width, image.height, preview);
}).catch((error) => {
  console.trace(error);
});
