/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

function isContentOk(content) {
  const types = ['document', 'photo', 'voice', 'video'];
  if (types.includes(content.type)) {
    return Boolean(content.fileUrl);
  }

  return true;
}

function checkMessage(message) {
  if (message && isContentOk(message.content)) {
    return message.attachment ? message.attachment.messages.every(checkMessage) : true;
  }

  return false;
}

class ResolveMessageQueue {
  constructor(messenger) {
    this.queue = [];
    this.messenger = messenger;
  }

  dequeue() {
    setImmediate(() => {
      const fn = this.queue.shift();
      if (fn) {
        fn(this.messenger);
      }
    });
  }

  add(peer, mid, callback) {
    this.queue.push(messenger => {
      messenger.onConversationOpen(peer);
      let binding = messenger.bindMessages(peer, messages => {
        try {
          const full = messages.find(item => item.mid === mid);
          if (checkMessage(full)) {
            messenger.onConversationClosed(peer);
            if (binding) {
              binding.unbind();
              binding = null;
            }

            callback(null, full);
            this.dequeue();
          }
        } catch (error) {
          callback(error);
          if (binding) {
            binding.unbind();
            binding = null;
          }
        }
      });

      binding.initAll();
    });

    this.dequeue();
  }
}

module.exports = ResolveMessageQueue;
