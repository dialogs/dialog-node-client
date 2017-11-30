import fs = require('fs');
import path = require('path');
import { jsdom } from 'jsdom';
import WebStorage from './runtime/WebStorage';
import Notification from './runtime/Notification';

function patchScope() {
  const html = '<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>';
  const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36';

  const document = jsdom(html, { userAgent });
  const window = document.defaultView;

  Object.assign(window, {
    window,
    document,
    Notification,
    WebSocket: require('ws'),
    localStorage: new WebStorage(),
    sessionStorage: new WebStorage()
  });

  const keys = [
    'window',
    'document',
    'location',
    'navigator',
    'localStorage',
    'sessionStorage',

    'Blob',
    'File',
    'Event',
    'WebSocket',
    'FileReader',
    'Notification',
    'XMLHttpRequest'
  ];

  keys.forEach((key) => {
    global[key] = window[key];
  });

  Object.assign(File, {
    async create(filePathName) {
      const content = await new Promise((resolve, reject) => {
        fs.readFile(filePathName, (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });

      const fileName = path.basename(filePathName);
      return new File([(content as Blob)], fileName);
    },
    createSync(filePathName) {
      const content = fs.readFileSync(filePathName);
      const fileName = path.basename(filePathName);
      return new File([content], fileName);
    }
  });

  setImmediate(() => {
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });
}

export default patchScope;
