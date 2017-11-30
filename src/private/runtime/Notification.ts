/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

/**
 * @private
 */
class StubNotification {
  static requestPermission(callback): void | Promise<string> {
    if (callback) {
      callback('denied');
    } else {
      return Promise.resolve('denied');
    }
  }

  get permission() {
    return 'denied';
  }
}

export default StubNotification;
