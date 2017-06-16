/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

const EventEmitter = require('events');
const createClient = require('./client');

class Bot extends EventEmitter {
  constructor(endpoints, username, password) {
    super();

    this.ready = createClient({ endpoints }).then((messenger) => {
      console.log(localStorage);
      return new Promise((resolve, reject) => {
        const onSuccess = () => resolve(messenger);
        if (messenger.isLoggedIn()) {
          messenger.login(onSuccess);
        } else {
          const onError = (tag, message) => reject(new Error(message, tag));
          messenger.startUserNameAuth(
            username,
            () => messenger.sendPassword(password, onSuccess, onError),
            onError
          );
        }
      }).then((messenger) => {
        messenger.onUpdate((update) => {
          this.emit(update.type, update.payload);
        });

        return messenger;
      });
    });
  }

  onAsync(eventName, callback) {
    this.on(eventName, (...args) => {
      callback(...args).catch((error) => this.emit('error', error));
    });
  }

  sendTextMessage(peer, text) {
    return this.ready.then((messenger) => {
      messenger.sendMessage(peer, text);
    });
  }

  sendFileMessage(peer, file) {
    return this.ready.then((messenger) => {
      messenger.sendMessage(peer, file);
    });
  }

  sendImageMessage(peer, file, width, height, preview) {
    return this.ready.then((messenger) => {
      messenger.sendPhotoWithPreview(peer, file, width, height, preview);
    });
  }
}

module.exports = Bot;
