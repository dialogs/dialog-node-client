/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

const EventEmitter = require('events');
const Promise = require('bluebird');
const createClient = require('./client');

class Bot extends EventEmitter {
  constructor(endpoints, auth) {
    super();

    this.ready = createClient({ endpoints }).then((messenger) => {
      return new Promise((resolve, reject) => {
        const onSuccess = () => resolve(messenger);
        const onError = (tag, message) => reject(new Error(message, tag));

        if (typeof auth.phone === 'string' && typeof auth.code === 'string') {
          messenger.requestSms(
            auth.phone,
            () => messenger.sendCode(auth.code, onSuccess, onError)
          );
        } else if (typeof auth.username === 'string' && typeof auth.password === 'string') {
          messenger.startUserNameAuth(
            auth.username,
            () => messenger.sendPassword(auth.password, onSuccess, onError),
            onError
          );
        } else {
          throw new Error('Auth credentials not defined');
        }
      }).then((messenger) => {
        messenger.onUpdate((update) => {
          this.emit(update.type, update.payload);
        });

        return messenger;
      });
    });
  }

  async getUid() {
    const messenger = await this.ready;
    return messenger.getUid();
  }

  onAsync(eventName, callback) {
    this.on(eventName, (...args) => {
      callback(...args).catch((error) => this.emit('error', error));
    });
  }

  onMessage(callback) {
    this.onAsync('MESSAGE_ADD', callback);
  }

  sendTextMessage(peer, text) {
    return this.ready.then((messenger) => {
      messenger.sendMessage(peer, text);
    });
  }

  async sendFileMessage(peer, fileName) {
    const messenger = await this.ready;
    const file = await File.create(fileName);
    messenger.sendMessage(peer, file);
  }

  loadFileUrls(files) {
    return this.ready.then((messenger) => {
      return messenger.loadFileUrls(files);
    });
  }

  loadFileUrl(file) {
    return this.loadFileUrls([file]).then((urls) => {
      if (urls.length) {
        return urls[0].url;
      }

      return null;
    });
  }
}

module.exports = Bot;
