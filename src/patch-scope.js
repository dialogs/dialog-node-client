const WebSocket = require('ws');
const LocalStorage = require('./LocalStorage');

function patchScope({ storageFileName }) {
  const localStorage = new LocalStorage(storageFileName);

  function addEventListener(eventName, callback) {
    if (eventName === 'DOMContentLoaded') {
      callback({});
    }
  }

  const document = {
    addEventListener,
    write(text) {},
    getElementById(id) {
      return {
        parentNode: {
          removeChild() {}
        }
      };
    },
    getElementsByTagName(name) {
      return [];
    },
    createElement() {
      return {};
    }
  };

  const navigator = {
    appCodeName: 'Mozilla',
    language: 'en-US',
    languages: ['en', 'en-US'],
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
  };

  const location = {
    hash: '#/auth',
    host: 'app.dlg.im',
    href: 'https://app.dlg.im/#/auth',
    pathname: '/',
    port: '',
    protocol: 'https:',
    search: ''
  };

  global.window = global;

  Object.assign(window, {
    WebSocket,
    document,
    location,
    navigator,
    localStorage,
    addEventListener,
    alert(message) {
      throw new Error(`Alert: ${message}`);
    }
  });

  Object.assign(document, {
    location,
    navigator
  });
}

module.exports = patchScope;


