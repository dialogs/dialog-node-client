/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

const EventEmitter = require('events');
const createClient = require('./client');

class Bot extends EventEmitter {
  constructor(options) {
    super();

    this.ready = createClient({
      quiet: options.quiet,
      endpoints: options.endpoints
    }).then((messenger) => {
      return new Promise((resolve, reject) => {
        const onSuccess = () => resolve(messenger);
        const onError = (tag, message) => reject(new Error(message, tag));

        if (typeof options.phone === 'string' && typeof options.code === 'string') {
          messenger.requestSms(
            options.phone,
            () => messenger.sendCode(options.code, onSuccess, onError)
          );
        } else if (typeof options.username === 'string' && typeof options.password === 'string') {
          messenger.startUserNameAuth(
            options.username,
            () => messenger.sendPassword(options.password, onSuccess, onError),
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

  onAsync(eventName, callback) {
    this.on(eventName, (...args) => {
      callback(...args).catch((error) => this.emit('error', error));
    });
  }

  onMessage(callback) {
    this.onAsync('MESSAGE_ADD', callback);
  }

  onInteractiveEvent(callback) {
    this.onAsync('INTERACTIVE_EVENT', async (event) => {
      const messenger = await this.ready;
      const ref = await messenger.getMessageRef(event.mid);

      await callback(Object.assign(event, ref));
    });
  }

  async getUid() {
    const messenger = await this.ready;
    return messenger.getUid();
  }

  async sendTextMessage(peer, text) {
    const messenger = await this.ready;
    messenger.sendMessage(peer, text);
  }

  async editTextMessage(peer, rid, text) {
    const messenger = await this.ready;
    await messenger.editMessage(peer, rid, text);
  }

  async sendInteractiveMessage(peer, text, actions, attach) {
    const messenger = await this.ready;
    messenger.sendInteractiveMessage(peer, text, actions, attach);
  }

  async editInteractiveMessage(peer, rid, text, actions) {
    const messenger = await this.ready;
    await messenger.editInteractiveMessage(peer, rid, text, actions);
  }

  async sendFileMessage(peer, fileName) {
    const messenger = await this.ready;
    const file = await File.create(fileName);
    messenger.sendMessage(peer, file);
  }

  async loadFileUrls(files) {
    const messenger = await this.ready;
    return messenger.loadFileUrls(files);
  }

  async loadFileUrl(file) {
    const urls = await this.loadFileUrls([file]);
    if (urls.length) {
      return urls[0].url;
    }

    return null;
  }
}

module.exports = Bot;
